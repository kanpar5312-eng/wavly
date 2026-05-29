import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { posts, getPost } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article · Wavly" };
  return { title: `${post.title} · Wavly`, description: post.excerpt };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[440px] w-[760px] rounded-full bg-[var(--color-gold-soft)]/20 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
              All articles
            </Link>

            <div className="mt-6 flex items-center gap-3 text-xs">
              <span className="inline-flex items-center rounded-full bg-[var(--color-forest)]/[0.08] px-2.5 py-0.5 font-medium text-[var(--color-forest)] uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-[var(--color-muted)]">{post.date} · {post.readTime}</span>
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.7rem] leading-[1.1] tracking-tight text-[var(--color-ink)]">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-[var(--color-ink-soft)] leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-8 h-px bg-[var(--color-border-soft)]" />

            <div className="legal-prose mt-8">
              {post.body.map((block, i) =>
                block.startsWith("## ") ? (
                  <h2 key={i}>{block.replace(/^##\s+/, "")}</h2>
                ) : (
                  <p key={i}>{block}</p>
                )
              )}
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-7 sm:p-8 text-center">
              <h3 className="text-xl tracking-tight text-[var(--color-ink)]">
                Want this running for{" "}
                <span className="font-display italic text-[var(--color-forest)]">your business?</span>
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)] max-w-md mx-auto">
                Wavly sets all of this up on Telegram in minutes. Start your free 7-day trial — no credit card needed.
              </p>
              <Link
                href="/signup"
                className="btn-press mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 transition-all shadow-[0_8px_22px_-6px_rgba(20,58,47,0.45)]"
              >
                Start free trial
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </Link>
            </div>

            {/* Related */}
            <div className="mt-14">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                Keep reading
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-5 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(20,33,28,0.22)] transition-all">
                    <div className="text-[11px] text-[var(--color-muted)]">{p.category} · {p.readTime}</div>
                    <h4 className="mt-2 text-base font-medium text-[var(--color-ink)] group-hover:text-[var(--color-forest)] transition-colors leading-snug">
                      {p.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
