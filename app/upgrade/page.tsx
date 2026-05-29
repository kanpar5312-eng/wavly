"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";
import { Reveal } from "../components/Reveal";

type Plan = {
  name: string;
  tagline: string;
  price: string;
  period: string;
  savings?: string;
  monthlyEquivalent?: string;
  cta: string;
  ctaHref: string;
  features: string[];
  badge?: string;
  highlight?: boolean;
  accent?: "forest" | "gold";
  bonus?: { title: string; desc: string; worth: string };
};

const plans: Plan[] = [
  {
    name: "Monthly",
    tagline: "Best for testing the waters.",
    price: "₹2,999",
    period: "per month",
    cta: "Upgrade to Monthly",
    ctaHref: "#",
    features: [
      "Unlimited smart auto-replies",
      "Appointment booking on Telegram",
      "Smart reminders (1 hr & 30 min)",
      "Centralized inbox",
      "Basic analytics",
      "2 Telegram bots",
      "Email support",
      "Cancel anytime",
    ],
  },
  {
    name: "Yearly",
    tagline: "Most owners pick this — and stay.",
    price: "₹27,999",
    period: "per year",
    savings: "Save ₹7,989",
    monthlyEquivalent: "Just ₹2,333/month",
    cta: "Upgrade to Yearly",
    ctaHref: "#",
    features: [
      "Everything in Monthly",
      "AI assistant inside dashboard",
      "Payment reminders & follow-ups",
      "Full customer CRM",
      "Advanced analytics",
      "5 Telegram bots",
      "Priority support",
      "Custom branding",
    ],
    badge: "Most Popular",
    highlight: true,
    accent: "forest",
  },
  {
    name: "Lifetime",
    tagline: "Pay once. Use forever. For founders who commit.",
    price: "₹84,999",
    period: "one-time",
    savings: "Pays for itself in ~3 years",
    cta: "Get Lifetime",
    ctaHref: "#",
    features: [
      "Everything in Yearly",
      "All future updates included",
      "Unlimited Telegram bots",
      "1-on-1 onboarding call",
      "Founder badge in dashboard",
      "Lifetime priority support",
      "Early access to new features",
      "No more bills, ever",
    ],
    badge: "Best Value",
    accent: "gold",
    bonus: {
      title: "Free Lovable Pro included",
      desc: "Build your business website with AI — on us.",
      worth: "Worth $25",
    },
  },
];

type Row = {
  label: string;
  values: [React.ReactNode, React.ReactNode, React.ReactNode];
  category?: string;
};

const compareRows: Row[] = [
  { category: "Core", label: "Smart auto-replies", values: ["Unlimited", "Unlimited", "Unlimited"] },
  { label: "Appointment booking", values: [<Check key="1" />, <Check key="2" />, <Check key="3" />] },
  { label: "Smart reminders", values: [<Check key="4" />, <Check key="5" />, <Check key="6" />] },
  { label: "Centralized inbox", values: [<Check key="7" />, <Check key="8" />, <Check key="9" />] },
  { label: "Telegram bots", values: ["2", "5", "Unlimited"] },

  { category: "Advanced", label: "AI assistant inside dashboard", values: [<Cross key="10" />, <Check key="11" />, <Check key="12" />] },
  { label: "Payment reminders", values: [<Cross key="13" />, <Check key="14" />, <Check key="15" />] },
  { label: "Customer CRM", values: ["Basic", "Full", "Full"] },
  { label: "Analytics", values: ["Basic", "Advanced", "Advanced"] },
  { label: "Custom branding", values: [<Cross key="16" />, <Check key="17" />, <Check key="18" />] },

  { category: "Support", label: "Email support", values: [<Check key="19" />, <Check key="20" />, <Check key="21" />] },
  { label: "Priority support", values: [<Cross key="22" />, <Check key="23" />, <Check key="24" />] },
  { label: "1-on-1 onboarding call", values: [<Cross key="25" />, <Cross key="26" />, <Check key="27" />] },
  { label: "All future updates", values: ["While subscribed", "While subscribed", "Forever"] },
];

export default function UpgradePage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main className="relative flex-1 px-6 lg:px-10 py-12 lg:py-16">
        {/* subtle backdrop */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Current plan banner */}
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-xl bg-[var(--color-gold)]/15 text-[var(--color-gold)] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
                    Current plan
                  </div>
                  <div className="mt-0.5 text-base font-medium text-[var(--color-ink)]">
                    Free Trial · 6 days left
                  </div>
                </div>
              </div>
              <div className="text-xs text-[var(--color-ink-soft)] max-w-md">
                You&apos;re on a free trial — pick a plan below to keep your
                automations running after it ends.
              </div>
            </div>
          </Reveal>

          {/* Header */}
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                Choose your plan
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-[2.8rem] tracking-tight text-[var(--color-ink)]">
                Upgrade to keep{" "}
                <span className="font-display italic text-[var(--color-forest)]">
                  saving hours
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-base text-[var(--color-ink-soft)] leading-relaxed">
                All plans include the full Wavly experience. Pay once or pay
                monthly — your call.
              </p>
            </Reveal>
          </div>

          {/* Cards */}
          <section className="mt-14">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 items-stretch">
              {plans.map((plan, i) => (
                <Reveal key={plan.name} delay={120 + i * 110}>
                  <PriceCard plan={plan} />
                </Reveal>
              ))}
            </div>
          </section>

          {/* Money-back banner */}
          <section className="mt-14">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-[var(--color-forest)]/30 bg-gradient-to-r from-[var(--color-forest)] to-[var(--color-forest-deep)] p-7 sm:p-9 text-[var(--color-cream-soft)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-32 -right-20 h-[400px] w-[400px] rounded-full bg-[var(--color-gold)]/20 blur-3xl"
                />
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="h-12 w-12 rounded-xl bg-[var(--color-cream-soft)]/15 backdrop-blur-sm flex items-center justify-center text-[var(--color-gold-soft)] shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-gold-soft)] font-medium">
                      Risk-free
                    </div>
                    <h3 className="mt-1.5 text-xl sm:text-2xl tracking-tight">
                      30-day{" "}
                      <span className="font-display italic">money-back</span>{" "}
                      guarantee
                    </h3>
                    <p className="mt-1.5 text-sm text-[var(--color-cream-soft)]/80 leading-relaxed">
                      Try any paid plan. If you&apos;re not saving real time
                      and bookings, email us and we&apos;ll refund every rupee.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Comparison */}
          <section className="mt-14">
            <div className="text-center max-w-2xl mx-auto">
              <Reveal>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Compare plans
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-3 text-2xl sm:text-3xl tracking-tight text-[var(--color-ink)]">
                  Everything,{" "}
                  <span className="font-display italic text-[var(--color-forest)]">
                    side by side
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="mt-10 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--color-border-soft)]">
                        <th className="px-5 sm:px-7 py-5 text-left text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)] w-[40%]">
                          Feature
                        </th>
                        <th className="px-5 py-5 text-center text-sm font-medium text-[var(--color-ink-soft)]">
                          Monthly
                        </th>
                        <th className="px-5 py-5 text-center text-sm font-medium text-[var(--color-forest)]">
                          Yearly
                          <span className="ml-1 inline-flex items-center rounded-full bg-[var(--color-forest)] px-2 py-0.5 text-[9px] uppercase tracking-wider text-[var(--color-cream-soft)] align-middle">
                            Popular
                          </span>
                        </th>
                        <th className="px-5 py-5 text-center text-sm font-medium text-[var(--color-ink-soft)]">
                          Lifetime
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {compareRows.map((row, i) => (
                        <Fragment key={i}>
                          {row.category && (
                            <tr>
                              <td
                                colSpan={4}
                                className="px-5 sm:px-7 pt-7 pb-2 text-[11px] uppercase tracking-[0.16em] font-medium text-[var(--color-gold)]"
                              >
                                {row.category}
                              </td>
                            </tr>
                          )}
                          <tr className="border-b border-[var(--color-border-soft)] last:border-b-0 hover:bg-[var(--color-surface)] transition-colors">
                            <td className="px-5 sm:px-7 py-3.5 text-[var(--color-ink)]">
                              {row.label}
                            </td>
                            <td className="px-5 py-3.5 text-center text-[var(--color-ink-soft)]">
                              {row.values[0]}
                            </td>
                            <td className="px-5 py-3.5 text-center text-[var(--color-forest)] bg-[var(--color-forest)]/[0.03] font-medium">
                              {row.values[1]}
                            </td>
                            <td className="px-5 py-3.5 text-center text-[var(--color-ink-soft)]">
                              {row.values[2]}
                            </td>
                          </tr>
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </section>

          {/* Closing note */}
          <Reveal>
            <p className="mt-14 text-center text-xs text-[var(--color-muted)]">
              Need help choosing?{" "}
              <a
                href="mailto:hello@wavly.in"
                className="font-medium text-[var(--color-forest)] hover:underline underline-offset-2"
              >
                Email us
              </a>{" "}
              — we&apos;ll help you pick the right plan in 2 minutes.
            </p>
          </Reveal>
        </div>
      </main>
    </div>
  );
}

/* ----------------- Price Card ----------------- */

function PriceCard({ plan }: { plan: Plan }) {
  const isHighlight = plan.highlight;
  return (
    <div
      className={`relative flex flex-col h-full rounded-3xl p-8 lg:p-9 ${
        isHighlight
          ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_30px_60px_-30px_rgba(20,58,47,0.55)] lg:scale-[1.04]"
          : "bg-[var(--color-cream-soft)] border border-[var(--color-border-soft)] text-[var(--color-ink)] shadow-[0_12px_36px_-20px_rgba(20,33,28,0.2)]"
      }`}
    >
      {plan.badge && (
        <div
          className={`absolute -top-3 right-7 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-md ${
            plan.accent === "gold"
              ? "bg-[var(--color-gold)] text-[var(--color-forest-deep)]"
              : "bg-[var(--color-cream-soft)] text-[var(--color-forest-deep)]"
          }`}
        >
          <SparkMini /> {plan.badge}
        </div>
      )}

      <div>
        <h3
          className={`text-lg font-medium tracking-tight ${
            isHighlight ? "text-[var(--color-cream-soft)]" : "text-[var(--color-ink)]"
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            isHighlight ? "text-[var(--color-cream-soft)]/75" : "text-[var(--color-ink-soft)]"
          }`}
        >
          {plan.tagline}
        </p>
      </div>

      <div className="mt-7">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-display text-[3rem] leading-none tracking-tight ${
              isHighlight ? "text-[var(--color-cream-soft)]" : "text-[var(--color-forest)]"
            }`}
          >
            {plan.price}
          </span>
          <span
            className={`text-sm ${
              isHighlight ? "text-[var(--color-cream-soft)]/65" : "text-[var(--color-muted)]"
            }`}
          >
            {plan.period}
          </span>
        </div>

        {plan.savings && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                isHighlight
                  ? "bg-[var(--color-gold)]/25 text-[var(--color-gold-soft)]"
                  : "bg-[var(--color-gold)]/15 text-[var(--color-gold)]"
              }`}
            >
              {plan.savings}
            </span>
            {plan.monthlyEquivalent && (
              <span
                className={`text-[11px] ${
                  isHighlight ? "text-[var(--color-cream-soft)]/65" : "text-[var(--color-muted)]"
                }`}
              >
                {plan.monthlyEquivalent}
              </span>
            )}
          </div>
        )}
      </div>

      <ul
        className={`mt-7 space-y-3 flex-1 ${
          isHighlight ? "text-[var(--color-cream-soft)]/90" : "text-[var(--color-ink-soft)]"
        }`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span
              className={`mt-0.5 ${
                isHighlight ? "text-[var(--color-gold-soft)]" : "text-[var(--color-forest)]"
              }`}
            >
              <Check />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {plan.bonus && (
        <div className="mt-5 rounded-2xl border border-[var(--color-gold)]/45 bg-[var(--color-gold)]/12 p-4">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-gold)]"><GiftIcon /></span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-gold)]">
              Free bonus
            </span>
            <span className="ml-auto rounded-full bg-[var(--color-gold)] px-2 py-0.5 text-[10px] font-bold text-white">
              {plan.bonus.worth}
            </span>
          </div>
          <div className="mt-2 text-sm font-medium text-[var(--color-ink)]">
            {plan.bonus.title}
          </div>
          <div className="text-xs text-[var(--color-ink-soft)] mt-0.5">
            {plan.bonus.desc}
          </div>
        </div>
      )}

      <Link
        href={plan.ctaHref}
        className={`mt-6 group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5 ${
          isHighlight
            ? "bg-[var(--color-cream-soft)] text-[var(--color-forest-deep)] hover:bg-white shadow-[0_8px_22px_-6px_rgba(255,255,255,0.3)]"
            : "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] shadow-[0_6px_20px_-6px_rgba(20,58,47,0.45)]"
        }`}
      >
        {plan.cta}
        <ArrowRight />
      </Link>
      <a
        href={`mailto:billing@wavly.in?subject=${encodeURIComponent(`Payment for Wavly ${plan.name}`)}`}
        className={`mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-full border px-5 py-2.5 text-xs font-medium transition-colors ${
          isHighlight
            ? "border-[var(--color-cream-soft)]/30 text-[var(--color-cream-soft)] hover:bg-[var(--color-cream-soft)]/10"
            : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)]"
        }`}
      >
        <ChatBubbleIcon />
        Contact support for payment
      </a>
    </div>
  );
}

/* ----------------- Icons ----------------- */

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M21 11.5a8.5 8.5 0 11-3.4-6.8" />
      <path d="M21 4v4h-4" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M12 8v13M3 12h18" />
      <path d="M7.5 8a2.5 2.5 0 010-5C9 3 12 8 12 8s3-5 4.5-5a2.5 2.5 0 010 5" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}
function Cross() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 inline-block text-[var(--color-muted)]/50">
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function SparkMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}
