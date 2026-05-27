import Link from "next/link";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type TocItem = {
  id: string;
  label: string;
};

export function LegalPage({
  title,
  lastUpdated,
  intro,
  toc,
  children,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  toc: TocItem[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16 border-b border-[var(--color-border-soft)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/20 blur-3xl" />
          </div>

          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] transition-colors"
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                  Legal
                </div>
                <h1 className="mt-3 text-4xl sm:text-5xl tracking-tight text-[var(--color-ink)]">
                  {title}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-[var(--color-ink-soft)] leading-relaxed">
                  {intro}
                </p>
              </div>
              <div className="shrink-0 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-3.5 py-1.5 text-xs text-[var(--color-ink-soft)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 text-[var(--color-forest)]"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Last updated · {lastUpdated}
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-14">
              {/* TOC */}
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <div className="text-[11px] uppercase tracking-[0.16em] font-medium text-[var(--color-muted)] mb-3">
                  On this page
                </div>
                <ul className="space-y-1.5">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block py-1 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Content */}
              <article className="legal-prose max-w-3xl">{children}</article>
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 pt-10 border-t border-[var(--color-border-soft)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-[var(--color-ink-soft)]">
                Questions about this document?{" "}
                <a
                  href="mailto:legal@wavly.in"
                  className="font-medium text-[var(--color-forest)] hover:underline underline-offset-2"
                >
                  legal@wavly.in
                </a>
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href="/privacy"
                  className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] transition-colors"
                >
                  Privacy
                </Link>
                <span className="h-3 w-px bg-[var(--color-border)]" />
                <Link
                  href="/terms"
                  className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] transition-colors"
                >
                  Terms
                </Link>
                <span className="h-3 w-px bg-[var(--color-border)]" />
                <Link
                  href="/disclaimer"
                  className="text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] transition-colors"
                >
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
