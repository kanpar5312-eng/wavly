"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { signIn } from "../../lib/supabase/auth";
import { isSupabaseConfigured } from "../../lib/supabase/client";
import { SocialAuth } from "../components/SocialAuth";

type FieldErrors = { email?: string; password?: string };

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      next.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      next.email = "Enter a valid email address";
    }

    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 6) {
      next.password = "Password must be at least 6 characters";
    }

    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setLoading(true);

    // Fallback when Supabase isn't configured yet (demo mode).
    if (!isSupabaseConfigured()) {
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 600);
      }, 700);
      return;
    }

    try {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        setFormError(
          /invalid login/i.test(error.message)
            ? "Wrong email or password. Please try again."
            : error.message || "Couldn't sign you in. Please try again."
        );
        setLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 600);
    } catch {
      setFormError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex-1 flex items-center justify-center px-6 py-16 overflow-hidden">
      {/* soft background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-[var(--color-gold-soft)]/25 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[420px] w-[420px] rounded-full bg-[var(--color-forest-soft)]/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo above the card */}
        <div className="flex justify-center">
          <Link href="/" aria-label="Wavly home">
            <Logo />
          </Link>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-3xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-8 sm:p-10 shadow-[0_30px_80px_-30px_rgba(20,33,28,0.18)]">
          <div className="text-center">
            <h1 className="text-2xl sm:text-[1.7rem] tracking-tight text-[var(--color-ink)]">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              Sign in to manage your Telegram automations.
            </p>
          </div>

          {formError && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                disabled={loading || success}
                placeholder="you@business.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full rounded-xl border bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 outline-none transition-all focus:ring-4 disabled:opacity-60 ${
                  errors.email
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-[var(--color-border)] focus:border-[var(--color-forest)] focus:ring-[var(--color-forest)]/10"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-medium tracking-wide text-[var(--color-ink-soft)]"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-[var(--color-forest)] hover:text-[var(--color-forest-deep)] hover:underline underline-offset-2"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  disabled={loading || success}
                  placeholder="Enter your password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`w-full rounded-xl border bg-[var(--color-surface)] px-4 py-3 pr-12 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/70 outline-none transition-all focus:ring-4 disabled:opacity-60 ${
                    errors.password
                      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-[var(--color-border)] focus:border-[var(--color-forest)] focus:ring-[var(--color-forest)]/10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--color-muted)] hover:text-[var(--color-forest)] transition-colors"
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a19.85 19.85 0 014.22-5.94" />
                      <path d="M22.54 16.88A11 11 0 0023 12s-4-8-11-8a11 11 0 00-3.06.44" />
                      <path d="M9.88 9.88a3 3 0 104.24 4.24" />
                      <path d="M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-xs text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={`mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium shadow-[0_6px_20px_-6px_rgba(20,58,47,0.45)] transition-all ${
                success
                  ? "bg-[var(--color-forest-soft)] text-[var(--color-cream-soft)]"
                  : loading
                  ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]/80 cursor-wait"
                  : "bg-[var(--color-forest)] text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5"
              }`}
            >
              {success ? (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                  Signed in
                </>
              ) : loading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeOpacity="0.25"
                      strokeWidth="3"
                    />
                    <path
                      d="M21 12a9 9 0 00-9-9"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--color-border-soft)]" />
            <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              or
            </span>
            <div className="h-px flex-1 bg-[var(--color-border-soft)]" />
          </div>

          <SocialAuth disabled={loading || success} />
        </div>

        <p className="mt-8 text-center text-sm text-[var(--color-ink-soft)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-[var(--color-forest)] hover:text-[var(--color-forest-deep)] hover:underline underline-offset-2"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
