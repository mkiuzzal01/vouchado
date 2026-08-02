import { baseApi } from "@/redux/API/baseAPI";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<any, void>({
      query: () => ({
        url: `/notifications`,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),

    markNotificationRead: builder.mutation<any, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notification"],
    }),

    markAllNotificationsRead: builder.mutation<any, void>({
      query: () => ({
        url: `/notifications/read-all`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} = notificationApi;
