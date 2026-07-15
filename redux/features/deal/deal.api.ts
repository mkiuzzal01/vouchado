import { baseApi } from "@/redux/API/baseAPI";

export const dealsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["deal"],
    }),

    createDeal: builder.mutation({
      query: (body) => ({
        url: "/provider/deals",
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

    deleteDeal: builder.mutation({
      query: (id) => ({
        url: `/provider/deals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deal"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateDealMutation,
  useVoucherRedeemMutation,
  useDeleteDealMutation,
} = dealsAPI;
