"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const SCENES = [
  {
    id: 1,
    eyebrow: "Step 1 · Setup",
    title: "Connect your Telegram bot",
    caption: "Paste your bot token. Linked in seconds.",
    duration: 5500,
  },
  {
    id: 2,
    eyebrow: "Step 2 · Build",
    title: "Pick an automation",
    caption: "Templates ready in one tap.",
    duration: 5000,
  },
  {
    id: 3,
    eyebrow: "Step 3 · Live",
    title: "A customer messages you",
    caption: "Wavly reads it instantly.",
    duration: 5500,
  },
  {
    id: 4,
    eyebrow: "Step 4 · AI",
    title: "Smart reply + auto-book",
    caption: "Booked in under a second.",
    duration: 7000,
  },
  {
    id: 5,
    eyebrow: "Step 5 · Follow-through",
    title: "Reminder sent on time",
    caption: "No-shows drop by 60%.",
    duration: 5000,
  },
  {
    id: 6,
    eyebrow: "Step 6 · Calm",
    title: "Your business, on autopilot",
    caption: "All in one calm dashboard.",
    duration: 6000,
  },
];

export function LiveDemo() {
  const [current, setCurrent] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const startRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance + progress tracking
  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const duration = SCENES[current].duration;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      setCurrent((c) => {
        const next = (c + 1) % SCENES.length;
        if (next === 0) setCycle((k) => k + 1);
        return next;
      });
      setProgress(0);
    }, duration);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, playing]);

  function jumpTo(i: number) {
    setCurrent(i);
    setProgress(0);
  }

  const scene = SCENES[current];

  return (
    <section
      id="demo"
      className="relative py-20 lg:py-28 overflow-hidden border-y border-[var(--color-border-soft)] bg-gradient-to-b from-[var(--color-cream)] via-[var(--color-cream-soft)] to-[var(--color-cream)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/20 blur-3xl" />
        <div className="absolute top-24 right-[12%] h-[360px] w-[360px] rounded-full bg-[var(--color-tg)]/12 blur-3xl" />
        <div className="absolute bottom-0 left-[10%] h-[300px] w-[300px] rounded-full bg-[var(--color-tg-soft)]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-3 py-1 text-[11px] font-medium text-[var(--color-forest)] shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
              </span>
              Live demo · 30 seconds · 6 steps
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-ink)]">
              Watch how Wavly works{" "}
              <span className="font-display italic text-[var(--color-forest)]">
                in real time
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base text-[var(--color-ink-soft)] leading-relaxed">
              From pasting a bot token to closing your laptop — the full flow, in
              one continuous loop.
            </p>
          </Reveal>
        </div>

        {/* Demo viewport */}
        <Reveal delay={200}>
          <div className="mt-12 relative mx-auto max-w-5xl">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-[var(--color-gold-soft)]/25 via-[var(--color-tg)]/12 to-[var(--color-forest-soft)]/15 blur-3xl"
            />

            <div className="relative rounded-3xl border border-[var(--color-tg)]/25 bg-[var(--color-cream-soft)] shadow-[0_40px_100px_-30px_rgba(20,33,28,0.45)] ring-1 ring-[var(--color-tg)]/[0.06] overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center justify-between gap-3 border-b border-[var(--color-tg)]/15 px-4 py-3 bg-gradient-to-b from-[var(--color-tg-tint)] to-[var(--color-cream)]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#e8c4b4]" />
                  <span className="h-3 w-3 rounded-full bg-[#e8dab4]" />
                  <span className="h-3 w-3 rounded-full bg-[#b9d1c0]" />
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[var(--color-cream)] border border-[var(--color-border-soft)] px-3 py-1 text-[11px] text-[var(--color-muted)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  app.wavly.in
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-[var(--color-tg)]/12 px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-tg-deep)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-tg)] opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-tg)]" />
                  </span>
                  LIVE
                </div>
              </div>

              {/* Scene */}
              <div className="relative aspect-[16/10] bg-gradient-to-b from-[var(--color-cream)] to-[var(--color-cream-soft)] overflow-hidden">
                <div
                  key={`${current}-${cycle}`}
                  className="scene-enter absolute inset-0 px-6 sm:px-10 py-6 sm:py-8"
                >
                  {renderScene(current)}
                </div>
              </div>

              {/* Caption bar */}
              <div className="border-t border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div
                  key={`caption-${current}-${cycle}`}
                  className="scene-enter min-w-0"
                >
                  <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                    {scene.eyebrow}
                  </div>
                  <div className="mt-0.5 text-base font-medium text-[var(--color-ink)] truncate">
                    {scene.title}
                  </div>
                  <div className="text-[11px] text-[var(--color-muted)]">
                    {scene.caption}
                  </div>
                </div>

                <Controls
                  playing={playing}
                  onTogglePlay={() => setPlaying((p) => !p)}
                  onRestart={() => {
                    setCurrent(0);
                    setProgress(0);
                    setCycle((k) => k + 1);
                  }}
                  current={current}
                  total={SCENES.length}
                />
              </div>

              {/* Progress segments */}
              <div className="absolute top-[57px] left-0 right-0 px-4 flex gap-1">
                {SCENES.map((_, i) => {
                  let fill = 0;
                  if (i < current) fill = 1;
                  else if (i === current) fill = progress;
                  return (
                    <button
                      key={i}
                      onClick={() => jumpTo(i)}
                      aria-label={`Jump to scene ${i + 1}`}
                      className="flex-1 h-0.5 rounded-full bg-[var(--color-border)] overflow-hidden hover:bg-[var(--color-border)]/80 transition-colors"
                    >
                      <div
                        className="h-full bg-[var(--color-forest)] rounded-full"
                        style={{
                          width: `${fill * 100}%`,
                          transition:
                            i === current
                              ? "none"
                              : "width 200ms ease-out",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Below: trust line */}
        <Reveal delay={300}>
          <div className="mt-8 text-center text-xs text-[var(--color-muted)]">
            Loops continuously · No audio · You can{" "}
            <button
              onClick={() => setPlaying((p) => !p)}
              className="underline underline-offset-2 hover:text-[var(--color-forest)] transition-colors"
            >
              pause anytime
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------- Controls ----------------- */

function Controls({
  playing,
  onTogglePlay,
  onRestart,
  current,
  total,
}: {
  playing: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        onClick={onRestart}
        aria-label="Restart"
        className="btn-press inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/50 hover:text-[var(--color-forest)] transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
        >
          <path d="M3 12a9 9 0 109-9 9.7 9.7 0 00-6.65 2.65L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
      <button
        onClick={onTogglePlay}
        className="btn-press inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] shadow-[0_6px_16px_-6px_rgba(20,58,47,0.5)] transition-all"
      >
        {playing ? (
          <>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
            Pause
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
              <path d="M7 5l12 7-12 7V5z" />
            </svg>
            Play
          </>
        )}
      </button>
      <span className="text-[11px] text-[var(--color-muted)] tabular-nums ml-1">
        {current + 1} / {total}
      </span>
    </div>
  );
}

/* ----------------- Scenes ----------------- */

function renderScene(index: number) {
  switch (index) {
    case 0:
      return <SceneConnect />;
    case 1:
      return <SceneAutomation />;
    case 2:
      return <SceneMessage />;
    case 3:
      return <SceneReplyBook />;
    case 4:
      return <SceneReminder />;
    case 5:
      return <SceneDashboard />;
    default:
      return null;
  }
}

/* Scene 1: Connect Telegram bot */
function SceneConnect() {
  return (
    <div className="h-full flex items-center justify-center gap-8 lg:gap-14">
      {/* Steps text */}
      <div className="hidden md:flex flex-col gap-4 max-w-xs">
        <div className="demo-step demo-step-1 flex items-start gap-3">
          <StepDot n={1} />
          <div>
            <div className="text-sm font-medium text-[var(--color-ink)]">
              Open @BotFather
            </div>
            <div className="text-xs text-[var(--color-muted)]">
              Telegram&apos;s official bot maker
            </div>
          </div>
        </div>
        <div className="demo-step demo-step-2 flex items-start gap-3">
          <StepDot n={2} />
          <div>
            <div className="text-sm font-medium text-[var(--color-ink)]">
              Send /newbot
            </div>
            <div className="text-xs text-[var(--color-muted)]">
              Copy the token it gives you
            </div>
          </div>
        </div>
        <div className="demo-step demo-step-3 flex items-start gap-3">
          <StepDot n={3} accent />
          <div>
            <div className="text-sm font-medium text-[var(--color-forest)]">
              Paste it into Wavly
            </div>
            <div className="text-xs text-[var(--color-muted)]">
              Sync starts immediately
            </div>
          </div>
        </div>
      </div>

      {/* Token card */}
      <div
        className="demo-step demo-step-1 relative w-full max-w-sm"
        style={{ animation: "demo-scale-in 700ms cubic-bezier(0.22,1,0.36,1) both" }}
      >
        <div
          aria-hidden
          className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[var(--color-gold-soft)]/30 to-[var(--color-forest-soft)]/20 blur-2xl"
        />
        <div className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_22px_50px_-22px_rgba(20,33,28,0.3)]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center">
              <TelegramGlyph />
            </div>
            <div className="text-sm font-medium text-[var(--color-ink)]">
              Connect your bot
            </div>
          </div>

          <div className="demo-step demo-step-2 mt-5">
            <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] font-medium">
              Bot token
            </div>
            <div className="mt-1.5 rounded-xl border border-[var(--color-forest)]/30 bg-[var(--color-forest)]/[0.04] px-3 py-2.5 font-mono text-[12px] text-[var(--color-forest)] truncate">
              7829461025:AAH8x_kPq3Rt…
            </div>
          </div>

          <div
            className="demo-step mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[var(--color-forest)] px-4 py-2.5 text-[12px] font-medium text-[var(--color-cream-soft)]"
            style={{ animationDelay: "2000ms" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <path d="M5 12l4 4 10-10" />
            </svg>
            Bot connected
          </div>
        </div>

        {/* floating connected badge */}
        <div
          className="demo-step absolute -bottom-3 -right-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-cream-soft)] border border-[var(--color-border)] px-3 py-1.5 text-[11px] font-medium text-[var(--color-forest)] shadow-[0_10px_20px_-10px_rgba(20,33,28,0.35)]"
          style={{ animationDelay: "3000ms" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
          </span>
          @GlowSalonBot · live
        </div>
      </div>
    </div>
  );
}

function TelegramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );
}

/* Scene 2: Pick automation */
function SceneAutomation() {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 items-center">
      {/* Template list */}
      <div className="space-y-2.5">
        <div className="demo-step demo-step-1 rounded-2xl border border-[var(--color-forest)] bg-[var(--color-forest)]/[0.04] p-3.5 flex items-center gap-3 ring-4 ring-[var(--color-forest)]/10">
          <div className="h-9 w-9 rounded-lg bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center">
            <BellIconMini />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-[var(--color-ink)]">
              Smart Booking Reminders
            </div>
            <div className="text-[11px] text-[var(--color-muted)]">
              Sends before every appointment
            </div>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-[var(--color-forest)]"
          >
            <path d="M5 12l4 4 10-10" />
          </svg>
        </div>
        <div className="demo-step demo-step-2 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5 flex items-center gap-3 opacity-60">
          <div className="h-9 w-9 rounded-lg bg-[var(--color-cream-deep)]/60 text-[var(--color-forest)] flex items-center justify-center">
            <BoltIconMini />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-[var(--color-ink)]">
              Auto-Replies
            </div>
            <div className="text-[11px] text-[var(--color-muted)]">
              Answer FAQs instantly
            </div>
          </div>
        </div>
        <div className="demo-step demo-step-3 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5 flex items-center gap-3 opacity-60">
          <div className="h-9 w-9 rounded-lg bg-[var(--color-cream-deep)]/60 text-[var(--color-forest)] flex items-center justify-center">
            <CalendarIconMini />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-[var(--color-ink)]">
              Appointment Booking
            </div>
            <div className="text-[11px] text-[var(--color-muted)]">
              Customers book by chatting
            </div>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="demo-step demo-step-2 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 shadow-[0_22px_50px_-22px_rgba(20,33,28,0.18)]">
        <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
          Smart Booking Reminders
        </div>
        <h4 className="mt-1.5 text-lg font-medium text-[var(--color-ink)]">
          Active settings
        </h4>

        <div className="mt-4 space-y-2.5">
          <div className="demo-step demo-step-3 flex items-center justify-between gap-3 rounded-xl bg-[var(--color-forest)]/[0.04] p-3 border border-[var(--color-forest)]/15">
            <span className="text-sm text-[var(--color-ink)]">1 hour before</span>
            <ToggleAnimated delay="1200ms" />
          </div>
          <div className="demo-step demo-step-4 flex items-center justify-between gap-3 rounded-xl bg-[var(--color-forest)]/[0.04] p-3 border border-[var(--color-forest)]/15">
            <span className="text-sm text-[var(--color-ink)]">30 mins before</span>
            <ToggleAnimated delay="1700ms" />
          </div>
        </div>

        <div
          className="demo-step mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)]/[0.08] px-3 py-1 text-[11px] font-medium text-[var(--color-forest)]"
          style={{ animationDelay: "2400ms" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
          </span>
          Automation live
        </div>
      </div>
    </div>
  );
}

function ToggleAnimated({ delay }: { delay: string }) {
  return (
    <span
      className="relative inline-block h-6 w-11 rounded-full"
      style={{
        animation: "demo-toggle-on 400ms ease forwards",
        animationDelay: delay,
        background: "var(--color-cream-deep)",
      }}
    >
      <span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md"
        style={{
          left: "2px",
          animation: "demo-thumb-slide 400ms cubic-bezier(0.22,1,0.36,1) forwards",
          animationDelay: delay,
        }}
      />
    </span>
  );
}

/* Scene 3: Customer message */
function SceneMessage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border-soft)] mb-4">
        <div className="h-9 w-9 rounded-full bg-[var(--color-forest)] flex items-center justify-center text-[12px] font-medium text-[var(--color-cream-soft)]">
          PS
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--color-ink)]">
            Priya Sharma
          </div>
          <div className="text-[11px] text-[#34a853] flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" /> online
          </div>
        </div>
        <div className="text-[10px] text-[var(--color-muted)]">5:42 PM</div>
      </div>

      <div className="flex-1 flex flex-col justify-end gap-2">
        <div className="demo-step demo-step-1 flex justify-start">
          <div className="max-w-[70%] rounded-2xl rounded-bl-md bg-[var(--color-surface)] border border-[var(--color-border-soft)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] shadow-sm">
            Hi! Can I book a facial appointment for Saturday evening?
          </div>
        </div>

        <div
          className="demo-step mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-gold)]/15 px-3 py-1.5 text-[11px] font-medium text-[var(--color-gold)]"
          style={{ animationDelay: "1500ms" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold)] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          </span>
          Wavly AI is reading the message…
        </div>

        <div
          className="demo-step mt-2 flex items-center gap-2 px-3 py-1.5 text-[11px] text-[var(--color-muted)]"
          style={{ animationDelay: "2800ms" }}
        >
          <Dot delay="0ms" />
          <Dot delay="200ms" />
          <Dot delay="400ms" />
          <span>Drafting reply with calendar context…</span>
        </div>
      </div>
    </div>
  );
}

/* Scene 4: Reply + Book */
function SceneReplyBook() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 pb-3 border-b border-[var(--color-border-soft)] mb-3">
        <div className="h-9 w-9 rounded-full bg-[var(--color-forest)] flex items-center justify-center text-[12px] font-medium text-[var(--color-cream-soft)]">
          PS
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--color-ink)]">
            Priya Sharma
          </div>
          <div className="text-[11px] text-[#34a853] flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" /> online
          </div>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-[var(--color-forest)]/[0.08] px-2 py-0.5 text-[10px] font-medium text-[var(--color-forest)]">
          AI replying
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end gap-2 relative">
        <div className="demo-step demo-step-1 flex justify-end">
          <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[var(--color-forest)] px-3.5 py-2.5 text-sm text-[var(--color-cream-soft)] shadow-[0_8px_18px_-12px_rgba(20,58,47,0.55)]">
            Hi Priya! 🌿 Yes — we have 4 PM and 6 PM open this Saturday. Which works best?
          </div>
        </div>

        <div className="demo-step demo-step-2 flex justify-start">
          <div className="max-w-[60%] rounded-2xl rounded-bl-md bg-[var(--color-surface)] border border-[var(--color-border-soft)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] shadow-sm">
            6 PM works perfect ✨
          </div>
        </div>

        <div className="demo-step demo-step-3 flex justify-end">
          <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[var(--color-forest)] px-3.5 py-2.5 text-sm text-[var(--color-cream-soft)] shadow-[0_8px_18px_-12px_rgba(20,58,47,0.55)]">
            Booked you in for Sat, 6 PM. I&apos;ll remind you an hour before 🌿
          </div>
        </div>

        {/* Booking confirmed floating card */}
        <div
          className="demo-step absolute -top-2 right-0 sm:right-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-2.5 shadow-[0_18px_40px_-20px_rgba(20,33,28,0.35)] flex items-center gap-3"
          style={{ animation: "demo-scale-in 500ms cubic-bezier(0.22,1,0.36,1) 3500ms both" }}
        >
          <div className="h-8 w-8 rounded-xl bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)] flex items-center justify-center">
            <CalendarIconMini />
          </div>
          <div>
            <div className="text-[11px] font-medium text-[var(--color-ink)]">
              Booking confirmed
            </div>
            <div className="text-[10px] text-[var(--color-muted)]">
              Sat · 6:00 PM · Priya Sharma
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Scene 5: Reminder sent */
function SceneReminder() {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 items-center">
      {/* Clock */}
      <div className="flex flex-col items-center gap-4">
        <div
          className="demo-step relative"
          style={{ animation: "demo-scale-in 600ms cubic-bezier(0.22,1,0.36,1) 300ms both" }}
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-full bg-[var(--color-gold-soft)]/25 blur-2xl"
          />
          <div className="relative h-28 w-28 rounded-full bg-[var(--color-cream-soft)] border-4 border-[var(--color-forest)]/15 flex items-center justify-center shadow-[0_20px_40px_-20px_rgba(20,33,28,0.25)]">
            <div className="font-display text-2xl tracking-tight text-[var(--color-forest)]">
              5:00 PM
            </div>
            {/* Clock notches */}
            <div className="absolute inset-2 rounded-full border border-dashed border-[var(--color-forest)]/20" />
          </div>
          <div
            className="demo-step absolute -bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-[var(--color-forest)] px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-cream-soft)] whitespace-nowrap"
            style={{ animationDelay: "1600ms" }}
          >
            1 hour before
          </div>
        </div>
        <div
          className="demo-step text-center"
          style={{ animationDelay: "2200ms" }}
        >
          <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
            Auto-fired
          </div>
        </div>
      </div>

      {/* Telegram reminder message */}
      <div
        className="demo-step rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[0_22px_50px_-22px_rgba(20,33,28,0.22)]"
        style={{ animationDelay: "1400ms" }}
      >
        <div className="flex items-center gap-2 pb-3 border-b border-[var(--color-border-soft)] mb-3">
          <div className="h-8 w-8 rounded-full bg-[var(--color-forest)] flex items-center justify-center text-[11px] font-medium text-[var(--color-cream-soft)]">
            W
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-[var(--color-ink)]">
              Glow Salon · Wavly
            </div>
            <div className="text-[10px] text-[var(--color-muted)]">to Priya</div>
          </div>
          <span className="text-[10px] text-[#34a853] inline-flex items-center gap-1">
            <DoubleCheck /> read
          </span>
        </div>
        <div className="rounded-2xl rounded-br-md bg-[var(--color-forest)] px-3.5 py-2.5 text-sm text-[var(--color-cream-soft)] ml-auto max-w-[90%]">
          Hi Priya 🌿 Just a reminder — your facial appointment is at 6:00 PM
          today. Reply <strong>YES</strong> to confirm.
        </div>
        <div
          className="demo-step mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)]/[0.08] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-forest)]"
          style={{ animationDelay: "3200ms" }}
        >
          <CheckIconMini />
          Priya replied YES · Confirmed
        </div>
      </div>
    </div>
  );
}

/* Scene 6: Dashboard */
function SceneDashboard() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="demo-step demo-step-1 flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
            Tuesday · 27 May
          </div>
          <h3 className="mt-1 text-xl tracking-tight text-[var(--color-ink)]">
            Good afternoon,{" "}
            <span className="font-display italic text-[var(--color-forest)]">
              you
            </span>
          </h3>
          <div className="mt-1 text-xs text-[var(--color-ink-soft)]">
            🟢 Wavly handled <span className="font-medium text-[var(--color-forest)]">92%</span> of chats · You saved <span className="font-medium text-[var(--color-forest)]">3.2 hours</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {[
          { label: "Messages", value: "1,248", change: "+12%" },
          { label: "Bookings", value: "84", change: "+18%" },
          { label: "Customers", value: "342", change: "+24" },
          { label: "Time saved", value: "22h", change: "+3.2h" },
        ].map((s, i) => (
          <div
            key={s.label}
            className={`demo-step rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-3`}
            style={{ animationDelay: `${300 + i * 150}ms` }}
          >
            <div className="text-[9px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
              {s.label}
            </div>
            <div className="mt-1 font-display text-lg leading-none tracking-tight text-[var(--color-forest)]">
              {s.value}
            </div>
            <div className="mt-1 inline-flex items-center gap-0.5 rounded-full bg-[var(--color-forest)]/[0.08] px-1.5 py-0 text-[9px] font-medium text-[var(--color-forest)]">
              ↑ {s.change}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-3 overflow-hidden">
        <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] mb-2">
          Recent activity
        </div>
        <div className="space-y-1.5">
          {[
            { t: "Auto-reply sent", d: "to Priya", time: "Just now", c: "forest" },
            { t: "Booking confirmed", d: "Sat 6 PM · Priya", time: "1 min", c: "gold" },
            { t: "Reminder sent", d: "to 8 customers", time: "3 min", c: "forest" },
            { t: "Payment received", d: "₹1,200 · Anika", time: "12 min", c: "gold" },
          ].map((a, i) => (
            <div
              key={i}
              className="demo-step flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-[var(--color-surface)] transition-colors"
              style={{ animationDelay: `${900 + i * 200}ms` }}
            >
              <div
                className={`h-6 w-6 rounded-md flex items-center justify-center ${
                  a.c === "gold"
                    ? "bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
                    : "bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]"
                }`}
              >
                <DotIcon />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12px] font-medium text-[var(--color-ink)] truncate">
                  {a.t}
                </div>
                <div className="text-[10px] text-[var(--color-muted)] truncate">
                  {a.d}
                </div>
              </div>
              <div className="text-[10px] text-[var(--color-muted)]">
                {a.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------- Tiny helpers ----------------- */

function StepDot({ n, accent }: { n: number; accent?: boolean }) {
  return (
    <div
      className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-medium ${
        accent
          ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
          : "bg-[var(--color-cream-deep)]/60 text-[var(--color-forest)] border border-[var(--color-border)]"
      }`}
    >
      {n}
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="block h-1 w-1 rounded-full bg-[var(--color-forest)] animate-soft-pulse"
      style={{ animationDelay: delay }}
    />
  );
}

function BellIconMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2z" />
      <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z" />
    </svg>
  );
}
function BoltIconMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
function CalendarIconMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}
function CheckIconMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}
function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-2 w-2">
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}
function DoubleCheck() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M2 13l4 4L14 9" />
      <path d="M10 13l4 4 8-8" />
    </svg>
  );
}
