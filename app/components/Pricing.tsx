import Link from "next/link";
import { Reveal } from "./Reveal";

type Plan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  badge?: string;
  highlight?: boolean;
  bonus?: { title: string; desc: string; worth: string };
};

const plans: Plan[] = [
  {
    name: "Monthly",
    price: "₹2,999",
    period: "/month",
    features: [
      "Unlimited auto-replies",
      "Appointment booking",
      "Smart reminders",
      "2 Telegram bots",
    ],
    cta: "Get started",
  },
  {
    name: "Yearly",
    price: "₹27,999",
    period: "/year",
    features: [
      "Everything in Monthly",
      "AI assistant",
      "Customer CRM",
      "5 Telegram bots",
    ],
    cta: "Choose Yearly",
    badge: "Most Popular",
    highlight: true,
  },
  {
    name: "Lifetime",
    price: "₹84,999",
    period: "one-time",
    features: [
      "Everything in Yearly",
      "All future updates",
      "Unlimited Telegram bots",
      "1-on-1 onboarding",
    ],
    cta: "Get Lifetime",
    bonus: {
      title: "Free Lovable Pro included",
      desc: "Build your business website with AI",
      worth: "Worth $25",
    },
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l4 4 10-10" />
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

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M21 11.5a8.5 8.5 0 11-3.4-6.8" />
      <path d="M21 4v4h-4" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
              Pricing
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-ink)]">
              Simple pricing.{" "}
              <span className="font-display italic text-[var(--color-forest)]">
                Real savings.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base text-[var(--color-ink-soft)] leading-relaxed">
              Three plans. Cancel anytime.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={120 + i * 100}>
              <div
                className={`relative flex flex-col h-full rounded-3xl p-7 ${
                  plan.highlight
                    ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_24px_50px_-22px_rgba(20,58,47,0.5)] lg:scale-[1.03]"
                    : "bg-[var(--color-cream-soft)] border border-[var(--color-border-soft)] text-[var(--color-ink)] shadow-[0_10px_30px_-18px_rgba(20,33,28,0.18)]"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 right-6 inline-flex items-center rounded-full bg-[var(--color-cream-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-forest-deep)] shadow-md">
                    {plan.badge}
                  </div>
                )}

                <h3
                  className={`text-base font-medium ${
                    plan.highlight ? "text-[var(--color-cream-soft)]" : "text-[var(--color-ink)]"
                  }`}
                >
                  {plan.name}
                </h3>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span
                    className={`font-display text-[2.6rem] leading-none tracking-tight ${
                      plan.highlight ? "text-[var(--color-cream-soft)]" : "text-[var(--color-forest)]"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlight ? "text-[var(--color-cream-soft)]/65" : "text-[var(--color-muted)]"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <ul
                  className={`mt-6 space-y-2.5 flex-1 ${
                    plan.highlight ? "text-[var(--color-cream-soft)]/90" : "text-[var(--color-ink-soft)]"
                  }`}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`mt-0.5 ${
                          plan.highlight ? "text-[var(--color-gold-soft)]" : "text-[var(--color-forest)]"
                        }`}
                      >
                        <CheckIcon />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {plan.bonus && (
                  <div className="mt-5 rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 p-3.5">
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
                    <div className="text-xs text-[var(--color-ink-soft)]">
                      {plan.bonus.desc}
                    </div>
                  </div>
                )}

                <Link
                  href="/signup"
                  className={`btn-press mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                    plan.highlight
                      ? "bg-[var(--color-cream-soft)] text-[var(--color-forest-deep)] hover:bg-white"
                      : "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)]"
                  }`}
                >
                  {plan.cta}
                </Link>
                <a
                  href={`mailto:billing@wavly.in?subject=${encodeURIComponent(`Payment for Wavly ${plan.name}`)}`}
                  className={`mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-full border px-5 py-2.5 text-xs font-medium transition-colors ${
                    plan.highlight
                      ? "border-[var(--color-cream-soft)]/30 text-[var(--color-cream-soft)] hover:bg-[var(--color-cream-soft)]/10"
                      : "border-[var(--color-border)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)]"
                  }`}
                >
                  <ChatBubbleIcon />
                  Contact support for payment
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="mt-10 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-forest)] hover:text-[var(--color-forest-deep)] hover:underline underline-offset-2"
            >
              See full plan comparison
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
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
