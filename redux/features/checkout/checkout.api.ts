import { baseApi } from "@/redux/API/baseAPI";

export const checkoutAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    giftVoucherPurchase: builder.mutation({
      query: (body) => ({
        url: "/gift-vouchers/checkout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Checkout"],
    }),
  }),
});

export const { useGiftVoucherPurchaseMutation } = checkoutAPI;
