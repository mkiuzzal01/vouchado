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
    <section className="relative  w-full h-[100px]  mx-auto overflow-hidden  rounded-2xl lg:max-w-[90%]  lg:min-h-[227px] lg:rounded-3xl flex items-center">
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
      <Container className="relative z-10 w-full py-10 text-white">
        <div className="flex flex-col justify-center gap-4">
          {/* Changed text-center lg:text-left to text-left */}
          <div className="max-w-xl text-left">
            {title && (
              <h1 className="text-[30px] lg:text-[48px] font-normal ">
                {title}
              </h1>
            )}

            {description && (
              <p className="mt-2 text-xs font-medium tracking-wide text-white/80 sm:mt-3 sm:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
