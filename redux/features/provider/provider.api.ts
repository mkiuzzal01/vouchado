import { baseApi } from "@/redux/API/baseAPI";

export const providerAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProviderProfile: builder.mutation({
      query: (body) => ({
        url: "/provider/business-profile/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["provider"],
    }),

    updateProviderProfile: builder.mutation({
      query: (body) => ({
        url: "/provider/business-profile/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["provider"],
    }),
  }),
});

export const {
  useCreateProviderProfileMutation,
  useUpdateProviderProfileMutation,
} = providerAPI;
