import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-soft)] bg-[var(--color-cream-soft)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-[var(--color-ink-soft)] leading-relaxed">
              AI Telegram automation built for small businesses in India.
              Reply faster, book more, and stop drowning in messages.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
              Product
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="/#features" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">Features</a></li>
              <li><a href="/#how-it-works" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">How it works</a></li>
              <li><Link href="/pricing" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">Pricing</Link></li>
              <li><Link href="/blog" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">Blog</Link></li>
              <li><a href="/#faq" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">FAQ</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
              Company
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">About</a></li>
              <li><a href="mailto:hello@wavly.in" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.16em] text-[var(--color-muted)] font-medium">
              Legal
            </div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/privacy" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--color-border-soft)] flex flex-col sm:flex-row justify-between gap-3 text-xs text-[var(--color-muted)]">
          <div>© {new Date().getFullYear()} Wavly. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[var(--color-forest)]">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--color-forest)]">Terms</Link>
            <a href="mailto:hello@wavly.in" className="hover:text-[var(--color-forest)]">hello@wavly.in</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
