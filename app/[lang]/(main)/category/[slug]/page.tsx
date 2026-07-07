import { getCategories } from "@/actions/quires/cateogries.api";
import { getDeals } from "@/actions/quires/deals.api";
import ProductCard from "@/app/components/cards/ProductCard";
import Filtered from "@/app/components/forms/quires/Filtered";
import FilterWithCategory from "@/app/components/forms/quires/FilterWithCategory";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Contact from "@/app/components/icons/Contact";
import InstantConfirm from "@/app/components/icons/InstantConfirm";
import Save from "@/app/components/icons/Save";
import SecurePayment from "@/app/components/icons/SecurePayment";
import { Deal } from "@/app/components/sections/DealsNear";
import Container from "@/app/components/shared/Container";
import SectionHeader from "@/app/components/shared/SectionHeader";

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

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const deals = await getDeals();
  const categories = await getCategories();

  return (
    <Container>
      <SectionHeader
        title="Explore Services and Save More"
        description="Browse handpicked services for every trend, occasion and lifestyle."
      />

      <div className="mt-8">
        <FilterWithCategory categories={categories?.data || []} />
      </div>
      <div className="flex flex-col lg:flex-row gap-2 mt-4">
        <div className="w-full lg:w-1/4">
          <Filtered />
        </div>
        <div className="flex flex-col gap-2 w-full lg:w-3/4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {deals?.data?.map((deal: Deal, idx: number) => (
              <ProductCard key={idx} lang={lang} product={deal} />
            ))}
          </div>
          <PromoSteps steps={promos} />
          <ReusablePagination currentPage={1} totalPages={10} />
        </div>
      </div>
    </Container>
  );
}
