import { baseApi } from "@/redux/API/baseAPI";

export const dealsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDeal: builder.mutation({
      query: (body) => ({
        url: "/deal/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deal"],
    }),

    voucherRedeem: builder.mutation({
      query: (body) => ({
        url: "/deal/voucher/redeem",
        method: "POST",
        body,
      }),
      invalidatesTags: ["deal"],
    }),
  }),
});

export const { useCreateDealMutation, useVoucherRedeemMutation } = dealsAPI;
