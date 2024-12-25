"use client";

import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/auth/auth.service";
export default function Home() {
  return (
    <div>
      <Button onClick={() => AuthService.signOut()}>Sign Out</Button>
    </div>
  );
}
