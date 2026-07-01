"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="new-arrivals">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#2B2118] sm:text-xl">
            New Arrivals
          </h2>
          <p className="mt-1 text-sm text-[#A69B85]">
            Trending books among readers
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            onClick={() => scrollByAmount("left")}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EFE7D4] text-[#2B2118] transition-colors hover:bg-[#F1EADB]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollByAmount("right")}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EFE7D4] text-[#2B2118] transition-colors hover:bg-[#F1EADB]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}