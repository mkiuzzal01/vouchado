import { baseApi } from "@/redux/API/baseAPI";

export const createUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: "/user/profile/update",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),

    changePassword: builder.mutation({
      query: (body) => ({
        url: "/user/change-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
    }),

    deleteAccount: builder.mutation({
      query: () => ({
        url: "/user/account-delete",
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} = createUserApi;
