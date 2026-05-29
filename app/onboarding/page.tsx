"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { updateProfile } from "../../lib/supabase/auth";
import { isSupabaseConfigured } from "../../lib/supabase/client";

type BusinessType =
  | "coach"
  | "clinic"
  | "salon"
  | "tuition"
  | "shop"
  | "other";

type Struggle =
  | "repetitive"
  | "bookings"
  | "followups"
  | "missing"
  | "payments"
  | "overwhelm";

const TOTAL_STEPS = 6;

const businessOptions: {
  id: BusinessType;
  label: string;
  hint: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "coach",
    label: "Coach / Consultant",
    hint: "Fitness, life, business coaches",
    icon: <Emoji>🎯</Emoji>,
  },
  {
    id: "clinic",
    label: "Clinic / Doctor",
    hint: "Clinics, dentists, therapists",
    icon: <Emoji>🩺</Emoji>,
  },
  {
    id: "salon",
    label: "Salon / Spa",
    hint: "Salons, spas, beauty parlours",
    icon: <Emoji>💇</Emoji>,
  },
  {
    id: "tuition",
    label: "Tuition / Coaching",
    hint: "Teachers, coaching classes",
    icon: <Emoji>📚</Emoji>,
  },
  {
    id: "shop",
    label: "Shop / Business",
    hint: "Retail, services, D2C",
    icon: <Emoji>🛍️</Emoji>,
  },
  {
    id: "other",
    label: "Something else",
    hint: "Doesn't quite fit above",
    icon: <Emoji>✨</Emoji>,
  },
];

const struggleOptions: {
  id: Struggle;
  label: string;
  hint: string;
}[] = [
  {
    id: "repetitive",
    label: "Too many repetitive questions",
    hint: "I keep typing the same answers all day",
  },
  {
    id: "bookings",
    label: "Managing bookings manually",
    hint: "My calendar feels like a mess",
  },
  {
    id: "followups",
    label: "Forgetting to follow up",
    hint: "Leads and customers slip through",
  },
  {
    id: "missing",
    label: "Missing messages, losing customers",
    hint: "Too many chats, can't keep up",
  },
  {
    id: "payments",
    label: "Chasing payments and reminders",
    hint: "Awkward to follow up on money",
  },
  {
    id: "overwhelm",
    label: "Just too much going on",
    hint: "Telegram is eating my whole day",
  },
];

const businessPluralLabel: Record<BusinessType, string> = {
  coach: "coaches & consultants",
  clinic: "clinics & doctors",
  salon: "salons & spas",
  tuition: "tuition teachers",
  shop: "small businesses",
  other: "businesses like yours",
};

const struggleSentence: Record<Struggle, string> = {
  repetitive: "answering the same questions over and over",
  bookings: "managing bookings manually",
  followups: "forgetting to follow up with customers",
  missing: "missing messages and losing customers",
  payments: "chasing payments and reminders",
  overwhelm: "feeling overwhelmed by Telegram every day",
};

type Automation = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const struggleAutomations: Record<Struggle, Automation[]> = {
  repetitive: [
    {
      title: "Smart Auto-Replies",
      description:
        "AI replies to your top 20 most-asked questions instantly, in your tone.",
      icon: <BoltIcon />,
    },
    {
      title: "FAQ Templates",
      description:
        "Pre-built quick replies for pricing, hours, location and services.",
      icon: <BookIcon />,
    },
  ],
  bookings: [
    {
      title: "Appointment Booking",
      description:
        "Customers book on Telegram. Wavly checks your calendar and confirms.",
      icon: <CalendarIcon />,
    },
    {
      title: "Smart Reminders",
      description:
        "Auto reminders 1 hour and 30 mins before every booking. No more no-shows.",
      icon: <BellIcon />,
    },
  ],
  followups: [
    {
      title: "Follow-up Automations",
      description:
        "Wavly nudges customers automatically based on their last interaction.",
      icon: <RepeatIcon />,
    },
    {
      title: "AI Assistant",
      description:
        "Ask your dashboard: \"Who haven't I followed up with this week?\" — get answers.",
      icon: <SparkleIcon />,
    },
  ],
  missing: [
    {
      title: "Centralized Inbox",
      description:
        "Every chat in one calm place — filter, search, tag and never lose a thread.",
      icon: <InboxIcon />,
    },
    {
      title: "Priority Tags",
      description:
        "AI auto-flags urgent customers so you reply to what actually matters first.",
      icon: <FlagIcon />,
    },
  ],
  payments: [
    {
      title: "Payment Reminders",
      description:
        "Polite, automatic follow-ups for unpaid invoices. Get paid faster.",
      icon: <RupeeIcon />,
    },
    {
      title: "Invoice Follow-ups",
      description:
        "Track who paid, who didn't, and send gentle nudges on autopilot.",
      icon: <ChecklistIcon />,
    },
  ],
  overwhelm: [
    {
      title: "Centralized Inbox",
      description:
        "Bring every customer chat into one calm dashboard.",
      icon: <InboxIcon />,
    },
    {
      title: "AI Assistant",
      description:
        "Drafts replies, summarizes chats, and tells you what to do next.",
      icon: <SparkleIcon />,
    },
  ],
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [struggle, setStruggle] = useState<Struggle | null>(null);

  const recommendedAutomations = useMemo<Automation[]>(() => {
    if (!struggle) return [];
    return struggleAutomations[struggle];
  }, [struggle]);

  const trimmedName = name.trim();
  const firstName = trimmedName.split(" ")[0] || "";

  function canContinue() {
    if (step === 1) return trimmedName.length > 0;
    if (step === 2) return !!businessType;
    if (step === 3) return !!struggle;
    return true;
  }

  function next() {
    if (!canContinue()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function finish() {
    if (typeof window !== "undefined") {
      if (trimmedName) window.localStorage.setItem("wavly.userName", trimmedName);
      if (businessType) window.localStorage.setItem("wavly.businessType", businessType);
      if (struggle) window.localStorage.setItem("wavly.struggle", struggle);
    }
    // Persist to the database when Supabase is configured.
    if (isSupabaseConfigured()) {
      try {
        await updateProfile({
          full_name: trimmedName || null,
          business_type: businessType,
          struggle: struggle,
        });
      } catch {
        // Non-blocking — localStorage already has it; continue to dashboard.
      }
    }
    router.push("/dashboard");
  }

  return (
    <div className="relative min-h-screen flex-1 flex flex-col items-center px-6 py-10 sm:py-14 overflow-hidden">
      {/* soft background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[640px] w-[640px] rounded-full bg-[var(--color-gold-soft)]/25 blur-3xl" />
        <div className="absolute -bottom-32 right-10 h-[440px] w-[440px] rounded-full bg-[var(--color-forest-soft)]/10 blur-3xl" />
      </div>

      {/* Top bar: logo + step indicator */}
      <div className="w-full max-w-2xl flex items-center justify-between">
        <Link href="/" aria-label="Wavly home">
          <Logo />
        </Link>
        <div className="text-xs tracking-[0.16em] uppercase text-[var(--color-muted)]">
          Step {step} of {TOTAL_STEPS}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6 w-full max-w-2xl">
        <div className="h-1 w-full rounded-full bg-[var(--color-border-soft)] overflow-hidden">
          <div
            className="h-full bg-[var(--color-forest)] transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step card */}
      <div className="mt-8 w-full max-w-2xl flex-1">
        <div
          key={step}
          className="animate-step-enter rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-8 sm:p-12 shadow-[0_30px_80px_-30px_rgba(20,33,28,0.18)]"
        >
          {step === 1 && <StepWelcome name={name} setName={setName} />}
          {step === 2 && (
            <StepBusinessType
              firstName={firstName}
              selected={businessType}
              onSelect={setBusinessType}
            />
          )}
          {step === 3 && (
            <StepStruggle selected={struggle} onSelect={setStruggle} />
          )}
          {step === 4 && businessType && struggle && (
            <StepRecommendation
              firstName={firstName}
              businessType={businessType}
              struggle={struggle}
            />
          )}
          {step === 5 && (
            <StepAutomations
              firstName={firstName}
              automations={recommendedAutomations}
            />
          )}
          {step === 6 && <StepComplete firstName={firstName} />}
        </div>

        {/* Footer nav */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] disabled:opacity-0 disabled:pointer-events-none transition-colors"
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
            Back
          </button>

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={next}
              disabled={!canContinue()}
              className={`btn-press inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium ${
                canContinue()
                  ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_6px_20px_-6px_rgba(20,58,47,0.45)]"
                  : "bg-[var(--color-forest)]/30 text-[var(--color-cream-soft)]/60 cursor-not-allowed"
              }`}
            >
              Continue
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
          ) : (
            <button
              type="button"
              onClick={finish}
              className="btn-press inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-7 py-3 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_6px_20px_-6px_rgba(20,58,47,0.45)]"
            >
              Go to Dashboard
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
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Steps -------------------------- */

function StepWelcome({
  name,
  setName,
}: {
  name: string;
  setName: (v: string) => void;
}) {
  return (
    <div>
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)] animate-pop-in">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M3 13c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
        </svg>
      </div>
      <h1 className="mt-6 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
        Welcome to{" "}
        <span className="font-display italic text-[var(--color-forest)]">
          Wavly
        </span>
      </h1>
      <p className="mt-3 text-base text-[var(--color-ink-soft)] leading-relaxed max-w-md">
        Let&apos;s set things up in under a minute. A few quick questions and
        we&apos;ll personalize Wavly for your business.
      </p>

      <div className="mt-8">
        <label
          htmlFor="name"
          className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]"
        >
          What should we call you?
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your first name"
          autoFocus
          className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 outline-none transition-all focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10"
        />
      </div>
    </div>
  );
}

function StepBusinessType({
  firstName,
  selected,
  onSelect,
}: {
  firstName: string;
  selected: BusinessType | null;
  onSelect: (b: BusinessType) => void;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
        About your business
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl tracking-tight text-[var(--color-ink)]">
        {firstName ? `Nice to meet you, ${firstName}.` : "Nice to meet you."}{" "}
        <span className="font-display italic text-[var(--color-forest)]">
          What do you do?
        </span>
      </h2>
      <p className="mt-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        Pick what fits closest — this helps us tailor your automations.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {businessOptions.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`group text-left rounded-2xl border p-4 transition-all flex items-start gap-3 ${
                active
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)]/[0.04] ring-4 ring-[var(--color-forest)]/10"
                  : "border-[var(--color-border-soft)] bg-[var(--color-surface)] hover:border-[var(--color-border)] hover:-translate-y-0.5"
              }`}
            >
              <div className="h-10 w-10 shrink-0 rounded-xl bg-[var(--color-cream-deep)]/60 flex items-center justify-center text-lg">
                {opt.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`font-medium text-sm ${
                      active ? "text-[var(--color-forest)]" : "text-[var(--color-ink)]"
                    }`}
                  >
                    {opt.label}
                  </div>
                  {active && (
                    <span className="text-[var(--color-forest)]">
                      <CheckCircle />
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-xs text-[var(--color-muted)]">
                  {opt.hint}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepStruggle({
  selected,
  onSelect,
}: {
  selected: Struggle | null;
  onSelect: (s: Struggle) => void;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
        Your biggest pain
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl tracking-tight text-[var(--color-ink)]">
        What&apos;s your biggest struggle with{" "}
        <span className="font-display italic text-[var(--color-forest)]">
          Telegram
        </span>{" "}
        right now?
      </h2>
      <p className="mt-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        No wrong answer — pick whatever steals the most of your time.
      </p>

      <div className="mt-8 flex flex-col gap-2.5">
        {struggleOptions.map((opt) => {
          const active = selected === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`text-left rounded-2xl border p-4 transition-all flex items-start gap-3 ${
                active
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)]/[0.04] ring-4 ring-[var(--color-forest)]/10"
                  : "border-[var(--color-border-soft)] bg-[var(--color-surface)] hover:border-[var(--color-border)]"
              }`}
            >
              <div
                className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border flex items-center justify-center ${
                  active
                    ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
                    : "border-[var(--color-border)] bg-transparent"
                }`}
              >
                {active && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`text-sm font-medium ${
                    active ? "text-[var(--color-forest)]" : "text-[var(--color-ink)]"
                  }`}
                >
                  {opt.label}
                </div>
                <div className="mt-0.5 text-xs text-[var(--color-muted)]">
                  {opt.hint}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepRecommendation({
  firstName,
  businessType,
  struggle,
}: {
  firstName: string;
  businessType: BusinessType;
  struggle: Struggle;
}) {
  const businessLabel = businessPluralLabel[businessType];
  const struggleText = struggleSentence[struggle];

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
        Here&apos;s what we see
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl tracking-tight text-[var(--color-ink)]">
        {firstName ? `${firstName}, you're not alone.` : "You're not alone."}
      </h2>

      <div className="mt-6 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6">
        <p className="text-base text-[var(--color-ink)] leading-relaxed">
          Most{" "}
          <span className="font-medium text-[var(--color-forest)]">
            {businessLabel}
          </span>{" "}
          struggle with{" "}
          <span className="font-medium text-[var(--color-forest)]">
            {struggleText}
          </span>
          . Wavly is built exactly for this — and we&apos;ll set it up for you in
          the next step.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Saves hours per week", icon: <ClockIcon /> },
          { label: "Replies even at 2 AM", icon: <MoonIcon /> },
          { label: "Never misses a customer", icon: <ShieldIcon /> },
        ].map((b) => (
          <div
            key={b.label}
            className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-4 flex items-center gap-3"
          >
            <div className="h-9 w-9 rounded-xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center">
              {b.icon}
            </div>
            <div className="text-xs font-medium text-[var(--color-ink)] leading-snug">
              {b.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepAutomations({
  firstName,
  automations,
}: {
  firstName: string;
  automations: Automation[];
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
        Suggested first steps
      </div>
      <h2 className="mt-3 text-2xl sm:text-3xl tracking-tight text-[var(--color-ink)]">
        {firstName ? `Let's start here, ${firstName}.` : "Let's start here."}
      </h2>
      <p className="mt-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
        Based on what you shared, these two automations will save you the most
        time first. You can always add more later.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {automations.map((a) => (
          <div
            key={a.title}
            className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5 flex items-start gap-4"
          >
            <div className="h-11 w-11 shrink-0 rounded-xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center">
              {a.icon}
            </div>
            <div className="flex-1">
              <div className="text-base font-medium text-[var(--color-ink)]">
                {a.title}
              </div>
              <div className="mt-1 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                {a.description}
              </div>
            </div>
            <div className="hidden sm:flex items-center text-xs font-medium text-[var(--color-forest)]">
              Recommended
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs text-[var(--color-muted)]">
        We&apos;ll pre-fill these in your dashboard so you can edit and turn
        them on in minutes.
      </p>
    </div>
  );
}

function StepComplete({ firstName }: { firstName: string }) {
  return (
    <div className="text-center">
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

      <h2 className="mt-6 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
        {firstName ? `You're all set, ${firstName}.` : "You're all set."}
      </h2>
      <p className="mt-3 text-base text-[var(--color-ink-soft)] leading-relaxed max-w-md mx-auto">
        Your Wavly workspace is ready. Connect your Telegram, turn on your
        first automations, and watch your inbox calm down.
      </p>

      <div className="mt-8 mx-auto max-w-md grid grid-cols-1 gap-2.5 text-left">
        {[
          "Connect your Telegram bot",
          "Turn on your suggested automations",
          "Invite your team (optional)",
        ].map((step, i) => (
          <div
            key={step}
            className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-3 flex items-center gap-3"
          >
            <div className="h-7 w-7 shrink-0 rounded-full bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center text-xs font-medium">
              {i + 1}
            </div>
            <div className="text-sm text-[var(--color-ink)]">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------- Tiny helpers -------------------------- */

function Emoji({ children }: { children: React.ReactNode }) {
  return <span aria-hidden>{children}</span>;
}

function CheckCircle() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-6" />
    </svg>
  );
}

function svgProps() {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
  };
}

function BoltIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M4 4h13a3 3 0 013 3v13H7a3 3 0 01-3-3V4z" />
      <path d="M4 17a3 3 0 013-3h13" />
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
function BellIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2z" />
      <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z" />
    </svg>
  );
}
function RepeatIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11v-1a4 4 0 014-4h14" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v1a4 4 0 01-4 4H3" />
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
function InboxIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.5 5h13l3.5 7v7a2 2 0 01-2 2h-16a2 2 0 01-2-2v-7l3.5-7z" />
    </svg>
  );
}
function FlagIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M4 22V4h13l-2 4 2 4H4" />
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
function ChecklistIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M9 5h11M9 12h11M9 19h11" />
      <path d="M3 5l1.5 1.5L7 4M3 12l1.5 1.5L7 11M3 19l1.5 1.5L7 18" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg {...svgProps()}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
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
