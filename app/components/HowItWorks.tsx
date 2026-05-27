import { Reveal } from "./Reveal";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Connect your WhatsApp",
    description:
      "Link your business WhatsApp number in two minutes. No new app, no new number — your customers keep chatting the same way.",
    badge: "2 min setup",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M21 11.5a8.5 8.5 0 11-3.4-6.8" />
        <path d="M21 4v4h-4" />
        <path d="M8 11.5l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Set up your automations",
    description:
      "Pick from templates built for your industry — clinics, salons, coaches, tutors — or let our AI design them from your past chats.",
    badge: "AI-guided",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Save hours every week",
    description:
      "Wavly replies, books and reminds 24/7. You step in only when it truly matters. Watch your evenings come back.",
    badge: "10+ hrs / week",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 lg:py-32 bg-[var(--color-cream-soft)] border-y border-[var(--color-border-soft)] overflow-hidden"
    >
      {/* subtle backdrop glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
              How it works
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-ink)]">
              Set it up once.{" "}
              <span className="font-display italic text-[var(--color-forest)]">
                Save hours forever.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base text-[var(--color-ink-soft)] leading-relaxed">
              Three calm steps. No tech skills required. Most owners are fully
              up and running in under ten minutes.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 lg:mt-20 relative">
          {/* Decorative connecting line (desktop only) */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[88px] left-[12%] right-[12%] h-px"
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6 relative">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={120 + i * 140}>
                <div className="group relative h-full text-center md:text-left">
                  {/* Number circle */}
                  <div className="relative mx-auto md:mx-0 inline-flex h-[72px] w-[72px] items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[var(--color-cream)] border border-[var(--color-border-soft)]" />
                    <div className="absolute inset-1 rounded-full bg-[var(--color-forest)] text-[var(--color-cream-soft)] flex items-center justify-center font-display text-[1.6rem] tracking-tight transition-transform duration-500 group-hover:scale-105">
                      {step.number}
                    </div>
                    {/* Icon bubble pinned to the corner */}
                    <div className="absolute -bottom-1 -right-1 h-9 w-9 rounded-xl bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/30 text-[var(--color-forest)] flex items-center justify-center shadow-sm">
                      <span className="h-4 w-4">{step.icon}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 md:justify-start justify-center">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-forest)]/[0.06] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-forest)]">
                      <span className="h-1 w-1 rounded-full bg-[var(--color-forest)]" />
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-medium tracking-tight text-[var(--color-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)] max-w-sm md:max-w-none mx-auto md:mx-0">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
