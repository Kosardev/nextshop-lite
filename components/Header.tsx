"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const nav = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/products/infinite", label: "Infinite" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">NextShop Lite</Link>
        <nav className="flex gap-4 text-sm">
          {nav.map(i => (
            <Link key={i.href} href={i.href}
              className={`px-2 py-1 rounded ${pathname===i.href ? "bg-black text-white" : "hover:bg-gray-100"}`}>
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}