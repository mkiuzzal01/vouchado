import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cookie from "js-cookie";

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface SystemState {
  latitude: number | null;
  longitude: number | null;
  area: string | null;
  newsletter_featured_rate: string | null;
  top_trending_featured_rate: string | null;
  push_notification_featured_rate: string | null;
  last_minute_boost_rate: string | null;
  priority_ranking_rate: string | null;
  cookieAccepted: CookiePreferences | null;
  cookieAcceptedModal: boolean;
}

const initialSystemState: SystemState = {
  latitude: null,
  longitude: null,
  area: null,
  newsletter_featured_rate: null,
  top_trending_featured_rate: null,
  push_notification_featured_rate: null,
  last_minute_boost_rate: null,
  priority_ranking_rate: null,
  cookieAccepted: null,
  cookieAcceptedModal: false,
};

const saveCookiePreferences = (preferences: CookiePreferences) => {
  cookie.set("cookieAccepted", JSON.stringify(preferences), {
    expires: 365,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const systemSlice = createSlice({
  name: "system",
  initialState: initialSystemState,
  reducers: {
    initializeCookies: (state) => {
      const saved = cookie.get("cookieAccepted");
      if (saved) {
        try {
          state.cookieAccepted = JSON.parse(saved);
          state.cookieAcceptedModal = false;
        } catch {
          state.cookieAccepted = null;
          state.cookieAcceptedModal = true;
        }
      } else {
        state.cookieAccepted = null;
        state.cookieAcceptedModal = true;
      }
    },
    setCookieAccepted: (state, action: PayloadAction<CookiePreferences>) => {
      state.cookieAccepted = action.payload;
      state.cookieAcceptedModal = false;
      saveCookiePreferences(action.payload);
    },
    acceptAllCookies: (state) => {
      const preferences: CookiePreferences = {
        necessary: true,
        functional: true,
        analytics: true,
        marketing: true,
      };
      state.cookieAccepted = preferences;
      state.cookieAcceptedModal = false;
      saveCookiePreferences(preferences);
    },
    acceptNecessaryCookies: (state) => {
      const preferences: CookiePreferences = {
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
      };
      state.cookieAccepted = preferences;
      state.cookieAcceptedModal = false;
      saveCookiePreferences(preferences);
    },
    setCookieAcceptedModal: (state, action: PayloadAction<boolean>) => {
      state.cookieAcceptedModal = action.payload;
    },
    setSystem: (state, action: PayloadAction<Partial<SystemState>>) => {
      Object.assign(state, action.payload);
    },
    clearSystem: () => initialSystemState,
  },
});

export const {
  initializeCookies,
  setCookieAccepted,
  acceptAllCookies,
  acceptNecessaryCookies,
  setCookieAcceptedModal,
  setSystem,
  clearSystem,
} = systemSlice.actions;

export default systemSlice.reducer;
