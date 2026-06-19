import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  userId: string;
}
const initialState: IInitialState = {
  userId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
