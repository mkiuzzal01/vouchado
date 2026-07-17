export interface Voucher {
  id: number;
  voucher_code: string;
  qr_token: string;
  expire_date: string;
  status: "unredeemed" | "redeemed" | "expired";
  price: string;
  quantity: number;
  deal_name: string;
}
