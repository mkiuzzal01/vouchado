import TrendingProductCard from "../cards/TrendingProductCard";
import Container from "../shared/Container";
import SectionHeader from "../shared/SectionHeader";
import Fire from "../icons/Fire";
import NotFoundData from "../shared/NotFoundData";

export interface Deal {
  id: number;
  image: string;
  discount_percentage: number;
  category: string;
  title: string;
  slug: string;
  rating: number | null;
  location: string;
  distance: string;
  original_price: string;
  discounted_price: string;
  service_end_at: string;
  purchased_count: number;
}

interface Props {
  lang: "en" | "de";
  deals: { data: Deal[] };
}

export default function TrendingNow({ lang, deals }: Props) {
  if (deals?.data?.length === 0) {
    return <NotFoundData title="No Trending Deals" />;
  }

  return (
    <Container>
      <SectionHeader icon={<Fire />} title="Trending Now" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 justify-items-center">
        {deals?.data?.map((product: Deal, idx: number) => (
          <TrendingProductCard key={idx} lang={lang} product={product} />
        ))}
      </div>
    </Container>
  );
}
