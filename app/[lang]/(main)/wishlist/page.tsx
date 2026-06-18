"use client";
import ProductCard from "@/app/components/cards/ProductCard";
import PageHero from "@/app/components/hero/PageHero";
import Container from "@/app/components/shared/Container";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { useMemo } from "react";
import wishlistBg from "@/public/wishlist/wishlist.png";

export default function WishlistPage() {
  const items = useAppSelector((state) => state.wishlist.items);

  console.log(items);

  const hasItems = useMemo(() => items?.length > 0, [items]);

  if (!hasItems) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <NotFoundData
          title="Your wishlist is empty"
          description="Save your favorite items to view them here later."
        />
      </div>
    );
  }

  return (
    <div>
      <PageHero
        backgroundImage={wishlistBg.src}
        title="Wishlist"
        description="Discover how Vuchado brings you closer to unforgettable local experiences while helping you save money."
      />
      <Container className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              location={item.location ?? ""}
              rating={item.rating}
              currentPrice={item.currentPrice}
              originalPrice={item.originalPrice}
              currencySymbol={item.currencySymbol}
              discountPercentage={item.discountPercentage}
              distance={item.distance}
              endsIn={item.endsIn}
              category={item.category}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
