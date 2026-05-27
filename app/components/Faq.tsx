"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type FaqItem = {
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    question: "What exactly is Wavly?",
    answer:
      "Wavly is an AI-powered WhatsApp automation tool built for small businesses in India. It handles your repetitive WhatsApp work — replying to common questions, booking appointments, sending reminders, and following up on payments — so you spend less time on your phone and more time growing your business.",
  },
  {
    question: "How does Wavly work with my WhatsApp?",
    answer:
      "You connect your business WhatsApp number to Wavly in about 2 minutes. From then on, Wavly receives your messages, replies using the automations you set up, and shows every conversation in one calm dashboard. No new app for your customers — they keep chatting on WhatsApp like always.",
  },
  {
    question: "Is Wavly safe to use with my WhatsApp account?",
    answer:
      "Yes. Wavly connects through the official WhatsApp Business API from Meta — the same secure infrastructure used by the world's biggest brands. Your account is never at risk of being banned, and your customers' messages are end-to-end encrypted in transit. We never read, sell or share your data.",
  },
  {
    question: "Do I need any technical knowledge to use Wavly?",
    answer:
      "Not at all. Wavly is built for business owners, not developers. Setting up automations is as simple as picking from templates or typing a few sentences. If you can use WhatsApp, you can use Wavly.",
  },
  {
    question: "How long does it take to set up?",
    answer:
      "Most users are fully set up in under 10 minutes. Connect your number, pick your industry, choose 1–2 automations to start with, and you're live. Our onboarding guides you step by step, and you can always add more automations later.",
  },
  {
    question: "What kind of businesses use Wavly?",
    answer:
      "Wavly is built for small service-based businesses that rely heavily on WhatsApp — coaches and consultants, clinics and doctors, salons and spas, tuition teachers and coaching classes, and small D2C shops. If you spend hours every day replying to customers on WhatsApp, Wavly is for you.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, absolutely. You can cancel anytime from your dashboard — no calls, no awkward emails, no questions asked. Monthly and yearly plans cancel immediately for the next billing cycle, and the Lifetime plan is a one-time payment so there's nothing to cancel.",
  },
  {
    question: "What if I get stuck or need help?",
    answer:
      "Every plan includes support, and Yearly + Lifetime members get priority support with faster response times. We also run a small community where business owners share tips, and our AI assistant inside the dashboard can answer most questions instantly.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
              FAQ
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-ink)]">
              Frequently asked{" "}
              <span className="font-display italic text-[var(--color-forest)]">
                questions
              </span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base text-[var(--color-ink-soft)] leading-relaxed">
              Everything you need to know about Wavly. Can&apos;t find what
              you&apos;re looking for? Reach out and we&apos;ll help.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 mx-auto max-w-3xl">
          <div className="rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
            <ul className="divide-y divide-[var(--color-border-soft)]">
              {faqs.map((item, i) => {
                const open = openIndex === i;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      className="group w-full flex items-center justify-between gap-6 px-6 sm:px-8 py-5 sm:py-6 text-left hover:bg-[var(--color-surface)] transition-colors"
                    >
                      <span
                        className={`text-base sm:text-[1.05rem] font-medium pr-2 transition-colors ${
                          open
                            ? "text-[var(--color-forest)]"
                            : "text-[var(--color-ink)] group-hover:text-[var(--color-forest)]"
                        }`}
                      >
                        {item.question}
                      </span>
                      <span
                        className={`shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full border transition-all duration-300 ${
                          open
                            ? "bg-[var(--color-forest)] border-[var(--color-forest)] text-[var(--color-cream-soft)] rotate-45"
                            : "bg-transparent border-[var(--color-border)] text-[var(--color-forest)] group-hover:border-[var(--color-forest)]"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      className={`grid transition-all duration-400 ease-out ${
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                      style={{ transitionDuration: "360ms" }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 sm:px-8 pb-6 sm:pb-7 -mt-1">
                          <p className="text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-ink-soft)] max-w-2xl">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact prompt */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--color-ink-soft)]">
              Still have questions?{" "}
              <a
                href="mailto:hello@wavly.in"
                className="font-medium text-[var(--color-forest)] hover:text-[var(--color-forest-deep)] hover:underline underline-offset-2"
              >
                Email us
              </a>{" "}
              — we usually reply within a few hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
