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
    <section className="w-full md:max-w-[90%] mx-auto overflow-hidden md:rounded-3xl bg-linear-to-r from-[#1B696E] via-[#55ADAA] to-[#1B696E]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between">
          {/* Content */}
          <div className="max-w-2xl text-center md:text-left">
            {title && (
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                {description}
              </p>
            )}
          </div>

          {/* Image */}
          {backgroundImage && (
            <div className="relative h-52 w-52 shrink-0 sm:h-64 sm:w-64 md:h-72 md:w-72">
              <Image
                src={backgroundImage}
                alt={title ?? "Page Hero"}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 208px, 288px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
