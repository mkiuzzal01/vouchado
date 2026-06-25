"use client";

import Image from "next/image";
import Container from "../shared/Container";

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
    <section className="w-full md:max-w-[90%] mx-auto overflow-hidden rounded-2xl md:rounded-3xl bg-linear-to-r from-[#1B696E] via-[#55ADAA] to-[#1B696E]">
      <Container className="py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          {/* Content Left */}
          <div className="max-w-xl text-center lg:text-left sm:pt-0">
            {title && (
              <h1 className="text-xl mt-5 font-bold tracking-tight text-white min-[380px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {title}
              </h1>
            )}

            {description && (
              <div className="mt-1.5 text-xs font-medium tracking-wide text-white/80 sm:mt-3 sm:text-sm">
                {description}
              </div>
            )}
          </div>

          {/* Image Right */}
          {backgroundImage && (
            <div className="relative h-32 w-full min-[400px]:h-40 sm:h-48 sm:w-72 md:h-40 md:w-96 shrink-0 self-end sm:self-center">
              <Image
                src={backgroundImage}
                alt={title ?? "Page Hero Graphics"}
                fill
                priority
                className="object-contain  sm:object-right"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
