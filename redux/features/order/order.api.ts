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
      query: (body) => ({
        url: `/order/cancel`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const { useCreateOrderMutation, useCancelOrderMutation } = orderAPI;
