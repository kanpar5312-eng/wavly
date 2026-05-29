"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";

type Faq = {
  id: string;
  q: string;
  keywords: string[];
  category: "Setup" | "Automations" | "Billing" | "Account" | "Troubleshooting";
  answer: string;
  link?: { label: string; href: string };
};

const KB: Faq[] = [
  {
    id: "connect",
    q: "How do I connect my Telegram bot?",
    keywords: ["connect", "bot", "token", "botfather", "link", "setup", "add bot"],
    category: "Setup",
    answer:
      "Connecting takes about 2 minutes:\n\n1. Open Telegram and search for **@BotFather**\n2. Send **/newbot** and follow the prompts to name it\n3. Copy the **bot token** BotFather gives you (looks like 7829461025:AAH8x…)\n4. Go to **Connect → paste the token → Connect bot**\n\nWavly starts syncing your bot's messages instantly.",
    link: { label: "Go to Connect", href: "/connect" },
  },
  {
    id: "create-automation",
    q: "How do I create an automation?",
    keywords: ["automation", "create", "auto-reply", "workflow", "template", "set up automation"],
    category: "Automations",
    answer:
      "Head to **Automations** and either:\n\n• Tap **+ Create new automation**, or\n• Pick a **Starter Template** (Welcome message, Price list reply, Booking, etc.)\n\nCustomize the message, choose the trigger, and toggle it on. Most automations are live in under 30 seconds.",
    link: { label: "Open Automations", href: "/automations" },
  },
  {
    id: "reminders",
    q: "How do appointment reminders work?",
    keywords: ["reminder", "no-show", "noshow", "appointment", "booking reminder", "confirm"],
    category: "Automations",
    answer:
      "Smart Reminders auto-send a Telegram message **1 hour** and **30 minutes** before each appointment, with a one-tap YES/NO confirmation. You can also set a custom time. This typically cuts no-shows by up to 60%.",
    link: { label: "Open Smart Reminders", href: "/reminders" },
  },
  {
    id: "not-responding",
    q: "Why isn't my bot responding to customers?",
    keywords: ["not responding", "not working", "broken", "bot down", "no reply", "stopped", "issue", "problem"],
    category: "Troubleshooting",
    answer:
      "Run through this quick checklist:\n\n1. **Is the bot connected?** Check Connect → it should show a green 'Connected' badge\n2. **Is the token still valid?** If you ran /revoke in BotFather, reconnect with a fresh token\n3. **Is the automation turned on?** Check the toggle on the Automations page\n4. **Is it within your plan limits?** Check Billing → usage\n\nStill stuck after this? Email us and we'll look into it fast.",
    link: { label: "Check Connect", href: "/connect" },
  },
  {
    id: "cancel",
    q: "How do I cancel my subscription?",
    keywords: ["cancel", "unsubscribe", "stop", "end subscription", "downgrade"],
    category: "Billing",
    answer:
      "You can cancel anytime — no calls, no awkward emails. Cancellation takes effect at the end of your current billing period, and you keep full access until then. Manage it from your Billing page.",
    link: { label: "Go to Billing", href: "/billing" },
  },
  {
    id: "data-safe",
    q: "Is my data safe?",
    keywords: ["safe", "secure", "privacy", "data", "encryption", "security"],
    category: "Account",
    answer:
      "Yes. Your customer chats are encrypted in transit and at rest (AES-256). We connect only through the **official Telegram Bot API**, never touch your personal Telegram, and we never sell or share your data. You can disconnect or revoke access anytime.",
    link: { label: "Read our Privacy Policy", href: "/privacy" },
  },
  {
    id: "add-bot",
    q: "Can I connect more than one bot?",
    keywords: ["multiple bots", "another bot", "second bot", "add bot", "more bots", "how many"],
    category: "Setup",
    answer:
      "Yes — you can connect up to **5 Telegram bots** depending on your plan. Each runs its own automations and shares one calm inbox. Just paste each bot's token on the Connect page.",
    link: { label: "Connect another bot", href: "/connect" },
  },
  {
    id: "payments",
    q: "How do payments work?",
    keywords: ["payment", "pay", "upi", "bank", "how to pay", "billing method"],
    category: "Billing",
    answer:
      "We currently accept **UPI and bank transfer**. When you choose a plan, we share the payment details and activate your account as soon as it's received. GST-compliant invoices are provided for your records.",
    link: { label: "View plans", href: "/upgrade" },
  },
  {
    id: "change-plan",
    q: "How do I change or upgrade my plan?",
    keywords: ["upgrade", "change plan", "switch plan", "plan", "pricing"],
    category: "Billing",
    answer:
      "Open the Upgrade page to see Monthly, Yearly, and Lifetime plans side by side. You can switch anytime — we prorate fairly so you only pay for what you use.",
    link: { label: "See plans", href: "/upgrade" },
  },
  {
    id: "booking",
    q: "Can customers book appointments through Telegram?",
    keywords: ["book", "booking", "appointment", "calendar", "schedule"],
    category: "Automations",
    answer:
      "Absolutely. Turn on the **Booking** automation and customers pick a slot right inside Telegram using tappable buttons. It updates your calendar and auto-confirms — no back-and-forth typing.",
    link: { label: "Set up booking", href: "/automations" },
  },
  {
    id: "export",
    q: "How do I export my customer list?",
    keywords: ["export", "download customers", "csv", "customer list", "backup"],
    category: "Account",
    answer:
      "Go to **Customers → ⋯ menu → Export**. You'll get a clean CSV of all your customers, their tags, and interaction history. You own your data and can export it anytime.",
    link: { label: "Open Customers", href: "/customers" },
  },
  {
    id: "refund",
    q: "Do you offer refunds?",
    keywords: ["refund", "money back", "guarantee", "return"],
    category: "Billing",
    answer:
      "Yes — there's a **30-day money-back guarantee** from your first paid charge. If Wavly isn't saving you time, email us within 30 days and we'll refund you in full. No forms, no hoops.",
  },
];

const CATEGORIES: Faq["category"][] = ["Setup", "Automations", "Billing", "Account", "Troubleshooting"];

function scoreMatch(query: string, faq: Faq): number {
  const q = query.toLowerCase();
  let score = 0;
  for (const kw of faq.keywords) {
    if (q.includes(kw)) score += kw.length; // longer keyword matches weigh more
  }
  // light boost if question words overlap
  faq.q.toLowerCase().split(/\s+/).forEach((w) => {
    if (w.length > 3 && q.includes(w)) score += 1;
  });
  return score;
}

export default function SupportPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [answer, setAnswer] = useState<Faq | null>(null);
  const [noMatch, setNoMatch] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const n = window.localStorage.getItem("wavly.userName");
    if (n) setUserName(n);
  }, []);

  function ask(text: string) {
    const t = text.trim();
    if (!t) return;
    setAsked(t);
    // Find best match
    const ranked = [...KB]
      .map((f) => ({ f, s: scoreMatch(t, f) }))
      .sort((a, b) => b.s - a.s);
    if (ranked[0] && ranked[0].s > 0) {
      setAnswer(ranked[0].f);
      setNoMatch(false);
    } else {
      setAnswer(null);
      setNoMatch(true);
    }
    setQuery("");
    requestAnimationFrame(() =>
      answerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    );
  }

  const firstName = (userName || "there").split(" ")[0];

  const popular = useMemo(() => KB.slice(0, 6), []);

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[440px] w-[820px] rounded-full bg-[var(--color-tg)]/10 blur-3xl" />
          <div className="absolute top-20 right-[10%] h-[300px] w-[300px] rounded-full bg-[var(--color-gold-soft)]/18 blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl">
          <nav className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-[var(--color-forest)]">Dashboard</Link>
            <Chevron />
            <span className="text-[var(--color-ink-soft)]">Support</span>
          </nav>

          {/* Hero */}
          <div className="mt-6 text-center">
            <div className="mx-auto inline-flex h-12 w-12 rounded-2xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] items-center justify-center shadow-[0_10px_28px_-10px_rgba(20,58,47,0.55)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h1 className="mt-5 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
              How can we{" "}
              <span className="font-display italic text-[var(--color-forest)]">help, {firstName}?</span>
            </h1>
            <p className="mt-3 text-sm text-[var(--color-ink-soft)] max-w-lg mx-auto">
              Ask our AI assistant anything about Wavly. It knows the answers to almost everything — and if it doesn&apos;t, we&apos;re one email away.
            </p>

            {/* Ask box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(query);
              }}
              className="mt-7 flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] p-2 pl-5 shadow-[0_8px_28px_-16px_rgba(20,33,28,0.25)] focus-within:border-[var(--color-tg)] focus-within:shadow-[0_10px_30px_-12px_rgba(34,158,217,0.3)] transition-all max-w-xl mx-auto"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[var(--color-muted)] shrink-0">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask a question… e.g. how do I connect my bot?"
                className="flex-1 bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/80 outline-none"
              />
              <button
                type="submit"
                disabled={!query.trim()}
                className={`btn-press inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${
                  query.trim()
                    ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)]"
                    : "bg-[var(--color-cream-deep)]/40 text-[var(--color-muted)] cursor-not-allowed"
                }`}
                aria-label="Ask"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

          {/* Answer */}
          {(answer || noMatch) && (
            <div ref={answerRef} className="mt-8 animate-fade-up">
              <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-7">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--color-tg-deep)] font-medium">
                  <SparkleMini /> Wavly AI · answer
                </div>
                {asked && (
                  <div className="mt-2 text-sm text-[var(--color-muted)]">
                    You asked: <span className="text-[var(--color-ink)]">&ldquo;{asked}&rdquo;</span>
                  </div>
                )}

                {answer ? (
                  <>
                    <h3 className="mt-4 text-lg font-medium text-[var(--color-ink)]">{answer.q}</h3>
                    <p
                      className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: bold(answer.answer) }}
                    />
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {answer.link && (
                        <Link
                          href={answer.link.href}
                          className="btn-press inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 transition-all"
                        >
                          {answer.link.label}
                          <ArrowRight />
                        </Link>
                      )}
                      <span className="text-xs text-[var(--color-muted)]">
                        Didn&apos;t solve it?{" "}
                        <a href="mailto:support@wavly.in" className="font-medium text-[var(--color-forest)] hover:underline underline-offset-2">
                          Email us
                        </a>
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-[var(--color-ink)]">
                      I couldn&apos;t find an exact answer for that
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                      No worries — our team will sort it out for you quickly. Email us with your question and we usually reply within a few hours.
                    </p>
                    <a
                      href={`mailto:support@wavly.in?subject=${encodeURIComponent("Support request")}&body=${encodeURIComponent(asked || "")}`}
                      className="btn-press mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 transition-all"
                    >
                      <MailIcon />
                      Email support
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Popular questions */}
          <section className="mt-10">
            <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
              Popular questions
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {popular.map((f) => (
                <button
                  key={f.id}
                  onClick={() => ask(f.q)}
                  className="group text-left flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-4 py-3.5 hover:-translate-y-0.5 hover:border-[var(--color-tg)]/30 hover:shadow-[0_14px_30px_-18px_rgba(20,33,28,0.22)] transition-all"
                >
                  <span className="text-sm text-[var(--color-ink)]">{f.q}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-tg)] group-hover:translate-x-0.5 transition-all">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </section>

          {/* Browse by category */}
          <section className="mt-10">
            <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
              Browse all topics
            </div>
            <div className="mt-4 space-y-5">
              {CATEGORIES.map((cat) => {
                const items = KB.filter((f) => f.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat}>
                    <div className="text-xs font-medium text-[var(--color-muted)] mb-1.5">{cat}</div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => ask(f.q)}
                          className="inline-flex items-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/40 hover:text-[var(--color-forest)] transition-colors"
                        >
                          {f.q}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Email fallback */}
          <section className="mt-12">
            <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-7 sm:p-9 text-center">
              <div className="mx-auto inline-flex h-11 w-11 rounded-xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] items-center justify-center">
                <MailIcon />
              </div>
              <h3 className="mt-4 text-lg font-medium text-[var(--color-ink)]">Still need a hand?</h3>
              <p className="mt-1.5 text-sm text-[var(--color-ink-soft)] max-w-md mx-auto">
                Our team replies within a few hours. Tell us what&apos;s going on and we&apos;ll fix it with you.
              </p>
              <a
                href="mailto:support@wavly.in"
                className="btn-press mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 transition-all"
              >
                <MailIcon />
                support@wavly.in
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ---------- helpers ---------- */

function bold(text: string) {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return escaped.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-medium text-[var(--color-ink)]">$1</strong>');
}

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function SparkleMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-[var(--color-gold)]">
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}
