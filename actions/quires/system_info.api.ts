import { api } from "../TApi";

export const getSocialLinks = () =>
  api.get<any>(`/social-links`, {
    tags: ["social-links"],
    revalidate: 0,
  });

export const getSystemInfo = () =>
  api.get<any>(`/system-info`, {
    tags: ["system-info"],
    revalidate: 0,
  });

export const getBanner = () =>
  api.get<any>(`/homepage-banners`, {
    tags: ["banner"],
    revalidate: 0,
  });

export const getNotificationOptins = () =>
  api.get<any>(`/setting/notification`, {
    tags: ["notifications"],
    revalidate: 0,
  });

export const getNotification = () =>
  api.get<any>(`/notifications`, {
    tags: ["notifications"],
    revalidate: 0,
  });

export const getPaymentMethod = () =>
  api.get<any>(`/provider/stripe-connect`, {
    tags: ["payment-connect"],
    revalidate: 0,
  });
