export interface IDeals {
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
}
