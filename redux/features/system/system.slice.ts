import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface system {
  latitude: null | number;
  longitude: null | number;
  area: null | string;
}

const initialSystemState: system = {
  latitude: null,
  longitude: null,
  area: null,
};

export const systemSlice = createSlice({
  name: "system",
  initialState: initialSystemState,
  reducers: {
    setSystem: (state, action: PayloadAction<system>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.area = action.payload.area;
    },

    clearSystem: (state) => {
      state.latitude = null;
      state.longitude = null;
      state.area = null;
    },
  },
});

export const { setSystem, clearSystem } = systemSlice.actions;

export default systemSlice.reducer;
