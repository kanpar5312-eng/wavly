"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "./DashboardNav";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />
      <div className="relative flex-1 flex items-center justify-center px-6 py-16 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full bg-[var(--color-gold-soft)]/20 blur-3xl" />
        </div>

        <div className="w-full max-w-xl text-center">
          <div className="mx-auto inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 8v4l3 2" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div className="mt-5 inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--color-gold)]">
            Coming soon
          </div>
          <h1 className="mt-5 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
            {title}
          </h1>
          <p className="mt-3 text-base text-[var(--color-ink-soft)] leading-relaxed max-w-md mx-auto">
            {description}
          </p>
          <div className="mt-7">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
