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
        method: "POST",
        body: status,
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
} = dealsAPI;
