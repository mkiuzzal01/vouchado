export interface IHighlight {
  id: number;
  text: string;
}

export interface ICustomerReview {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export interface IProduct {
  id: string;
  title: string;
  image: string;
  tagline: string;
  quantity: number;
  rating: number;
  reviewsCount: number;
  location: string;
  priceOriginal: number;
  discountBadge: number;

  overview: string;

  highlights: IHighlight[];
  included: string[];
  notIncluded: string[];

  customerReviews: ICustomerReview[];
}
