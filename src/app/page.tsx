"use client";

import Drawer from "@/components/ui/drawer";
import { getLoginUser } from "@/lib/users";

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
      const user: any = await getLoginUser();
      if (user.data) {
        setUser(user.data);
      }
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
