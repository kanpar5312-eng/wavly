"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { isSupabaseConfigured } from "../../lib/supabase/client";
import { getSession, getProfile, signOut } from "../../lib/supabase/auth";
import { CommandPalette } from "./CommandPalette";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Connect", href: "/connect" },
  { label: "Automations", href: "/automations" },
  { label: "Inbox", href: "/inbox" },
  { label: "Customers", href: "/customers" },
  { label: "Broadcasts", href: "/broadcasts" },
  { label: "Analytics", href: "/analytics" },
  { label: "Assistant", href: "/assistant", highlight: true },
];

type Notif = {
  id: string;
  title: string;
  detail: string;
  time: string;
  href: string;
  read: boolean;
  kind: "booking" | "payment" | "reminder" | "customer" | "system";
};

const initialNotifs: Notif[] = [
  { id: "n1", title: "New booking received", detail: "Priya booked a facial for Sat, 6:00 PM.", time: "2 min ago", href: "/inbox", read: false, kind: "booking" },
  { id: "n2", title: "Payment received", detail: "₹1,200 from Dr. Anika Verma.", time: "1 h ago", href: "/billing", read: false, kind: "payment" },
  { id: "n3", title: "Reminders sent", detail: "8 appointment reminders went out.", time: "3 h ago", href: "/reminders", read: false, kind: "reminder" },
  { id: "n4", title: "New customer", detail: "Aarav joined from your Telegram link.", time: "Yesterday", href: "/customers", read: true, kind: "customer" },
  { id: "n5", title: "Welcome to Wavly 🌿", detail: "Connect your first bot to get started.", time: "2 days ago", href: "/connect", read: true, kind: "system" },
];

export function DashboardNav({ userName }: { userName?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState<Notif[]>(initialNotifs);
  const [scrolled, setScrolled] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  const unreadCount = notifs.filter((n) => !n.read).length;

  // Global ⌘K / Ctrl+K to open the command palette
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Protect dashboard routes + sync the real profile name into localStorage.
  useEffect(() => {
    if (!isSupabaseConfigured()) return; // demo mode — no gating
    let cancelled = false;
    (async () => {
      const session = await getSession();
      if (cancelled) return;
      if (!session) {
        router.replace("/signin");
        return;
      }
      const profile = await getProfile();
      if (cancelled || !profile) return;
      if (typeof window !== "undefined") {
        if (profile.full_name) window.localStorage.setItem("wavly.userName", profile.full_name);
        if (profile.business_type) window.localStorage.setItem("wavly.businessType", profile.business_type);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSignOut() {
    setProfileOpen(false);
    if (isSupabaseConfigured()) {
      try {
        await signOut();
      } catch {
        /* ignore */
      }
    }
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("wavly.userName");
      window.localStorage.removeItem("wavly.businessType");
      window.localStorage.removeItem("wavly.struggle");
    }
    router.replace("/signin");
  }

  const initial = (userName || "P").trim().charAt(0).toUpperCase();

  return (
    <header
      className={`sticky top-0 z-40 transition-shadow duration-300 ${
        scrolled
          ? "shadow-[0_1px_0_0_var(--color-border-soft),0_18px_30px_-24px_rgba(20,33,28,0.12)]"
          : "shadow-none"
      } bg-[var(--color-cream)]/85 backdrop-blur-md border-b border-[var(--color-border-soft)]`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5 lg:px-10">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" aria-label="Wavly dashboard">
            <Logo />
          </Link>
        </div>

        <ul className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const highlight = "highlight" in item && item.highlight;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-all duration-200 ${
                    active
                      ? "text-[var(--color-forest)] bg-[var(--color-forest)]/[0.08]"
                      : highlight
                      ? "text-[var(--color-forest)] hover:bg-[var(--color-forest)]/[0.06]"
                      : "text-[var(--color-ink-soft)] hover:text-[var(--color-forest)] hover:bg-[var(--color-forest)]/[0.04]"
                  }`}
                >
                  {highlight && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3 text-[var(--color-gold)]"
                    >
                      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
                    </svg>
                  )}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <button
            aria-label="Search"
            onClick={() => setCmdOpen(true)}
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-3 py-1.5 text-xs text-[var(--color-muted)] hover:border-[var(--color-border)] hover:text-[var(--color-ink-soft)] transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            Search
            <kbd className="rounded border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-ink-soft)]">
              ⌘K
            </kbd>
          </button>

          <div className="relative">
            <button
              aria-label="Notifications"
              aria-expanded={notifOpen}
              onClick={() => {
                setNotifOpen((v) => !v);
                setProfileOpen(false);
              }}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-forest)]/[0.06] hover:text-[var(--color-forest)] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2z" />
                <path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-gold)] opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-gold)]" />
                </span>
              )}
            </button>

            {notifOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                <div className="absolute right-0 mt-2 w-[340px] z-20 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] shadow-[0_20px_50px_-20px_rgba(20,33,28,0.28)] animate-fade-up overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-soft)]">
                    <div className="text-sm font-medium text-[var(--color-ink)]">
                      Notifications
                      {unreadCount > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--color-forest)] text-[10px] font-medium text-[var(--color-cream-soft)]">
                          {unreadCount}
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))}
                        className="text-[11px] font-medium text-[var(--color-forest)] hover:text-[var(--color-forest-deep)]"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <ul className="max-h-[360px] overflow-y-auto divide-y divide-[var(--color-border-soft)]">
                    {notifs.map((n) => (
                      <li key={n.id}>
                        <Link
                          href={n.href}
                          onClick={() => {
                            setNotifs((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
                            setNotifOpen(false);
                          }}
                          className={`flex items-start gap-3 px-4 py-3 hover:bg-[var(--color-surface)] transition-colors ${
                            n.read ? "" : "bg-[var(--color-tg)]/[0.04]"
                          }`}
                        >
                          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-[var(--color-tg)]"}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-sm truncate ${n.read ? "text-[var(--color-ink-soft)]" : "font-medium text-[var(--color-ink)]"}`}>
                                {n.title}
                              </span>
                              <span className="text-[10px] text-[var(--color-muted)] shrink-0">{n.time}</span>
                            </div>
                            <div className="text-xs text-[var(--color-muted)] truncate mt-0.5">{n.detail}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="px-4 py-2.5 border-t border-[var(--color-border-soft)] text-center">
                    <span className="text-[11px] text-[var(--color-muted)]">That&apos;s everything from the last few days</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <Link
            href="/upgrade"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3.5 py-1.5 text-xs font-medium text-[var(--color-forest)] hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/15 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
            </svg>
            Upgrade
          </Link>

          <div className="relative">
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="group flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-forest)] text-sm font-medium text-[var(--color-cream-soft)] ring-2 ring-[var(--color-cream)] hover:ring-[var(--color-forest)]/20 hover:bg-[var(--color-forest-deep)] transition-all"
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
            >
              {initial}
            </button>
            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-60 z-20 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-2 shadow-[0_20px_50px_-20px_rgba(20,33,28,0.25)] animate-fade-up">
                  <div className="px-3 py-2.5 border-b border-[var(--color-border-soft)]">
                    <div className="text-sm font-medium text-[var(--color-ink)] truncate">
                      {userName || "Welcome"}
                    </div>
                    <div className="text-[11px] text-[var(--color-muted)]">
                      Free trial · 6 days left
                    </div>
                  </div>
                  <Link
                    href="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
                  >
                    Account settings
                  </Link>
                  <Link
                    href="/billing"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
                  >
                    Billing
                  </Link>
                  <Link
                    href="/support"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
                  >
                    Help & support
                  </Link>
                  <div className="my-1 h-px bg-[var(--color-border-soft)]" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left block rounded-lg px-3 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-[var(--color-forest)]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-6 w-6"
            >
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-border-soft)] bg-[var(--color-cream)]/95 backdrop-blur-md">
          <div className="px-6 py-4 flex flex-col gap-0.5">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm ${
                    active
                      ? "bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]"
                      : "text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </header>
  );
}
