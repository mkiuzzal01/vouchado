import { baseApi } from "@/redux/API/baseAPI";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateNotification: builder.mutation<any, any>({
      query: (body) => ({
        url: "/setting/notification/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["notifications"],
    }),

    accountStatus: builder.mutation<any, { status: string }>({
      query: (body) => ({
        url: "/user/account-status",
        method: "POST",
        body,
      }),
      invalidatesTags: ["accountStatus"],
    }),

    providerStripeConnect: builder.mutation<any, any>({
      query: (body) => ({
        url: "/provider/stripe-connect",
        method: "POST",
        body,
      }),
      invalidatesTags: ["providerStripeConnect"],
    }),
  }),
});

export const {
  useUpdateNotificationMutation,
  useAccountStatusMutation,
  useProviderStripeConnectMutation,
} = settingApi;
