"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DashboardNav } from "../components/DashboardNav";

type Status = "Active" | "Inactive";

type Tag = "VIP" | "Regular" | "New" | "Returning" | "Wholesale" | "Walk-in";

type Customer = {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  phone: string;
  lastMessage: string;
  lastMessageTime: string;
  interactions: number;
  tags: Tag[];
  status: Status;
  joined: string;
  ltv?: string;
};

const ALL_TAGS: Tag[] = ["VIP", "Regular", "New", "Returning", "Wholesale", "Walk-in"];

const TAG_STYLES: Record<Tag, { bg: string; text: string }> = {
  VIP: { bg: "bg-[var(--color-gold)]/15", text: "text-[var(--color-gold)]" },
  Regular: { bg: "bg-[var(--color-forest)]/[0.08]", text: "text-[var(--color-forest)]" },
  New: { bg: "bg-[#e3eee5]", text: "text-[#2c6b48]" },
  Returning: { bg: "bg-[var(--color-cream-deep)]/60", text: "text-[var(--color-ink-soft)]" },
  Wholesale: { bg: "bg-[#e8dec3]", text: "text-[#8a6c2c]" },
  "Walk-in": { bg: "bg-[#e1dfd6]", text: "text-[var(--color-muted)]" },
};

const initialCustomers: Customer[] = [
  {
    id: "u1",
    name: "Priya Sharma",
    initials: "PS",
    avatarBg: "bg-[var(--color-forest)]",
    phone: "+91 98765 12340",
    lastMessage: "6 PM works perfect ✨",
    lastMessageTime: "2 min ago",
    interactions: 24,
    tags: ["VIP", "Regular"],
    status: "Active",
    joined: "Jan 2026",
    ltv: "₹14,400",
  },
  {
    id: "u2",
    name: "Rohan Mehta",
    initials: "RM",
    avatarBg: "bg-[#9c8a5f]",
    phone: "+91 98765 22315",
    lastMessage: "Can we reschedule Tuesday?",
    lastMessageTime: "12 min ago",
    interactions: 8,
    tags: ["New"],
    status: "Active",
    joined: "Feb 2026",
    ltv: "₹3,600",
  },
  {
    id: "u3",
    name: "Dr. Anika Verma",
    initials: "AV",
    avatarBg: "bg-[#3a6b5e]",
    phone: "+91 90123 11221",
    lastMessage: "Thanks, see you tomorrow",
    lastMessageTime: "1 h ago",
    interactions: 16,
    tags: ["VIP", "Returning"],
    status: "Active",
    joined: "Nov 2025",
    ltv: "₹22,800",
  },
  {
    id: "u4",
    name: "Aanya Patel",
    initials: "AP",
    avatarBg: "bg-[#7a5a3c]",
    phone: "+91 99877 51234",
    lastMessage: "What's your address?",
    lastMessageTime: "2 h ago",
    interactions: 12,
    tags: ["Regular"],
    status: "Active",
    joined: "Mar 2026",
    ltv: "₹6,200",
  },
  {
    id: "u5",
    name: "Karthik Iyer",
    initials: "KI",
    avatarBg: "bg-[#6a7a55]",
    phone: "+91 99001 23456",
    lastMessage: "Class today?",
    lastMessageTime: "3 h ago",
    interactions: 32,
    tags: ["Regular"],
    status: "Active",
    joined: "Sep 2025",
    ltv: "₹19,200",
  },
  {
    id: "u6",
    name: "Vikram Singh",
    initials: "VS",
    avatarBg: "bg-[#4a7a6b]",
    phone: "+91 95555 67890",
    lastMessage: "Sent the payment ✓",
    lastMessageTime: "5 h ago",
    interactions: 6,
    tags: ["VIP"],
    status: "Active",
    joined: "May 2026",
    ltv: "₹19,999",
  },
  {
    id: "u7",
    name: "Diya Reddy",
    initials: "DR",
    avatarBg: "bg-[#8a5a55]",
    phone: "+91 97070 60506",
    lastMessage: "Can I book a spa session?",
    lastMessageTime: "8 h ago",
    interactions: 4,
    tags: ["New"],
    status: "Active",
    joined: "May 2026",
    ltv: "₹1,200",
  },
  {
    id: "u8",
    name: "Manav Gupta",
    initials: "MG",
    avatarBg: "bg-[#5a6a8a]",
    phone: "+91 90909 80808",
    lastMessage: "Please reschedule next week",
    lastMessageTime: "Yesterday",
    interactions: 18,
    tags: ["Returning"],
    status: "Inactive",
    joined: "Jan 2026",
    ltv: "₹8,400",
  },
  {
    id: "u9",
    name: "Sneha Krishnan",
    initials: "SK",
    avatarBg: "bg-[#a06a3a]",
    phone: "+91 98989 12345",
    lastMessage: "Loved the service! ❤️",
    lastMessageTime: "2 days ago",
    interactions: 28,
    tags: ["VIP"],
    status: "Active",
    joined: "Aug 2025",
    ltv: "₹26,400",
  },
  {
    id: "u10",
    name: "Aarav Nair",
    initials: "AN",
    avatarBg: "bg-[#3a5a6b]",
    phone: "+91 96969 67890",
    lastMessage: "Booking for next month",
    lastMessageTime: "3 days ago",
    interactions: 14,
    tags: ["Returning"],
    status: "Active",
    joined: "Dec 2025",
    ltv: "₹10,800",
  },
  {
    id: "u11",
    name: "Kavya Iyer",
    initials: "KI",
    avatarBg: "bg-[#8a4a5a]",
    phone: "+91 95051 23456",
    lastMessage: "Thank you!",
    lastMessageTime: "5 days ago",
    interactions: 22,
    tags: ["Regular"],
    status: "Active",
    joined: "Oct 2025",
    ltv: "₹16,200",
  },
  {
    id: "u12",
    name: "Arjun Pandey",
    initials: "AP",
    avatarBg: "bg-[#6a4a3a]",
    phone: "+91 92020 34567",
    lastMessage: "Need to cancel my booking",
    lastMessageTime: "1 week ago",
    interactions: 9,
    tags: ["Walk-in"],
    status: "Inactive",
    joined: "Apr 2026",
    ltv: "₹2,400",
  },
];

type Sort = "recent" | "active" | "name";
type Filter = "all" | "active" | "inactive" | "vip";

export default function CustomersPage() {
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [customers, setCustomers] = useState(initialCustomers);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openTagEditor, setOpenTagEditor] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("wavly.userName");
    if (stored) setUserName(stored);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = customers.filter((c) => {
      // Filter
      if (filter === "active" && c.status !== "Active") return false;
      if (filter === "inactive" && c.status !== "Inactive") return false;
      if (filter === "vip" && !c.tags.includes("VIP")) return false;
      // Search
      if (q) {
        return (
          c.name.toLowerCase().includes(q) ||
          c.phone.replace(/\s+/g, "").includes(q.replace(/\s+/g, "")) ||
          c.lastMessage.toLowerCase().includes(q)
        );
      }
      return true;
    });
    // Sort
    if (sort === "active") {
      list = [...list].sort((a, b) => b.interactions - a.interactions);
    } else if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [customers, query, filter, sort]);

  function toggleTag(customerId: string, tag: Tag) {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id !== customerId) return c;
        const has = c.tags.includes(tag);
        const tags = has ? c.tags.filter((t) => t !== tag) : [...c.tags, tag];
        showToast(has ? `Removed "${tag}" from ${c.name}` : `Added "${tag}" to ${c.name}`);
        return { ...c, tags };
      })
    );
  }

  function removeTag(customerId: string, tag: Tag) {
    toggleTag(customerId, tag);
  }

  const totals = useMemo(() => {
    return {
      all: customers.length,
      active: customers.filter((c) => c.status === "Active").length,
      vip: customers.filter((c) => c.tags.includes("VIP")).length,
      newThisWeek: customers.filter((c) =>
        ["u6", "u7"].includes(c.id)
      ).length,
    };
  }, [customers]);

  return (
    <div className="flex-1 flex flex-col">
      <DashboardNav userName={userName} />

      <main
        className="relative flex-1 px-6 lg:px-10 py-10 lg:py-14"
        onClick={() => {
          setOpenMenu(null);
          setOpenTagEditor(null);
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-[var(--color-gold-soft)]/15 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Link href="/dashboard" className="hover:text-[var(--color-forest)]">
              Dashboard
            </Link>
            <ChevronRight />
            <span className="text-[var(--color-ink-soft)]">Customers</span>
          </nav>

          {/* Header */}
          <section className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold)] font-medium">
                Your CRM
              </div>
              <h1 className="mt-2 text-3xl sm:text-4xl tracking-tight text-[var(--color-ink)]">
                <span className="font-display italic text-[var(--color-forest)]">
                  Customers
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[var(--color-ink-soft)] leading-relaxed">
                Everyone who&apos;s ever messaged you — sorted, tagged, and
                ready to re-engage.
              </p>
            </div>

            <button
              onClick={() => showToast("Opening customer form…")}
              className="btn-press self-start inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-[var(--color-cream-soft)] hover:bg-[var(--color-forest-deep)] hover:-translate-y-0.5 shadow-[0_8px_22px_-6px_rgba(20,58,47,0.5)] transition-all"
            >
              <PlusIcon />
              Add customer
            </button>
          </section>

          {/* Stats strip */}
          <section className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MiniStat
              label="Total customers"
              value={totals.all.toString()}
              icon={<UsersIcon />}
            />
            <MiniStat
              label="Active"
              value={totals.active.toString()}
              icon={<PulseIcon />}
              accent
            />
            <MiniStat
              label="VIPs"
              value={totals.vip.toString()}
              icon={<StarIcon />}
            />
            <MiniStat
              label="New this week"
              value="4"
              icon={<SparkleIcon />}
              hint="+24% vs last week"
            />
          </section>

          {/* Filter bar */}
          <section className="mt-8 flex flex-col gap-3">
            <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              <div className="relative lg:max-w-sm w-full">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted)]"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, phone, or message"
                  className="w-full rounded-full border border-[var(--color-border)] bg-[var(--color-cream-soft)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/80 outline-none focus:border-[var(--color-forest)] focus:ring-4 focus:ring-[var(--color-forest)]/10 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <SegmentChip active={filter === "all"} onClick={() => setFilter("all")}>
                  All
                </SegmentChip>
                <SegmentChip active={filter === "active"} onClick={() => setFilter("active")}>
                  Active
                </SegmentChip>
                <SegmentChip active={filter === "inactive"} onClick={() => setFilter("inactive")}>
                  Inactive
                </SegmentChip>
                <SegmentChip active={filter === "vip"} onClick={() => setFilter("vip")}>
                  VIPs
                </SegmentChip>

                <div className="hidden sm:block h-5 w-px bg-[var(--color-border)] mx-1" />

                <SortDropdown sort={sort} setSort={setSort} />
              </div>
            </div>
          </section>

          {/* Table */}
          <section className="mt-6">
            <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border-soft)] text-left">
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Customer
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Last message
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Interactions
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Tags
                      </th>
                      <th className="px-5 py-3 text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Status
                      </th>
                      <th className="px-5 py-3 text-right text-[11px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-soft)]">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-14 text-center">
                          <div className="text-sm font-medium text-[var(--color-ink)]">
                            No customers match your filters
                          </div>
                          <div className="mt-1 text-xs text-[var(--color-muted)]">
                            Try clearing the search or changing the filter.
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((c) => (
                        <tr
                          key={c.id}
                          className="hover:bg-[var(--color-surface)] transition-colors animate-fade-up"
                        >
                          {/* Customer */}
                          <td className="px-5 py-4 align-top">
                            <div className="flex items-center gap-3 min-w-[200px]">
                              <div
                                className={`h-10 w-10 shrink-0 rounded-full ${c.avatarBg} flex items-center justify-center text-[12px] font-medium text-[var(--color-cream-soft)]`}
                              >
                                {c.initials}
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm font-medium text-[var(--color-ink)] truncate">
                                  {c.name}
                                </div>
                                <div className="text-xs text-[var(--color-muted)] truncate">
                                  {c.phone}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Last message */}
                          <td className="px-5 py-4 align-top max-w-[260px]">
                            <div className="text-sm text-[var(--color-ink)] truncate">
                              {c.lastMessage}
                            </div>
                            <div className="text-xs text-[var(--color-muted)] mt-0.5">
                              {c.lastMessageTime}
                            </div>
                          </td>

                          {/* Interactions */}
                          <td className="px-5 py-4 align-top">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-[var(--color-ink)] tabular-nums">
                                {c.interactions}
                              </span>
                              <ActivityBars value={c.interactions} />
                            </div>
                            {c.ltv && (
                              <div className="text-xs text-[var(--color-muted)] mt-0.5">
                                LTV {c.ltv}
                              </div>
                            )}
                          </td>

                          {/* Tags */}
                          <td className="px-5 py-4 align-top">
                            <TagEditor
                              tags={c.tags}
                              open={openTagEditor === c.id}
                              onOpen={(e) => {
                                e.stopPropagation();
                                setOpenTagEditor(openTagEditor === c.id ? null : c.id);
                                setOpenMenu(null);
                              }}
                              onRemove={(t) => removeTag(c.id, t)}
                              onToggle={(t) => toggleTag(c.id, t)}
                            />
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4 align-top">
                            <StatusBadge status={c.status} />
                          </td>

                          {/* Actions */}
                          <td className="px-5 py-4 align-top text-right">
                            <div className="relative inline-block">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenMenu(openMenu === c.id ? null : c.id);
                                  setOpenTagEditor(null);
                                }}
                                aria-label="Customer actions"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/50 hover:text-[var(--color-forest)] transition-colors"
                              >
                                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                  <circle cx="5" cy="12" r="1.6" />
                                  <circle cx="12" cy="12" r="1.6" />
                                  <circle cx="19" cy="12" r="1.6" />
                                </svg>
                              </button>
                              {openMenu === c.id && (
                                <div
                                  className="absolute right-0 top-9 z-20 w-44 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-1.5 shadow-[0_18px_40px_-15px_rgba(20,33,28,0.25)] animate-fade-up text-left"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Link
                                    href="/inbox"
                                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
                                  >
                                    <ChatIcon />
                                    Open chat
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setOpenMenu(null);
                                      showToast(`Opening profile for ${c.name}…`);
                                    }}
                                    className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
                                  >
                                    <UserIcon />
                                    View profile
                                  </button>
                                  <button
                                    onClick={() => {
                                      setOpenMenu(null);
                                      showToast(`Editing ${c.name}…`);
                                    }}
                                    className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)] transition-colors"
                                  >
                                    <PencilIcon />
                                    Edit
                                  </button>
                                  <div className="my-1 h-px bg-[var(--color-border-soft)]" />
                                  <button
                                    onClick={() => {
                                      setOpenMenu(null);
                                      if (
                                        typeof window !== "undefined" &&
                                        window.confirm(`Delete ${c.name}?`)
                                      ) {
                                        setCustomers((prev) =>
                                          prev.filter((x) => x.id !== c.id)
                                        );
                                        showToast(`${c.name} deleted`);
                                      }
                                    }}
                                    className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <TrashIcon />
                                    Delete
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="border-t border-[var(--color-border-soft)] px-5 py-3 flex items-center justify-between text-[11px] text-[var(--color-muted)]">
                <div>
                  Showing{" "}
                  <span className="text-[var(--color-ink)] font-medium">
                    {filtered.length}
                  </span>{" "}
                  of{" "}
                  <span className="text-[var(--color-ink)] font-medium">
                    {customers.length}
                  </span>{" "}
                  customers
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
                  </span>
                  Auto-syncing with Telegram
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
          <div className="flex items-center gap-3 rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-medium text-[var(--color-cream-soft)] shadow-[0_18px_40px_-15px_rgba(20,33,28,0.45)]">
            <CheckIcon />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------- Sub components -------------- */

function MiniStat({
  label,
  value,
  icon,
  hint,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-4 hover:shadow-[0_16px_36px_-22px_rgba(20,33,28,0.2)] hover:-translate-y-0.5 transition-all duration-500">
      <div className="flex items-center gap-3">
        <div
          className={`h-9 w-9 rounded-lg flex items-center justify-center ${
            accent
              ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)]"
              : "bg-[var(--color-forest)]/[0.07] text-[var(--color-forest)]"
          }`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div className="font-display text-2xl leading-none tracking-tight text-[var(--color-forest)] tabular-nums">
            {value}
          </div>
          <div className="text-xs text-[var(--color-ink-soft)] mt-1">
            {label}
          </div>
        </div>
      </div>
      {hint && (
        <div className="mt-2 text-[10px] text-[var(--color-muted)]">{hint}</div>
      )}
    </div>
  );
}

function SegmentChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? "bg-[var(--color-forest)] text-[var(--color-cream-soft)] shadow-[0_4px_14px_-6px_rgba(20,58,47,0.4)]"
          : "bg-[var(--color-cream-soft)] border border-[var(--color-border-soft)] text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/30 hover:text-[var(--color-forest)]"
      }`}
    >
      {children}
    </button>
  );
}

function SortDropdown({
  sort,
  setSort,
}: {
  sort: Sort;
  setSort: (s: Sort) => void;
}) {
  const [open, setOpen] = useState(false);
  const labels: Record<Sort, string> = {
    recent: "Most recent",
    active: "Most active",
    name: "Name A-Z",
  };
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] hover:border-[var(--color-forest)]/30 hover:text-[var(--color-forest)] transition-colors"
      >
        <SortIcon />
        Sort: {labels[sort]}
        <ChevronDown />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-20 w-44 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-1.5 shadow-[0_18px_40px_-15px_rgba(20,33,28,0.25)] animate-fade-up">
          {(Object.keys(labels) as Sort[]).map((k) => (
            <button
              key={k}
              onClick={() => {
                setSort(k);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                sort === k
                  ? "bg-[var(--color-forest)]/[0.08] text-[var(--color-forest)]"
                  : "text-[var(--color-ink-soft)] hover:bg-[var(--color-cream-deep)]/40 hover:text-[var(--color-forest)]"
              }`}
            >
              {labels[k]}
              {sort === k && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ActivityBars({ value }: { value: number }) {
  const max = 35;
  const ratio = Math.min(1, value / max);
  const bars = 5;
  const lit = Math.max(1, Math.round(ratio * bars));
  return (
    <div className="flex items-end gap-0.5 h-4">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={`w-1 rounded-sm transition-all ${
            i < lit
              ? "bg-[var(--color-forest)]"
              : "bg-[var(--color-border)]"
          }`}
          style={{ height: `${(i + 1) * 25}%` }}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-forest)]/[0.08] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-forest)]">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-forest)] opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-forest)]" />
        </span>
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-cream-deep)]/40 px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-muted)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-muted)]" />
      Inactive
    </span>
  );
}

function TagPill({
  tag,
  onRemove,
}: {
  tag: Tag;
  onRemove?: () => void;
}) {
  const styles = TAG_STYLES[tag];
  return (
    <span
      className={`group inline-flex items-center gap-1 rounded-full ${styles.bg} ${styles.text} px-2 py-0.5 text-[11px] font-medium`}
    >
      {tag}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Remove ${tag} tag`}
          className="rounded-full opacity-60 group-hover:opacity-100 hover:bg-black/10 -mr-0.5"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-2.5 w-2.5"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      )}
    </span>
  );
}

function TagEditor({
  tags,
  open,
  onOpen,
  onRemove,
  onToggle,
}: {
  tags: Tag[];
  open: boolean;
  onOpen: (e: React.MouseEvent) => void;
  onRemove: (t: Tag) => void;
  onToggle: (t: Tag) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 relative">
      {tags.map((t) => (
        <TagPill key={t} tag={t} onRemove={() => onRemove(t)} />
      ))}
      <button
        onClick={onOpen}
        className="inline-flex items-center gap-1 rounded-full border border-dashed border-[var(--color-border)] bg-transparent px-2 py-0.5 text-[11px] text-[var(--color-muted)] hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-colors"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-2.5 w-2.5"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add
      </button>
      {open && (
        <div
          className="absolute left-0 top-7 z-20 w-48 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-cream-soft)] p-2 shadow-[0_18px_40px_-15px_rgba(20,33,28,0.25)] animate-fade-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-2 pb-1.5 pt-1 text-[10px] uppercase tracking-[0.14em] font-medium text-[var(--color-muted)]">
            Toggle tags
          </div>
          {ALL_TAGS.map((t) => {
            const has = tags.includes(t);
            const s = TAG_STYLES[t];
            return (
              <button
                key={t}
                onClick={() => onToggle(t)}
                className={`w-full flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left transition-colors ${
                  has
                    ? "bg-[var(--color-forest)]/[0.06]"
                    : "hover:bg-[var(--color-cream-deep)]/40"
                }`}
              >
                <span
                  className={`inline-flex items-center rounded-full ${s.bg} ${s.text} px-2 py-0.5 text-[11px] font-medium`}
                >
                  {t}
                </span>
                {has ? (
                  <span className="text-[var(--color-forest)]">
                    <CheckIcon />
                  </span>
                ) : (
                  <span className="text-[var(--color-muted)] text-[10px]">
                    Add
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------- Icons -------------- */

function svgProps() {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4",
  };
}

function UsersIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function PulseIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg {...svgProps()}>
      <path d="M12 2l2.4 4.8L20 8l-4 4 1 6-5-3-5 3 1-6-4-4 5.6-1.2L12 2z" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M21 11.5a8.5 8.5 0 11-3.4-6.8" />
      <path d="M21 4v4h-4" />
      <path d="M9 11h6M9 14h4" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function PencilIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M10 11v6M14 11v6" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function SortIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M3 6h18M6 12h12M10 18h4" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
    >
      <path d="M5 12l4 4 10-10" />
    </svg>
  );
}
