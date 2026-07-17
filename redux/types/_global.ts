export interface IPagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  path: string;
}

export interface Voucher {
  id: number;
  deal_name: string;
  price: string;
  quantity: number;
  voucher_code: string;
  qr_token: string;
  status: "unredeemed" | "redeemed";
  expire_date: string;
}

export interface VerifySession {
  amount_total: number;
  currency: string;
  payment_status: "paid" | "unpaid" | "pending";
  data: {
    order: Order;
  };
}

export interface Order {
  id: number;
  item_count: number;
  subtotal: string;
  tax: string;
  total: string;
  coupon_discount: string;
  voucher_discount: string;
  vouchers: Voucher[];
}
