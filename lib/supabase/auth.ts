import { getSupabaseClient } from "./client";

export type Profile = {
  id: string;
  full_name: string | null;
  business_type: string | null;
  struggle: string | null;
};

/** Create a new account. Stores full_name in user metadata (trigger copies it to profiles). */
export async function signUp(email: string, password: string, fullName: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });
  return { data, error };
}

/** Sign in with email + password. */
export async function signIn(email: string, password: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

/** Start an OAuth sign-in (Google / Apple). Redirects to the provider. */
export async function signInWithProvider(provider: "google" | "apple") {
  const supabase = getSupabaseClient();
  const redirectTo =
    typeof window !== "undefined"
      ? `${window.location.origin}/auth/callback`
      : undefined;
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });
  return { error };
}

/** Sign out the current user. */
export async function signOut() {
  const supabase = getSupabaseClient();
  await supabase.auth.signOut();
}

/** Get the current session (null if not logged in). */
export async function getSession() {
  const supabase = getSupabaseClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/** Get the current user's profile row. */
export async function getProfile(): Promise<Profile | null> {
  const supabase = getSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, business_type, struggle")
    .eq("id", user.id)
    .single();

  return (data as Profile) ?? { id: user.id, full_name: null, business_type: null, struggle: null };
}

/** Update the current user's profile (business type, struggle, name). */
export async function updateProfile(updates: Partial<Omit<Profile, "id">>) {
  const supabase = getSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: new Error("Not signed in") };

  const { error } = await supabase
    .from("profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  return { error };
}
