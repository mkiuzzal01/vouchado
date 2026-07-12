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
