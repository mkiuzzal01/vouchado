export interface IUserProfile {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
  avatar: string | null;
  avatar_full_url: string | null;
  role: string;
  status: string;
  timezone: string;
  country: string | null;
  city: string | null;
  address: string | null;
  vouchado_points: number | null;
}

export interface PurchaseHistory {
  id: number;
  order_number: string;
  subtotal: string;
  total: string;
  coupon_discount: string;
  voucher_discount: string;
  date: string;
  item_count: number;
  items: PurchaseItem[];
}

export interface PurchaseItem {
  id: number;
  title: string;
  slug: string;
  deal_id: number;
  deal_name: string;
  location: string;
  price: string;
  image: string;
  avg_rating: number;
}

export interface OrderItem {
  id: number;
  title: string;
  deal_name: string;
  location: string;
  price: string;
  image: string;
  slug: string;
  avg_rating: number;
  providerId: number;
}

export interface PurchaseOrder {
  id: number;
  user_id: number;
  order_number: string;
  subtotal: string;
  actual_amount: string;
  coupon_discount: string;
  voucher_discount: string;
  coupon_code: string | null;
  voucher_code: string | null;
  discount: string;
  tax: string;
  total: string;
  payment_method: string;
  payment_status: string;
  payment_reference: string;
  status: string;
  is_gift: boolean;
  recipient_email: string | null;
  recipient_name: string | null;
  gift_message: string | null;
  created_at: string;
  updated_at: string;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: number;
  order_id: number;
  deal_id: number;
  provider_id: number;
  price: string;
  quantity: number;
  subtotal: string;
  commission_rate: string;
  commission_amount: string;
  provider_amount: string;
  status: string;
  created_at: string;
  updated_at: string;
  deal: Deal;
}

export interface Deal {
  id: number;
  provider_id: number;
  category_id: number;
  child_category_id: number | null;
  deal_name: string;
  original_price: string;
  discounted_price: string;
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
  status: string;
  created_at: string;
  updated_at: string;
  images: DealImage[];
  category: Category;
  child_category: Category | null;
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
  is_trending: boolean;
  created_at: string;
  updated_at: string;
}

export interface Activity {
  title: string;
  points: string;
  type: "earn" | "redeem";
  date: string;
  timestamp: number;
}
