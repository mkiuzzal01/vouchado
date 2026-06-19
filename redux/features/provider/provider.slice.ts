import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  providerId: string;
}
const initialState: IInitialState = {
  providerId: "",
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.providerId = action.payload;
    },
  },
});

export const { setProvider } = providerSlice.actions;

export default providerSlice.reducer;
