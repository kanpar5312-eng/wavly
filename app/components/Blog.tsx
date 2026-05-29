import Link from "next/link";
import { Reveal } from "./Reveal";
import { Tilt3D } from "./Tilt3D";
import { posts } from "../blog/posts";

export function Blog() {
  const latest = posts.slice(0, 3);

  return (
    <section id="blog" className="py-24 lg:py-32 bg-[var(--color-cream-soft)] border-y border-[var(--color-border-soft)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="max-w-2xl">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                From the blog
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-ink)]">
                Playbooks to{" "}
                <span className="font-display italic text-[var(--color-forest)]">grow faster</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-base text-[var(--color-ink-soft)] leading-relaxed">
                Real, practical tips on Telegram automation and filling your calendar — written for Indian small businesses.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
            >
              View all articles
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {latest.map((p, i) => (
            <Reveal key={p.slug} delay={120 + i * 90}>
              <Link href={`/blog/${p.slug}`} className="group block h-full">
                <Tilt3D max={5} perspective={1100}>
                  <article className="flex flex-col h-full rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 hover:-translate-y-1 hover:border-[var(--color-forest)]/25 hover:shadow-[0_24px_50px_-24px_rgba(20,33,28,0.25)] transition-all duration-500">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="inline-flex items-center rounded-full bg-[var(--color-forest)]/[0.08] px-2 py-0.5 font-medium text-[var(--color-forest)] uppercase tracking-wider">
                        {p.category}
                      </span>
                      <span className="text-[var(--color-muted)]">{p.readTime}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-medium tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-forest)] transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed flex-1">
                      {p.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-xs text-[var(--color-muted)]">{p.date}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[var(--color-muted)] group-hover:text-[var(--color-forest)] group-hover:translate-x-0.5 transition-all"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                    </div>
                  </article>
                </Tilt3D>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-forest)] hover:underline underline-offset-2">
            View all articles
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
