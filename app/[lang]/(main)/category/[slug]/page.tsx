import ProductCard from "@/app/components/cards/ProductCard";
import Filtered from "@/app/components/forms/quires/Filtered";
import Sort from "@/app/components/forms/quires/Sort";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Contact from "@/app/components/icons/Contact";
import InstantConfirm from "@/app/components/icons/InstantConfirm";
import Save from "@/app/components/icons/Save";
import SecurePayment from "@/app/components/icons/SecurePayment";
import { Deal } from "@/app/components/sections/DealsNear";
import Container from "@/app/components/shared/Container";
import SectionHeader from "@/app/components/shared/SectionHeader";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { getDeals } from "@/actions/quires/deals.api";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { translateData } from "@/app/components/utils/translateText";

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
    description: "In person support - no chatbot",
    icon: <Contact />,
  },
];

interface Props {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{
    min_price?: string;
    max_price?: string;
    location?: string;
    rating?: string;
    availability?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function Page({ params, searchParams }: Props) {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  const { lang, slug } = resolvedParams;
  const { min_price, max_price, location, rating, availability, sort, page } =
    resolvedSearchParams;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

  const query = new URLSearchParams();

  if (slug) query.set("category_id", slug);
  if (min_price) query.set("min_price", min_price);
  if (max_price) query.set("max_price", max_price);
  if (location) query.set("location", location);
  if (rating) query.set("rating", rating);
  if (availability) query.set("availability", availability);
  if (sort) query.set("sort", sort);
  if (page) query.set("page", page);

  const dealsData = await getDeals(query.toString());
  const deals = await translateData(dealsData, lang);

  const totalDeals = String(deals?.meta?.total || deals?.data?.length || 0);

  return (
    <Container>
      <SectionHeader
        title="Explore Services and Save More"
        description="Browse handpicked services for every trend, occasion and lifestyle."
      />

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Left Side Filter Panel */}
        <div className="w-full lg:w-1/4 shrink-0">
          <Filtered t={t} />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-3/4">
          <Sort total={totalDeals} t={t} />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {deals?.data?.length > 0 ? (
              deals.data.map((deal: Deal, idx: number) => (
                <ProductCard key={deal.id || idx} lang={lang} product={deal} />
              ))
            ) : (
              <div className="col-span-full py-12">
                <NotFoundData
                  title="Deals not found"
                  description="Check your filters or try adjusting your search criteria."
                />
              </div>
            )}
          </div>

          {deals?.data?.length > 0 && (
            <div className="mt-4">
              <ReusablePagination
                current_page={deals?.meta?.current_page}
                per_page={deals?.meta?.per_page}
                total={deals?.meta?.total}
              />
            </div>
          )}

          <div className="mt-8">
            <PromoSteps steps={promos} />
          </div>
        </div>
      </div>
    </Container>
  );
}
