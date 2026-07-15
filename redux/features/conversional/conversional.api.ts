import { baseApi } from "@/redux/API/baseAPI";

export const conversionalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (body) => ({
        url: `/messages`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["message"],
    }),

    createConversation: builder.mutation({
      query: (body) => ({
        url: `/conversations`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["conversation"],
    }),
  }),
});

export const { useSendMessageMutation, useCreateConversationMutation } =
  conversionalApi;
