"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAuthorBySlug } from "@/app/data/authors";
import { ChevronLeft, Heart } from "lucide-react";
import { useState } from "react";

export default function AuthorDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const author = getAuthorBySlug(slug);

  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  if (!author) {
    return (
      <div className="min-h-screen bg-[#FBF8F3] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2B2118] mb-4">
            Author Not Found
          </h1>
          <Link href="/" className="text-[#8B6F47] hover:text-[#6B5735]">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const toggleWishlist = (bookId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(bookId)) {
        newWishlist.delete(bookId);
      } else {
        newWishlist.add(bookId);
      }
      return newWishlist;
    });
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* Header with back button */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#E8DCC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5735] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
      </header>

      {/* Author Info Section */}
      <section className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 items-center">
            {/* Author Photo */}
            <div className="flex justify-center sm:col-span-1">
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={author.photo}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 192px, 224px"
                />
              </div>
            </div>

            {/* Author Info */}
            <div className="sm:col-span-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2118] mb-3">
                {author.name}
              </h1>

              {/* Bio Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-4 py-2 bg-[#FFF8E7] text-[#8B6F47] rounded-full text-sm font-medium">
                  {author.books.length} Books
                </span>
                <span className="px-4 py-2 bg-[#FFF8E7] text-[#8B6F47] rounded-full text-sm font-medium">
                  Bestselling Author
                </span>
              </div>

              {/* Description */}
              <p className="text-[#5A4A3A] text-sm sm:text-base leading-relaxed mb-6">
                {author.description}
              </p>

              {/* Additional Info */}
              <div className="bg-[#FBF8F3] p-4 rounded-lg">
                <p className="text-sm text-[#6B5735]">
                  <span className="font-semibold text-[#2B2118]">Bio:</span>{" "}
                  {author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2118] mb-2">
              Our New Releases
            </h2>
            <p className="text-[#8B6F47] text-sm sm:text-base">
              Trending books among readers
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {author.books.map((book) => (
              <div
                key={book.id}
                className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300"
              >
                {/* Book Cover */}
                <div className="relative h-48 sm:h-56 bg-gradient-to-br from-[#FFF8E7] to-[#E8DCC8] overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-[#8B6F47]/20 to-[#D4A574]/30 flex items-center justify-center">
                    <span className="text-[#8B6F47] text-xs sm:text-sm text-center px-4 font-semibold">
                      {book.title}
                    </span>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-[#2B2118] text-xs sm:text-sm line-clamp-2 mb-2">
                    {book.title}
                  </h3>
                  <p className="text-[#6B5735] text-xs line-clamp-2 mb-3">
                    {book.description}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#2B2118] text-white text-xs sm:text-sm font-medium py-2 rounded hover:bg-[#1A1410] transition-colors">
                      Read Now
                    </button>
                    <button
                      onClick={() => toggleWishlist(book.id)}
                      className={`px-3 py-2 rounded transition-colors ${
                        wishlist.has(book.id)
                          ? "bg-red-100 text-red-600"
                          : "bg-[#FBF8F3] text-[#8B6F47] hover:bg-[#F5F0E8]"
                      }`}
                    >
                      <Heart
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill={wishlist.has(book.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-[#8B6F47] to-[#6B5735] text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Discover More by {author.name}
          </h2>
          <p className="text-white/90 mb-8 text-sm sm:text-base">
            Explore all {author.books.length} books and find your next favorite read
          </p>
          <button className="bg-white text-[#8B6F47] px-8 py-3 rounded-lg font-semibold hover:bg-[#FBF8F3] transition-colors">
            View All Books
          </button>
        </div>
      </section>
    </div>
  );
}
