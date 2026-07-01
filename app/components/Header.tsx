"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Search, Heart, ShoppingCart } from "lucide-react";
// import { getBookBySlug } from "../lib/book-data";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = segments.map((segment, index) => {
    if (segments[0] === "author" && index === 0) {
      return { label: "Authors", href: "/" };
    }
    if (segments[0] === "author" && index === 1) {
      return {
        label: segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
        href: pathname,
      };
    }
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return { label, href: `/${segments.slice(0, index + 1).join("/")}` };
  });

  const breadcrumbs =
    pathname === "/" ? [] : [{ label: "Home", href: "/" }, ...breadcrumbItems];

  return (
    <header className="sticky top-0 z-30 border-b border-[#EFE7D4] bg-[#FFFBF2]/90 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3 md:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-[#2B2118] hover:bg-[#F1EADB] md:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
            <ol className="flex items-center gap-1.5 overflow-x-auto text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {breadcrumbs.map((item, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <li key={item.href + i} className="flex shrink-0 items-center gap-1.5">
                    {isLast ? (
                      <span className="font-medium capitalize text-[#2B2118]">
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="capitalize text-[#A69B85] transition-colors hover:text-[#2B2118]"
                      >
                        {item.label}
                      </Link>
                    )}
                    {!isLast && (
                      <ChevronRight size={14} className="text-[#D8CFB8]" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : (
          /* Search bar */
          <div className="relative max-w-xl flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#A69B85]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search book title or author..."
              className="w-full rounded-full border border-[#EFE7D4] bg-white py-2 pl-9 pr-4 text-sm text-[#2B2118] placeholder:text-[#A69B85] focus:border-[#2B2118] focus:outline-none"
            />
          </div>
        )}

        {/* Right side actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            className="hidden rounded-full p-2 text-[#2B2118] hover:bg-[#F1EADB] sm:inline-flex"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </button>
          <button
            className="hidden rounded-full p-2 text-[#2B2118] hover:bg-[#F1EADB] sm:inline-flex"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
          </button>
          <button className="rounded-full bg-[#2B2118] px-4 py-2 text-sm font-medium text-[#FFFBF2] transition-colors hover:bg-[#443627] sm:px-5">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}