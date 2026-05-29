"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../../components/Logo";
import { getSupabaseClient, isSupabaseConfigured } from "../../../lib/supabase/client";
import { getProfile } from "../../../lib/supabase/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      router.replace("/dashboard");
      return;
    }

    let cancelled = false;
    const supabase = getSupabaseClient();

    async function finish() {
      // The browser client auto-exchanges the code in the URL.
      // Poll a few times until the session is ready.
      for (let i = 0; i < 12; i++) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (cancelled) return;
        if (session) {
          // New user (no business type yet) → onboarding; otherwise dashboard.
          const profile = await getProfile();
          if (cancelled) return;
          router.replace(profile?.business_type ? "/dashboard" : "/onboarding");
          return;
        }
        await new Promise((r) => setTimeout(r, 350));
      }
      if (!cancelled) {
        setError("Sign-in took too long. Please try again.");
      }
    }

    finish();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <div className="relative min-h-screen flex-1 flex items-center justify-center px-6 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full bg-[var(--color-tg)]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-[var(--color-gold-soft)]/20 blur-3xl" />
      </div>

      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center">
          <Logo />
        </div>

        {error ? (
          <div className="mt-8">
            <p className="text-sm text-red-600">{error}</p>
            <button
              onClick={() => router.replace("/signin")}
              className="btn-press mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-6 py-3 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] transition-colors"
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-4">
            <svg className="h-7 w-7 animate-spin text-[var(--color-forest)]" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
              <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <p className="text-sm text-[var(--color-ink-soft)]">
              Signing you in securely…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
