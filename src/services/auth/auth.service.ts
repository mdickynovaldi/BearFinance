import { supabaseDBConfig } from "@/config/supabase-db-config";

export class AuthService {
  static async getUserProfile(userId: string) {
    const { data, error } = await supabaseDBConfig
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return { data, error };
  }

  static async getUser() {
    const { data, error } = await supabaseDBConfig.auth.getUser();
    return { data, error };
  }

  static async isAuthenticated() {
    const { data, error } = await supabaseDBConfig.auth.getSession();
    return { data, error };
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabaseDBConfig.auth.signInWithPassword({
      email,
      password,
    });

    return { data, error };
  }

  static async signUp(email: string, password: string) {
    const { data, error } = await supabaseDBConfig.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/email-verification`,
      },
    });
    return { data, error };
  }

  static async signOut() {
    const { error } = await supabaseDBConfig.auth.signOut();
    return { error };
  }
}
