import { getCategories } from "@/actions/quires/cateogries.api";
import { getDeals } from "@/actions/quires/deals.api";
import ProductCard from "@/app/components/cards/ProductCard";
import { Deal } from "@/app/components/sections/DealsNear";
import Filtered from "@/app/components/forms/quires/Filtered";
import FilterWithCategory from "@/app/components/forms/quires/FilterWithCategory";
import ModernSearch from "@/app/components/forms/quires/ModernSearch";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import Sort from "@/app/components/forms/quires/Sort";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Contact from "@/app/components/icons/Contact";
import InstantConfirm from "@/app/components/icons/InstantConfirm";
import Save from "@/app/components/icons/Save";
import SecurePayment from "@/app/components/icons/SecurePayment";
import Container from "@/app/components/shared/Container";

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
  const deals = await getDeals();
  const categories = await getCategories();
  return (
    <div>
      <Container>
        <ModernSearch />
        <div className="mt-8">
          <FilterWithCategory categories={categories?.data} />
        </div>
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          <div className="w-full lg:w-3/12">
            <Filtered />
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-9/12">
            <Sort total={deals?.data?.length} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
              {deals?.data?.map((product: Deal) => (
                <ProductCard key={product.id} lang={lang} product={product} />
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
