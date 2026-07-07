import { baseApi } from "@/redux/API/baseAPI";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    contact: builder.mutation({
      query: (body) => ({
        url: "/contact",
        method: "POST",
        body,
      }),
      invalidatesTags: ["contact"],
    }),

    subscribe: builder.mutation({
      query: (body) => ({
        url: `/newsletter/subscribe`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["subscribe"],
    }),
  }),
});

export const { useContactMutation, useSubscribeMutation } = contactApi;
