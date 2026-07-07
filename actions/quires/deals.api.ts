import { api } from "../TApi";

export const getDeals = () =>
  api.get<any>(`/deals`, {
    tags: ["deals"],
    revalidate: 60,
  });

export const getDealDetails = (slug: string) =>
  api.get<any>(`/deals/${slug}`, {
    tags: ["deals"],
    revalidate: 60,
  });

export const getDealTrending = () =>
  api.get<any>(`/deals/trending`, {
    tags: ["deals"],
    revalidate: 60,
  });
