"use client";
import ProductCard from "@/app/components/cards/ProductCard";
import PageHero from "@/app/components/hero/PageHero";
import Container from "@/app/components/shared/Container";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { useMemo } from "react";
import wishlistBg from "@/public/section-headers/Hero Section (2).png";
import { IDeals } from "@/redux/types/deals";

interface Props {
  lang: string;
  items: IDeals[];
  t?: any;
}

export default function Wishlist({ lang, items, t }: Props) {
  const hasItems = useMemo(() => items?.length > 0, [items]);

  if (!hasItems) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <NotFoundData
          title={t?.wishlist?.empty_title || "Your wishlist is empty"}
          description={t?.wishlist?.empty_desc || "Save your favorite items to view them here later."}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHero backgroundImage={wishlistBg.src} title={t?.wishlist?.title || "Wishlist"} />
      <Container className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item: IDeals) => (
            <ProductCard key={item.id} lang={lang} product={item} />
          ))}
        </div>
      </Container>
    </div>
  );
}
