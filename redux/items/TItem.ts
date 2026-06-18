export interface TItem {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  rating: number;
  location: string;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  distance?: string;
  endsIn?: string;
}
