import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { MainContent } from "@/components/ui/main-content";
export const metadata: Metadata = {
  title: "Finance App",
  description: "Finance App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col h-screen justify-between">
              <Header />
              <MainContent>{children}</MainContent>
              <Footer />
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
