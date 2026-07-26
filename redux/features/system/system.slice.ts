import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SystemState {
  latitude: number | null;
  longitude: number | null;
  area: string | null;
  newsletter_featured_rate: string | null;
  top_trending_featured_rate: string | null;
  push_notification_featured_rate: string | null;
  last_minute_boost_rate: string | null;
  priority_ranking_rate: string | null;
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
};

export const systemSlice = createSlice({
  name: "system",
  initialState: initialSystemState,
  reducers: {
    setSystem: (state, action: PayloadAction<Partial<SystemState>>) => {
      Object.assign(state, action.payload);
    },

    clearSystem: () => initialSystemState,
  },
});

export const { setSystem, clearSystem } = systemSlice.actions;

export default systemSlice.reducer;
