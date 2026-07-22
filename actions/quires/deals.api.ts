import { api } from "../TApi";

export const getDeals = (query?: string) =>
  api.get<any>(`/deals?${query}`, {
    tags: ["deals"],
    revalidate: 30,
  });

export const getDealDetails = (slug: string) =>
  api.get<any>(`/deals/${slug}`, {
    tags: [`deals-${slug}`],
    revalidate: 30,
  });

export const getDealTrending = () =>
  api.get<any>(`/deals/trending`, {
    tags: ["deals"],
    revalidate: 30,
  });

export const getActiveDeals = (query?: string) =>
  api.get<any>(`/provider/active-deals?${query}`, {
    tags: ["provider-active-deals"],
    revalidate: 0,
  });

export const getPurchasedDeals = (query?: string) =>
  api.get<any>(`/provider/purchased-deals?${query}`, {
    tags: ["provider-purchases"],
    revalidate: 0,
  });
