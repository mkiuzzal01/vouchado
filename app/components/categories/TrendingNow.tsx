import { trendingItems } from "@/redux/items/TrandingData";
import TrendingProductCard from "../cards/TrendingProductCard";
import Container from "../shared/Container";
import SectionHeader from "../shared/SectionHeader";
import Fire from "../icons/Fire";

interface Props {
  lang: "en" | "de";
}

export default function TrendingNow({ lang }: Props) {
  return (
    <section>
      <Container>
        <SectionHeader icon={<Fire />} title="Trending Now" />
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 justify-items-center">
          {trendingItems.map((product) => (
            <TrendingProductCard
              lang={lang}
              key={product.id}
              productId={product.id}
              imageUrl={product.imageUrl}
              category={product.category}
              title={product.title}
              rating={product.rating}
              purchasedText={product.purchasedText}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              discountPercentage={product.discountPercentage}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
