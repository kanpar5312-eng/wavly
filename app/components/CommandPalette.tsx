"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Group = "Pages" | "Actions" | "Customers";

type Item = {
  id: string;
  label: string;
  sub?: string;
  group: Group;
  href: string;
  keywords: string;
  icon: React.ReactNode;
};

const ITEMS: Item[] = [
  // Pages
  { id: "dashboard", label: "Dashboard", group: "Pages", href: "/dashboard", keywords: "home overview", icon: <GridIcon /> },
  { id: "inbox", label: "Inbox", group: "Pages", href: "/inbox", keywords: "chats messages conversations", icon: <InboxIcon /> },
  { id: "automations", label: "Automations", group: "Pages", href: "/automations", keywords: "workflows auto reply", icon: <BoltIcon /> },
  { id: "reminders", label: "Smart Reminders", group: "Pages", href: "/reminders", keywords: "no-show appointment booking reminder", icon: <BellIcon /> },
  { id: "customers", label: "Customers", group: "Pages", href: "/customers", keywords: "crm contacts people", icon: <UsersIcon /> },
  { id: "broadcasts", label: "Broadcasts", group: "Pages", href: "/broadcasts", keywords: "campaign send blast offer", icon: <MegaphoneIcon /> },
  { id: "templates", label: "Templates", group: "Pages", href: "/templates", keywords: "messages library canned", icon: <GridIcon /> },
  { id: "analytics", label: "Analytics", group: "Pages", href: "/analytics", keywords: "stats reports charts metrics", icon: <ChartIcon /> },
  { id: "assistant", label: "AI Assistant", group: "Pages", href: "/assistant", keywords: "ai help chat smart", icon: <SparkleIcon /> },
  { id: "connect", label: "Connect Telegram", group: "Pages", href: "/connect", keywords: "bot token botfather link", icon: <PlugIcon /> },
  { id: "settings", label: "Account Settings", group: "Pages", href: "/settings", keywords: "profile account password", icon: <GearIcon /> },
  { id: "billing", label: "Billing", group: "Pages", href: "/billing", keywords: "plan invoice payment subscription", icon: <RupeeIcon /> },
  { id: "support", label: "Support", group: "Pages", href: "/support", keywords: "help faq question email", icon: <LifeIcon /> },
  { id: "upgrade", label: "Upgrade plan", group: "Pages", href: "/upgrade", keywords: "pricing plan pro", icon: <StarIcon /> },

  // Actions
  { id: "a-new-automation", label: "Create new automation", group: "Actions", href: "/automations", keywords: "add automation workflow", icon: <PlusIcon /> },
  { id: "a-broadcast", label: "Send a broadcast", group: "Actions", href: "/broadcasts", keywords: "campaign offer send", icon: <MegaphoneIcon /> },
  { id: "a-connect", label: "Connect a Telegram bot", group: "Actions", href: "/connect", keywords: "add bot token", icon: <PlugIcon /> },
  { id: "a-template", label: "New message template", group: "Actions", href: "/templates", keywords: "template message", icon: <PlusIcon /> },
  { id: "a-reminders", label: "Set up Smart Reminders", group: "Actions", href: "/reminders", keywords: "reminder no-show", icon: <BellIcon /> },

  // Customers (mock)
  { id: "c-priya", label: "Priya Sharma", sub: "VIP · Glow Salon", group: "Customers", href: "/inbox", keywords: "priya sharma salon", icon: <PersonIcon /> },
  { id: "c-rohan", label: "Rohan Mehta", sub: "New · Coaching", group: "Customers", href: "/inbox", keywords: "rohan mehta", icon: <PersonIcon /> },
  { id: "c-anika", label: "Dr. Anika Verma", sub: "VIP · Clinic", group: "Customers", href: "/inbox", keywords: "anika verma doctor clinic", icon: <PersonIcon /> },
  { id: "c-karthik", label: "Karthik Iyer", sub: "Regular · Tuition", group: "Customers", href: "/inbox", keywords: "karthik iyer tuition", icon: <PersonIcon /> },
  { id: "c-diya", label: "Diya Reddy", sub: "New · Spa", group: "Customers", href: "/inbox", keywords: "diya reddy spa", icon: <PersonIcon /> },
];

const GROUP_ORDER: Group[] = ["Pages", "Actions", "Customers"];

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtered + flattened (for keyboard nav) + grouped (for display)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ITEMS;
    return ITEMS.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        it.keywords.includes(q) ||
        it.group.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map: Record<Group, Item[]> = { Pages: [], Actions: [], Customers: [] };
    results.forEach((it) => map[it.group].push(it));
    return map;
  }, [results]);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Keep active index in range
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, results.length - 1)));
  }, [results.length]);

  function go(item: Item) {
    onClose();
    router.push(item.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[active];
      if (item) go(item);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  }

  if (!open) return null;

  // Build a flat index map so we can highlight the active item across groups
  let runningIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
      onKeyDown={onKeyDown}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--color-ink)]/30 backdrop-blur-sm animate-fade-up"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-cream-soft)] shadow-[0_40px_100px_-30px_rgba(20,33,28,0.5)] overflow-hidden animate-fade-up">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border-soft)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-[var(--color-muted)]">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, actions, customers…"
            className="flex-1 bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/80 outline-none"
          />
          <kbd className="rounded border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-muted)]">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[52vh] overflow-y-auto py-2">
          {results.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <div className="text-sm font-medium text-[var(--color-ink)]">No results for &ldquo;{query}&rdquo;</div>
              <div className="mt-1 text-xs text-[var(--color-muted)]">Try a page name, action, or customer.</div>
            </div>
          ) : (
            GROUP_ORDER.map((group) => {
              const items = grouped[group];
              if (!items.length) return null;
              return (
                <div key={group} className="px-2">
                  <div className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-[0.16em] font-medium text-[var(--color-muted)]">
                    {group}
                  </div>
                  {items.map((it) => {
                    runningIndex += 1;
                    const idx = runningIndex;
                    const isActive = idx === active;
                    return (
                      <button
                        key={it.id}
                        onMouseEnter={() => setActive(idx)}
                        onClick={() => go(it)}
                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                          isActive ? "bg-[var(--color-forest)]/[0.08]" : "hover:bg-[var(--color-surface)]"
                        }`}
                      >
                        <span className={`h-8 w-8 shrink-0 rounded-lg flex items-center justify-center ${isActive ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]" : "bg-[var(--color-cream-deep)]/50 text-[var(--color-forest)]"}`}>
                          {it.icon}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className={`block text-sm truncate ${isActive ? "font-medium text-[var(--color-forest)]" : "text-[var(--color-ink)]"}`}>
                            {it.label}
                          </span>
                          {it.sub && <span className="block text-[11px] text-[var(--color-muted)] truncate">{it.sub}</span>}
                        </span>
                        {isActive && (
                          <span className="flex items-center gap-1 text-[10px] text-[var(--color-muted)]">
                            <kbd className="rounded border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-1 py-0.5 font-medium">↵</kbd>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--color-border-soft)] text-[10px] text-[var(--color-muted)]">
          <span className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-1 py-0.5 font-medium">↑</kbd>
              <kbd className="rounded border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-1 py-0.5 font-medium">↓</kbd>
              to navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-1 py-0.5 font-medium">↵</kbd>
              to open
            </span>
          </span>
          <span className="flex items-center gap-1">
            <SparkleMini /> Wavly search
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Icons ---------- */
function ip() {
  return { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: "h-4 w-4" };
}
function GridIcon() { return <svg {...ip()}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>; }
function InboxIcon() { return <svg {...ip()}><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5h13l3.5 7v7a2 2 0 01-2 2h-16a2 2 0 01-2-2v-7l3.5-7z" /></svg>; }
function BoltIcon() { return <svg {...ip()}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>; }
function BellIcon() { return <svg {...ip()}><path d="M12 22a2 2 0 002-2H10a2 2 0 002 2z" /><path d="M18 16V11a6 6 0 10-12 0v5l-2 2h16l-2-2z" /></svg>; }
function UsersIcon() { return <svg {...ip()}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /></svg>; }
function MegaphoneIcon() { return <svg {...ip()}><path d="M3 11l15-6v14L3 13v-2z" /><path d="M3 11v2a3 3 0 003 3l1 4" /></svg>; }
function ChartIcon() { return <svg {...ip()}><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></svg>; }
function SparkleIcon() { return <svg {...ip()}><path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" /></svg>; }
function PlugIcon() { return <svg {...ip()}><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 01-12 0V8zM12 17v5" /></svg>; }
function GearIcon() { return <svg {...ip()}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-2.92.68 2 2 0 11-3.94 0 1.65 1.65 0 00-2.92-.68l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a2 2 0 110-3.94 1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a2 2 0 113.94 0 1.65 1.65 0 002.92.68l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a2 2 0 110 3.94z" /></svg>; }
function RupeeIcon() { return <svg {...ip()}><path d="M6 5h12M6 9h12M9 5c4 0 6 2 6 4 0 3-2 4-6 4l8 8" /></svg>; }
function LifeIcon() { return <svg {...ip()}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M14.9 9.1l4.2-4.2M4.9 19.1l4.2-4.2" /></svg>; }
function StarIcon() { return <svg {...ip()}><path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" /></svg>; }
function PlusIcon() { return <svg {...ip()}><path d="M12 5v14M5 12h14" /></svg>; }
function PersonIcon() { return <svg {...ip()}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>; }
function SparkleMini() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-[var(--color-gold)]"><path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" /></svg>; }
