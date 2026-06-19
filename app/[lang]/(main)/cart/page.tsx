"use client";
import PageHero from "@/app/components/hero/PageHero";
import Container from "@/app/components/shared/Container";
import sectionHeroImage from "@/public/hero/Hero Section.png";
import YourItems from "./__components/YourItems";
import OrderSummery from "./__components/OrderSummery";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import NotFoundData from "@/app/components/shared/NotFoundData";

export default function page() {
  const { items } = useAppSelector((state) => state.cart);

  if (!items?.length) {
    return (
      <NotFoundData
        title="Your cart is empty"
        description="Looks like you haven't added any items to your cart yet."
      />
    );
  }
  return (
    <div>
      <PageHero
        backgroundImage={sectionHeroImage.src}
        title="Cart"
        description="Discover how Vuchado brings you closer to unforgettable local experiences while helping you save money."
      />
      <Container className="py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <YourItems items={items} />
          </div>
          <div className="lg:col-span-1">
            <OrderSummery />
          </div>
        </div>
      </Container>
    </div>
  );
}
