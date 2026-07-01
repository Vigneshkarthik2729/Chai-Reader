"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import TechOne from "../../public/images/Tech1.png";
import TechTwo from "../../public/images/Tech2.png";
import TechThree from "../../public/images/Tech3.png";
import TechFour from "../../public/images/Tech4.png";
import TechFive from "../../public/images/Tech5.png";

type BestSeller = {
  title: string;
  category: string;
  author: string;
  cover: string;
};

const BEST_SELLERS: BestSeller[] = [
  {
    title: "A Million to One",
    category: "The Psychology of Money",
    author: "Morgan Housel",
    cover: TechOne.src,
  },
  {
    title: "The Richest Man in Babylon",
    category: "The Psychology of Money",
    author: "Morgan Housel",
    cover: TechTwo.src,
  },
  {
    title: "I Know How This Story Ends",
    category: "The Psychology of Money",
    author: "Morgan Housel",
    cover: TechThree.src,
  },
  {
    title: "Memory",
    category: "The Psychology of Money",
    author: "Morgan Housel",
    cover: TechFour.src,
  },
  {
    title: "A Girl Named Harper",
    category: "The Psychology of Money",
    author: "Morgan Housel",
    cover: TechFive.src,
  },
];

export default function TechBooks() {
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
    <section id="tech">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#2B2118] sm:text-xl">
            Tech Books
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

      <div
        ref={scrollRef}
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {BEST_SELLERS.map((book, i) => (
          <div
            key={i}
            className="flex w-40 shrink-0 snap-start flex-col rounded-2xl border border-[#EFE7D4] bg-white p-3 sm:w-44 lg:w-48"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#EFE7D4]">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 192px, (min-width: 640px) 176px, 160px"
              />
              <button
                aria-label="Add to wishlist"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#2B2118] shadow-sm hover:text-[#B8763E]"
              >
                <Heart size={14} />
              </button>
            </div>

            <p className="mt-3 truncate text-xs text-[#A69B85]">
              {book.category}
            </p>
            <p className="truncate text-sm font-semibold text-[#2B4C7E]">
              {book.author}
            </p>

            <button className="mt-3 w-full rounded-lg bg-[#2B2118] py-2 text-xs font-medium text-[#FFFBF2] transition-colors hover:bg-[#443627]">
              Read &amp; Chat
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}