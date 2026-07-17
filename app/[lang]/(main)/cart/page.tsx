"use client";
import PageHero from "@/app/components/hero/PageHero";
import Container from "@/app/components/shared/Container";
import section_bg from "@/public/section-headers/Hero Section (4).png";
import YourItems from "./__components/YourItems";
import OrderSummery from "./__components/OrderSummery";
interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;

  return (
    <div>
      <PageHero backgroundImage={section_bg.src} title="Cart" />
      <Container className="py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <YourItems lang={lang} />
          </div>
          <div className="lg:col-span-1">
            <OrderSummery lang={lang} />
          </div>
        </div>
      </Container>
    </div>
  );
}
