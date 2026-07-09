export interface IBusinessHour {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface IBusinessForm {
  name: string;
  phone: string;
  business_name: string;
  business_email: string;
  business_description: string;
  business_website: string;
  business_category: string;
  business_address: string;
  latitude: number;
  longitude: number;
  business_logo: File | null;
  business_cover_image: File | null;
  business_hours: IBusinessHour[];
}
