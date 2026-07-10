export interface ChildCategory {
  id: number;
  category_id: number;
  is_trending: boolean;
  name: string;
  slug: string;
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
  child_categories: ChildCategory[];
}

export interface CategoriesResponse {
  data: Category[];
  message: string;
  status: number;
}
