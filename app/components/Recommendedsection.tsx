"use client";

import RecommendedSlider from "./Recommendedslider";

export default function RecommendedSection() {
  return (
    <div className="-mr-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mr-6 sm:pr-6 md:mr-0 md:pr-0">
      <div className="w-[88%] shrink-0 snap-start sm:w-[70%] md:w-1/2">
        <RecommendedSlider bgClassName="bg-[#FBF0E4]" />
      </div>
      <div className="w-[88%] shrink-0 snap-start sm:w-[70%] md:w-1/2">
        <RecommendedSlider
          title="Recommended For You"
          bgClassName="bg-[#DDEEF7]"
        />
      </div>
    </div>
  );
}