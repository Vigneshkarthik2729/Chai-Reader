"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import RecommendedOne from "../../public/images/Recommend1.png";
import RecommendedTwo from "../../public/images/Recommend2.png";
import RecommendedThree from "../../public/images/Recommend3.png";
import RecommendedFour from "../../public/images/Recommend4.png";
import RecommendedFive from "../../public/images/Recommend5.png";
import RecommendedSix from "../../public/images/Recommend6.png";

type Book = {
  title: string;
  author: string;
  cover: string;
};

const RECOMMENDED: Book[] = [
  { title: "Five Feet Apart", author: "Rachel Lippincott", cover: RecommendedOne.src },
  { title: "The Greatest Books of Ancient India", author: "Dr. Pradeep Chakravarthy", cover: RecommendedTwo.src },
  { title: "Looking for La La", author: "Ellie Campbell", cover: RecommendedThree.src },
  { title: "Curtain Call", author: "Denise Grover Swank", cover: RecommendedFour.src },
  { title: "Find Your Treasure", author: "Kate Searle", cover: RecommendedFive.src },
  { title: "The Art of War", author: "Sun Tzu", cover: RecommendedSix.src },
];

interface RecommendedSliderProps {
  title?: string;
  subtitle?: string;
  bgClassName?: string;
}

export default function RecommendedSlider({
  title = "Recommended For You",
  subtitle = "A global publishing technology pavilion designed to run alongside major international book fairs.",
  bgClassName = "bg-[#FBF0E4]",
}: RecommendedSliderProps) {
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
    <div className={`h-full w-full rounded-3xl ${bgClassName} p-6 sm:p-8`}>
      <h2 className="text-lg font-bold text-[#2B2118] sm:text-xl">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-[#7A7060]">{subtitle}</p>

      <div className="relative mt-5">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {RECOMMENDED.map((book, i) => (
            <div
              key={i}
              className="w-32 shrink-0 snap-start sm:w-36 lg:w-40"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#EFE7D4] shadow-md">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 128px"
                />
              </div>
              <p className="mt-2 truncate text-sm font-medium text-[#2B2118]">
                {book.title}
              </p>
              <p className="truncate text-xs text-[#A69B85]">{book.author}</p>
            </div>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={() => scrollByAmount("right")}
          aria-label="Next books"
          className="absolute right-0 top-[35%] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#2B2118] shadow-md transition-transform hover:scale-105 sm:flex"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}