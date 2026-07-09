import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

interface IUser {
  id: string;
  email: string;
  time_zone: string;
  role: string;
  name: string;
  avatar?: string;
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
      state.vuchado_token = action.payload.vuchado_token;

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
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
