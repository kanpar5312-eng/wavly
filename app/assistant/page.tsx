"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DashboardNav } from "../components/DashboardNav";

type Role = "assistant" | "user";

type Action = { label: string; prompt: string };

type Message = {
  id: string;
  role: Role;
  content: string;
  time: string;
  actions?: Action[];
};

type Topic =
  | "general"
  | "booking"
  | "noshow"
  | "payments"
  | "replies"
  | "customers"
  | "welcome"
  | "analytics"
  | "templates";

type BusinessType =
  | "coach"
  | "clinic"
  | "salon"
  | "tuition"
  | "shop"
  | "other";

/* -------------------- Business context -------------------- */

const BUSINESS_PLURAL: Record<BusinessType, string> = {
  coach: "coaches & consultants",
  clinic: "clinics & doctors",
  salon: "salons & spas",
  tuition: "tuition & coaching classes",
  shop: "shops & D2C brands",
  other: "businesses like yours",
};

const BUSINESS_SINGULAR: Record<BusinessType, string> = {
  coach: "coaching practice",
  clinic: "clinic",
  salon: "salon",
  tuition: "coaching class",
  shop: "shop",
  other: "business",
};

const BUSINESS_LABEL: Record<BusinessType, string> = {
  coach: "Coach / Consultant",
  clinic: "Clinic / Doctor",
  salon: "Salon / Spa",
  tuition: "Tuition / Coaching",
  shop: "Shop / D2C",
  other: "Business",
};

function detectBusinessFromText(text: string): BusinessType | null {
  const q = text.toLowerCase();
  if (/clinic|doctor|dental|patient|therap/.test(q)) return "clinic";
  if (/salon|spa|beauty|parlour|parlor|hair|facial/.test(q)) return "salon";
  if (/coach|consult|trainer|mentor/.test(q)) return "coach";
  if (/tuition|tutor|coaching class|student|exam/.test(q)) return "tuition";
  if (/shop|store|retail|d2c|boutique|order/.test(q)) return "shop";
  return null;
}

/* -------------------- Topic detection -------------------- */

function detectTopic(input: string): Topic {
  const q = input.toLowerCase();
  if (/no-show|noshow|no show|miss|cancel/.test(q)) return "noshow";
  if (/book|appointment|schedul|slot|reminder/.test(q)) return "booking";
  if (/payment|unpaid|paid|invoice|owe|money/.test(q)) return "payments";
  if (/auto-reply|auto reply|reply|faq|answer|respond/.test(q)) return "replies";
  if (/customer|crm|export|dormant|re-engage|vip/.test(q)) return "customers";
  if (/welcome|greeting|first message|onboard/.test(q)) return "welcome";
  if (/analy|stats|performance|report|trend|metric/.test(q)) return "analytics";
  if (/template|prebuilt|pre-built|examples?/.test(q)) return "templates";
  return "general";
}

/* -------------------- Suggestion chips (dynamic) -------------------- */

type Chip = { title: string; prompt: string; topic: Topic };

function starterChips(b: BusinessType): Chip[] {
  const noun = BUSINESS_SINGULAR[b];
  return [
    {
      title: `Best Telegram bot templates for my ${noun}`,
      prompt: `Suggest the best Telegram bot templates for my ${noun}.`,
      topic: "templates",
    },
    {
      title: "Help me reduce no-shows on Telegram",
      prompt: "Help me reduce no-shows using my Telegram bot.",
      topic: "noshow",
    },
    {
      title: "Create a booking automation",
      prompt: "How do I create a booking automation on Telegram?",
      topic: "booking",
    },
    {
      title: "Analyze my recent activity",
      prompt: "Analyze my last 7 days and tell me what's working.",
      topic: "analytics",
    },
    {
      title: "Who hasn't paid?",
      prompt: "Show me customers who haven't paid yet.",
      topic: "payments",
    },
    {
      title: "Draft a welcome message",
      prompt: "Draft a warm welcome message for new customers.",
      topic: "welcome",
    },
  ];
}

const FOLLOWUP_CHIPS: Record<Topic, Chip[]> = {
  general: [],
  booking: [
    { title: "Turn on the 1-hour reminder", prompt: "Turn on the 1-hour booking reminder.", topic: "noshow" },
    { title: "Add a confirmation step", prompt: "Add a YES/NO confirmation step to bookings.", topic: "booking" },
    { title: "Let customers reschedule", prompt: "Let customers reschedule from the bot.", topic: "booking" },
  ],
  noshow: [
    { title: "Set up the full reminder flow", prompt: "Set up the full 3-layer reminder flow.", topic: "booking" },
    { title: "Open Smart Reminders", prompt: "Take me to the Smart Reminders settings.", topic: "booking" },
    { title: "Show my no-show trend", prompt: "Show me my no-show trend over the last month.", topic: "analytics" },
  ],
  payments: [
    { title: "Send reminders to all overdue", prompt: "Send polite payment reminders to all overdue customers.", topic: "payments" },
    { title: "Draft the message first", prompt: "Draft the payment reminder message so I can review it.", topic: "payments" },
    { title: "Who owes the most?", prompt: "Which customer owes me the most right now?", topic: "payments" },
  ],
  replies: [
    { title: "Draft my top 6 auto-replies", prompt: "Draft auto-replies for my 6 most-asked questions.", topic: "replies" },
    { title: "Add a pricing reply", prompt: "Add an auto-reply for pricing questions.", topic: "replies" },
    { title: "Set an after-hours reply", prompt: "Set up an after-hours auto-reply.", topic: "replies" },
  ],
  customers: [
    { title: "Re-engage dormant customers", prompt: "Help me re-engage my dormant customers.", topic: "customers" },
    { title: "Tag my VIPs", prompt: "How do I tag and track my VIP customers?", topic: "customers" },
    { title: "Export my customer list", prompt: "How do I export my customer list?", topic: "customers" },
  ],
  welcome: [
    { title: "Set Option A as default", prompt: "Use the friendly welcome message as my default.", topic: "welcome" },
    { title: "A/B test both", prompt: "A/B test both welcome messages for a week.", topic: "analytics" },
    { title: "Make it shorter", prompt: "Make the welcome message shorter and punchier.", topic: "welcome" },
  ],
  analytics: [
    { title: "What's my best automation?", prompt: "What's my best performing automation?", topic: "analytics" },
    { title: "Where am I losing customers?", prompt: "Where am I losing customers in my funnel?", topic: "customers" },
    { title: "Show weekly trend", prompt: "Show me the weekly message trend.", topic: "analytics" },
  ],
  templates: [
    { title: "Use the booking template", prompt: "Set up the booking template for me.", topic: "booking" },
    { title: "Use the welcome template", prompt: "Set up the welcome template for me.", topic: "welcome" },
    { title: "Customize a template", prompt: "How do I customize a template's message?", topic: "replies" },
  ],
};

/* -------------------- Intelligence (mock, context-aware) -------------------- */

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}
function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function thinkingStages(topic: Topic, b: BusinessType): string[] {
  const noun = BUSINESS_SINGULAR[b];
  switch (topic) {
    case "payments":
      return ["Scanning your invoices…", "Found 3 overdue payments", "Drafting your follow-up plan…"];
    case "booking":
    case "noshow":
      return [`Reading your ${noun}'s last 30 days of bookings…`, "Looking at no-show patterns…", "Building your reminder strategy…"];
    case "replies":
      return ["Reviewing your bot's conversations…", "Finding your most-asked questions…", "Designing auto-replies…"];
    case "customers":
      return ["Reading 342 customer profiles…", "Segmenting by activity…", "Generating insight…"];
    case "welcome":
      return ["Studying your brand voice…", "Drafting two options…"];
    case "analytics":
      return ["Pulling your last 7 days…", "Comparing with the previous week…", "Finding the headlines…"];
    case "templates":
      return [`Matching templates to ${BUSINESS_PLURAL[b]}…`, "Ranking by impact…", "Picking your top 3…"];
    default:
      return ["Thinking…", "Pulling relevant context…", "Generating response…"];
  }
}

function getReply(
  input: string,
  topic: Topic,
  b: BusinessType
): { content: string; actions?: Action[] } {
  const plural = BUSINESS_PLURAL[b];
  const noun = BUSINESS_SINGULAR[b];

  switch (topic) {
    case "templates":
      return {
        content:
          `For ${plural}, these are the **3 Telegram bot templates** I'd turn on first:\n\n` +
          "1. **Booking bot** — customers pick a slot right inside Telegram, your calendar updates automatically\n" +
          "2. **Smart reminders** — a nudge 1 hour and 30 mins before each appointment with a YES/NO confirm\n" +
          "3. **FAQ auto-replies** — instant answers to your top questions (timings, pricing, location)\n\n" +
          `Together these typically save a ${noun} like yours **8–12 hours a week**. Want me to set all three up?`,
        actions: [
          { label: "Set all 3 up for me", prompt: "Set up the booking, reminder and FAQ templates for me." },
          { label: "Just bookings first", prompt: "Just set up the booking template first." },
        ],
      };

    case "noshow":
      return {
        content:
          `Your no-show rate is **8%** — already better than the ${noun} average (15–20%). To push it lower on Telegram:\n\n` +
          "1. **1-hour reminder** with a one-tap **YES/NO** confirm button (you have this off)\n" +
          "2. **30-min final nudge** for the stragglers\n" +
          "3. **Auto-flag** anyone who hasn't confirmed so you can re-engage\n\n" +
          "I can switch on all three in your Smart Reminders right now.",
        actions: [
          { label: "Turn on all 3 layers", prompt: "Turn on the full 3-layer reminder flow." },
          { label: "Open Smart Reminders", prompt: "Take me to the Smart Reminders settings." },
        ],
      };

    case "booking":
      return {
        content:
          "Here's how booking works on your Telegram bot:\n\n" +
          "1. A customer messages your bot or taps **Book now**\n" +
          "2. The bot shows your open slots as tappable buttons\n" +
          "3. They pick one — it's instantly added to your calendar\n" +
          "4. Wavly auto-confirms and schedules reminders\n\n" +
          "It's a 30-second setup from the Booking template. Want me to enable it and add a confirmation step?",
        actions: [
          { label: "Enable booking + confirm", prompt: "Enable the booking bot with a confirmation step." },
          { label: "Let customers reschedule", prompt: "Also let customers reschedule from the bot." },
        ],
      };

    case "payments":
      return {
        content:
          "**3 customers** have overdue payments right now:\n\n" +
          "• **Dr. Mehta** · ₹1,200 · 4 days overdue\n" +
          "• **Karthik Iyer** · ₹2,800 · 9 days overdue\n" +
          "• **Manav Gupta** · ₹1,500 · 14 days overdue\n\n" +
          "Total outstanding: **₹5,500**. Polite reminders sent on Telegram recover about **78%** of overdue payments within 48 hours. Want me to send them?",
        actions: [
          { label: "Send reminders to all 3", prompt: "Send polite payment reminders to all 3 on Telegram." },
          { label: "Draft the message first", prompt: "Draft the payment reminder message first." },
        ],
      };

    case "replies":
      return {
        content:
          "I scanned your bot's last 30 days and found **6 questions** you answer 80%+ of the time — perfect for auto-replies:\n\n" +
          "• \"What are your timings?\"\n• \"How much does it cost?\"\n• \"Where are you located?\"\n• \"Do you have slots today?\"\n• \"Do you accept walk-ins?\"\n• \"How do I pay?\"\n\n" +
          "I can draft all six in your tone in one go.",
        actions: [
          { label: "Draft all 6 replies", prompt: "Draft auto-replies for all 6 questions in my tone." },
          { label: "Add a pricing reply only", prompt: "Just add the pricing auto-reply for now." },
        ],
      };

    case "customers":
      return {
        content:
          "Here's your customer snapshot:\n\n" +
          "• **342 total** customers in your workspace\n" +
          "• **187 active** (chatted in last 30 days)\n" +
          "• **41 new** this week — a **+24%** jump\n" +
          "• **23 dormant** (no activity in 60 days) — worth a friendly re-engage\n\n" +
          "Want me to send a gentle 'we miss you' message to the 23 dormant customers?",
        actions: [
          { label: "Re-engage the 23 dormant", prompt: "Send a re-engagement message to the 23 dormant customers." },
          { label: "Export the full list", prompt: "How do I export my full customer list?" },
        ],
      };

    case "welcome":
      return {
        content:
          "Two welcome messages tuned for a Telegram bot:\n\n" +
          "**Option A — Friendly:**\n\"Hey {{name}}! 🌿 Thanks for messaging us. Tap a button below or just ask — I reply instantly.\"\n\n" +
          "**Option B — Premium:**\n\"Hi {{name}}, lovely to hear from you. I've noted your message and will help you right away. — {{business}}\"\n\n" +
          "Telegram lets us add tappable buttons under the welcome — great for 'Book now', 'See prices', 'Talk to a human'. Want those?",
        actions: [
          { label: "Use Option A + buttons", prompt: "Use Option A and add quick-action buttons." },
          { label: "A/B test both", prompt: "A/B test both welcome messages for a week." },
        ],
      };

    case "analytics":
      return {
        content:
          "Your **last 7 days** at a glance:\n\n" +
          "• Messages handled: **5,184** (your bot handled **92%**)\n" +
          "• New customers: **41** (+24% vs prev week)\n" +
          "• Bookings: **84** · confirmation rate **91%**\n" +
          "• Time saved: ~**22 hours**\n\n" +
          "**Top automation:** your Saturday booking reminder (38 sent, 91% confirmed).\n**One fix:** the pricing auto-reply misfires ~6% of the time — I can rewrite it.",
        actions: [
          { label: "Rewrite the pricing reply", prompt: "Rewrite my pricing auto-reply to be clearer." },
          { label: "Show the weekly trend", prompt: "Show me the weekly message trend chart." },
        ],
      };

    default:
      return {
        content:
          `Happy to help! To give you something sharp for your ${noun}, tell me which of these you want to tackle first:\n\n` +
          "• **Reply faster** to customers\n• **Book more** appointments\n• **Cut no-shows**\n• **Chase payments** politely\n\n" +
          "Or pick a suggestion below and I'll take it from there.",
        actions: [
          { label: "Cut no-shows", prompt: "Help me cut no-shows on Telegram." },
          { label: "Book more appointments", prompt: "Help me get more bookings through my bot." },
          { label: "Reply faster", prompt: "Help me reply to customers faster." },
        ],
      };
  }
}

/* -------------------- Page -------------------- */

export default function AssistantPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [business, setBusiness] = useState<BusinessType>("other");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [thinkingStage, setThinkingStage] = useState<string | null>(null);
  const [topic, setTopic] = useState<Topic>("general");

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load context + welcome
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedName = window.localStorage.getItem("wavly.userName");
    const storedBiz = window.localStorage.getItem("wavly.businessType") as BusinessType | null;
    if (storedName) setUserName(storedName);
    const b: BusinessType = storedBiz && storedBiz in BUSINESS_PLURAL ? storedBiz : "other";
    setBusiness(b);

    const first = (storedName || "there").split(" ")[0];
    const ctx =
      b !== "other"
        ? ` I can see you run a ${BUSINESS_SINGULAR[b]}, so I've already lined up ideas tailored to ${BUSINESS_PLURAL[b]}.`
        : "";
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content: `Hi ${first} — I'm Wavly AI, your autonomous Telegram expert. I've read every chat, automation and customer in your workspace.${ctx}\n\nWhat would you like to tackle first?`,
        time: nowTime(),
        actions: [
          { label: "Show my biggest opportunity", prompt: "What's my biggest opportunity right now?" },
          { label: "Audit my automations", prompt: "Audit my current Telegram automations and tell me what's weak." },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking, thinkingStage]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || thinking) return;

      // Update context: detect business + topic from this message
      const detectedBiz = detectBusinessFromText(text);
      const effectiveBiz = detectedBiz || business;
      if (detectedBiz && detectedBiz !== business) {
        setBusiness(detectedBiz);
        if (typeof window !== "undefined")
          window.localStorage.setItem("wavly.businessType", detectedBiz);
      }
      const detectedTopic = detectTopic(text);

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "user", content: text, time: nowTime() },
      ]);
      setInput("");
      setThinking(true);

      // Multi-stage thinking
      for (const stage of thinkingStages(detectedTopic, effectiveBiz)) {
        setThinkingStage(stage);
        await new Promise((r) => setTimeout(r, 520 + Math.random() * 220));
      }

      const reply = getReply(text, detectedTopic, effectiveBiz);
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: reply.content,
          time: nowTime(),
          actions: reply.actions,
        },
      ]);
      setTopic(detectedTopic);
      setThinking(false);
      setThinkingStage(null);
    },
    [thinking, business]
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }
  function newChat() {
    const first = (userName || "there").split(" ")[0];
    setTopic("general");
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content: `Fresh start, ${first}. What should we tackle for your ${BUSINESS_SINGULAR[business]}?`,
        time: nowTime(),
        actions: [
          { label: "Show my biggest opportunity", prompt: "What's my biggest opportunity right now?" },
          { label: "Audit my automations", prompt: "Audit my current Telegram automations." },
        ],
      },
    ]);
    setInput("");
  }

  const initial = useMemo(
    () => (userName || "P").trim().charAt(0).toUpperCase(),
    [userName]
  );

  // Dynamic chips: follow-ups for the current topic, else business starters
  const chips: Chip[] = useMemo(() => {
    if (topic !== "general" && FOLLOWUP_CHIPS[topic].length) {
      return FOLLOWUP_CHIPS[topic];
    }
    return starterChips(business);
  }, [topic, business]);

  const chipsLabel = topic === "general" ? "Smart suggestions" : "Suggested next steps";

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <DashboardNav userName={userName} />

      {/* Premium Header */}
      <div className="relative border-b border-[var(--color-border-soft)] bg-gradient-to-b from-[var(--color-tg-tint)] to-[var(--color-cream)]/60 backdrop-blur overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/3 h-[280px] w-[480px] rounded-full bg-[var(--color-tg)]/12 blur-3xl" />
          <div className="absolute -top-24 right-1/4 h-[220px] w-[360px] rounded-full bg-[var(--color-gold-soft)]/18 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="relative h-12 w-12 rounded-2xl bg-[var(--color-forest)] flex items-center justify-center text-[var(--color-cream-soft)] shadow-[0_10px_30px_-10px_rgba(20,58,47,0.6)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
                </svg>
              </div>
              <div className="absolute -inset-1.5 rounded-full border border-[var(--color-tg)]/30 animate-soft-pulse pointer-events-none" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#34c759] border-2 border-[var(--color-cream)]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--color-tg-deep)] font-medium">
                Wavly AI
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)]/[0.08] px-2 py-0.5 text-[9px] font-semibold text-[var(--color-forest)] normal-case tracking-normal">
                  <BrainIcon /> Always learning
                </span>
              </div>
              <h1 className="mt-1 text-xl sm:text-[1.4rem] tracking-tight text-[var(--color-ink)]">
                Your{" "}
                <span className="font-display italic text-[var(--color-forest)]">
                  autonomous
                </span>{" "}
                Telegram expert
              </h1>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--color-muted)]">
                <span className="inline-flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34c759] opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#34c759]" />
                  </span>
                  Live
                </span>
                <span className="text-[var(--color-border)]">·</span>
                {business !== "other" ? (
                  <span>
                    Tuned for your{" "}
                    <span className="text-[var(--color-tg-deep)] font-medium">
                      {BUSINESS_LABEL[business]}
                    </span>
                  </span>
                ) : (
                  <span>Connected to your workspace data</span>
                )}
                <span className="text-[var(--color-border)]">·</span>
                <span>342 customers indexed</span>
              </div>
            </div>
          </div>

          <button
            onClick={newChat}
            className="btn-press self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
          >
            <PlusIcon />
            New chat
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div ref={listRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-8 space-y-5">
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              userInitial={initial}
              onAction={(p) => sendMessage(p)}
            />
          ))}
          {thinking && <ThinkingBubble stage={thinkingStage} />}
        </div>
      </div>

      {/* Dynamic chips + Input */}
      <div className="sticky bottom-0 border-t border-[var(--color-border-soft)] bg-[var(--color-cream)]/85 backdrop-blur">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-3">
          <div className="flex items-center gap-1.5 mb-2">
            <SparkleMini />
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-[var(--color-muted)]">
              {chipsLabel}
            </span>
            {topic !== "general" && (
              <span className="text-[10px] text-[var(--color-tg-deep)] lowercase tracking-normal">
                · based on this chat
              </span>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
            {chips.map((s) => (
              <button
                key={s.prompt}
                onClick={() => sendMessage(s.prompt)}
                disabled={thinking}
                className="group inline-flex items-center gap-2 shrink-0 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-tg)]/40 hover:text-[var(--color-tg-deep)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(20,33,28,0.25)] transition-all disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <span className="text-[var(--color-tg)]/70 group-hover:text-[var(--color-tg)] transition-colors">
                  {iconForTopic(s.topic)}
                </span>
                {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-3">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 rounded-3xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] p-2.5 shadow-[0_4px_18px_-12px_rgba(20,33,28,0.18)] focus-within:border-[var(--color-tg)] focus-within:shadow-[0_8px_28px_-12px_rgba(34,158,217,0.3)] transition-all"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Wavly to think for you…"
              rows={1}
              disabled={thinking}
              className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/80 outline-none max-h-40 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              aria-label="Send message"
              className={`btn-press inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all ${
                input.trim() && !thinking
                  ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_8px_22px_-8px_rgba(20,58,47,0.5)]"
                  : "bg-[var(--color-cream-deep)]/40 text-[var(--color-muted)] cursor-not-allowed"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--color-muted)]">
            <span>
              Press{" "}
              <kbd className="rounded border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-1 py-0.5 text-[9px] font-medium">
                Enter
              </kbd>{" "}
              to send ·{" "}
              <kbd className="rounded border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-1 py-0.5 text-[9px] font-medium">
                Shift + Enter
              </kbd>{" "}
              for new line
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <SparkleMini />
              Wavly AI · trained on your workspace
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Message Bubble -------------------- */

function MessageBubble({
  message,
  userInitial,
  onAction,
}: {
  message: Message;
  userInitial: string;
  onAction: (prompt: string) => void;
}) {
  const isUser = message.role === "user";
  return (
    <div className={`flex items-end gap-3 animate-fade-up ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <AvatarAssistant />}
      <div className={`flex flex-col gap-2 max-w-[82%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 text-[14px] leading-relaxed whitespace-pre-line ${
            isUser
              ? "rounded-2xl rounded-br-md bg-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_12px_24px_-12px_rgba(20,58,47,0.55)]"
              : "rounded-2xl rounded-bl-md bg-[var(--color-cream-soft)] border border-[var(--color-border-soft)] text-[var(--color-ink)] shadow-[0_4px_14px_-8px_rgba(20,33,28,0.18)]"
          }`}
          dangerouslySetInnerHTML={{ __html: formatRich(message.content) }}
        />
        {!isUser && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pl-1">
            {message.actions.map((a) => (
              <button
                key={a.label}
                onClick={() => onAction(a.prompt)}
                className="btn-press group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-forest)]/25 bg-[var(--color-forest)]/[0.04] px-3 py-1.5 text-[11px] font-medium text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-[var(--color-cream-soft)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(20,58,47,0.5)] transition-all"
              >
                {a.label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        )}
        <div className={`text-[10px] text-[var(--color-muted)] ${isUser ? "pr-2" : "pl-2"}`}>
          {message.time}
        </div>
      </div>
      {isUser && <AvatarUser initial={userInitial} />}
    </div>
  );
}

function ThinkingBubble({ stage }: { stage: string | null }) {
  return (
    <div className="flex items-end gap-3 animate-fade-up">
      <AvatarAssistant />
      <div className="flex flex-col gap-1.5">
        <div className="inline-flex items-center gap-3 rounded-2xl rounded-bl-md bg-[var(--color-cream-soft)] border border-[var(--color-border-soft)] px-4 py-3 shadow-[0_4px_14px_-8px_rgba(20,33,28,0.18)] min-w-[200px]">
          <div className="flex items-center gap-1.5">
            <Dot delay="0ms" />
            <Dot delay="150ms" />
            <Dot delay="300ms" />
          </div>
          <span key={stage} className="text-[12px] text-[var(--color-ink-soft)] animate-fade-up">
            {stage || "Thinking…"}
          </span>
        </div>
        <div className="text-[10px] text-[var(--color-muted)] pl-2">
          Wavly AI is reasoning…
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="block h-1.5 w-1.5 rounded-full bg-[var(--color-tg)] animate-soft-pulse"
      style={{ animationDelay: delay }}
    />
  );
}

function AvatarAssistant() {
  return (
    <div className="relative h-9 w-9 shrink-0 rounded-xl bg-[var(--color-forest)] flex items-center justify-center text-[var(--color-cream-soft)] shadow-[0_10px_22px_-10px_rgba(20,58,47,0.55)]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
      </svg>
      <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#34c759] border-[1.5px] border-[var(--color-cream)]" />
    </div>
  );
}

function AvatarUser({ initial }: { initial: string }) {
  return (
    <div className="h-9 w-9 shrink-0 rounded-xl bg-[var(--color-cream-deep)] text-[var(--color-forest)] flex items-center justify-center text-xs font-medium">
      {initial}
    </div>
  );
}

/* ---------- markdown-lite renderer ---------- */

function formatRich(text: string) {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="font-medium text-current">$1</strong>'
  );
}

/* ---------- Icons ---------- */

function iconForTopic(t: Topic) {
  const cls = "h-3.5 w-3.5";
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cls,
  };
  switch (t) {
    case "booking":
    case "noshow":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case "payments":
      return (
        <svg {...p}>
          <path d="M6 5h12M6 9h12M9 5c4 0 6 2 6 4 0 3-2 4-6 4l8 8" />
        </svg>
      );
    case "replies":
      return (
        <svg {...p}>
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
        </svg>
      );
    case "customers":
      return (
        <svg {...p}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...p}>
          <path d="M3 3v18h18" />
          <path d="M7 15l4-4 3 3 5-6" />
        </svg>
      );
    case "welcome":
      return (
        <svg {...p}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
        </svg>
      );
  }
}

function SparkleMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-[var(--color-gold)]">
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
      <path d="M9 4.5a3 3 0 00-3 3v9a3 3 0 003 3M15 4.5a3 3 0 013 3v9a3 3 0 01-3 3M9 8h0M15 8h0M9 16h0M15 16h0" />
    </svg>
  );
}
