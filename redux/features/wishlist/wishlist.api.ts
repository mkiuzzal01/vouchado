import { baseApi } from "@/redux/API/baseAPI";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWishlist: builder.mutation({
      query: (data) => ({
        url: "/user/wishlist",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateWishlistMutation } = wishlistApi;
