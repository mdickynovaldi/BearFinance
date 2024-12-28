import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "./toogle-dark-mode";
import { IUser } from "@/interfaces";

export const Header = ({ user }: { user: IUser }) => {
  return (
    <header className="bg-slate-100 dark:bg-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Image src="/Bear.png" alt="Logo" width={100} height={100} />
          </div>
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Hello {user?.name}</h1>
          </div>
        </div>
      </div>
    </header>
  );
};
