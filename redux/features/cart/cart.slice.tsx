import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  id: string;
  title: string;
  thumbnail: string;
  tagline?: string;
  rating: number;
  reviewsCount?: number;
  location: string;
  currentPrice: number | string;
  selectedQuantity: number;
  totalQuantity: number;
  isSelected: boolean;
}

export interface CartState {
  items: ICartItem[];
  vat_percentage: number;
  vatAmount: number;
  redeemDiscountAmount: number;
  couponDiscount: number;
  points_conversion_rate: number;
  redeemPointsDiscount: number;
  couponStatus: boolean;
  subTotal: number;
  totalPrice: number;
}

const calculateTotals = (state: CartState) => {
  // 1. Calculate Subtotal for selected items
  const subTotal = state.items.reduce((total, item) => {
    if (!item.isSelected) return total;

    const price =
      typeof item.currentPrice === "string"
        ? Number(item.currentPrice.replace(/[^0-9.]/g, ""))
        : item.currentPrice;

    const quantity = Math.max(1, item.selectedQuantity);

    return total + (isNaN(price) ? 0 : price) * quantity;
  }, 0);

  // 2. Fix VAT Calculation (Handle both 15 and 0.15 correctly)
  const normalizedVatRate =
    state.vat_percentage > 1
      ? state.vat_percentage / 100
      : state.vat_percentage;

  const vatAmount = subTotal * normalizedVatRate;

  // 3. Points Discount
  const pointsMonetaryDiscount =
    state.points_conversion_rate > 0
      ? (state.redeemPointsDiscount * state.points_conversion_rate) / 100
      : 0;

  // 4. Grand Total
  const total =
    subTotal + vatAmount - state.couponDiscount - pointsMonetaryDiscount;

  state.subTotal = Number(subTotal.toFixed(2));
  state.vatAmount = Number(vatAmount.toFixed(2));
  state.redeemDiscountAmount = Number(pointsMonetaryDiscount.toFixed(2));
  state.totalPrice = Number(Math.max(total, 0).toFixed(2));
};

const initialState: CartState = {
  items: [],
  vat_percentage: 0,
  vatAmount: 0,
  redeemDiscountAmount: 0,
  couponDiscount: 0,
  points_conversion_rate: 0,
  redeemPointsDiscount: 0,
  couponStatus: false,
  subTotal: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<
        Omit<ICartItem, "isSelected"> & { isSelected?: boolean }
      >,
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.selectedQuantity = Math.min(
          existingItem.selectedQuantity + action.payload.selectedQuantity,
          existingItem.totalQuantity,
        );
      } else {
        state.items.push({
          ...action.payload,
          isSelected: action.payload.isSelected ?? true,
        });
      }

      calculateTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      calculateTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.selectedQuantity = Math.min(
          Math.max(1, action.payload.quantity),
          item.totalQuantity,
        );
      }

      calculateTotals(state);
    },

    toggleSelectItem: (
      state,
      action: PayloadAction<{ id: string; isSelected: boolean }>,
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item) {
        item.isSelected = action.payload.isSelected;
      }

      calculateTotals(state);
    },

    toggleSelectAll: (state, action: PayloadAction<boolean>) => {
      state.items.forEach((item) => {
        item.isSelected = action.payload;
      });

      calculateTotals(state);
    },

    setApplyCoupon: (state, action: PayloadAction<number>) => {
      state.couponDiscount = Math.max(0, action.payload);
      state.couponStatus = true;
      calculateTotals(state);
    },

    removeCoupon: (state) => {
      state.couponDiscount = 0;
      state.couponStatus = false;
      calculateTotals(state);
    },

    setRedeemPointsDiscount: (state, action: PayloadAction<number>) => {
      state.redeemPointsDiscount = Math.max(0, action.payload);
      calculateTotals(state);
    },

    setPointsConversionRate: (state, action: PayloadAction<number>) => {
      state.points_conversion_rate = action.payload;
      calculateTotals(state);
    },

    updateVatPercentage: (state, action: PayloadAction<number>) => {
      state.vat_percentage = action.payload;
      calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.subTotal = 0;
      state.vatAmount = 0;
      state.totalPrice = 0;
      state.couponDiscount = 0;
      state.redeemPointsDiscount = 0;
      state.redeemDiscountAmount = 0;
      state.couponStatus = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleSelectItem,
  toggleSelectAll,
  clearCart,
  setApplyCoupon,
  removeCoupon,
  setRedeemPointsDiscount,
  setPointsConversionRate,
  updateVatPercentage,
} = cartSlice.actions;

export default cartSlice.reducer;
