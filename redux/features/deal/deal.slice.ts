import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationState {
  visit_location: string;
  lat: number;
  lng: number;
}

export interface MediaState {
  coverImage: string | null;
  galleryImages: string[];
}

export interface DealInfoState {
  voucher_name: string;
  regularPrice: number;
  discountedPrice: number;
  totalPurchaseLimit: number;
  maxPurchasePerCustomer: number;
}

export interface DealDetailsState {
  deal_name: string;
  category: string;
  child_category: string;
  shortDescription: string;
  available_start_time: string;
  available_end_time: string;
  service_end_time: string;
  availableDays: string[];
  availableMonths: string[];
}

export interface OverviewState {
  description: string;
  highlightedPoints: string;
  includedDescription: string;
  includedPoints: string;
  notIncludedPoints: string;
  location: LocationState | null;
  openingHours: string;
  accessibility: string;
}

export interface CreateDealState {
  openDealModal: boolean;
  currentStep: number;
  dealId: string;
  media: MediaState;
  dealInfo: DealInfoState;
  dealDetails: DealDetailsState;
  overview: OverviewState;
  status: "active" | "inactive";
  granted_12_months: boolean;
}

const initialState: CreateDealState = {
  status: "active",
  granted_12_months: false,
  openDealModal: false,
  currentStep: 1,
  dealId: "",
  media: {
    coverImage: null,
    galleryImages: [],
  },
  dealInfo: {
    voucher_name: "Give your delas name",
    regularPrice: 0,
    discountedPrice: 0,
    totalPurchaseLimit: 0,
    maxPurchasePerCustomer: 0,
  },
  dealDetails: {
    deal_name: "",
    category: "",
    child_category: "",
    shortDescription: "",
    available_start_time: "",
    available_end_time: "",
    service_end_time: "",
    availableDays: [],
    availableMonths: [],
  },
  overview: {
    description: "",
    highlightedPoints: "",
    includedDescription: "",
    includedPoints: "",
    notIncludedPoints: "",
    location: null,
    openingHours: "",
    accessibility: "",
  },
};

export const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    setOpenDealModal: (state, action: PayloadAction<boolean>) => {
      state.openDealModal = action.payload;
    },

    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },

    updateMedia: (state, action: PayloadAction<Partial<MediaState>>) => {
      state.media = { ...state.media, ...action.payload };
    },

    updateDealInfo: (state, action: PayloadAction<Partial<DealInfoState>>) => {
      state.dealInfo = { ...state.dealInfo, ...action.payload };
    },

    updateDealDetails: (
      state,
      action: PayloadAction<Partial<DealDetailsState>>,
    ) => {
      state.dealDetails = { ...state.dealDetails, ...action.payload };
    },

    updateOverview: (state, action: PayloadAction<Partial<OverviewState>>) => {
      state.overview = { ...state.overview, ...action.payload };
    },

    setDealId: (state, action: PayloadAction<string>) => {
      state.dealId = action.payload;
    },

    resetDealForm: () => initialState,

    updateGranted12Months: (state, action: PayloadAction<boolean>) => {
      state.granted_12_months = action.payload;
    },

    updateDealStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload as "active" | "inactive";
    },
  },
});

export const {
  setOpenDealModal,
  setStep,
  updateMedia,
  updateDealInfo,
  updateDealDetails,
  updateOverview,
  setDealId,
  resetDealForm,
  updateGranted12Months,
  updateDealStatus,
} = dealSlice.actions;

export default dealSlice.reducer;
