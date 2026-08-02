import { baseApi } from "@/redux/API/baseAPI";

export const conversionalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query<any, string | void>({
      query: (slug = "") => ({
        url: `/conversations${slug ? `?${slug}` : ""}`,
        method: "GET",
      }),
      providesTags: ["conversation"],
    }),

    sendMessage: builder.mutation({
      query: (body) => ({
        url: `/messages`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["message", "conversation"],
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

export const {
  useGetConversationsQuery,
  useSendMessageMutation,
  useCreateConversationMutation,
} = conversionalApi;
