"use client";

import { usePathname } from "next/navigation";
import Private from "./private";
import Public from "./public";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.includes("/auth")) {
    return <Public>{children}</Public>;
  }
  return <Private>{children}</Private>;
}
