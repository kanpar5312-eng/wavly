"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";

type Segment = {
  id: string;
  label: string;
  count: number;
  desc: string;
};

const SEGMENTS: Segment[] = [
  { id: "all", label: "All customers", count: 342, desc: "Everyone who's messaged your bot" },
  { id: "active", label: "Active", count: 187, desc: "Chatted in the last 30 days" },
  { id: "vip", label: "VIPs", count: 14, desc: "Your best customers" },
  { id: "new", label: "New this month", count: 41, desc: "Recently joined" },
  { id: "dormant", label: "Dormant", count: 23, desc: "No activity in 60+ days" },
];

type Campaign = {
  id: string;
  message: string;
  segment: string;
  sent: number;
  opened: number;
  replied: number;
  date: string;
};

const pastCampaigns: Campaign[] = [
  {
    id: "c1",
    message: "🌿 Monsoon offer — 20% off all facials this week! Reply BOOK to grab a slot.",
    segment: "All customers",
    sent: 342,
    opened: 301,
    replied: 47,
    date: "18 May 2026",
  },
  {
    id: "c2",
    message: "We miss you! Here's ₹200 off your next visit — valid till Sunday 💚",
    segment: "Dormant",
    sent: 23,
    opened: 18,
    replied: 6,
    date: "11 May 2026",
  },
  {
    id: "c3",
    message: "VIP early access: new hair spa launching Saturday. Want first pick of slots?",
    segment: "VIPs",
    sent: 14,
    opened: 14,
    replied: 9,
    date: "2 May 2026",
  },
];

const VARS = [
  { key: "{{name}}", label: "Customer name" },
  { key: "{{business}}", label: "Business" },
  { key: "{{offer}}", label: "Offer" },
];

const SAMPLE = {
  "{{name}}": "Priya",
  "{{business}}": "Glow Salon",
  "{{offer}}": "20% off",
} as Record<string, string>;

export default function BroadcastsPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [segment, setSegment] = useState("all");
  const [message, setMessage] = useState(
    "Hi {{name}} 🌿 We're running a special this week — {{offer}} on all services. Reply BOOK to grab a slot!"
  );
  const [toast, setToast] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const n = window.localStorage.getItem("wavly.userName");
    if (n) setUserName(n);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }

  function insertVar(v: string) {
    const el = inputRef.current;
    if (!el) {
      setMessage((m) => m + " " + v);
      return;
    }
    const start = el.selectionStart ?? message.length;
    const end = el.selectionEnd ?? message.length;
    setMessage(message.slice(0, start) + v + message.slice(end));
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + v.length;
      el.setSelectionRange(pos, pos);
    });
  }

  const selectedSegment = SEGMENTS.find((s) => s.id === segment)!;
  const preview = useMemo(
    () => message.replace(/\{\{(name|business|offer)\}\}/g, (_, k) => SAMPLE[`{{${k}}}`] ?? `{{${k}}}`),
    [message]
  );

  function send() {
    if (!message.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      showToast(`Broadcast sent to ${selectedSegment.count} ${selectedSegment.label.toLowerCase()} 🎉`);
    }, 1400);
  }

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[440px] w-[820px] rounded-full bg-[var(--color-tg)]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          <nav className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-[var(--color-forest)]">Dashboard</Link>
            <Chevron />
            <span className="text-[var(--color-ink-soft)]">Broadcasts</span>
          </nav>

          <section className="mt-5">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
              Campaigns
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
              <span className="font-display italic text-[var(--color-forest)]">Broadcasts</span>
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
              Send a message to a whole group of customers at once — perfect for offers, announcements, and filling quiet days.
            </p>
          </section>

          {/* Composer + preview */}
          <section className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
            {/* Composer */}
            <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8">
              {/* Audience */}
              <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                1 · Choose audience
              </div>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SEGMENTS.map((s) => {
                  const active = segment === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSegment(s.id)}
                      className={`btn-press text-left rounded-2xl border p-3.5 transition-all ${
                        active
                          ? "border-[var(--color-forest)] bg-[var(--color-forest)]/[0.04] ring-4 ring-[var(--color-forest)]/10"
                          : "border-[var(--color-border-soft)] bg-[var(--color-surface)] hover:border-[var(--color-border)]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${active ? "text-[var(--color-forest)]" : "text-[var(--color-ink)]"}`}>
                          {s.label}
                        </span>
                        {active && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-[var(--color-forest)]">
                            <path d="M5 12l4 4 10-10" />
                          </svg>
                        )}
                      </div>
                      <div className="mt-1 font-display text-xl text-[var(--color-forest)] tabular-nums">{s.count}</div>
                      <div className="text-[11px] text-[var(--color-muted)] leading-snug mt-0.5">{s.desc}</div>
                    </button>
                  );
                })}
              </div>

              {/* Message */}
              <div className="mt-8 pt-7 border-t border-[var(--color-border-soft)]">
                <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                  2 · Write your message
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {VARS.map((v) => (
                    <button
                      key={v.key}
                      onClick={() => insertVar(v.key)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] hover:-translate-y-0.5 transition-all"
                    >
                      <span className="font-mono text-[10px] text-[var(--color-muted)]">{v.key}</span>
                      {v.label}
                    </button>
                  ))}
                </div>
                <textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="mt-4 w-full resize-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)] outline-none focus:border-[var(--color-tg)] focus:ring-4 focus:ring-[var(--color-tg)]/10 transition-all"
                />
                <div className="mt-2 text-xs text-[var(--color-muted)]">
                  {message.length} characters · sent as a Telegram message
                </div>
              </div>

              {/* Send */}
              <div className="mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-[var(--color-ink-soft)]">
                  Sending to{" "}
                  <span className="font-medium text-[var(--color-forest)]">
                    {selectedSegment.count} {selectedSegment.label.toLowerCase()}
                  </span>
                </div>
                <button
                  onClick={send}
                  disabled={sending || !message.trim()}
                  className={`btn-press inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all ${
                    sending || !message.trim()
                      ? "bg-[var(--color-forest)]/40 text-[var(--color-cream-soft)]/70 cursor-not-allowed"
                      : "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_8px_22px_-6px_rgba(20,58,47,0.5)]"
                  }`}
                >
                  {sending ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" /><path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <SendIcon />
                      Send broadcast
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                Live preview
              </div>
              <div className="mt-4 rounded-3xl border border-[var(--color-tg)]/25 bg-[var(--color-surface)] p-4 shadow-[0_22px_50px_-22px_rgba(20,33,28,0.25)] ring-1 ring-[var(--color-tg)]/[0.06]">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--color-border-soft)]">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-r from-[var(--color-tg-deep)] to-[var(--color-tg)] flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" /></svg>
                  </div>
                  <div className="text-sm font-medium text-[var(--color-ink)]">Glow Salon · Wavly</div>
                </div>
                <div className="pt-4 bg-[var(--color-cream)]/30 -mx-1 px-2 rounded-b-xl pb-2">
                  <div className="flex justify-end">
                    <div className="max-w-[88%] rounded-2xl rounded-br-sm bg-[var(--color-tg)] px-3.5 py-2.5 text-[13px] leading-relaxed text-white whitespace-pre-line shadow-sm">
                      {preview || "Your message will appear here…"}
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-[var(--color-muted)] mt-1 mr-1">now · via Telegram</div>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-[var(--color-muted)] leading-relaxed">
                Each customer sees their own name auto-filled. Sent respecting Telegram&apos;s rate limits so nothing gets flagged.
              </p>
            </div>
          </section>

          {/* Past campaigns */}
          <section className="mt-14">
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
              History
            </div>
            <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">Past broadcasts</h2>

            <div className="mt-6 space-y-3">
              {pastCampaigns.map((c) => {
                const openRate = Math.round((c.opened / c.sent) * 100);
                const replyRate = Math.round((c.replied / c.sent) * 100);
                return (
                  <div key={c.id} className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 hover:shadow-[0_18px_40px_-22px_rgba(20,33,28,0.2)] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-[var(--color-forest)]/[0.08] px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-forest)] uppercase tracking-wider">
                            {c.segment}
                          </span>
                          <span className="text-[11px] text-[var(--color-muted)]">{c.date}</span>
                        </div>
                        <p className="mt-2 text-sm text-[var(--color-ink)] leading-relaxed">{c.message}</p>
                      </div>
                      <div className="flex gap-5 shrink-0">
                        <Stat label="Sent" value={c.sent} />
                        <Stat label="Opened" value={`${openRate}%`} />
                        <Stat label="Replied" value={`${replyRate}%`} accent />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
          <div className="flex items-center gap-3 rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-medium text-[var(--color-cream-soft)] shadow-[0_18px_40px_-15px_rgba(20,33,28,0.45)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12l4 4 10-10" /></svg>
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <div className="text-center">
      <div className={`font-display text-lg leading-none tracking-tight tabular-nums ${accent ? "text-[var(--color-tg-deep)]" : "text-[var(--color-forest)]"}`}>
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)]">{label}</div>
    </div>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M9 18l6-6-6-6" /></svg>
  );
}
function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
  );
}
