"use client";

import { useState, useEffect } from "react";
import { Logo } from "./Logo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-cream)]/80 backdrop-blur-md border-b border-[var(--color-border-soft)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#" aria-label="Wavly home">
          <Logo />
        </a>

        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/signin"
            className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] transition-colors"
          >
            Sign in
          </a>
          <a
            href="/signup"
            className="btn-press inline-flex items-center rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-10px_rgba(20,58,47,0.5)]"
          >
            Get Started
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden p-2 -mr-2 text-[var(--color-forest)]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-6 w-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border-soft)] bg-[var(--color-cream)]/95 backdrop-blur-md">
          <div className="px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-base text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/signin"
              onClick={() => setMobileOpen(false)}
              className="py-2.5 text-base text-[var(--color-ink-soft)] hover:text-[var(--color-forest)]"
            >
              Sign in
            </a>
            <a
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-medium text-[var(--color-cream-soft)]"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
