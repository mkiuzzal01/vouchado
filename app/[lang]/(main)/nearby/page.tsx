import ProductCard from "@/app/components/cards/ProductCard";
import Filtered from "@/app/components/forms/quires/Filtered";
import FilterWithCategory from "@/app/components/forms/quires/FilterWithCategory";
import ModernSearch from "@/app/components/forms/quires/ModernSearch";
import ReusablePagination from "@/app/components/forms/quires/ReusablePagination";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Container from "@/app/components/shared/Container";
const deals = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    category: "Food & Drink",
    title: "Romantic Dinner at The Parisian Café",
    rating: 4.9,
    location: "New York, NY",
    currentPrice: 89.99,
    originalPrice: 120.0,
    discountPercentage: 25,
    distance: "1.2 mi",
    endsIn: "2d 3h",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    category: "Spa",
    title: "Relaxing Spa Day Package",
    rating: 4.8,
    location: "Los Angeles, CA",
    currentPrice: 149.0,
    originalPrice: 200.0,
    discountPercentage: 25,
    distance: "2.5 mi",
    endsIn: "3d 5h",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    category: "Adventure",
    title: "City Ziplining Adventure",
    rating: 4.7,
    location: "Chicago, IL",
    currentPrice: 79.0,
    originalPrice: 100.0,
    discountPercentage: 21,
    distance: "3.1 mi",
    endsIn: "1d 2h",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    category: "Hotel",
    title: "Luxury Hotel Stay",
    rating: 4.9,
    location: "Miami, FL",
    currentPrice: 199.0,
    discountPercentage: 15,
    distance: "4.2 mi",
    endsIn: "5d 1h",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    category: "Food & Drink",
    title: "Weekend Brunch for Two",
    rating: 4.6,
    location: "Boston, MA",
    currentPrice: 59.99,
    originalPrice: 75.0,
    discountPercentage: 20,
    distance: "1.8 mi",
    endsIn: "2d 1h",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    category: "Creative",
    title: "Pottery Making Class",
    rating: 4.9,
    location: "Seattle, WA",
    currentPrice: 65.0,
    discountPercentage: 10,
    distance: "5.3 mi",
    endsIn: "4d 2h",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    category: "Kids",
    title: "Kids' Trampoline Park",
    rating: 4.5,
    location: "Denver, CO",
    currentPrice: 35.0,
    originalPrice: 50.0,
    discountPercentage: 30,
    distance: "2.1 mi",
    endsIn: "1d 4h",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
    category: "Beauty",
    title: "Haircut & Styling",
    rating: 4.7,
    location: "San Francisco, CA",
    currentPrice: 45.0,
    discountPercentage: 15,
    distance: "3.6 mi",
    endsIn: "3d 1h",
  },
];

export default function page() {
  return (
    <div>
      <Container>
        <ModernSearch />

        <div className="mt-8">
          <FilterWithCategory />
        </div>
        <div className="flex flex-col lg:flex-row gap-2 mt-4">
          <div className="w-full lg:w-1/4">
            <Filtered />
          </div>
          <div className="flex flex-col gap-2 w-full lg:w-3/4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {deals.map((deal, index) => (
                <ProductCard key={index} {...deal} />
              ))}
            </div>
            <PromoSteps />
            <ReusablePagination currentPage={1} totalPages={10} />
          </div>
        </div>
      </Container>
    </div>
  );
}
