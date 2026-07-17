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

export const getNotification = () =>
  api.get<any>(`/setting/notification`, {
    tags: ["notifications"],
    revalidate: 30,
  });

export const getPaymentMethod = () =>
  api.get<any>(`/provider/stripe-connect`, {
    tags: ["payment-connect"],
    revalidate: 30,
  });

export const getVerifySession = (session_id?: string) =>
  api.get<any>(`/order/verify-session?session_id=${session_id}`, {
    tags: ["verify-session"],
    revalidate: 30,
  });
