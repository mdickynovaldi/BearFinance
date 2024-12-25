import { supabaseDBConfig } from "@/app/config/supabase-db-config";

export class AuthService {
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
