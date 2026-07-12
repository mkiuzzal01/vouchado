import { api } from "../TApi";

export const getProviderStats = () =>
  api.get<any>(`/provider/stats`, {
    tags: ["provider-stats"],
    revalidate: 60,
  });

export const getProviderPurchasedDeals = () =>
  api.get<any>(`/provider/purchased-deals`, {
    tags: ["provider-purchased-deals"],
    revalidate: 60,
  });

export const getProviderRevenueStats = () =>
  api.get<any>(`/provider/revenue-stats`, {
    tags: ["provider-revenue-stats"],
    revalidate: 60,
  });
