import { Fragment } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { Tilt3D } from "../components/Tilt3D";

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
};

const plans: Plan[] = [
  {
    name: "Monthly",
    tagline: "Best for testing the waters.",
    price: "₹999",
    period: "per month",
    cta: "Start free trial",
    ctaHref: "/signup",
    features: [
      "Unlimited smart auto-replies",
      "Appointment booking on WhatsApp",
      "Smart reminders (1 hr & 30 min)",
      "Centralized inbox",
      "Basic analytics",
      "2 WhatsApp numbers",
      "Email support",
      "Cancel anytime",
    ],
  },
  {
    name: "Yearly",
    tagline: "Most owners pick this — and stay.",
    price: "₹7,999",
    period: "per year",
    savings: "Save ₹3,989",
    monthlyEquivalent: "Just ₹667/month",
    cta: "Choose Yearly",
    ctaHref: "/signup",
    features: [
      "Everything in Monthly",
      "AI assistant inside dashboard",
      "Payment reminders & follow-ups",
      "Full customer CRM",
      "Advanced analytics",
      "5 WhatsApp numbers",
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
    price: "₹19,999",
    period: "one-time",
    savings: "Pays for itself in 20 months",
    cta: "Get Lifetime",
    ctaHref: "/signup",
    features: [
      "Everything in Yearly",
      "All future updates included",
      "Unlimited WhatsApp numbers",
      "1-on-1 onboarding call",
      "Founder badge in dashboard",
      "Lifetime priority support",
      "Early access to new features",
      "No more bills, ever",
    ],
    badge: "Best Value",
    accent: "gold",
  },
];

const trustSignals = [
  {
    title: "7-day free trial",
    sub: "No credit card needed",
    icon: <ClockIcon />,
  },
  {
    title: "Cancel anytime",
    sub: "No calls, no questions",
    icon: <DoorIcon />,
  },
  {
    title: "30-day money-back",
    sub: "Full refund if it's not for you",
    icon: <ShieldIcon />,
  },
  {
    title: "GST-compliant invoices",
    sub: "For your accountant",
    icon: <DocIcon />,
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
  { label: "WhatsApp numbers", values: ["2", "5", "Unlimited"] },

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

const billingFaqs = [
  {
    q: "Do I need a credit card to start the trial?",
    a: "No — the 7-day trial is fully free, no card details required. You'll only be asked for payment after the trial if you choose to continue.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes, anytime. Upgrade or downgrade from your dashboard. We prorate everything fairly, so you only pay for what you use.",
  },
  {
    q: "What does the 30-day money-back guarantee cover?",
    a: "If you're not happy in the first 30 days for any reason, email us and we'll refund you in full. No forms, no hoops.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[620px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/25 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-4 py-1.5 text-xs font-medium text-[var(--color-forest)] shadow-sm">
                  <SparkMini />
                  Pricing · Built for Indian small businesses
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.6rem] leading-[1.05] tracking-tight text-[var(--color-ink)]">
                  Simple pricing.{" "}
                  <span className="font-display italic text-[var(--color-forest)]">
                    Powerful results.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-[var(--color-ink-soft)] leading-relaxed">
                  Full access to everything Wavly offers — no hidden limits, no
                  surprise charges. Pick the plan that fits where you are.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[var(--color-muted)]">
                  <Pill>✓ 7-day free trial</Pill>
                  <Pill>✓ No credit card needed</Pill>
                  <Pill>✓ Cancel anytime</Pill>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 items-stretch">
              {plans.map((plan, i) => (
                <Reveal key={plan.name} delay={120 + i * 110}>
                  <Tilt3D max={4} perspective={1400}>
                    <PriceCard plan={plan} />
                  </Tilt3D>
                </Reveal>
              ))}
            </div>

            {/* Tiny note */}
            <Reveal delay={500}>
              <p className="mt-8 text-center text-xs text-[var(--color-muted)]">
                All prices in INR · GST extra where applicable · No hidden fees
              </p>
            </Reveal>
          </div>
        </section>

        {/* Trust signals */}
        <section className="pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-7 sm:p-9">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {trustSignals.map((t, i) => (
                  <Reveal key={t.title} delay={i * 80}>
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)] flex items-center justify-center">
                        {t.icon}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--color-ink)]">
                          {t.title}
                        </div>
                        <div className="text-xs text-[var(--color-muted)] mt-0.5">
                          {t.sub}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Money-back guarantee banner */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-[var(--color-forest)]/30 bg-gradient-to-r from-[var(--color-forest)] to-[var(--color-forest-deep)] p-8 sm:p-12 text-[var(--color-cream-soft)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-32 -right-20 h-[400px] w-[400px] rounded-full bg-[var(--color-gold)]/20 blur-3xl"
                />

                <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-center">
                  <div className="h-16 w-16 rounded-2xl bg-[var(--color-cream-soft)]/15 backdrop-blur-sm flex items-center justify-center text-[var(--color-gold-soft)] shrink-0">
                    <BigShieldIcon />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold-soft)] font-medium">
                      Risk-free
                    </div>
                    <h3 className="mt-2 text-2xl sm:text-3xl tracking-tight">
                      30-day{" "}
                      <span className="font-display italic">money-back</span>{" "}
                      guarantee
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-[var(--color-cream-soft)]/80 max-w-2xl leading-relaxed">
                      Try Wavly for a full month. If it doesn&apos;t pay for
                      itself in saved time and recovered bookings, email us and
                      we&apos;ll refund every rupee. No forms, no hoops, no
                      hard feelings.
                    </p>
                  </div>
                  <Link
                    href="/signup"
                    className="hidden lg:inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-cream-soft)] text-[var(--color-forest-deep)] px-6 py-3 text-sm font-medium hover:bg-white hover:-translate-y-0.5 transition-all shadow-[0_8px_22px_-6px_rgba(255,255,255,0.3)]"
                  >
                    Try risk-free
                    <ArrowRight />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Comparison table */}
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto">
              <Reveal>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Compare plans
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-3 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                  Everything,{" "}
                  <span className="font-display italic text-[var(--color-forest)]">
                    side by side
                  </span>
                </h2>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="mt-12 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
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
                        <th className="px-5 py-5 text-center text-sm font-medium text-[var(--color-forest)] relative">
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
          </div>
        </section>

        {/* Billing FAQ */}
        <section className="pb-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <div className="text-center">
              <Reveal>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Billing questions
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-3 text-3xl tracking-tight text-[var(--color-ink)]">
                  Things people ask us
                </h2>
              </Reveal>
            </div>

            <div className="mt-10 space-y-3">
              {billingFaqs.map((item, i) => (
                <Reveal key={item.q} delay={120 + i * 80}>
                  <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6">
                    <div className="text-[15px] font-medium text-[var(--color-ink)] flex items-start gap-3">
                      <span className="mt-1 text-[var(--color-forest)]">
                        <DotIcon />
                      </span>
                      {item.q}
                    </div>
                    <p className="mt-2 pl-7 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-24">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] p-10 sm:p-14 text-center">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[720px] rounded-full bg-[var(--color-gold-soft)]/30 blur-3xl"
                />
                <div className="relative">
                  <h3 className="text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                    Try Wavly{" "}
                    <span className="font-display italic text-[var(--color-forest)]">
                      free for 7 days
                    </span>
                  </h3>
                  <p className="mt-4 max-w-xl mx-auto text-base text-[var(--color-ink-soft)] leading-relaxed">
                    Most owners save 10+ hours in their first week. If it
                    doesn&apos;t work for you, walk away — no payment, no
                    hassle.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                      href="/signup"
                      className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-7 py-3.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 transition-all shadow-[0_8px_22px_-6px_rgba(20,58,47,0.45)]"
                    >
                      Start free trial
                      <ArrowRight />
                    </Link>
                    <a
                      href="mailto:hello@wavly.in"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-7 py-3.5 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
                    >
                      Talk to us
                    </a>
                  </div>
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

/* ----------------- Price Card ----------------- */

function PriceCard({ plan }: { plan: Plan }) {
  const isHighlight = plan.highlight;
  return (
    <div
      className={`relative flex flex-col h-full rounded-3xl p-8 lg:p-9 transition-all duration-500 ease-out hover:-translate-y-1.5 ${
        isHighlight
          ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_30px_60px_-30px_rgba(20,58,47,0.55)] lg:scale-[1.04] hover:shadow-[0_42px_80px_-30px_rgba(20,58,47,0.65)]"
          : "bg-[var(--color-cream-soft)] border border-[var(--color-border-soft)] text-[var(--color-ink)] hover:border-[var(--color-border)] hover:shadow-[0_24px_50px_-22px_rgba(20,33,28,0.25)]"
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
            isHighlight
              ? "text-[var(--color-cream-soft)]"
              : "text-[var(--color-ink)]"
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed ${
            isHighlight
              ? "text-[var(--color-cream-soft)]/75"
              : "text-[var(--color-ink-soft)]"
          }`}
        >
          {plan.tagline}
        </p>
      </div>

      <div className="mt-7">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-display text-[3rem] leading-none tracking-tight ${
              isHighlight
                ? "text-[var(--color-cream-soft)]"
                : "text-[var(--color-forest)]"
            }`}
          >
            {plan.price}
          </span>
          <span
            className={`text-sm ${
              isHighlight
                ? "text-[var(--color-cream-soft)]/65"
                : "text-[var(--color-muted)]"
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
                  isHighlight
                    ? "text-[var(--color-cream-soft)]/65"
                    : "text-[var(--color-muted)]"
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
          isHighlight
            ? "text-[var(--color-cream-soft)]/90"
            : "text-[var(--color-ink-soft)]"
        }`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span
              className={`mt-0.5 ${
                isHighlight
                  ? "text-[var(--color-gold-soft)]"
                  : "text-[var(--color-forest)]"
              }`}
            >
              <Check />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={plan.ctaHref}
        className={`mt-8 group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5 ${
          isHighlight
            ? "bg-[var(--color-cream-soft)] text-[var(--color-forest-deep)] hover:bg-white shadow-[0_8px_22px_-6px_rgba(255,255,255,0.3)]"
            : "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] shadow-[0_6px_20px_-6px_rgba(20,58,47,0.45)]"
        }`}
      >
        {plan.cta}
        <ArrowRight />
      </Link>
    </div>
  );
}

/* ----------------- Tiny helpers + icons ----------------- */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-3 py-1 text-[11px] text-[var(--color-ink-soft)]">
      {children}
    </span>
  );
}

function Check() {
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
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}

function Cross() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 inline-block text-[var(--color-muted)]/50"
    >
      <path d="M6 6l12 12M6 18L18 6" />
    </svg>
  );
}

function ArrowRight() {
  return (
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
  );
}

function SparkMini() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function DoorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M3 21h18" />
      <path d="M6 21V5a2 2 0 012-2h8a2 2 0 012 2v16" />
      <path d="M14 12v.01" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BigShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <path d="M12 3l8 4v6c0 5-3.5 7.5-8 8-4.5-.5-8-3-8-8V7l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
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
