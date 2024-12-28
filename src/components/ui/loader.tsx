import { Loader2 } from "lucide-react";
import Image from "next/image";
export function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/Bear.png"
          alt="logo"
          width={100}
          height={100}
          className="animate-pulse"
        />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
