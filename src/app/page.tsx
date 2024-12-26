"use client";

import { Button } from "@/components/ui/button";
import { AuthSSRService } from "@/services/auth/authssr.service";

import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      setIsLoading(true);
      const user = await AuthSSRService.getUser();
      if (user.error) {
        throw new Error(user.error.message);
      }

      setUser(user.data?.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      setIsLoading(true);
      await AuthSSRService.signOut();
      router.push("/auth/sign-in");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Home</h1>
          <p>Welcome, {user?.email}</p>
          <p>User ID: {user?.id}</p>
          <p>Email Confirmed At: {user?.email_confirmed_at}</p>
          <p>role: {user?.role}</p>

          <Button onClick={handleSignOut}>Sign Out</Button>
        </>
      )}
    </div>
  );
}
