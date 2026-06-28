import Container from "@/app/components/shared/Container";
import ProductCard from "../cards/ProductCard";
import SectionHeader from "../shared/SectionHeader";
import { productItems } from "@/redux/items/ItemData";

interface Props {
  lang: string;
}

export default function DealsNear({ lang }: Props) {
  return (
    <Container>
      <section className="pb-8">
        <SectionHeader title="Deals Near You" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productItems.map((deal) => (
            <ProductCard lang={lang} key={deal.id} {...deal} />
          ))}
        </div>
      </section>
    </Container>
  );
}
