"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HeroImg from "../../public/images/Hero-book.png";
import Recommendedsection from "./Recommendedsection";
import BestSellers from "./Bestsellers";
import SpeakWithAuthors from "./Speakwithauthors";
import CrimeFiction from "./CrimeFiction";
import NonFiction from "./NonFiction";
import FamousAuthors from "./Famousauthors";
import Academics from "./Academics";
import Business from "./Business";
import TechBooks from "./TechBooks";
import Classics from "./Classics";
import NewArrivals from "./NewArraival";

const GENRES = [
  { label: "People", image: "/images/Recommend1.png" },
  { label: "History", image: "/images/Vector 11.png" },
  { label: "Politics", image: "/images/Business1.png" },
  { label: "Kids", image: "/images/NewArrival4.png" },
  { label: "Education", image: "/images/Tech1.png" },
];

type Book = {
  title: string;
  author: string;
  cover: string;
};

export default function MainContent() {
  return (
    <div className="space-y-10">
      {/* Hero div */}
      <section className="flex flex-col items-center gap-6 rounded-3xl bg-[#FBF3E3] p-6 sm:flex-row sm:justify-between sm:p-10">
        <div className="max-w-md text-center sm:text-left">
          <h1 className="text-2xl leading-snug text-[#2B2118] sm:text-3xl">
            The Echo of our <span className="font-bold">Silent Pages</span>
          </h1>
          <p className="mt-3 text-sm text-[#7A7060] sm:text-base">
            A global publishing technology pavilion designed to run alongside
            major international book fairs
          </p>
          <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#2B2118] hover:gap-3 transition-all">
            Explore More
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="relative h-80 w-80 shrink-0 sm:h-52 sm:w-52">
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/Vector 11.png')",
            }}
          />
          <Image
            src={HeroImg}
            alt="Life of the Wild book cover"
            fill
            className="object-contain"
            sizes="(min-width: 640px) 208px, 160px"
          />
        </div>
      </section>

      {/* Genres div */}
      <section>
        <h2 className="text-lg font-semibold text-[#2B2118] sm:text-xl">
          Dive into Different Genres
        </h2>

        <div className="mt-4 flex gap-25 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible">
          {GENRES.map((genre) => (
            <button
              key={genre.label}
              className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full px-6 py-4 text-sm font-medium text-[#FFFBF2] transition-all hover:brightness-95 sm:min-w-[120px]"
              style={{
                backgroundImage: `linear-gradient(rgba(43, 33, 24, 0.72), rgba(43, 33, 24, 0.72)), url('${genre.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {genre.label}
            </button>
          ))}
        </div>
      </section>

      <NewArrivals />
      <Recommendedsection />
      <BestSellers />
      <SpeakWithAuthors />
      <CrimeFiction />
      <NonFiction />
      <FamousAuthors />
      <Academics />
      <Business />
      <TechBooks />
      <Classics />
    </div>
  );
}
