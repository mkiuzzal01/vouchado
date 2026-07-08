export interface TService {
  deal: Deal;
  similar_deals: Deal[];
}

export interface Deal {
  id: number;
  provider_id: number;
  category_id: number;
  child_category_id: number | null;
  deal_name: string;
  original_price: string;
  discounted_price: string;
  discount_percentage: number;
  total_purchase_limit: number;
  max_purchase_per_customer: number;
  service_title: string;
  slug: string;
  available_start_time: string;
  available_end_time: string;
  service_end_at: string;
  short_description: string;
  overview_description: string;
  experience_description: string;
  highlight_points: string[];
  include_points: string[];
  not_include_points: string[];
  newsletter_featured: boolean;
  top_trending_featured: boolean;
  push_notification_featured: boolean;
  last_minute_boost: boolean;
  priority_ranking: boolean;
  guarantee_12_months: boolean;
  guarantee_until: string | null;
  base_commission_rate: string;
  promo_code_applied: string | null;
  provider_coupon_code: string | null;
  visit_location: string;
  latitude: string;
  longitude: string;
  opening_hours: string;
  accessibility_info: string;
  created_at: string;
  updated_at: string;
  reviews_avg_rating: number | null;
  reviews_count: number;
  images: DealImage[];
  category: Category;
  provider: Provider;
  deal_days: DealDay[];
  deal_months: DealMonth[];
  reviews: any[];
}

export interface DealImage {
  id: number;
  deal_id: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface Provider {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  role: string;
  provider: string | null;
  provider_id: string | null;
  provider_token: string | null;
  phone: string;
  avatar: string | null;
  timezone: string;
  term_policy_agreed: boolean;
  status: "Active" | "Inactive" | string;
  created_at: string;
  updated_at: string;
}

export interface DealDay {
  id: number;
  deal_id: number;
  day: string;
  created_at: string;
  updated_at: string;
}

export interface DealMonth {
  id: number;
  deal_id: number;
  month: string;
  created_at: string;
  updated_at: string;
}
