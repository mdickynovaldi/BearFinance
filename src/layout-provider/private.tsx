import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import { getLoginUser } from "@/lib/users";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Loader } from "@/components/ui/loader";
import { IUser } from "@/interfaces";
import React from "react";

export default function Private({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchUser = async () => {
    try {
      console.log("fetchUser");
      setLoading(true);
      const response: any = await getLoginUser();
      console.log(response);
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      toast({
        title: "Failed to get user",
        description: "Please login to continue",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header user={user!} />
      {children}
      <Footer />
    </div>
  );
}
