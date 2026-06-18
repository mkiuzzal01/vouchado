import ProductCard from "@/app/components/cards/ProductCard";
import Filtered from "@/app/components/forms/quires/Filtered";
import FilterWithCategory from "@/app/components/forms/quires/FilterWithCategory";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Container from "@/app/components/shared/Container";
import SectionHeader from "@/app/components/shared/SectionHeader";
import { productItems } from "@/redux/items/ItemData";

interface Props {
  lang: string;
}

export default function page({ lang }: Props) {
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
            {productItems.map((product, index) => (
              <ProductCard
                id={product?.id}
                key={product?.id}
                lang={lang}
                category={product?.category}
                distance={product?.distance}
                discountPercentage={product?.discountPercentage}
                endsIn={product?.endsIn}
                imageUrl={product?.imageUrl}
                location={product?.location}
                originalPrice={product?.originalPrice}
                rating={product?.rating}
                currentPrice={product?.currentPrice}
                title={product?.title}
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
