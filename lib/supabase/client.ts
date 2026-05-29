import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client.
 * Reads the public URL + anon key from environment variables.
 * Safe to use in client components — the anon key is public by design,
 * and your data is protected by Row-Level Security policies in Supabase.
 */
let client: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
    );
  }

  client = createBrowserClient(url, anonKey);
  return client;
}

/** True when Supabase env vars are present (so the UI can degrade gracefully). */
export function isSupabaseConfigured() {
  return (
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
