import { api } from "../TApi";

export const getUserProfile = () =>
  api.get<any>(`/user/profile`, {
    tags: ["user"],
    revalidate: 60,
  });

export const getBusniessProfile = () =>
  api.get<any>(`/provider/business-profile`, {
    tags: ["provider"],
    revalidate: 60,
  });

export const getBusinessProfileById = (id: string) =>
  api.get<any>(`/deals/business-profile/${id}`, {
    tags: ["provider"],
    revalidate: 60,
  });

export const getWishlist = () =>
  api.get<any>(`/user/wishlist`, {
    tags: ["wishlist"],
    revalidate: 30,
  });

export const getNotifications = () =>
  api.get<any>(`/notifications`, {
    tags: ["notifications"],
    revalidate: 60,
  });
