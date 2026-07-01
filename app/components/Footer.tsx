"use client";

import Link from "next/link";
import Image from "next/image";
import FooterLogo from "../../public/images/Chai-Logo.png";

const LINK_COLUMNS = [
  {
    heading: "Quick Links",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Home", href: "/" },
      { label: "FAQ", href: "/faq" },
      { label: "Support / Help Center", href: "/support" },
    ],
  },
  {
    heading: "For Partners",
    links: [
      { label: "For Authors", href: "/partners/authors" },
      { label: "For Publishers", href: "/partners/publishers" },
      { label: "Become a Partner", href: "/partners/become" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F4F6FC]">
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16 md:pb-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={FooterLogo}
                alt="Chai Reader"
                priority
                className="w-24 h-auto sm:w-28 md:w-32 lg:w-36"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6B7280]">
              Chai Reader is an AI-powered book commerce platform designed to
              transform how people discover and experience books—through
              reading, chatting with books, and more. It is owned and
              operated by Ailaysa Technologies Pvt Ltd.
            </p>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-[#1F2937]">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6B7280] transition-colors hover:text-[#2B4C7E]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative layered waves */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-40 md:h-48"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M0,120 C240,60 480,160 720,100 C960,40 1200,140 1440,90 L1440,200 L0,200 Z"
            className="fill-[#C9D6F5]"
          />
          <path
            d="M0,150 C240,190 480,110 720,150 C960,190 1200,120 1440,150 L1440,200 L0,200 Z"
            className="fill-[#A9BDEF]"
          />
          <path
            d="M0,175 C240,140 480,195 720,170 C960,145 1200,190 1440,170 L1440,200 L0,200 Z"
            className="fill-[#7D95E0]"
          />
        </svg>
      </div>
    </footer>
  );
}