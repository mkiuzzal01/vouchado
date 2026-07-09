import { IBusinessForm } from "@/redux/types/business_profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IBusinessForm = {
  name: "",
  phone: "",
  business_name: "",
  business_email: "",
  business_description: "",
  business_website: "",
  business_category: "",
  business_address: "",
  latitude: 0,
  longitude: 0,
  business_logo: null,
  business_cover_image: null,
  business_hours: [],
};

const businessProfileSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessForm: (state, action: PayloadAction<Partial<IBusinessForm>>) => {
      return { ...state, ...action.payload };
    },

    clearBusinessForm: (state) => {
      return { ...state, ...initialState };
    },
  },
});

export const { setBusinessForm, clearBusinessForm } =
  businessProfileSlice.actions;

export default businessProfileSlice.reducer;
