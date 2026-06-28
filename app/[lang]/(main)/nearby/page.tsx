import ProductCard from "@/app/components/cards/ProductCard";
import Filtered from "@/app/components/forms/quires/Filtered";
import FilterWithCategory from "@/app/components/forms/quires/FilterWithCategory";
import ModernSearch from "@/app/components/forms/quires/ModernSearch";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Contact from "@/app/components/icons/Contact";
import InstantConfirm from "@/app/components/icons/InstantConfirm";
import Save from "@/app/components/icons/Save";
import SecurePayment from "@/app/components/icons/SecurePayment";
import Container from "@/app/components/shared/Container";
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
    description: "Book & get confirmed instantly.",
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
    <div>
      <Container>
        <ModernSearch buttonClass="text-[#1ec6cc] font-semibold bg-[#1ec6cc]/10 hover:bg-[#1ec6cc]/30" />
        <div className="mt-8">
          <FilterWithCategory />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 mt-4">
          <div className="w-full lg:w-1/4">
            <Filtered />
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
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
            <ReusablePagination currentPage={1} totalPages={10} />
            <PromoSteps steps={promos} />
          </div>
        </div>
      </Container>
    </div>
  );
}
