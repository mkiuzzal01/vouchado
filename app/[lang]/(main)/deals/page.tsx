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

  const dealsData = await getDeals(query.toString());
  const deals = await translateData(dealsData, lang);

  const categoriesData = await getCategories();
  const categories = await translateData(categoriesData, lang);

  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

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
    <Container>
      <SectionHeader
        title={t?.deals?.title}
        description={t?.deals?.description}
      />

      <div className="mt-8">
        <FilterWithCategory categories={categories?.data} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 my-4">
        <div className="w-full lg:w-3/12">
          <Filtered t={t} />
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
                current_page={deals?.meta?.current_page || 1}
                per_page={deals?.meta?.per_page || 10}
                total={deals?.meta?.total || 10}
              />
            </>
          ) : (
            <NotFoundData
              className="w-full"
              title={t?.shared?.utility?.no_data}
              description={t?.shared?.utility?.no_data_desc}
            />
          )}
          <PromoSteps steps={promos} />
        </div>
      </div>
    </Container>
  );
}
