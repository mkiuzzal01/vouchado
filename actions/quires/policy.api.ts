import { api } from "../TApi";

export const getPolicy = () =>
  api.get<any>(`/privacy-policy`, {
    tags: ["privacy-policy"],
    revalidate: 0,
  });

export const getTerms = () =>
  api.get<any>(`/terms-of-service`, {
    tags: ["terms-of-service"],
    revalidate: 0,
  });

export const getCancellationPolicy = () =>
  api.get<any>(`/cancellation-policy`, {
    tags: ["cancelation-policy"],
    revalidate: 0,
  });
