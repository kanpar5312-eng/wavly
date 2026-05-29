"use client";

import { useEffect, useState } from "react";
import { signInWithProvider } from "../../lib/supabase/auth";
import { isSupabaseConfigured } from "../../lib/supabase/client";

export function SocialAuth({ disabled }: { disabled?: boolean }) {
  const [isApple, setIsApple] = useState(false);
  const [busy, setBusy] = useState<"google" | "apple" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = `${navigator.platform || ""} ${navigator.userAgent || ""}`;
    setIsApple(/Mac|iPhone|iPad|iPod/.test(ua));
  }, []);

  async function go(provider: "google" | "apple") {
    setError(null);
    if (!isSupabaseConfigured()) {
      setError(
        `${provider === "google" ? "Google" : "Apple"} sign-in isn't configured yet. Add your Supabase credentials and enable the provider.`
      );
      return;
    }
    setBusy(provider);
    const { error } = await signInWithProvider(provider);
    if (error) {
      setError(error.message || "Couldn't start sign-in. Please try again.");
      setBusy(null);
    }
    // On success the browser redirects to the provider — no further action needed.
  }

  return (
    <div className="mt-6 flex flex-col gap-2.5">
      <button
        type="button"
        onClick={() => go("google")}
        disabled={disabled || busy !== null}
        className="btn-press inline-flex w-full items-center justify-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors disabled:opacity-60"
      >
        {busy === "google" ? (
          <Spinner />
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" />
            <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 010-4.18V7.07H2.18a11 11 0 000 9.86l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 002.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
          </svg>
        )}
        Continue with Google
      </button>

      {isApple && (
        <button
          type="button"
          onClick={() => go("apple")}
          disabled={disabled || busy !== null}
          className="btn-press inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#000] px-6 py-3 text-sm font-medium text-white hover:bg-[#111] transition-colors disabled:opacity-60"
        >
          {busy === "apple" ? (
            <Spinner light />
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path d="M16.37 1.43c0 1.14-.42 2.05-1.25 2.94-.99 1.05-2.19 1.66-3.49 1.55-.02-.11-.03-.27-.03-.43 0-1.1.48-2.27 1.27-3.1.4-.43.92-.79 1.54-1.08.62-.28 1.2-.44 1.75-.46.02.2.21.36.21.58zM20.5 17.1c-.32.73-.47 1.06-.88 1.71-.57.9-1.38 2.02-2.38 2.03-.89.01-1.12-.58-2.33-.57-1.21.01-1.46.58-2.35.57-1-.01-1.77-1.02-2.34-1.92-1.6-2.51-1.77-5.46-.78-7.03.7-1.12 1.81-1.77 2.85-1.77 1.06 0 1.73.58 2.61.58.85 0 1.37-.58 2.6-.58.92 0 1.9.5 2.6 1.37-2.28 1.25-1.91 4.5.8 5.61z" />
            </svg>
          )}
          Continue with Apple
        </button>
      )}

      {error && (
        <p className="text-xs text-[var(--color-muted)] text-center leading-relaxed mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}

function Spinner({ light }: { light?: boolean }) {
  return (
    <svg className={`h-4 w-4 animate-spin ${light ? "text-white" : "text-[var(--color-forest)]"}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
