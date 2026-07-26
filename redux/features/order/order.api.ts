import { baseApi } from "@/redux/API/baseAPI";

export const orderAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: `/order/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["order"],
    }),

    cancelOrder: builder.mutation({
      query: ({ order_id, reason }) => ({
        url: `/order/${order_id}/cancel-request`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["order"],
    }),

    orderCancelationRequest: builder.mutation({
      query: (session_id) => ({
        url: `/order/cancel-session`,
        method: "POST",
        body: { session_id },
      }),
      invalidatesTags: ["order"],
    }),

    createOrderReview: builder.mutation({
      query: (body) => ({
        url: `/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useCancelOrderMutation,
  useOrderCancelationRequestMutation,
  useCreateOrderReviewMutation,
} = orderAPI;
