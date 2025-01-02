"use server";

import { createClient } from "@/config/supabase-server-config";
export async function resetPassword(code: string, password: string) {
  try {
    const supabaseServer = await createClient();
    const { data, error } = await supabaseServer.auth.exchangeCodeForSession(
      code
    );
    if (error) {
      throw error;
    }
    const { error: updateError } = await supabaseServer.auth.updateUser({
      password: password,
    });
    if (updateError) {
      throw updateError;
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export async function getLoginUser() {
  try {
    const supabaseServer = await createClient();
    const response = await supabaseServer.auth.getUser();

    const userProfileResponse = await (await createClient())
      .from("user_profiles")
      .select("*")
      .eq("id", response.data.user?.id!)
      .single();

    console.log(userProfileResponse.data);

    const user = { ...response.data.user, ...userProfileResponse.data };
    return { data: user };
  } catch (error) {
    return error;
  }
}
