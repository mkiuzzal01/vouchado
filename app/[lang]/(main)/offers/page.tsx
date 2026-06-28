import ProductCard from "@/app/components/cards/ProductCard";
import Filtered from "@/app/components/forms/quires/Filtered";
import FilterWithCategory from "@/app/components/forms/quires/FilterWithCategory";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Contact from "@/app/components/icons/Contact";
import InstantConfirm from "@/app/components/icons/InstantConfirm";
import Save from "@/app/components/icons/Save";
import SecurePayment from "@/app/components/icons/SecurePayment";
import Container from "@/app/components/shared/Container";
import SectionHeader from "@/app/components/shared/SectionHeader";
import { productItems } from "@/redux/items/ItemData";

interface Props {
  params: Promise<{ lang: string }>;
}

export const promos = [
  {
    title: "Vouchado Guarantee",
    description: "Always save 20% and MORE!",
    icon: <Save />,
  },
  {
    title: "Instant Confirmation",
    description: "Book and get confirmed instantly.",
    icon: <InstantConfirm />,
  },
  {
    title: "Secure Payments",
    description: "100% secure and protected.",
    icon: <SecurePayment />,
  },
  {
    title: "24/7 Support",
    description: "In person support - no chatboot",
    icon: <Contact />,
  },
];

export default async function page({ params }: Props) {
  const { lang } = await params;
  return (
    <Container>
      <SectionHeader
        title="Explore Deals and Save More"
        description="Browse handpicked Deals for every trend, occasion and lifestyle."
      />

      <div className="mt-8">
        <FilterWithCategory />
      </div>
      <div className="flex flex-col lg:flex-row gap-2 mt-4">
        <div className="w-full lg:w-1/4">
          <Filtered />
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-3/4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
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
          <ReusablePagination currentPage={1} totalPages={10} />
          <PromoSteps steps={promos} />
        </div>
      </div>
    </Container>
  );
}
