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
import NotFoundData from "@/app/components/shared/NotFoundData";
import { getDictionary } from "../../dictionaries";
import { translateData } from "@/app/components/utils/translateText";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    category_id?: string;
    min_price?: string;
    max_price?: string;
    location?: string;
    rating?: string;
    availability?: string;
    popular?: string;
    lat?: string;
    lng?: string;
    service?: string;
  }>;
}

export default async function page({ params, searchParams }: Props) {
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
    popular,
    lat,
    lng,
    service,
  } = resolvedSearchParams;

  const query = new URLSearchParams();

  if (category_id) query.set("category_id", category_id);
  if (min_price) query.set("min_price", min_price);
  if (max_price) query.set("max_price", max_price);
  if (location) query.set("location", location);
  if (rating) query.set("rating", rating);
  if (availability) query.set("availability", availability);
  if (popular) query.set("popular", popular);
  if (lat) query.set("latitude", lat);
  if (lng) query.set("longitude", lng);
  if (service) query.set("search", service);

  const dealsData = await getDeals(query.toString());
  const deals = await translateData(dealsData, lang);

  const categoriesData = await getCategories();
  const categories = await translateData(categoriesData, lang);

  const t: Awaited<ReturnType<typeof getDictionary>> =
    await getDictionary(lang);

  const promos = [
    {
      title: t.shared.policy_steps.step_1.title,
      description: t.shared.policy_steps.step_1.description,
      icon: <Save />,
    },
    {
      title: t.shared.policy_steps.step_2.title,
      description: t.shared.policy_steps.step_2.description,
      icon: <InstantConfirm />,
    },
    {
      title: t.shared.policy_steps.step_3.title,
      description: t.shared.policy_steps.step_3.description,
      icon: <SecurePayment />,
    },
    {
      title: t.shared.policy_steps.step_4.title,
      description: t.shared.policy_steps.step_4.description,
      icon: <Contact />,
    },
  ];

  return (
    <div>
      <Container>
        <ModernSearch
          locationPlaceholder={t?.shared?.search?.search_location}
          servicePlaceholder={t?.shared?.search?.search_category}
          buttonText={t?.shared?.search?.search_button}
        />

        <div className="mt-8">
          <FilterWithCategory categories={categories?.data} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 my-4">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-3/12">
            <Filtered t={t} />
          </div>

          {/* Core Content Area */}
          <div className="flex flex-col gap-6 w-full lg:w-9/12">
            <Sort total={deals?.data?.length || 0} t={t} />

            {deals?.data?.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-4">
                  {deals.data.map((product: Deal) => (
                    <ProductCard
                      key={product.id}
                      lang={lang}
                      product={product}
                    />
                  ))}
                </div>

                <ReusablePagination
                  current_page={deals?.meta?.current_page}
                  per_page={deals?.meta?.per_page}
                  total={deals?.meta?.total}
                />
              </>
            ) : (
              <NotFoundData
                title="Deals not found"
                description="Check your filters or try adjusting your search criteria."
              />
            )}

            <PromoSteps steps={promos} />
          </div>
        </div>
      </Container>
    </div>
  );
}
