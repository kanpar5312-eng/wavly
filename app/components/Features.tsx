import { Reveal } from "./Reveal";
import { Tilt3D } from "./Tilt3D";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
};

const iconClass = "h-5 w-5";

const features: Feature[] = [
  {
    title: "Smart Auto-Replies",
    description:
      "AI understands your customers and replies instantly in your tone. Templates for FAQs, pricing, hours and more.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path d="M21 11.5a8.5 8.5 0 11-3.4-6.8" />
        <path d="M21 4v4h-4" />
        <path d="M9 11h6M9 14h4" />
      </svg>
    ),
  },
  {
    title: "Appointment Booking",
    description:
      "Customers book directly on Telegram. Wavly checks your calendar, picks a slot, confirms — all without you typing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4" />
        <path d="M9 14h2v2H9z" />
      </svg>
    ),
  },
  {
    title: "Smart Reminders",
    description:
      "Auto reminders 1 hour and 30 minutes before every appointment. Fewer no-shows, more revenue.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2z" />
        <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z" />
      </svg>
    ),
    highlight: true,
  },
  {
    title: "Centralized Inbox",
    description:
      "Every customer chat in one calm dashboard. Filter, search, assign — never lose a conversation again.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.5 5h13l3.5 7v7a2 2 0 01-2 2h-16a2 2 0 01-2-2v-7l3.5-7z" />
      </svg>
    ),
  },
  {
    title: "Customer Management",
    description:
      "A clean CRM built around Telegram. Tag customers, track history, and follow up at the right time.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Analytics Dashboard",
    description:
      "See response time, booking rate, revenue and customer growth at a glance. Know what's actually working.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    title: "Payment Reminders",
    description:
      "Polite, automatic follow-ups for unpaid invoices. Get paid faster without awkward chasing.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h3" />
      </svg>
    ),
  },
  {
    title: "AI Assistant Inside",
    description:
      "Ask your dashboard anything — \"Who hasn't paid?\", \"Draft a follow-up\" — and get instant answers.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
        <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
              Features
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-ink)]">
              Everything you need to run your business{" "}
              <span className="font-display italic text-[var(--color-forest)]">
                on Telegram
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base text-[var(--color-ink-soft)] leading-relaxed">
              Built for small business owners who are tired of typing the same
              replies all day. Wavly does the busywork — you focus on customers.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={120 + (i % 4) * 90}>
              <Tilt3D max={5} perspective={1100}>
                <div
                  className={`group relative h-full rounded-2xl border p-6 transition-all duration-500 ease-out will-change-transform ${
                    f.highlight
                      ? "bg-[var(--color-forest)] border-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_8px_30px_-12px_rgba(20,58,47,0.35)] hover:shadow-[0_30px_60px_-18px_rgba(20,58,47,0.55)]"
                      : "bg-[var(--color-cream-soft)] border-[var(--color-border-soft)] hover:border-[var(--color-border)] hover:shadow-[0_30px_60px_-22px_rgba(20,33,28,0.28)]"
                  }`}
                >
                  <div
                    style={{ transform: "translateZ(20px)" }}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110 ${
                      f.highlight
                        ? "bg-[var(--color-cream-soft)]/10 text-[var(--color-cream-soft)]"
                        : "bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)]"
                    }`}
                  >
                    {f.icon}
                  </div>
                  <h3
                    style={{ transform: "translateZ(15px)" }}
                    className={`mt-5 text-lg font-medium tracking-tight ${
                      f.highlight ? "text-[var(--color-cream-soft)]" : "text-[var(--color-ink)]"
                    }`}
                  >
                    {f.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      f.highlight
                        ? "text-[var(--color-cream-soft)]/75"
                        : "text-[var(--color-ink-soft)]"
                    }`}
                  >
                    {f.description}
                  </p>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
