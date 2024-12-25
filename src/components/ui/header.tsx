import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "./toogle-dark-mode";

export const Header = () => {
  return (
    <header className="bg-slate-100 dark:bg-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Image src="/Bear.png" alt="Logo" width={100} height={100} />
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-500 hover:text-gray-900 dark:text-primary dark:hover:text-gray-400"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-500 hover:text-gray-900 dark:text-primary dark:hover:text-gray-400"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-gray-500 hover:text-gray-900 dark:text-primary dark:hover:text-gray-400"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-gray-500 hover:text-gray-900 dark:text-primary dark:hover:text-gray-400"
            >
              Contact
            </Link>
          </nav>
          <ModeToggle />
          <div className="flex items-center">
            <Button variant="outline" className="ml-4">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
