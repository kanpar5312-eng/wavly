"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DashboardNav } from "../components/DashboardNav";

type Sender = "customer" | "me" | "ai";

type Msg = {
  id: string;
  text: string;
  sender: Sender;
  time: string; // HH:MM
  date: string; // "Today" | "Yesterday" | "24 May"
  status?: "sent" | "delivered" | "read";
};

type Convo = {
  id: string;
  name: string;
  initials: string;
  phone: string;
  avatarBg: string;
  lastSeen: string;
  unread: number;
  pinned?: boolean;
  resolved?: boolean;
  hasAi?: boolean;
  tag?: string;
  messages: Msg[];
};

const initialConvos: Convo[] = [
  {
    id: "c-1",
    name: "Priya Sharma",
    initials: "PS",
    phone: "+91 98765 12340",
    avatarBg: "bg-[var(--color-forest)]",
    lastSeen: "2 min",
    unread: 1,
    pinned: true,
    hasAi: true,
    tag: "VIP",
    messages: [
      { id: "m1", text: "Hi! Can I book a facial appointment for Saturday evening?", sender: "customer", time: "5:42 PM", date: "Today" },
      { id: "m2", text: "Hi Priya! Yes, we have 4 PM and 6 PM open this Saturday. Which works best for you?", sender: "ai", time: "5:42 PM", date: "Today", status: "read" },
      { id: "m3", text: "6 PM works perfect ✨", sender: "customer", time: "5:43 PM", date: "Today" },
      { id: "m4", text: "Booked you in for Sat, 6 PM. I'll send a reminder an hour before 🌿", sender: "ai", time: "5:43 PM", date: "Today", status: "read" },
      { id: "m5", text: "Can I also add a hair colour treatment to it?", sender: "customer", time: "5:58 PM", date: "Today" },
    ],
  },
  {
    id: "c-2",
    name: "Rohan Mehta",
    initials: "RM",
    phone: "+91 98765 22315",
    avatarBg: "bg-[#9c8a5f]",
    lastSeen: "12 min",
    unread: 2,
    messages: [
      { id: "m1", text: "Hey, can we reschedule Tuesday's session?", sender: "customer", time: "4:12 PM", date: "Today" },
      { id: "m2", text: "Sorry — something came up at work. Could we do Wednesday at the same time?", sender: "customer", time: "4:12 PM", date: "Today" },
    ],
  },
  {
    id: "c-3",
    name: "Dr. Anika Verma",
    initials: "AV",
    phone: "+91 90123 11221",
    avatarBg: "bg-[#3a6b5e]",
    lastSeen: "1 h",
    unread: 0,
    messages: [
      { id: "m1", text: "Just confirming our appointment tomorrow at 10 AM?", sender: "customer", time: "3:14 PM", date: "Today" },
      { id: "m2", text: "Yes Doctor — see you at 10 AM tomorrow. I'll send a reminder an hour before 🌿", sender: "me", time: "3:18 PM", date: "Today", status: "read" },
      { id: "m3", text: "Thanks, see you tomorrow", sender: "customer", time: "3:20 PM", date: "Today" },
    ],
  },
  {
    id: "c-4",
    name: "Aanya Patel",
    initials: "AP",
    phone: "+91 99877 51234",
    avatarBg: "bg-[#7a5a3c]",
    lastSeen: "2 h",
    unread: 1,
    messages: [
      { id: "m1", text: "Hi! I have a 4 PM appointment today — what's your exact address?", sender: "customer", time: "2:45 PM", date: "Today" },
    ],
  },
  {
    id: "c-5",
    name: "Karthik Iyer",
    initials: "KI",
    phone: "+91 99001 23456",
    avatarBg: "bg-[#6a7a55]",
    lastSeen: "3 h",
    unread: 1,
    messages: [
      { id: "m1", text: "Class today?", sender: "customer", time: "1:30 PM", date: "Today" },
    ],
  },
  {
    id: "c-6",
    name: "Vikram Singh",
    initials: "VS",
    phone: "+91 95555 67890",
    avatarBg: "bg-[#4a7a6b]",
    lastSeen: "5 h",
    unread: 0,
    resolved: true,
    messages: [
      { id: "m1", text: "Sending the payment now.", sender: "customer", time: "11:42 AM", date: "Today" },
      { id: "m2", text: "Sent the payment ✓", sender: "customer", time: "11:44 AM", date: "Today" },
      { id: "m3", text: "Received, Vikram! Thank you 🙏", sender: "me", time: "11:45 AM", date: "Today", status: "read" },
    ],
  },
  {
    id: "c-7",
    name: "Diya Reddy",
    initials: "DR",
    phone: "+91 97070 60506",
    avatarBg: "bg-[#8a5a55]",
    lastSeen: "8 h",
    unread: 3,
    messages: [
      { id: "m1", text: "Hi! Can I book a spa session for this weekend?", sender: "customer", time: "8:42 AM", date: "Today" },
      { id: "m2", text: "Looking for a 90-min package — what packages do you have?", sender: "customer", time: "8:43 AM", date: "Today" },
      { id: "m3", text: "Also do you accept walk-ins?", sender: "customer", time: "8:44 AM", date: "Today" },
    ],
  },
  {
    id: "c-8",
    name: "Manav Gupta",
    initials: "MG",
    phone: "+91 90909 80808",
    avatarBg: "bg-[#5a6a8a]",
    lastSeen: "Yesterday",
    unread: 0,
    messages: [
      { id: "m1", text: "Hi! Need to reschedule next week's classes.", sender: "customer", time: "6:14 PM", date: "Yesterday" },
      { id: "m2", text: "No worries, Manav. Which day works for you?", sender: "me", time: "6:30 PM", date: "Yesterday", status: "read" },
      { id: "m3", text: "Thursday works", sender: "customer", time: "6:31 PM", date: "Yesterday" },
    ],
  },
];

const quickReplies: { label: string; text: string }[] = [
  {
    label: "Send price list",
    text: "Here's our latest price list 🌿\n\n• Facial · ₹1,200\n• Hair colour · ₹2,500\n• Spa · ₹1,800\n\nLet me know which you'd like to book!",
  },
  {
    label: "Confirm appointment",
    text: "Your appointment is confirmed! I'll send you a reminder an hour before. See you soon 🌿",
  },
  {
    label: "Send location",
    text: "Here's our location: 12, Lavelle Road, Bengaluru. See you soon!",
  },
  {
    label: "Reschedule offer",
    text: "Of course! What day and time would work better for you?",
  },
  {
    label: "Apologize for delay",
    text: "So sorry for the delay in responding — I'm catching up on messages now. How can I help?",
  },
];

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function InboxPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [convos, setConvos] = useState<Convo[]>(initialConvos);
  const [activeId, setActiveId] = useState<string>("c-1");
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);

  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
  }, []);

  const active = convos.find((c) => c.id === activeId) || convos[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return convos;
    return convos.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.replace(/\s+/g, "").includes(q.replace(/\s+/g, "")) ||
        c.messages[c.messages.length - 1]?.text.toLowerCase().includes(q)
    );
  }, [convos, query]);

  // Auto-scroll to bottom on conversation change / new message
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeId, active?.messages.length]);

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  const selectConvo = useCallback((id: string) => {
    setActiveId(id);
    setMobileShowChat(true);
    // Clear unread
    setConvos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  }, []);

  const sendMessage = useCallback(
    (text: string) => {
      const t = text.trim();
      if (!t || !active) return;

      const msg: Msg = {
        id: uid(),
        text: t,
        sender: "me",
        time: nowTime(),
        date: "Today",
        status: "sent",
      };

      setConvos((prev) =>
        prev.map((c) =>
          c.id === active.id
            ? { ...c, messages: [...c.messages, msg], unread: 0 }
            : c
        )
      );
      setInput("");

      // Simulate delivery → read
      setTimeout(() => {
        setConvos((prev) =>
          prev.map((c) =>
            c.id === active.id
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === msg.id ? { ...m, status: "delivered" } : m
                  ),
                }
              : c
          )
        );
      }, 700);
      setTimeout(() => {
        setConvos((prev) =>
          prev.map((c) =>
            c.id === active.id
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === msg.id ? { ...m, status: "read" } : m
                  ),
                }
              : c
          )
        );
      }, 1800);
    },
    [active]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const totalUnread = convos.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNav userName={userName} />

      {/* Inbox split layout */}
      <div className="flex-1 flex border-t border-[var(--color-border-soft)] min-h-0">
        {/* Sidebar */}
        <aside
          className={`flex flex-col w-full md:w-[340px] lg:w-[380px] border-r border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] ${
            mobileShowChat ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="px-5 py-4 border-b border-[var(--color-border-soft)]">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-xl tracking-tight text-[var(--color-ink)]">
                <span className="font-display italic text-[var(--color-forest)]">
                  Inbox
                </span>
              </h1>
              {totalUnread > 0 && (
                <span className="inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 rounded-full bg-[var(--color-forest)] text-[var(--color-cream-soft)] text-[11px] font-medium">
                  {totalUnread}
                </span>
              )}
            </div>

            {/* Search */}
            <div className="relative mt-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search conversations"
                className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 pl-9 pr-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/80 outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10 transition-all"
              />
            </div>

            {/* Filter chips */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto -mx-1 px-1">
              <FilterChip active>All</FilterChip>
              <FilterChip>Unread · {totalUnread}</FilterChip>
              <FilterChip>VIPs</FilterChip>
              <FilterChip>Resolved</FilterChip>
            </div>
          </div>

          <ul className="flex-1 overflow-y-auto">
            {filtered.length === 0 && (
              <li className="px-5 py-12 text-center text-sm text-[var(--color-muted)]">
                No conversations match &ldquo;{query}&rdquo;
              </li>
            )}
            {filtered.map((c) => {
              const last = c.messages[c.messages.length - 1];
              const isActive = c.id === activeId;
              const lastPreview = last
                ? last.sender === "customer"
                  ? last.text
                  : `You: ${last.text}`
                : "No messages yet";
              return (
                <li key={c.id}>
                  <button
                    onClick={() => selectConvo(c.id)}
                    className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors border-l-2 ${
                      isActive
                        ? "bg-[var(--color-forest)]/[0.06] border-[var(--color-forest)]"
                        : "border-transparent hover:bg-[var(--color-surface)]"
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div
                        className={`h-10 w-10 rounded-full ${c.avatarBg} flex items-center justify-center text-[12px] font-medium text-[var(--color-cream-soft)]`}
                      >
                        {c.initials}
                      </div>
                      {c.unread > 0 && (
                        <span className="absolute -bottom-0.5 -right-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-forest)] text-[var(--color-cream-soft)] text-[10px] font-medium ring-2 ring-[var(--color-cream-soft)]">
                          {c.unread}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span
                            className={`text-sm truncate ${
                              c.unread > 0
                                ? "font-semibold text-[var(--color-ink)]"
                                : "font-medium text-[var(--color-ink)]"
                            }`}
                          >
                            {c.name}
                          </span>
                          {c.pinned && <PinIcon />}
                          {c.tag && (
                            <span className="inline-flex items-center rounded-full bg-[var(--color-gold)]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                              {c.tag}
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-[10px] shrink-0 ${
                            c.unread > 0
                              ? "text-[var(--color-forest)] font-medium"
                              : "text-[var(--color-muted)]"
                          }`}
                        >
                          {c.lastSeen}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5">
                        {c.hasAi && last?.sender === "ai" && <AiBadgeMini />}
                        <span
                          className={`text-xs truncate ${
                            c.unread > 0
                              ? "text-[var(--color-ink-soft)]"
                              : "text-[var(--color-muted)]"
                          }`}
                        >
                          {lastPreview}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sidebar footer */}
          <div className="border-t border-[var(--color-border-soft)] px-5 py-3 flex items-center justify-between text-[11px] text-[var(--color-muted)]">
            <span>
              {filtered.length} of {convos.length} conversations
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
              </span>
              Live
            </span>
          </div>
        </aside>

        {/* Chat */}
        <section
          className={`flex-1 flex flex-col min-h-0 bg-[var(--color-cream)] ${
            mobileShowChat ? "flex" : "hidden md:flex"
          }`}
        >
          {!active ? (
            <EmptyChat />
          ) : (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileShowChat(false)}
                    aria-label="Back to inbox"
                    className="md:hidden -ml-1 p-1.5 rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/50"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="relative">
                    <div
                      className={`h-10 w-10 rounded-full ${active.avatarBg} flex items-center justify-center text-[12px] font-medium text-[var(--color-cream-soft)]`}
                    >
                      {active.initials}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#34c759] border-2 border-[var(--color-cream-soft)]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-ink)]">
                      {active.name}
                      {active.tag && (
                        <span className="inline-flex items-center rounded-full bg-[var(--color-gold)]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                          {active.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[var(--color-muted)] truncate">
                      {active.phone} · last seen {active.lastSeen} ago
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <HeaderIconButton title="Customer details">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </HeaderIconButton>
                  <HeaderIconButton title="Search in chat">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" />
                    </svg>
                  </HeaderIconButton>
                  <HeaderIconButton title="More">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <circle cx="5" cy="12" r="1.6" />
                      <circle cx="12" cy="12" r="1.6" />
                      <circle cx="19" cy="12" r="1.6" />
                    </svg>
                  </HeaderIconButton>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 bg-[var(--color-cream)] relative">
                {/* subtle pattern background */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, var(--color-forest) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative max-w-3xl mx-auto space-y-1.5">
                  {renderMessages(active.messages)}
                  <div ref={listEndRef} />
                </div>
              </div>

              {/* Quick replies */}
              <div className="border-t border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-4 sm:px-6 pt-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <SparkleMini />
                  <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                    Quick replies
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                  {quickReplies.map((q) => (
                    <button
                      key={q.label}
                      onClick={() => {
                        setInput(q.text);
                        inputRef.current?.focus();
                      }}
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/40 hover:text-[var(--color-forest)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_-10px_rgba(20,33,28,0.25)] transition-all"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="pb-4">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage(input);
                    }}
                    className="flex items-end gap-2 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 focus-within:border-[var(--color-forest)] focus-within:shadow-[0_8px_28px_-12px_rgba(20,58,47,0.3)] transition-all"
                  >
                    <button
                      type="button"
                      aria-label="Attach"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-muted)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M21.4 11.05l-8.49 8.49a6 6 0 11-8.49-8.49l8.49-8.49a4 4 0 015.66 5.66l-8.5 8.49a2 2 0 11-2.83-2.83l7.79-7.78" />
                      </svg>
                    </button>
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={`Reply to ${active.name.split(" ")[0]}…`}
                      rows={1}
                      className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/80 outline-none max-h-40"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      aria-label="Send message"
                      className={`btn-press inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                        input.trim()
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
                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-[var(--color-muted)]">
                    <span>
                      Press{" "}
                      <kbd className="rounded border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-1 py-0.5 text-[9px] font-medium">
                        Enter
                      </kbd>{" "}
                      to send · all replies sync to WhatsApp
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <SparkleMini />
                      Wavly AI handles 92% of replies
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

/* ----------------- Helpers ----------------- */

function renderMessages(messages: Msg[]) {
  // Group consecutive same-sender messages, insert date separators
  const out: React.ReactNode[] = [];
  let lastDate = "";
  let lastSender: Sender | null = null;

  messages.forEach((m, i) => {
    if (m.date !== lastDate) {
      out.push(
        <div
          key={`date-${i}`}
          className="flex items-center justify-center my-4"
        >
          <span className="inline-flex items-center rounded-full bg-[var(--color-cream-deep)]/60 px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
            {m.date}
          </span>
        </div>
      );
      lastDate = m.date;
      lastSender = null;
    }
    const startGroup = lastSender !== m.sender;
    lastSender = m.sender;
    out.push(
      <MessageBubble key={m.id} message={m} startGroup={startGroup} />
    );
  });

  return out;
}

function MessageBubble({
  message,
  startGroup,
}: {
  message: Msg;
  startGroup: boolean;
}) {
  const isCustomer = message.sender === "customer";
  const isAi = message.sender === "ai";
  const isMe = message.sender === "me";

  return (
    <div
      className={`flex animate-fade-up ${
        isCustomer ? "justify-start" : "justify-end"
      } ${startGroup ? "mt-3" : "mt-0.5"}`}
    >
      <div
        className={`max-w-[78%] flex flex-col ${
          isCustomer ? "items-start" : "items-end"
        }`}
      >
        {startGroup && isAi && (
          <div className="mb-1 inline-flex items-center gap-1 rounded-full bg-[var(--color-gold)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--color-gold)]">
            <SparkleMini /> Wavly AI replied
          </div>
        )}

        <div
          className={`px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-line shadow-sm ${
            isCustomer
              ? "bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-ink)] " +
                (startGroup ? "rounded-2xl rounded-bl-md" : "rounded-2xl")
              : isAi
              ? "bg-gradient-to-br from-[var(--color-forest)] to-[var(--color-forest-deep)] text-[var(--color-cream-soft)] shadow-[0_8px_18px_-10px_rgba(20,58,47,0.55)] " +
                (startGroup ? "rounded-2xl rounded-br-md" : "rounded-2xl")
              : "bg-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_8px_18px_-10px_rgba(20,58,47,0.5)] " +
                (startGroup ? "rounded-2xl rounded-br-md" : "rounded-2xl")
          }`}
        >
          {message.text}
        </div>

        <div
          className={`mt-0.5 flex items-center gap-1 px-1 text-[10px] text-[var(--color-muted)] ${
            isCustomer ? "" : "flex-row-reverse"
          }`}
        >
          <span>{message.time}</span>
          {isMe && message.status && (
            <span
              className={`inline-flex ${
                message.status === "read"
                  ? "text-[#34c759]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              {message.status === "sent" ? (
                <SingleCheck />
              ) : (
                <DoubleCheck />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center bg-[var(--color-cream)]">
      <div className="h-14 w-14 rounded-2xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M22 12h-6l-2 3h-4l-2-3H2" />
          <path d="M5.5 5h13l3.5 7v7a2 2 0 01-2 2h-16a2 2 0 01-2-2v-7l3.5-7z" />
        </svg>
      </div>
      <h2 className="mt-5 text-xl tracking-tight text-[var(--color-ink)]">
        Pick a conversation
      </h2>
      <p className="mt-2 max-w-sm text-sm text-[var(--color-ink-soft)]">
        Choose a chat from the list to start replying.
      </p>
    </div>
  );
}

/* ----------------- Small components ----------------- */

function FilterChip({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`shrink-0 inline-flex items-center rounded-full px-3 py-1 text-xs transition-colors ${
        active
          ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
          : "bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/30 hover:text-[var(--color-forest)]"
      }`}
    >
      {children}
    </button>
  );
}

function HeaderIconButton({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      title={title}
      aria-label={title}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/50 hover:text-[var(--color-forest)] transition-colors"
    >
      {children}
    </button>
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

function AiBadgeMini() {
  return (
    <span className="inline-flex items-center rounded-full bg-[var(--color-gold)]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
      AI
    </span>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3 w-3 text-[var(--color-forest)]/70"
    >
      <path d="M12 2l4 6 6 1-4.5 4.5L19 20l-7-4-7 4 1.5-6.5L2 9l6-1 4-6z" />
    </svg>
  );
}

function SingleCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M4 13l5 5L20 7" />
    </svg>
  );
}

function DoubleCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M2 13l4 4L14 9" />
      <path d="M10 13l4 4 8-8" />
    </svg>
  );
}
