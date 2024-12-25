import React from "react";

export function MainContent({ children }: { children: React.ReactNode }) {
  return <main className="flex-grow pb-16">{children}</main>;
}
