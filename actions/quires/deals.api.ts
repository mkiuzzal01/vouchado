import { api } from "../TApi";

export const getDeals = () =>
  api.get<any>(`/deals`, {
    tags: ["deals"],
    revalidate: 60,
  });

export const getDealDetails = (slug: string) =>
  api.get<any>(`/deals/${slug}`, {
    tags: [`deals-${slug}`],
    revalidate: 60,
  });

export const getDealTrending = () =>
  api.get<any>(`/deals/trending`, {
    tags: ["deals"],
    revalidate: 60,
  });

export const getActiveDeals = (query?: string) =>
  api.get<any>(`/provider/active-deals?${query}`, {
    tags: ["provider-active-deals"],
    revalidate: 30,
  });

export const getPurchasedDeals = () =>
  api.get<any>(`/provider/purchased-deals`, {
    tags: ["provider-purchases"],
    revalidate: 30,
  });
