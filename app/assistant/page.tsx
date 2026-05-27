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

type Action = {
  label: string;
  prompt: string;
};

type Message = {
  id: string;
  role: Role;
  content: string;
  time: string;
  actions?: Action[];
};

type Suggestion = {
  title: string;
  prompt: string;
  icon: React.ReactNode;
};

/* -------------------- Suggestion chips (persistent) -------------------- */

const suggestionChips: Suggestion[] = [
  {
    title: "Help me create a booking automation",
    prompt: "Help me create a booking automation for my business.",
    icon: <CalendarIcon />,
  },
  {
    title: "How do I reduce no-shows?",
    prompt: "How can I reduce no-shows for my appointments?",
    icon: <ShieldIcon />,
  },
  {
    title: "Suggest best automations for my business",
    prompt: "Based on my activity, what automations should I turn on?",
    icon: <SparkleIcon />,
  },
  {
    title: "Analyze my recent activity",
    prompt: "Analyze my last 7 days and tell me what's working.",
    icon: <ChartIcon />,
  },
  {
    title: "Draft a welcome message",
    prompt: "Draft a warm welcome message for new customers.",
    icon: <PenIcon />,
  },
  {
    title: "Who hasn't paid?",
    prompt: "Show me customers who haven't paid yet.",
    icon: <RupeeIcon />,
  },
];

/* -------------------- Intelligence (mock) -------------------- */

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/** Returns 2–3 thinking stage texts based on what the user asked. */
function getThinkingStages(input: string): string[] {
  const q = input.toLowerCase();
  if (q.includes("payment") || q.includes("unpaid") || q.includes("paid")) {
    return [
      "Scanning your invoices…",
      "Found 3 customers with overdue payments",
      "Drafting your follow-up plan…",
    ];
  }
  if (q.includes("booking") || q.includes("appointment") || q.includes("reminder") || q.includes("no-show")) {
    return [
      "Reading your last 30 days of bookings…",
      "Looking at no-show patterns…",
      "Drafting your reminder strategy…",
    ];
  }
  if (q.includes("auto-reply") || q.includes("auto reply") || q.includes("automate") || q.includes("automation")) {
    return [
      "Reviewing your business profile…",
      "Looking at your top 20 most-asked questions…",
      "Designing automations for you…",
    ];
  }
  if (q.includes("customer") || q.includes("crm") || q.includes("export")) {
    return [
      "Reading 342 customer profiles…",
      "Looking at recent activity…",
      "Generating insight…",
    ];
  }
  if (q.includes("welcome") || q.includes("greeting") || q.includes("draft")) {
    return [
      "Studying your brand voice…",
      "Drafting two options for you…",
    ];
  }
  if (q.includes("analy") || q.includes("performance") || q.includes("stats") || q.includes("recent")) {
    return [
      "Pulling your last 7 days of activity…",
      "Comparing with the previous week…",
      "Finding the headlines for you…",
    ];
  }
  if (q.includes("clinic") || q.includes("salon") || q.includes("coach") || q.includes("tuition") || q.includes("business")) {
    return [
      "Looking at your industry…",
      "Matching with what works for similar businesses…",
      "Building your recommendation…",
    ];
  }
  return [
    "Thinking…",
    "Pulling relevant context…",
    "Generating response…",
  ];
}

/** Returns the assistant reply (with optional follow-up action chips). */
function getReply(input: string): { content: string; actions?: Action[] } {
  const q = input.toLowerCase();

  if (q.includes("auto-reply") || q.includes("auto reply") || q.includes("automate") || q.includes("automation") && !q.includes("booking")) {
    return {
      content:
        "Here's the fastest path to your first auto-reply:\n\n" +
        "1. Open **Automations** → click **+ New automation**\n" +
        "2. Pick the **Auto-reply** template\n" +
        "3. Add the trigger phrase (e.g., \"prices?\") and your reply\n" +
        "4. Toggle it on — Wavly starts replying instantly\n\n" +
        "I scanned your last 30 days of chats and found **6 questions** you answer 80%+ of the time. I can draft auto-replies for all of them in one go.",
      actions: [
        { label: "Draft all 6 auto-replies", prompt: "Draft auto-replies for my 6 most-asked questions." },
        { label: "See examples", prompt: "Show me some auto-reply examples." },
      ],
    };
  }

  if (q.includes("payment") || q.includes("unpaid") || q.includes("paid")) {
    return {
      content:
        "**3 customers** have overdue payments right now:\n\n" +
        "• **Dr. Mehta** · Invoice #1042 · ₹1,200 · 4 days overdue\n" +
        "• **Karthik Iyer** · Invoice #1038 · ₹2,800 · 9 days overdue\n" +
        "• **Manav Gupta** · Invoice #1031 · ₹1,500 · 14 days overdue\n\n" +
        "Total outstanding: **₹5,500**. Based on your past patterns, polite reminders sent on WhatsApp recover **78%** of overdue payments within 48 hours.",
      actions: [
        { label: "Send reminders to all 3", prompt: "Send polite payment reminders to all 3 customers." },
        { label: "Draft the message first", prompt: "Draft the payment reminder message first so I can review." },
      ],
    };
  }

  if (q.includes("booking") || q.includes("appointment") || q.includes("reminder") || q.includes("no-show")) {
    return {
      content:
        "Your no-show rate over the last 30 days is **8%** — already lower than the industry average (15–20%). Here's how to push it even lower:\n\n" +
        "1. **Send a 1-hour reminder with a YES/NO confirmation** — you have this off right now\n" +
        "2. **Add a 30-min final nudge** — catches the last-minute drift\n" +
        "3. **Auto-flag unconfirmed appointments** so you can re-engage\n\n" +
        "I can set up all three in your **Smart Reminders** in under 30 seconds.",
      actions: [
        { label: "Set up all 3 reminders", prompt: "Set up the full reminder flow with all 3 layers." },
        { label: "Open Smart Reminders", prompt: "Take me to the Smart Reminders settings." },
      ],
    };
  }

  if (q.includes("customer") || q.includes("crm") || q.includes("export") || q.includes("list")) {
    return {
      content:
        "You currently have **342 customers** in your workspace.\n\n" +
        "• **187 active** (chatted in last 30 days)\n" +
        "• **41 new** this week — a **+24%** jump vs last week\n" +
        "• **14 marked VIP**\n" +
        "• **23 dormant** (no activity in 60 days) — worth a friendly re-engagement",
      actions: [
        { label: "Re-engage dormant customers", prompt: "Help me re-engage the 23 dormant customers." },
        { label: "Export full list", prompt: "How do I export my customer list?" },
      ],
    };
  }

  if (q.includes("welcome") || q.includes("greeting") || q.includes("hi") || q.includes("hello") || q.includes("draft")) {
    return {
      content:
        "Two welcome messages tuned to your brand voice:\n\n" +
        "**Option A — Friendly:**\n\"Hey {{name}}! 🌿 Thanks for reaching out — I'll get back to you within an hour. In the meantime, feel free to look at our services here: {{link}}.\"\n\n" +
        "**Option B — Premium:**\n\"Hi {{name}}, lovely to hear from you. I've noted your message and will personally respond shortly. — {{ownerName}}\"\n\n" +
        "Want me to A/B test both for a week and tell you which performs better?",
      actions: [
        { label: "Set Option A as default", prompt: "Use Option A as my default welcome message." },
        { label: "A/B test both", prompt: "Start an A/B test between the two welcome messages." },
      ],
    };
  }

  if (q.includes("analy") || q.includes("performance") || q.includes("stats") || q.includes("recent") || q.includes("7 day") || q.includes("week")) {
    return {
      content:
        "Your **last 7 days at a glance**:\n\n" +
        "• Messages handled: **5,184** (Wavly handled **92%**, you handled the rest)\n" +
        "• New customers: **41** (+24% vs prev week)\n" +
        "• Bookings: **84** · Confirmation rate **91%**\n" +
        "• Time saved: an estimated **22 hours**\n\n" +
        "**Top performing automation:** Saturday booking reminder — 38 sent, 91% confirmed.\n" +
        "**One opportunity:** your auto-reply for \"pricing?\" misfires ~6% of the time. I can rewrite it.",
      actions: [
        { label: "Rewrite the pricing reply", prompt: "Rewrite my pricing auto-reply to be clearer." },
        { label: "Show weekly trend chart", prompt: "Show me the weekly trend chart." },
      ],
    };
  }

  if (q.includes("clinic") || q.includes("salon") || q.includes("coach") || q.includes("tuition") || q.includes("business")) {
    return {
      content:
        "Based on your industry and the businesses doing well on Wavly, I recommend turning on these **3 automations first**:\n\n" +
        "1. **Smart Reminders** — biggest immediate impact, cuts no-shows by ~60%\n" +
        "2. **Auto-Replies** for FAQs — saves ~2 hours/day on average\n" +
        "3. **Payment Reminders** — recovers ~78% of overdue invoices within 48 hours\n\n" +
        "Together these typically save Indian SMBs **8–12 hours per week**.",
      actions: [
        { label: "Set them all up for me", prompt: "Set up these 3 automations for me right now." },
        { label: "Just Smart Reminders first", prompt: "Just set up Smart Reminders first." },
      ],
    };
  }

  return {
    content:
      "Got it — I'd love to help you with that. A bit more detail will let me give you a much sharper answer:\n\n" +
      "• Is this about **replying faster**, **booking more appointments**, **following up with customers**, or something else?\n" +
      "• Should I look at **your data** to suggest specifics?\n\n" +
      "Just tell me where you want to go and I'll handle the rest.",
    actions: [
      { label: "Look at my data", prompt: "Yes, analyze my data and suggest specifics." },
      { label: "I want to reply faster", prompt: "Help me reply to customers faster." },
      { label: "I want more bookings", prompt: "Help me get more bookings." },
    ],
  };
}

/* -------------------- Page -------------------- */

export default function AssistantPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [thinkingStage, setThinkingStage] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load user name + welcome message
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);

    const first = (stored || "there").split(" ")[0];
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content: `Hi ${first} — I'm Wavly AI, your autonomous WhatsApp expert. I've read every chat, automation and customer in your workspace, so I'll give you real answers, not generic ones.\n\nWhat would you like to tackle first?`,
        time: nowTime(),
        actions: [
          { label: "Show me my biggest opportunity", prompt: "What's my biggest opportunity right now?" },
          { label: "Audit my automations", prompt: "Audit my current automations and tell me what's weak." },
        ],
      },
    ]);
  }, []);

  // Auto-scroll
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, thinking, thinkingStage]);

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  const sendMessage = useCallback(async (raw: string) => {
    const text = raw.trim();
    if (!text || thinking) return;

    const userMsg: Message = {
      id: uid(),
      role: "user",
      content: text,
      time: nowTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    // Multi-stage thinking
    const stages = getThinkingStages(text);
    for (const stage of stages) {
      setThinkingStage(stage);
      await new Promise((r) => setTimeout(r, 520 + Math.random() * 220));
    }

    const reply = getReply(text);
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
    setThinking(false);
    setThinkingStage(null);
  }, [thinking]);

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
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content: `Fresh start, ${first}. What should we tackle?`,
        time: nowTime(),
        actions: [
          { label: "Show me my biggest opportunity", prompt: "What's my biggest opportunity right now?" },
          { label: "Audit my automations", prompt: "Audit my current automations." },
        ],
      },
    ]);
    setInput("");
  }

  const initial = useMemo(
    () => (userName || "P").trim().charAt(0).toUpperCase(),
    [userName]
  );

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <DashboardNav userName={userName} />

      {/* Premium Header */}
      <div className="relative border-b border-[var(--color-border-soft)] bg-gradient-to-b from-[var(--color-cream)] to-[var(--color-cream)]/60 backdrop-blur overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/3 h-[280px] w-[480px] rounded-full bg-[var(--color-gold-soft)]/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 lg:px-10 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="relative h-12 w-12 rounded-2xl bg-[var(--color-forest)] flex items-center justify-center text-[var(--color-cream-soft)] shadow-[0_10px_30px_-10px_rgba(20,58,47,0.6)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
                </svg>
              </div>
              {/* orbit ring */}
              <div className="absolute -inset-1.5 rounded-full border border-[var(--color-gold)]/30 animate-soft-pulse pointer-events-none" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#34c759] border-2 border-[var(--color-cream)]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
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
                WhatsApp expert
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
                <span>Connected to your workspace data</span>
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

      {/* Persistent suggestion chips + Input */}
      <div className="sticky bottom-0 border-t border-[var(--color-border-soft)] bg-[var(--color-cream)]/85 backdrop-blur">
        {/* Chips */}
        <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-3">
          <div className="flex items-center gap-1.5 mb-2">
            <SparkleMini />
            <span className="text-[10px] uppercase tracking-[0.16em] font-medium text-[var(--color-muted)]">
              Smart suggestions
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
            {suggestionChips.map((s) => (
              <button
                key={s.prompt}
                onClick={() => sendMessage(s.prompt)}
                disabled={thinking}
                className="group inline-flex items-center gap-2 shrink-0 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/40 hover:text-[var(--color-forest)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(20,33,28,0.25)] transition-all disabled:opacity-50 disabled:hover:translate-y-0"
              >
                <span className="text-[var(--color-forest)]/70 group-hover:text-[var(--color-forest)] transition-colors">
                  {s.icon}
                </span>
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="mx-auto max-w-3xl px-6 lg:px-10 py-3">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 rounded-3xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] p-2.5 shadow-[0_4px_18px_-12px_rgba(20,33,28,0.18)] focus-within:border-[var(--color-forest)] focus-within:shadow-[0_8px_28px_-12px_rgba(20,58,47,0.3)] transition-all"
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
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
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
    <div
      className={`flex items-end gap-3 animate-fade-up ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && <AvatarAssistant />}

      <div
        className={`flex flex-col gap-2 max-w-[82%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-3 text-[14px] leading-relaxed whitespace-pre-line ${
            isUser
              ? "rounded-2xl rounded-br-md bg-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_12px_24px_-12px_rgba(20,58,47,0.55)]"
              : "rounded-2xl rounded-bl-md bg-[var(--color-cream-soft)] border border-[var(--color-border-soft)] text-[var(--color-ink)] shadow-[0_4px_14px_-8px_rgba(20,33,28,0.18)]"
          }`}
          dangerouslySetInnerHTML={{ __html: formatRich(message.content) }}
        />

        {/* Action chips */}
        {!isUser && message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pl-1">
            {message.actions.map((a) => (
              <button
                key={a.label}
                onClick={() => onAction(a.prompt)}
                className="btn-press group inline-flex items-center gap-1.5 rounded-full border border-[var(--color-forest)]/25 bg-[var(--color-forest)]/[0.04] px-3 py-1.5 text-[11px] font-medium text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-[var(--color-cream-soft)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(20,58,47,0.5)] transition-all"
              >
                {a.label}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        )}

        <div
          className={`text-[10px] text-[var(--color-muted)] ${
            isUser ? "pr-2" : "pl-2"
          }`}
        >
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
          <span
            key={stage}
            className="text-[12px] text-[var(--color-ink-soft)] animate-fade-up"
          >
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
      className="block h-1.5 w-1.5 rounded-full bg-[var(--color-forest)] animate-soft-pulse"
      style={{ animationDelay: delay }}
    />
  );
}

function AvatarAssistant() {
  return (
    <div className="relative h-9 w-9 shrink-0 rounded-xl bg-[var(--color-forest)] flex items-center justify-center text-[var(--color-cream-soft)] shadow-[0_10px_22px_-10px_rgba(20,58,47,0.55)]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
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

/* ---------- markdown-lite renderer (bold + line breaks) ---------- */

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

function svgProps() {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-3.5 w-3.5",
  };
}

function CalendarIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}
function SparkleMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 text-[var(--color-gold)]"
    >
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </svg>
  );
}
function PenIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
function RupeeIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M6 5h12M6 9h12M9 5c4 0 6 2 6 4 0 3-2 4-6 4l8 8" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function BrainIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-2.5 w-2.5"
    >
      <path d="M9 4.5a3 3 0 00-3 3v9a3 3 0 003 3M15 4.5a3 3 0 013 3v9a3 3 0 01-3 3M9 8h0M15 8h0M9 16h0M15 16h0" />
    </svg>
  );
}
