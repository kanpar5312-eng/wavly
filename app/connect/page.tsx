"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";
import { Tilt3D } from "../components/Tilt3D";

type ConnectedBot = {
  id: string;
  label: string;
  username: string;
  connectedSince: string;
  lastSync: string;
};

const initialConnected: ConnectedBot[] = [
  {
    id: "b-1",
    label: "Glow Salon",
    username: "@GlowSalonBot",
    connectedSince: "15 May 2026",
    lastSync: "4 min ago",
  },
  {
    id: "b-2",
    label: "Glow Salon · Bookings",
    username: "@GlowBookingsBot",
    connectedSince: "22 May 2026",
    lastSync: "12 min ago",
  },
];

const SAMPLE_TOKEN = "7829461025:AAH8x_kPq3RtLmNoPqRsTuVwXyZ12345abc";

export default function ConnectPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [connected, setConnected] = useState<ConnectedBot[]>(initialConnected);
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [justConnected, setJustConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }

  function validToken(t: string) {
    // Telegram bot tokens look like  <digits>:<35-char base64-ish>
    return /^\d{6,12}:[A-Za-z0-9_-]{30,}$/.test(t.trim());
  }

  function connectBot() {
    setError(null);
    const t = token.trim();
    if (!validToken(t)) {
      setError(
        "That doesn't look like a valid bot token. It should look like 7829461025:AAH8x… — copy it exactly from BotFather."
      );
      return;
    }
    setConnecting(true);
    setTimeout(() => {
      const newBot: ConnectedBot = {
        id: `b-${Date.now()}`,
        label: "New Telegram bot",
        username: "@yourNewBot",
        connectedSince: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        lastSync: "just now",
      };
      setConnected((prev) => [newBot, ...prev]);
      setConnecting(false);
      setJustConnected(true);
      setToken("");
      showToast("Bot connected successfully");
      setTimeout(() => setJustConnected(false), 2600);
    }, 1400);
  }

  function disconnect(id: string) {
    setDisconnectingId(id);
    setTimeout(() => {
      const bot = connected.find((b) => b.id === id);
      setConnected((prev) => prev.filter((b) => b.id !== id));
      setDisconnectingId(null);
      showToast(`${bot?.username || "Bot"} disconnected`);
    }, 700);
  }

  const isConnected = connected.length > 0;

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-[var(--color-forest)]">
              Dashboard
            </Link>
            <ChevronRight />
            <span className="text-[var(--color-ink-soft)]">Connect Telegram</span>
          </nav>

          {/* Header */}
          <section className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                Step 1 of your Wavly setup
              </div>
              <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                Connect your{" "}
                <span className="font-display italic text-[var(--color-forest)]">
                  Telegram bot
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
                Create a free bot with Telegram&apos;s BotFather, paste its
                token below, and Wavly takes over from there. Setup takes about
                two minutes.
              </p>
            </div>

            <ConnectionPill isConnected={isConnected} count={connected.length} />
          </section>

          {/* Main 2-col layout */}
          <section className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-6">
            {/* Token card */}
            <Tilt3D max={3} perspective={1600}>
              <div className="relative h-full rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-8 sm:p-10 overflow-hidden shadow-[0_10px_40px_-20px_rgba(20,33,28,0.18)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-[var(--color-gold-soft)]/25 blur-3xl"
                />

                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div
                      style={{ transform: "translateZ(30px)" }}
                      className="h-12 w-12 rounded-2xl bg-[var(--color-tg)] text-white flex items-center justify-center shadow-[0_10px_24px_-10px_rgba(34,158,217,0.6)]"
                    >
                      <TelegramIcon />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                        Paste to connect
                      </div>
                      <h2 className="mt-0.5 text-xl tracking-tight text-[var(--color-ink)]">
                        Your bot token
                      </h2>
                    </div>
                  </div>

                  {justConnected ? (
                    <div className="mt-8 text-center py-8 animate-fade-up">
                      <div className="mx-auto inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] animate-pop-in shadow-[0_16px_36px_-14px_rgba(20,58,47,0.5)]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-7 w-7"
                        >
                          <path d="M5 12l4 4 10-10" />
                        </svg>
                      </div>
                      <h3 className="mt-6 text-2xl tracking-tight text-[var(--color-ink)]">
                        Bot connected
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-ink-soft)] max-w-sm mx-auto">
                        Wavly is now syncing your bot&apos;s messages in real
                        time. Head to Automations to bring it to life.
                      </p>
                      <Link
                        href="/automations"
                        className="btn-press mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 transition-all"
                      >
                        Set up automations
                        <ArrowRight />
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-7" style={{ transform: "translateZ(20px)" }}>
                      <label
                        htmlFor="bot-token"
                        className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]"
                      >
                        Bot token from BotFather
                      </label>
                      <div className="relative mt-2">
                        <input
                          id="bot-token"
                          type={showToken ? "text" : "password"}
                          value={token}
                          onChange={(e) => {
                            setToken(e.target.value);
                            if (error) setError(null);
                          }}
                          placeholder="7829461025:AAH8x_kPq3Rt…"
                          spellCheck={false}
                          autoComplete="off"
                          className={`w-full rounded-xl border bg-[var(--color-surface)] px-4 py-3 pr-12 font-mono text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/60 outline-none transition-all focus:ring-4 ${
                            error
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-[var(--color-border)] focus:border-[var(--color-forest)] focus:ring-[var(--color-forest)]/10"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowToken((v) => !v)}
                          aria-label={showToken ? "Hide token" : "Show token"}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--color-muted)] hover:text-[var(--color-forest)] transition-colors"
                        >
                          {showToken ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a19.85 19.85 0 014.22-5.94" />
                              <path d="M22.54 16.88A11 11 0 0023 12s-4-8-11-8a11 11 0 00-3.06.44" />
                              <path d="M9.88 9.88a3 3 0 104.24 4.24" />
                              <path d="M1 1l22 22" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {error && (
                        <p className="mt-2 text-xs text-red-600 leading-relaxed">
                          {error}
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setToken(SAMPLE_TOKEN);
                            setError(null);
                          }}
                          className="text-[11px] text-[var(--color-muted)] hover:text-[var(--color-forest)] underline underline-offset-2 transition-colors"
                        >
                          Use a sample token
                        </button>
                        <span className="text-[11px] text-[var(--color-muted)]">
                          {connected.length} of 5 bots connected
                        </span>
                      </div>

                      <button
                        onClick={connectBot}
                        disabled={connecting}
                        className={`btn-press mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all ${
                          connecting
                            ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]/80 cursor-wait"
                            : "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_8px_22px_-6px_rgba(20,58,47,0.5)]"
                        }`}
                      >
                        {connecting ? (
                          <>
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                              <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                            Verifying token…
                          </>
                        ) : (
                          <>
                            <TelegramIcon />
                            Connect bot
                          </>
                        )}
                      </button>

                      <p className="mt-5 text-[11px] text-[var(--color-muted)] leading-relaxed">
                        Your token is encrypted and stored securely. We never
                        share it, and you can revoke it anytime from BotFather
                        or by disconnecting below.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Tilt3D>

            {/* Instructions + Safety */}
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-7">
                <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                  Setup · 2 minutes
                </div>
                <h3 className="mt-2 text-lg font-medium text-[var(--color-ink)]">
                  How to get your token
                </h3>

                <ol className="mt-6 space-y-4">
                  <Step
                    n={1}
                    title="Open Telegram and search @BotFather"
                    detail="BotFather is Telegram's official bot for creating bots."
                  />
                  <Step
                    n={2}
                    title="Send /newbot"
                    detail="Then follow the prompts to name your bot."
                  />
                  <Step
                    n={3}
                    title="Choose a name and username"
                    detail="The username must end in 'bot' (e.g., GlowSalonBot)."
                  />
                  <Step
                    n={4}
                    title="Copy the token BotFather gives you"
                    detail="It looks like 7829461025:AAH8x_kPq3Rt…"
                  />
                  <Step
                    n={5}
                    title="Paste it into Wavly and connect"
                    detail="Wavly syncs your bot instantly."
                    last
                  />
                </ol>

                <a
                  href="https://t.me/BotFather"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
                >
                  <TelegramIcon />
                  Open BotFather in Telegram
                  <ArrowUpRight />
                </a>
              </div>

              <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-7">
                <div className="flex items-center gap-2">
                  <ShieldIcon />
                  <h3 className="text-lg font-medium text-[var(--color-ink)]">
                    Safe and private
                  </h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm">
                  <SafetyItem>
                    Your bot token is <strong>encrypted</strong> in transit and
                    at rest (AES-256).
                  </SafetyItem>
                  <SafetyItem>
                    Wavly only accesses messages sent to{" "}
                    <strong>your bot</strong> — never your personal Telegram
                    chats.
                  </SafetyItem>
                  <SafetyItem>
                    Connection runs through the{" "}
                    <strong>official Telegram Bot API</strong> — the same
                    infrastructure trusted by millions of bots.
                  </SafetyItem>
                  <SafetyItem>
                    <strong>Disconnect anytime</strong>, or revoke the token in
                    BotFather with{" "}
                    <code className="text-[var(--color-forest)]">/revoke</code>.
                  </SafetyItem>
                </ul>
              </div>
            </div>
          </section>

          {/* Connected Bots */}
          <section className="mt-14">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Connected bots
                </div>
                <h2 className="mt-2 text-2xl tracking-tight text-[var(--color-ink)]">
                  Your linked Telegram bots
                </h2>
              </div>
              <span className="text-sm text-[var(--color-muted)]">
                {connected.length} of 5 used
              </span>
            </div>

            {connected.length === 0 ? (
              <div className="mt-6 rounded-3xl border-2 border-dashed border-[var(--color-border)] bg-[var(--color-cream-soft)]/50 p-12 text-center">
                <div className="mx-auto inline-flex h-12 w-12 rounded-2xl bg-[var(--color-tg)]/10 text-[var(--color-tg-deep)] items-center justify-center">
                  <TelegramIcon />
                </div>
                <h3 className="mt-5 text-lg font-medium text-[var(--color-ink)]">
                  No bots connected yet
                </h3>
                <p className="mt-1.5 text-sm text-[var(--color-muted)]">
                  Paste a bot token above to connect your first Telegram bot.
                </p>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
                <ul className="divide-y divide-[var(--color-border-soft)]">
                  {connected.map((b) => (
                    <li
                      key={b.id}
                      className={`group flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 hover:bg-[var(--color-surface)] transition-all ${
                        disconnectingId === b.id ? "opacity-50 -translate-x-2" : ""
                      } animate-fade-up`}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="h-11 w-11 shrink-0 rounded-xl bg-[var(--color-tg)]/10 text-[var(--color-tg-deep)] flex items-center justify-center">
                          <TelegramIcon />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[var(--color-ink)] truncate">
                              {b.label}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-forest)]/[0.08] px-2 py-0.5 text-[10px] font-medium text-[var(--color-forest)]">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
                              </span>
                              Connected
                            </span>
                          </div>
                          <div className="text-xs text-[var(--color-muted)] mt-0.5 truncate">
                            <span className="font-mono">{b.username}</span> · since {b.connectedSince} · last sync {b.lastSync}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => disconnect(b.id)}
                        disabled={disconnectingId === b.id}
                        className="btn-press self-start sm:self-auto inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-red-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <UnlinkIcon />
                        Disconnect
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Footer note */}
          <p className="mt-10 text-center text-xs text-[var(--color-muted)]">
            Need help connecting?{" "}
            <a
              href="mailto:support@wavly.in"
              className="font-medium text-[var(--color-forest)] hover:underline underline-offset-2"
            >
              support@wavly.in
            </a>{" "}
            — we&apos;ll walk you through it.
          </p>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
          <div className="flex items-center gap-3 rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-medium text-[var(--color-cream-soft)] shadow-[0_18px_40px_-15px_rgba(20,33,28,0.45)]">
            <CheckIcon />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Sub-components ---------- */

function ConnectionPill({
  isConnected,
  count,
}: {
  isConnected: boolean;
  count: number;
}) {
  return (
    <div
      className={`shrink-0 self-start inline-flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 ${
        isConnected
          ? "border-[var(--color-forest)]/30 bg-[var(--color-forest)]/[0.04]"
          : "border-[var(--color-border)] bg-[var(--color-cream-soft)]"
      }`}
    >
      <div
        className={`h-9 w-9 rounded-xl flex items-center justify-center ${
          isConnected
            ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
            : "bg-[var(--color-cream-deep)]/60 text-[var(--color-muted)]"
        }`}
      >
        {isConnected ? <CheckShield /> : <TelegramIcon />}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
          Status
        </div>
        <div
          className={`text-sm font-medium ${
            isConnected ? "text-[var(--color-forest)]" : "text-[var(--color-ink-soft)]"
          }`}
        >
          {isConnected
            ? `${count} bot${count > 1 ? "s" : ""} connected`
            : "No bots connected"}
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  detail,
  last,
}: {
  n: number;
  title: string;
  detail: string;
  last?: boolean;
}) {
  return (
    <li className="relative flex gap-4">
      {!last && (
        <span
          aria-hidden
          className="absolute left-[18px] top-9 h-[calc(100%-1rem)] w-px bg-[var(--color-border)]"
        />
      )}
      <div className="relative h-9 w-9 shrink-0 rounded-full bg-[var(--color-forest)]/[0.08] border border-[var(--color-forest)]/20 text-[var(--color-forest)] flex items-center justify-center text-[13px] font-medium">
        {n}
      </div>
      <div className="pt-1">
        <div className="text-sm font-medium text-[var(--color-ink)]">{title}</div>
        <div className="mt-0.5 text-xs text-[var(--color-muted)] leading-relaxed">
          {detail}
        </div>
      </div>
    </li>
  );
}

function SafetyItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[var(--color-ink-soft)]">
      <span className="mt-1 text-[var(--color-forest)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <path d="M5 12l4 4 10-10" />
        </svg>
      </span>
      <span className="text-sm leading-relaxed">{children}</span>
    </li>
  );
}

/* ---------- Icons ---------- */

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

function ChevronRight() {
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

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
      <path d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[var(--color-forest)]">
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function CheckShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function UnlinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M18.84 12.25l1.72-1.71h-.01a5.004 5.004 0 00-.12-7.07 5.006 5.006 0 00-6.95 0L11.5 5.34M3 21l3-3" />
      <path d="M9 11L7 13a3 3 0 104.24 4.24L13 15" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}
