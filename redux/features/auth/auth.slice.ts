import { createSlice } from "@reduxjs/toolkit";
import cookie from "js-cookie";

interface IUser {
  id: string;
  email: string;
  time_zone: string;
  role: string;
  name: string;
  avatar?: string;
  vuchado_point?: number;
}

interface IInitState {
  user: IUser | null;
  vuchado_token: string | null;
  vuchado_point?: number;
}

const initialState: IInitState = {
  user: null,
  vuchado_token: null,
  vuchado_point: 0,
};

export const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.vuchado_token = action.payload.vuchado_token;
      state.vuchado_point = action.payload.vuchado_point;

      cookie.set("vuchado_token", action.payload.vuchado_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    },

    logout: (state) => {
      state.user = null;
      state.vuchado_token = null;
      state.vuchado_point = 0;
      cookie.remove("vuchado_token");
    },

    updateVuchadoPoint: (state, action) => {
      state.vuchado_point = action.payload.vuchado_point;
    },
  },
});

export const { setUser, logout, updateVuchadoPoint } = authSlice.actions;

export default authSlice.reducer;
