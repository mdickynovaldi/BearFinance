import { Button } from "@/components/ui/button";
import { createClient } from "@/config/supabase-server-config";

export default async function ProfilePage() {
  const { data, error } = await (await createClient()).auth.getUser();
  let user = null;

  if (data) {
    const userProfileResponse = await (await createClient())
      .from("user_profiles")
      .select("*")
      .eq("id", data.user?.id!)
      .single();

    user = { ...data?.user, profile: userProfileResponse.data };
  } else {
    console.log(error?.message);
  }
  return (
    <div>
      Welcome
      {user && (
        <>
          <h1>Home</h1>
          <p>Welcome, {user?.email}</p>
          <p>User ID: {user?.id}</p>
          <p>Email Confirmed At: {user?.email_confirmed_at}</p>
          <p>role: {user?.role}</p>
          <p>First Name: {user?.profile?.name}</p>
          <Button>Sign Out</Button>
        </>
      )}
    </div>
  );
}
