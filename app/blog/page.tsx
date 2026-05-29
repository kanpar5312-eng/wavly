import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { Tilt3D } from "../components/Tilt3D";
import { posts } from "./posts";

export const metadata = {
  title: "Blog · Wavly",
  description:
    "Practical tips on Telegram automation, cutting no-shows, and growing appointment-based businesses in India.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/22 blur-3xl" />
            <div className="absolute top-10 right-[12%] h-[320px] w-[320px] rounded-full bg-[var(--color-tg)]/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                The Wavly Blog
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-4 text-4xl sm:text-5xl tracking-tight text-[var(--color-ink)]">
                Grow your business{" "}
                <span className="font-display italic text-[var(--color-forest)]">on autopilot</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl mx-auto text-base text-[var(--color-ink-soft)] leading-relaxed">
                Practical playbooks on Telegram automation, cutting no-shows, and filling your calendar — written for Indian small businesses.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Featured */}
            <Reveal>
              <Link href={`/blog/${featured.slug}`} className="group block">
                <Tilt3D max={3} perspective={1500}>
                  <article className="relative overflow-hidden rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-8 sm:p-10 hover:shadow-[0_30px_60px_-28px_rgba(20,33,28,0.28)] transition-all duration-500">
                    <div aria-hidden className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[var(--color-tg)]/10 blur-3xl" />
                    <div className="relative">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="inline-flex items-center rounded-full bg-[var(--color-forest)]/[0.08] px-2.5 py-0.5 font-medium text-[var(--color-forest)] uppercase tracking-wider">
                          Featured · {featured.category}
                        </span>
                        <span className="text-[var(--color-muted)]">{featured.date} · {featured.readTime}</span>
                      </div>
                      <h2 className="mt-4 max-w-2xl text-2xl sm:text-3xl tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-forest)] transition-colors">
                        {featured.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-sm sm:text-base text-[var(--color-ink-soft)] leading-relaxed">
                        {featured.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-forest)]">
                        Read article
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                      </span>
                    </div>
                  </article>
                </Tilt3D>
              </Link>
            </Reveal>

            {/* Rest */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={100 + i * 90}>
                  <Link href={`/blog/${p.slug}`} className="group block h-full">
                    <article className="flex flex-col h-full rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-6 hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(20,33,28,0.24)] transition-all duration-500">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="inline-flex items-center rounded-full bg-[var(--color-gold)]/15 px-2 py-0.5 font-medium text-[var(--color-gold)] uppercase tracking-wider">
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
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
