import ProductCard from "@/app/components/cards/ProductCard";
import Filtered from "@/app/components/forms/quires/Filtered";
import FilterWithCategory from "@/app/components/forms/quires/FilterWithCategory";
import ModernSearch from "@/app/components/forms/quires/ModernSearch";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Container from "@/app/components/shared/Container";
import { productItems } from "@/redux/items/ItemData";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  return (
    <div>
      <Container>
        <ModernSearch />
        <div className="mt-8">
          <FilterWithCategory />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 mt-4">
          <div className="w-full lg:w-1/4">
            <Filtered />
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {productItems.map((deal, index) => (
                <ProductCard
                  id={`deal-${index}`}
                  lang={lang}
                  key={`deal-${index}`}
                  imageUrl={deal.imageUrl}
                  category={deal.category}
                  title={deal.title}
                  rating={deal.rating}
                  location={deal.location}
                  currentPrice={deal.currentPrice}
                  originalPrice={deal.originalPrice}
                  discountPercentage={deal.discountPercentage}
                  distance={deal.distance}
                  endsIn={deal.endsIn}
                />
              ))}
            </div>
            <PromoSteps />
            <ReusablePagination currentPage={1} totalPages={10} />
          </div>
        </div>
      </Container>
    </div>
  );
}
