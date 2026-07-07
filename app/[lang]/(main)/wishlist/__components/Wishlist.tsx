"use client";
import ProductCard from "@/app/components/cards/ProductCard";
import PageHero from "@/app/components/hero/PageHero";
import Container from "@/app/components/shared/Container";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { useMemo } from "react";
import wishlistBg from "@/public/section-headers/Hero Section (2).png";

interface Props {
  lang: string;
}

export default function Wishlist({ lang }: Props) {
  const items = useAppSelector((state) => state.wishlist.items);
  const hasItems = useMemo(() => items?.length > 0, [items]);

  if (!hasItems) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <NotFoundData
          title="Your wishlist is empty"
          description="Save your favorite items to view them here later."
        />
      </div>
    );
  }

  return (
    <div>
      <PageHero backgroundImage={wishlistBg.src} title="Wishlist" />
      <Container className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item: any) => (
            <ProductCard key={item.id} lang={lang} product={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}
