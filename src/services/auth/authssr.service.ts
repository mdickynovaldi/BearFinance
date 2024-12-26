import { createClient } from "@/config/supabase-browser-config";

export class AuthSSRService {
  static async signInWithPassword(email: string, password: string) {
    const { data, error } = await createClient().auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  static async getUser() {
    const { data, error } = await createClient().auth.getUser();
    return { data, error };
  }

  static async signOut() {
    const { error } = await createClient().auth.signOut();
    return { error };
  }

  static async getUserProfile(userId: string) {
    const { data, error } = await createClient()
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();
    return { data, error };
  }
}
