"use client";

import Image from "next/image";

interface PageHeroProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
}

export default function PageHero({
  title,
  description,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative w-full max-w-full 2xl:w-[1856px] mx-auto rounded-2xl sm:rounded-[32px] py-10 sm:py-16 2xl:py-[80px] overflow-hidden mt-4 sm:mt-[24px]">
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={title || "Hero Background"}
          fill
          priority
          className="object-cover object-right"
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full text-white px-6 sm:px-12 2xl:px-0 2xl:pl-[120px]">
        <div className="flex flex-col justify-center gap-4">
          <div>
            {title && (
              <h1 className="text-2xl sm:text-[30px] lg:text-[48px] font-bold leading-tight">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-2 text-xs font-medium tracking-wide sm:mt-3 sm:text-sm max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
