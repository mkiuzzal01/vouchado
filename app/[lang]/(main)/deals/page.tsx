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
import NotFoundData from "@/app/components/shared/NotFoundData";
import SectionHeader from "@/app/components/shared/SectionHeader";

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

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    category_id?: string;
    min_price?: string;
    max_price?: string;
    location?: string;
    rating?: string;
    availability?: string;
    page?: string;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const { lang } = resolvedParams;
  const {
    category_id,
    min_price,
    max_price,
    location,
    rating,
    availability,
    page,
  } = resolvedSearchParams;

  const query = new URLSearchParams();

  if (category_id) query.set("category_id", category_id);
  if (min_price) query.set("min_price", min_price);
  if (max_price) query.set("max_price", max_price);
  if (location) query.set("location", location);
  if (rating) query.set("rating", rating);
  if (availability) query.set("availability", availability);
  if (page) query.set("page", page);

  const deals = await getDeals(query.toString());
  const categories = await getCategories();

  return (
    <Container>
      <SectionHeader
        title="Explore Deals and Save More"
        description="Browse handpicked Deals for every trend, occasion and lifestyle."
      />

      <div className="mt-8">
        <FilterWithCategory categories={categories?.data} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        <div className="w-full lg:w-3/12">
          <Filtered />
        </div>

        <div className="flex flex-col gap-6 w-full lg:w-9/12">
          {deals?.data?.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
                {deals.data.map((product: Deal, idx: number) => (
                  <ProductCard
                    key={product.id || idx}
                    lang={lang}
                    product={product}
                  />
                ))}
              </div>

              <ReusablePagination
                currentPage={Number(page) || 1}
                totalPages={deals?.meta?.totalPages || 10}
              />
            </>
          ) : (
            <NotFoundData
              className="w-full"
              description="No data found matching the active filters."
            />
          )}
          <PromoSteps steps={promos} />
        </div>
      </div>
    </Container>
  );
}
