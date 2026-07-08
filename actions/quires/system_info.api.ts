import { api } from "../TApi";

export const getSocialLinks = () =>
  api.get<any>(`/social-links`, {
    tags: ["social-links"],
    revalidate: 60,
  });

export const getSystemInfo = () =>
  api.get<any>(`/system-info`, {
    tags: ["system-info"],
    revalidate: 60,
  });

export const getBanner = () =>
  api.get<any>(`/homepage-banners`, {
    tags: ["banner"],
    revalidate: 60,
  });
