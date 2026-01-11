import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b bg-white text-black flex items-center px-6 gap-6 z-50">
      <Link href="/explore" className="font-medium hover:underline">
        Explore
      </Link>
      <Link href="/rank" className="font-medium hover:underline">
        Rank
      </Link>
      <Link href="/watched" className="font-medium hover:underline">
        Watched
      </Link>
    </nav>
  );
}
