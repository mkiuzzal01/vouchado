import TrendingProductCard from "../cards/TrandingProductCard";
import Container from "../shared/Container";
import SeactionHeader from "../shared/SeactionHeader";

const TRENDING_DEALS = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    category: "Beauty and Wellness",
    title:
      "Hotel Stay at 4-Star The Brown Palace Hotel and Spa, Autograph Collection",
    rating: 4.0,
    purchasedText: "34 purchased",
    currentPrice: 91.9,
    originalPrice: 133.19,
    discountPercentage: 31,
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    category: "Spa & Massage",
    title: "Luxury Deep Tissue Massage & Aromatherapy Session",
    rating: 4.8,
    purchasedText: "128 purchased",
    currentPrice: 45.0,
    originalPrice: 75.0,
    discountPercentage: 40,
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
    category: "Health & Fitness",
    title: "All-Inclusive Weekend Yoga and Meditation Retreat",
    rating: 4.9,
    purchasedText: "56 purchased",
    currentPrice: 189.0,
    originalPrice: 270.0,
    discountPercentage: 30,
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    category: "Beauty and Wellness",
    title:
      "Hotel Stay at 4-Star The Brown Palace Hotel and Spa, Autograph Collection",
    rating: 4.0,
    purchasedText: "34 purchased",
    currentPrice: 91.9,
    originalPrice: 133.19,
    discountPercentage: 31,
  },
  {
    id: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    category: "Spa & Massage",
    title: "Luxury Deep Tissue Massage & Aromatherapy Session",
    rating: 4.8,
    purchasedText: "128 purchased",
    currentPrice: 45.0,
    originalPrice: 75.0,
    discountPercentage: 40,
  },
  {
    id: "6",
    imageUrl:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
    category: "Health & Fitness",
    title: "All-Inclusive Weekend Yoga and Meditation Retreat",
    rating: 4.9,
    purchasedText: "56 purchased",
    currentPrice: 189.0,
    originalPrice: 270.0,
    discountPercentage: 30,
  },
];

export default function TrendingNow() {
  const handleFavorite = (id: string) => {
    console.log(`Toggled favorite for item: ${id}`);
  };

  return (
    <section>
      <Container>
        <SeactionHeader title="Trending Now" />
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
          {TRENDING_DEALS.map((product) => (
            <TrendingProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              category={product.category}
              title={product.title}
              rating={product.rating}
              purchasedText={product.purchasedText}
              currentPrice={product.currentPrice}
              originalPrice={product.originalPrice}
              discountPercentage={product.discountPercentage}
              onFavoriteClick={() => handleFavorite(product.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
