export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-7 w-7 rounded-lg bg-[var(--color-forest)] flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4 text-[var(--color-cream)]"
          aria-hidden="true"
        >
          <path
            d="M3 13c2-3 4-3 6 0s4 3 6 0 4-3 6 0"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="font-display text-[1.45rem] leading-none text-[var(--color-forest)] tracking-tight">
        Wavly
      </span>
    </div>
  );
}
