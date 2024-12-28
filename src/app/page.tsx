"use client";

import Drawer from "@/components/ui/drawer";
import { AuthSSRService } from "@/services/auth/authssr.service";

import React from "react";
import { useEffect } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);

  const [user, setUser] = React.useState<any>(null);

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

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Drawer />
          <h1>Hello {user?.email}</h1>
        </>
      )}
    </div>
  );
}
