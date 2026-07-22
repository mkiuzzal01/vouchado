import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

interface IUser {
  id: string;
  email: string;
  time_zone: string;
  role: string;
  name: string;
  avatar?: string;
  loyalty_point?: number;
  coupon_code?: string;
}

interface IInitState {
  user: IUser | null;
  vuchado_token: string | null;
}

const initialState: IInitState = {
  user: null,
  vuchado_token: null,
};

export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;

      cookie.set("vuchado_token", action.payload.vuchado_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    },

    logout: (state) => {
      state.user = null;
      state.vuchado_token = null;
      cookie.remove("vuchado_token");
    },

    updateLoyaltyPoint: (state, action) => {
      if (state.user) {
        state.user.loyalty_point = action.payload;
      }
    },

    clearLoyaltyPoint: (state) => {
      if (state.user) {
        state.user.loyalty_point = 0;
      }
    },

    updateCouponCode: (state, action) => {
      if (state.user) {
        state.user.coupon_code = action.payload;
      }
    },

    clearCouponCode: (state) => {
      if (state.user) {
        state.user.coupon_code = "";
      }
    },
  },
});

export const {
  setUser,
  logout,
  updateLoyaltyPoint,
  updateCouponCode,
  clearCouponCode,
  clearLoyaltyPoint,
} = authSlice.actions;

export default authSlice.reducer;
