"use client";

import Image from "next/image";
import Link from "next/link";
import { getAllAuthors } from "@/app/data/authors";

export default function FamousAuthors() {
  const authors = getAllAuthors();

  return (
    <section>
      <h2 className="text-lg font-bold text-[#2B2118] sm:text-xl">
        Famous Authors
      </h2>

      <div className="mt-5 flex snap-x snap-mandatory gap-20 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/author/${author.slug}`}
            className="group relative aspect-square w-20 shrink-0 snap-start overflow-hidden rounded-xl bg-[#EFE7D4] transition-transform duration-300 hover:scale-105 sm:w-24 lg:w-28"
          >
            <Image
              src={author.photo}
              alt={author.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 80px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pb-1.5 pt-4 transition-all duration-300 group-hover:from-black/95">
              <p className="truncate text-[11px] font-medium text-white sm:text-xs">
                {author.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}