import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MediaState {
  coverImage: string | null;
  galleryImages: string[];
}

export interface DealInfoState {
  voucher_name: string;
  regularPrice: string;
  discountedPrice: string;
  totalPurchaseLimit: string;
  maxPurchasePerCustomer: string;
}

export interface DealDetailsState {
  deal_name: string;
  category: string;
  shortDescription: string;
  availableTime: string;
  serviceEndTime: string;
  availableDays: string[];
  availableMonths: string[];
}

export interface OverviewState {
  description: string;
  highlightedPoints: string;
  whatsIncludedDescription: string;
  includedPoints: string;
  notIncludedPoints: string;
  location: string;
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
}

const initialState: CreateDealState = {
  openDealModal: false,
  currentStep: 1,
  dealId: "",
  media: {
    coverImage: null,
    galleryImages: [],
  },
  dealInfo: {
    voucher_name: "",
    regularPrice: "",
    discountedPrice: "",
    totalPurchaseLimit: "",
    maxPurchasePerCustomer: "",
  },
  dealDetails: {
    deal_name: "",
    category: "",
    shortDescription: "",
    availableTime: "",
    serviceEndTime: "",
    availableDays: [],
    availableMonths: [],
  },
  overview: {
    description: "",
    highlightedPoints: "",
    whatsIncludedDescription: "",
    includedPoints: "",
    notIncludedPoints: "",
    location: "",
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
} = dealSlice.actions;

export default dealSlice.reducer;
