"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import SpeakOne from "../../public/images/Speak1.png";
import SpeakTwo from "../../public/images/Speak2.png";
import SpeakThree from "../../public/images/Speak3.png";
import SpeakFour from "../../public/images/Speak4.png";
import SpeakFive from "../../public/images/Speak5.png";
import SpeakSix from "../../public/images/Speak6.png";

type AuthorCard = {
  book: string;
  author: string;
  authorPhoto: string;
  cover: string;
};

const AUTHORS: AuthorCard[] = [
  {
    book: "The Adventures of Tom Sawyer",
    author: "Morgan Housel",
    authorPhoto: SpeakOne.src,
    cover: SpeakTwo.src,
  },
  {
    book: "The Art of War",
    author: "Morgan Housel",
    authorPhoto: SpeakThree.src,
    cover: SpeakFour.src,
  },
  {
    book: "Thirukkural",
    author: "Morgan Housel",
    authorPhoto: SpeakFive.src,
    cover: SpeakSix.src,
  },
];

export default function SpeakWithAuthors() {
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
    <section>
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-bold text-[#2B2118] sm:text-xl">
          Speak with Authors
        </h2>

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
        {AUTHORS.map((item, i) => (
          <div
            key={i}
            className="flex w-64 shrink-0 snap-start flex-col rounded-2xl border border-[#EFE7D4] bg-white p-3 sm:w-72 lg:w-80"
          >
            <div className="relative flex aspect-[16/10] gap-1 overflow-hidden rounded-xl bg-[#EFE7D4]">
              <div className="relative w-1/2 overflow-hidden rounded-l-xl">
                <Image
                  src={item.authorPhoto}
                  alt={item.author}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 160px, 128px"
                />
              </div>
              <div className="relative w-1/2 overflow-hidden rounded-r-xl">
                <Image
                  src={item.cover}
                  alt={item.book}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 160px, 128px"
                />
              </div>
              <button
                aria-label="Add to wishlist"
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#2B2118] shadow-sm hover:text-[#B8763E]"
              >
                <Heart size={14} />
              </button>
            </div>

            <p className="mt-3 truncate text-sm font-medium text-[#2B2118]">
              {item.book}
            </p>
            <p className="truncate text-xs text-[#A69B85]">by {item.author}</p>

            <button className="mt-3 w-full rounded-lg bg-[#2B2118] py-2 text-xs font-medium text-[#FFFBF2] transition-colors hover:bg-[#443627]">
              Chat with Me
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}