import { Tilt3D } from "./Tilt3D";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* soft background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[720px] w-[720px] rounded-full bg-[var(--color-gold-soft)]/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-[var(--color-forest-soft)]/10 blur-3xl" />
        <div className="absolute top-20 right-[8%] h-[420px] w-[420px] rounded-full bg-[var(--color-tg)]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <div
              className="animate-hero-rise inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-1.5 text-xs font-medium text-[var(--color-forest)] shadow-sm"
              style={{ animationDelay: "0ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-forest)]" />
              </span>
              AI Telegram Automation · Built for India
            </div>

            <h1
              className="animate-hero-rise mt-6 text-[2.6rem] leading-[1.04] tracking-tight text-[var(--color-ink)] sm:text-[3.4rem] lg:text-[4rem]"
              style={{ animationDelay: "120ms" }}
            >
              Stop typing the same replies.{" "}
              <span className="font-display italic text-[var(--color-forest)]">
                Start growing
              </span>{" "}
              instead.
            </h1>

            <p
              className="animate-hero-rise mt-7 max-w-xl text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed"
              style={{ animationDelay: "240ms" }}
            >
              Wavly is the AI assistant that handles your Telegram — replying
              instantly, booking appointments, sending reminders, and chasing
              payments. Save 10+ hours every week.
            </p>

            <div
              className="animate-hero-rise mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              style={{ animationDelay: "360ms" }}
            >
              <a
                href="/signup"
                className="btn-press group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-forest)] px-7 py-3.5 text-sm font-medium text-[var(--color-cream-soft)] shadow-[0_6px_20px_-6px_rgba(20,58,47,0.45)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-10px_rgba(20,58,47,0.55)]"
              >
                Start free trial
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-7 py-3.5 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)]"
              >
                See how it works
              </a>
            </div>

            <div
              className="animate-hero-rise mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[var(--color-muted)]"
              style={{ animationDelay: "480ms" }}
            >
              <div className="flex items-center gap-1.5">
                <CheckMini /> No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckMini /> 7-day free trial
              </div>
              <div className="flex items-center gap-1.5">
                <CheckMini /> Cancel anytime
              </div>
            </div>
          </div>

          {/* Right: visual */}
          <div
            className="lg:col-span-5 animate-hero-rise"
            style={{ animationDelay: "300ms" }}
          >
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <Tilt3D max={5} perspective={1400} className="relative mx-auto max-w-md lg:max-w-none">
      {/* soft halo behind */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-b from-[var(--color-gold-soft)]/30 to-transparent blur-2xl"
      />

      {/* Floating: Auto-reply badge */}
      <div
        style={{ transform: "translateZ(50px)" }}
        className="animate-float-y absolute -top-3 -right-2 sm:-right-6 z-20 flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-3.5 py-2 shadow-[0_18px_40px_-20px_rgba(20,33,28,0.35)]"
      >
        <div className="h-7 w-7 rounded-lg bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center">
          <BoltMini />
        </div>
        <div className="text-left">
          <div className="text-[11px] font-medium text-[var(--color-ink)]">
            Auto-reply sent
          </div>
          <div className="text-[10px] text-[var(--color-muted)]">
            in 0.2 seconds
          </div>
        </div>
      </div>

      {/* Main chat card */}
      <div className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_30px_80px_-30px_rgba(20,33,28,0.3)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--color-border-soft)] px-5 py-3.5 bg-gradient-to-b from-[var(--color-cream-soft)] to-transparent">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center text-[13px] font-medium">
              PS
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#34c759] border-2 border-[var(--color-surface)]" />
            </div>
            <div>
              <div className="text-sm font-medium text-[var(--color-ink)]">
                Priya · Glow Salon
              </div>
              <div className="text-[11px] text-[#34a853] flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34c759] animate-soft-pulse" />
                online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[var(--color-muted)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.79a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.29-1.29a2 2 0 012.11-.45c.89.35 1.83.59 2.79.72A2 2 0 0122 16.92z" />
            </svg>
          </div>
        </div>

        {/* Messages */}
        <div className="px-5 py-5 flex flex-col gap-3 bg-[var(--color-cream)]/30 min-h-[260px]">
          <ChatBubble side="left">
            Hi! Can I book a facial appointment for Saturday evening?
          </ChatBubble>
          <ChatBubble side="right">
            Hi Priya! Yes, we have 4 PM and 6 PM open this Saturday. Which
            works best?
          </ChatBubble>
          <ChatBubble side="left">6 PM works perfect ✨</ChatBubble>
          <ChatBubble side="right">
            Booked you in for Sat, 6 PM. I&apos;ll send a reminder an hour
            before 🌿
          </ChatBubble>

          {/* Typing indicator */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 rounded-full bg-[var(--color-cream-deep)]/70 px-3 py-1.5">
              <Dot delay="0ms" />
              <Dot delay="150ms" />
              <Dot delay="300ms" />
            </div>
            <span className="text-[10px] text-[var(--color-muted)]">
              Wavly is composing the next reply…
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-border-soft)] px-5 py-3 flex items-center justify-between bg-[var(--color-cream-soft)]">
          <div className="flex items-center gap-2 text-[11px] text-[var(--color-forest)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
            </svg>
            Wavly AI is handling this chat
          </div>
          <div className="text-[10px] text-[var(--color-muted)]">
            via Telegram
          </div>
        </div>
      </div>

      {/* Floating: Booking confirmed */}
      <div
        style={{ transform: "translateZ(70px)" }}
        className="animate-float-y-delay absolute -bottom-4 -left-2 sm:-left-8 z-20 flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-2.5 shadow-[0_18px_40px_-20px_rgba(20,33,28,0.35)]"
      >
        <div className="h-8 w-8 rounded-xl bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)] flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 9h18M8 3v4M16 3v4" />
          </svg>
        </div>
        <div className="text-left">
          <div className="text-[11px] font-medium text-[var(--color-ink)]">
            Booking confirmed
          </div>
          <div className="text-[10px] text-[var(--color-muted)]">
            Sat · 6:00 PM · Priya Sharma
          </div>
        </div>
      </div>
    </Tilt3D>
  );
}

function ChatBubble({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  if (side === "right") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[var(--color-forest)] px-4 py-2.5 text-[13px] leading-relaxed text-[var(--color-cream-soft)] shadow-[0_8px_18px_-12px_rgba(20,58,47,0.6)]">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-[var(--color-surface)] border border-[var(--color-border-soft)] px-4 py-2.5 text-[13px] leading-relaxed text-[var(--color-ink)] shadow-sm">
        {children}
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

function CheckMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 text-[var(--color-forest)]"
    >
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}

function BoltMini() {
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
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
