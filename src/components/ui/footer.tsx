import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background sticky bottom-0 left-0 w-full">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            <Link href="/" className="text-sm hover:underline">
              Home
            </Link>
            <Link href="/about" className="text-sm hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">© 2024 Your Company</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
