import { baseApi } from "@/redux/API/baseAPI";

const authSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    verifyOTP: builder.mutation({
      query: (body) => ({
        url: "/verify_otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    forgotVerifyOTP: builder.mutation({
      query: (body) => ({
        url: "/forgot-verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    resendOTP: builder.mutation({
      query: (body) => ({
        url: "/resend_otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),

    socialLogin: builder.mutation({
      query: (body) => ({
        url: "/social-login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendOTPMutation,
  useForgotVerifyOTPMutation,
  useSocialLoginMutation,
} = authSlice;
