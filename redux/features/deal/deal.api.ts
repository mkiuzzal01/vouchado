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

    getVerifySession: builder.query({
      query: (session_id) => ({
        url: `/order/verify-session?session_id=${session_id}`,
        method: "GET",
      }),
      providesTags: ["verify-session"],
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
        url: "/voucher/redeem",
        method: "POST",
        body,
      }),
      invalidatesTags: ["voucher"],
    }),

    deleteDeal: builder.mutation({
      query: (id) => ({
        url: `/provider/deals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deal"],
    }),

    dealStatusChange: builder.mutation({
      query: ({ id, status }) => ({
        url: `/provider/deals/${id}/status`,
        method: "PATCH",
        body: { status },
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
  useDealStatusChangeMutation,
  useGetVerifySessionQuery,
} = dealsAPI;
