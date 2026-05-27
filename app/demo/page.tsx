"use client";

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { Tilt3D } from "../components/Tilt3D";

type Slot = {
  id: string;
  date: string;
  time: string;
  day: string;
  fullDate: string;
  hot?: boolean;
};

const slots: Slot[] = [
  { id: "s1", day: "Today", date: "27 May", time: "4:00 PM", fullDate: "Tue, 27 May 2026 · 4:00 PM IST", hot: true },
  { id: "s2", day: "Today", date: "27 May", time: "6:00 PM", fullDate: "Tue, 27 May 2026 · 6:00 PM IST" },
  { id: "s3", day: "Tomorrow", date: "28 May", time: "11:00 AM", fullDate: "Wed, 28 May 2026 · 11:00 AM IST" },
  { id: "s4", day: "Tomorrow", date: "28 May", time: "2:00 PM", fullDate: "Wed, 28 May 2026 · 2:00 PM IST" },
  { id: "s5", day: "Tomorrow", date: "28 May", time: "5:00 PM", fullDate: "Wed, 28 May 2026 · 5:00 PM IST" },
  { id: "s6", day: "Thursday", date: "29 May", time: "10:00 AM", fullDate: "Thu, 29 May 2026 · 10:00 AM IST" },
  { id: "s7", day: "Thursday", date: "29 May", time: "3:30 PM", fullDate: "Thu, 29 May 2026 · 3:30 PM IST" },
  { id: "s8", day: "Friday", date: "30 May", time: "11:30 AM", fullDate: "Fri, 30 May 2026 · 11:30 AM IST" },
];

const businessTypes = [
  "Salon / Spa",
  "Clinic / Doctor",
  "Coach / Consultant",
  "Tuition / Coaching",
  "Shop / D2C",
  "Other",
];

const trustSignals = [
  {
    title: "15-minute demo",
    detail: "Quick, focused, no fluff",
    icon: <ClockIcon />,
  },
  {
    title: "No sales pressure",
    detail: "Honest conversation, no scripts",
    icon: <HeartIcon />,
  },
  {
    title: "Tailored to your business",
    detail: "We prep for your industry",
    icon: <TargetIcon />,
  },
  {
    title: "Free, no commitment",
    detail: "Not ready? No worries",
    icon: <GiftIcon />,
  },
];

export default function DemoPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedSlot = slots.find((s) => s.id === selected);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected || !name || !email) return;
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[640px] w-[920px] rounded-full bg-[var(--color-gold-soft)]/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[var(--color-forest-soft)]/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-3xl text-center">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-1.5 text-xs font-medium text-[var(--color-forest)] shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-forest)]" />
                  </span>
                  Book a Demo · Free · 15 min
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="mt-7 text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-[var(--color-ink)]">
                  Ready to{" "}
                  <span className="font-display italic text-[var(--color-forest)]">
                    automate
                  </span>{" "}
                  your WhatsApp?
                </h1>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed">
                  Book a personalized demo call with us and see how Wavly can
                  save you hours every week. Or — even faster — chat with our
                  bot on WhatsApp right now.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Try the Bot Section (Primary CTA) */}
        <section className="pb-16">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <Tilt3D max={3} perspective={1500}>
                <div className="relative overflow-hidden rounded-3xl border border-[#25d366]/30 bg-gradient-to-br from-[#0d3a2e] via-[var(--color-forest)] to-[var(--color-forest-deep)] p-8 sm:p-12 text-[var(--color-cream-soft)] shadow-[0_30px_70px_-30px_rgba(20,58,47,0.6)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-40 -right-32 h-[460px] w-[460px] rounded-full bg-[#25d366]/15 blur-3xl"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-[var(--color-gold)]/15 blur-3xl"
                  />

                  <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#25d366]/20 border border-[#25d366]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a7f0c5]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25d366] opacity-80" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#25d366]" />
                        </span>
                        Recommended · 2 minutes
                      </div>

                      <h2
                        style={{ transform: "translateZ(30px)" }}
                        className="mt-5 text-3xl sm:text-[2.4rem] tracking-tight leading-[1.1]"
                      >
                        Try our AI bot on{" "}
                        <span className="font-display italic text-[var(--color-gold-soft)]">
                          WhatsApp
                        </span>{" "}
                        first
                      </h2>
                      <p className="mt-4 text-sm sm:text-base text-[var(--color-cream-soft)]/80 leading-relaxed max-w-lg">
                        Talk to Wavly directly. Ask it anything — pricing,
                        bookings, features — and feel exactly what your
                        customers will experience. It&apos;s the fastest way to
                        understand if Wavly is right for you.
                      </p>

                      <a
                        href="https://wa.me/919999999999?text=Hi%20Wavly!%20I%27d%20like%20to%20see%20a%20demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ transform: "translateZ(40px)" }}
                        className="btn-press group mt-7 inline-flex items-center gap-3 rounded-full bg-[#25d366] px-7 py-4 text-base font-medium text-white hover:bg-[#1ebe5a] hover:-translate-y-1 transition-all shadow-[0_18px_40px_-12px_rgba(37,211,102,0.6)]"
                      >
                        <WhatsAppIcon />
                        Chat with Wavly Bot on WhatsApp
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        >
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </a>

                      <div className="mt-5 flex items-center gap-4 text-[11px] text-[var(--color-cream-soft)]/60">
                        <div className="flex items-center gap-1.5">
                          <CheckMini /> Opens WhatsApp instantly
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckMini /> No signup needed
                        </div>
                      </div>
                    </div>

                    {/* Phone preview */}
                    <div
                      style={{ transform: "translateZ(50px)" }}
                      className="relative mx-auto hidden lg:block"
                    >
                      <div className="relative w-[260px] rounded-[2rem] border border-white/15 bg-[var(--color-forest-deep)]/50 backdrop-blur p-3 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.5)]">
                        <div className="rounded-[1.5rem] bg-[#075e54] px-4 py-3 flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-full bg-[#25d366] flex items-center justify-center text-white text-xs font-semibold">
                            W
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] font-medium text-white">
                              Wavly Bot
                            </div>
                            <div className="text-[10px] text-white/70">
                              online
                            </div>
                          </div>
                        </div>
                        <div className="rounded-b-[1.5rem] bg-[#0b3d36] p-3 space-y-2 min-h-[180px]">
                          <ChatBubble side="bot">Hey 👋 I&apos;m Wavly. Want to see what I can do?</ChatBubble>
                          <ChatBubble side="you">Yes!</ChatBubble>
                          <ChatBubble side="bot">Perfect. Tell me your business type and I&apos;ll show you how I&apos;d save you time 🌿</ChatBubble>
                          <div className="flex items-center gap-1.5 pt-1">
                            <Dot delay="0ms" />
                            <Dot delay="180ms" />
                            <Dot delay="360ms" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            </Reveal>
          </div>
        </section>

        {/* OR divider */}
        <section className="pb-10">
          <div className="mx-auto max-w-3xl px-6">
            <Reveal>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-[var(--color-border)]" />
                <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-[var(--color-muted)]">
                  Or — talk to a real human
                </span>
                <div className="flex-1 h-px bg-[var(--color-border)]" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Book a demo section */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto">
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Live demo
                </div>
                <h2 className="mt-3 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                  Book a{" "}
                  <span className="font-display italic text-[var(--color-forest)]">
                    15-minute call
                  </span>
                </h2>
                <p className="mt-4 text-base text-[var(--color-ink-soft)] leading-relaxed">
                  We&apos;ll walk through Wavly with your business in mind. No
                  scripts, no slides — just a real conversation.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6">
              {/* Slot picker */}
              <Reveal>
                <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                        Pick a time
                      </div>
                      <h3 className="mt-1.5 text-lg font-medium text-[var(--color-ink)]">
                        Available this week
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)]/[0.06] px-3 py-1 text-[11px] font-medium text-[var(--color-forest)]">
                      <ClockIcon />
                      IST timezone
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                    {slots.map((s) => {
                      const isSel = selected === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => setSelected(s.id)}
                          className={`btn-press group text-left rounded-2xl border p-3.5 transition-all ${
                            isSel
                              ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_12px_28px_-12px_rgba(20,58,47,0.5)]"
                              : "border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-forest)]/40 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-14px_rgba(20,33,28,0.2)]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div
                              className={`text-[10px] uppercase tracking-[0.14em] font-medium ${
                                isSel
                                  ? "text-[var(--color-gold-soft)]"
                                  : "text-[var(--color-gold)]"
                              }`}
                            >
                              {s.day}
                            </div>
                            {s.hot && !isSel && (
                              <span className="inline-flex items-center rounded-full bg-[var(--color-gold)]/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
                                Popular
                              </span>
                            )}
                          </div>
                          <div
                            className={`mt-1.5 text-base font-medium ${
                              isSel ? "text-[var(--color-cream-soft)]" : "text-[var(--color-ink)]"
                            }`}
                          >
                            {s.time}
                          </div>
                          <div
                            className={`mt-0.5 text-[11px] ${
                              isSel
                                ? "text-[var(--color-cream-soft)]/70"
                                : "text-[var(--color-muted)]"
                            }`}
                          >
                            {s.date}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <p className="mt-4 text-[11px] text-[var(--color-muted)] text-center">
                    Need a different time?{" "}
                    <a
                      href="mailto:demo@wavly.in"
                      className="font-medium text-[var(--color-forest)] hover:underline underline-offset-2"
                    >
                      Email us
                    </a>{" "}
                    — we&apos;ll work around your schedule.
                  </p>
                </div>
              </Reveal>

              {/* Form */}
              <Reveal delay={100}>
                <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 sm:p-8 relative overflow-hidden">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[var(--color-gold-soft)]/20 blur-3xl"
                  />
                  {submitted ? (
                    <div className="relative text-center py-6 animate-fade-up">
                      <div className="mx-auto inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[var(--color-forest)] text-[var(--color-cream-soft)] animate-pop-in">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M5 12l4 4 10-10" />
                        </svg>
                      </div>
                      <h3 className="mt-5 text-2xl tracking-tight text-[var(--color-ink)]">
                        You&apos;re booked
                      </h3>
                      <p className="mt-3 text-sm text-[var(--color-ink-soft)] max-w-sm mx-auto leading-relaxed">
                        Confirmation sent to{" "}
                        <span className="font-medium text-[var(--color-forest)]">
                          {email}
                        </span>
                        . See you on{" "}
                        <span className="font-medium text-[var(--color-forest)]">
                          {selectedSlot?.fullDate}
                        </span>
                        .
                      </p>
                      <div className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-cream-deep)]/50 px-3.5 py-1.5 text-xs text-[var(--color-ink-soft)]">
                        <CalendarIcon />
                        Calendar invite on its way
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold)] font-medium">
                        Your details
                      </div>
                      <h3 className="mt-1.5 text-lg font-medium text-[var(--color-ink)]">
                        Tell us about you
                      </h3>

                      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                        <Field
                          label="Full name"
                          value={name}
                          onChange={setName}
                          placeholder="Priya Sharma"
                          autoComplete="name"
                        />
                        <Field
                          label="Email"
                          type="email"
                          value={email}
                          onChange={setEmail}
                          placeholder="you@business.com"
                          autoComplete="email"
                        />
                        <Field
                          label="Business name"
                          value={business}
                          onChange={setBusiness}
                          placeholder="Glow Salon"
                        />
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">
                            Business type
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {businessTypes.map((t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => setBusinessType(t)}
                                className={`btn-press rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                                  businessType === t
                                    ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
                                    : "bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/40 hover:text-[var(--color-forest)]"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                        </div>

                        {selectedSlot ? (
                          <div className="mt-2 rounded-xl border border-[var(--color-forest)]/25 bg-[var(--color-forest)]/[0.04] p-3.5 flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center">
                              <CalendarIcon />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-forest)] font-medium">
                                Selected slot
                              </div>
                              <div className="text-sm font-medium text-[var(--color-ink)] truncate">
                                {selectedSlot.fullDate}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelected(null)}
                              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-forest)] transition-colors"
                            >
                              Change
                            </button>
                          </div>
                        ) : (
                          <div className="mt-2 rounded-xl border border-dashed border-[var(--color-border)] p-3.5 text-xs text-[var(--color-muted)] text-center">
                            ← Pick a time slot on the left to continue
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={!selected || !name || !email}
                          className={`btn-press w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all ${
                            selected && name && email
                              ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_8px_22px_-6px_rgba(20,58,47,0.5)]"
                              : "bg-[var(--color-forest)]/30 text-[var(--color-cream-soft)]/60 cursor-not-allowed"
                          }`}
                        >
                          Confirm booking
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </button>

                        <p className="text-[10px] text-[var(--color-muted)] text-center leading-relaxed">
                          By booking you agree to our{" "}
                          <a href="/privacy" className="underline underline-offset-2 hover:text-[var(--color-forest)]">
                            Privacy Policy
                          </a>
                          . We&apos;ll only use your email to send the
                          calendar invite.
                        </p>
                      </form>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="text-center max-w-xl mx-auto">
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  What to expect
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl tracking-tight text-[var(--color-ink)]">
                  A call that&apos;s actually{" "}
                  <span className="font-display italic text-[var(--color-forest)]">
                    helpful
                  </span>
                </h2>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trustSignals.map((t, i) => (
                <Reveal key={t.title} delay={i * 80}>
                  <Tilt3D max={5} perspective={1100}>
                    <div className="h-full rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 hover:-translate-y-1 hover:shadow-[0_22px_50px_-22px_rgba(20,33,28,0.22)] transition-all duration-500">
                      <div
                        style={{ transform: "translateZ(20px)" }}
                        className="h-10 w-10 rounded-xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center"
                      >
                        {t.icon}
                      </div>
                      <h3 className="mt-4 text-base font-medium text-[var(--color-ink)]">
                        {t.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                        {t.detail}
                      </p>
                    </div>
                  </Tilt3D>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Tiny FAQ-style strip */}
        <section className="pb-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <Reveal>
              <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-7 sm:p-10 text-center">
                <h3 className="text-xl tracking-tight text-[var(--color-ink)]">
                  Not ready to book yet?
                </h3>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)] max-w-lg mx-auto leading-relaxed">
                  Start your free 7-day trial and explore Wavly at your own
                  pace. No credit card required.
                </p>
                <div className="mt-5 inline-flex flex-col sm:flex-row gap-3">
                  <a
                    href="/signup"
                    className="btn-press inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-2.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 transition-all shadow-[0_6px_18px_-6px_rgba(20,58,47,0.45)]"
                  >
                    Start free trial
                  </a>
                  <a
                    href="/pricing"
                    className="btn-press inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
                  >
                    See pricing
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ----------------- Helpers ----------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 outline-none transition-all focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10"
      />
    </div>
  );
}

function ChatBubble({
  side,
  children,
}: {
  side: "bot" | "you";
  children: React.ReactNode;
}) {
  if (side === "bot") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-xl rounded-bl-sm bg-white/95 px-3 py-2 text-[11px] leading-relaxed text-[#0b3d36] shadow-sm">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-xl rounded-br-sm bg-[#25d366] px-3 py-2 text-[11px] leading-relaxed text-white shadow-sm">
        {children}
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="block h-1.5 w-1.5 rounded-full bg-white/80 animate-soft-pulse"
      style={{ animationDelay: delay }}
    />
  );
}

/* ----------------- Icons ----------------- */

function svgProps() {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4",
  };
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M17.6 14.4c-.3-.2-1.8-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.6.1c-.3-.2-1.2-.5-2.3-1.4-.9-.7-1.4-1.7-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.5 3.1 1.2 3.1.8 3.7.8.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2a10 10 0 00-8.6 15l-1.4 5 5.2-1.4A10 10 0 1012 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg {...svgProps()} className="h-3.5 w-3.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg {...svgProps()} className="h-5 w-5">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg {...svgProps()} className="h-5 w-5">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function GiftIcon() {
  return (
    <svg {...svgProps()} className="h-5 w-5">
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M12 8v13M3 12h18" />
      <path d="M7.5 8a2.5 2.5 0 010-5C9 3 12 8 12 8s3-5 4.5-5a2.5 2.5 0 010 5" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg {...svgProps()}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
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
      className="h-3 w-3"
    >
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}
