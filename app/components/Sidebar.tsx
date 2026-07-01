"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Settings, X } from "lucide-react";
import ChaiLogo from "../../public/images/Chai-Logo.png";
import CompassIconOne from "../../public/images/side1.png";
import CompassIconTwo from "../../public/images/side2.png";
import CompassIconThree from "../../public/images/side3.png";
import CompassIconFour from "../../public/images/side4.png";
import CompassIconFive from "../../public/images/side5.png";
import CompassIconSix from "../../public/images/side6.png";
import CompassIconSeven from "../../public/images/side7.png";
import CompassIconEight from "../../public/images/side8.png";
import CompassIconNine from "../../public/images/side9.png";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Browse", href: "/browse", icon: CompassIconOne.src },
  { label: "New Arrivals", href: "#new-arrivals", icon: CompassIconTwo.src },
  { label: "Best Sellers", href: "#best-sellers", icon: CompassIconThree.src },
  { label: "Self Help", href: "/self-help", icon: CompassIconFour.src },
  { label: "Business", href: "#business", icon: CompassIconFive.src },
  { label: "Tech", href: "#tech", icon: CompassIconSix.src },
  { label: "Kids", href: "/kids", icon: CompassIconSeven.src },
  { label: "Classics", href: "#classics", icon: CompassIconEight.src },
  { label: "Settings", href: "/settings", icon: CompassIconNine.src },
];

interface SidebarProps {
  /** Controls the mobile slide-over drawer */
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Treat nested routes (e.g. /browse/some-book) as active too, but keep
  // "/" from matching everything.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-[#FFFBF2]
          border-r border-[#EFE7D4] transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:z-auto md:h-screen md:w-20 md:shrink-0 md:translate-x-0 md:self-start
          lg:w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo row */}
        <div className="flex items-center justify-between gap-2 px-5 py-6">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 overflow-hidden"
          >
            <Image
              src={ChaiLogo}
              alt="Chai Reader"
              priority
              className="w-24 h-auto sm:w-32 md:w-40 lg:w-48"
            />
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-[#8A7F6A] hover:bg-[#F1EADB] md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
          {NAV_ITEMS.map(({ label, href, icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                title={label}
                className={`
                  group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
                  transition-colors md:justify-center lg:justify-start
                  ${
                    active
                      ? "bg-[#2B2118] text-[#FFFBF2]"
                      : "text-[#5C5342] hover:bg-[#F1EADB]"
                  }
                `}
              >
                <Image
                  src={icon}
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] shrink-0 object-contain sm:h-5 sm:w-5"
                />
                <span className="truncate md:hidden lg:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}