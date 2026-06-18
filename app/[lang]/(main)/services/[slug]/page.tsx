import ProductCard from "@/app/components/cards/ProductCard";
import Filtered from "@/app/components/forms/quires/Filtered";
import FilterWithCategory from "@/app/components/forms/quires/FilterWithCategory";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Container from "@/app/components/shared/Container";
import SectionHeader from "@/app/components/shared/SectionHeader";
import { productItems } from "@/redux/items/ItemData";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function page({ params }: Props) {
  const { lang, slug } = await params;

  return (
    <Container>
      <SectionHeader
        title="Explore Services and Save More"
        description="Browse handpicked services for every trend, occasion and lifestyle."
      />

      <div className="mt-8">
        <FilterWithCategory />
      </div>
      <div className="flex flex-col lg:flex-row gap-2 mt-4">
        <div className="w-full lg:w-1/4">
          <Filtered />
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-3/4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productItems.map((deal) => (
              <ProductCard
                id={deal?.id}
                key={deal?.id}
                lang={lang}
                category={deal.category}
                distance={deal.distance}
                discountPercentage={deal.discountPercentage}
                endsIn={deal.endsIn}
                imageUrl={deal.imageUrl}
                location={deal.location}
                originalPrice={deal.originalPrice}
                rating={deal.rating}
                currentPrice={deal.currentPrice}
                title={deal.title}
              />
            ))}
          </div>
          <PromoSteps />
          <ReusablePagination currentPage={1} totalPages={10} />
        </div>
      </div>
    </Container>
  );
}
