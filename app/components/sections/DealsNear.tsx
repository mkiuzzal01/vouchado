import Container from "@/app/components/shared/Container";
import ProductCard from "../cards/ProductCard";
import SectionHeader from "../shared/SectionHeader";
import NotFoundData from "../shared/NotFoundData";

export interface Deal {
  id: number;
  image: string;
  discount_percentage: number;
  category: string;
  title: string;
  slug: string;
  rating: number;
  location: string;
  distance: number;
  original_price: string;
  discounted_price: string;
  service_end_at: string;
  purchased_count: number;
  is_wishlisted: boolean;
}

interface Props {
  lang: string;
  deals: { data: Deal[] };
}

export default function DealsNear({ lang, deals }: Props) {
  if (deals?.data?.length === 0) {
    return <NotFoundData title="No Deals Near You" />;
  }

  return (
    <Container>
      <section className="pb-8">
        <SectionHeader title="Deals Near You" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {deals?.data?.map((deal: Deal, idx) => (
            <ProductCard key={idx} lang={lang} product={deal} />
          ))}
        </div>
      </section>
    </Container>
  );
}
