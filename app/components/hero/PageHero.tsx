"use client";

import Image from "next/image";
import Container from "../shared/Container";

interface IPageHero {
  title?: string;
  description?: string;
  backgroundImage?: string;
}

export default function PageHero({
  title,
  description,
  backgroundImage,
}: IPageHero) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#1B696E] via-[#55ADAA] to-[#1B696E]">
      <Container>
        <div className="flex flex-col-reverse items-center justify-between gap-8 py-10 md:flex-row md:py-14 lg:py-16">
          {/* Content */}
          <div className="max-w-2xl text-center md:text-left">
            {title && (
              <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
                {description}
              </p>
            )}
          </div>

          {/* Illustration */}
          {backgroundImage && (
            <div className="flex shrink-0 justify-center md:justify-end">
              <Image
                src={backgroundImage}
                alt={title || "Page illustration"}
                width={320}
                height={320}
                priority
                quality={100}
                className="h-auto w-[180px] sm:w-[220px] md:w-[260px] lg:w-[320px] object-contain"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
