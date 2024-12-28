import { HomeIcon, Settings, User } from "lucide-react";
import { Button } from "./button";
import MinimalistDrawer from "./minimalist-drawer";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { AuthSSRService } from "@/services/auth/authssr.service";
import { toast } from "@/hooks/use-toast";
import { ModeToggle } from "./toogle-dark-mode";

export default function Drawer() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  async function handleSignOut() {
    try {
      setIsLoading(true);
      await AuthSSRService.signOut();
      toast({
        title: "Signed out successfully",
        description: "You are now signed out",
      });
      router.push("/auth/sign-in");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while signing out",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MinimalistDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Explore
        </h2>
      </div>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <div
                className={`flex gap-3 items-center p-2 cursor-pointer ${
                  pathname === item.href ? "bg-purple-500 text-white" : ""
                }`}
                onClick={() => {
                  router.push(item.href);
                  setIsDrawerOpen(false);
                }}
              >
                <item.icon />
                {item.name}
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Get in touch
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Have questions? We're here to help!
        </p>
        <Button className="w-full" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </MinimalistDrawer>
  );
}
