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
  originalPrice?: number | string;
  discountBadge?: number;
  selectedQuantity: number;
  totalQuantity: number;
  isSelected: boolean;
}

interface CartState {
  items: ICartItem[];
  vatRate: number;
  couponDiscount: number;
  couponStatus: boolean;
  subTotal: number;
  totalPrice: number;
}

const calculateTotals = (state: CartState) => {
  state.subTotal = state.items.reduce((total, item) => {
    if (!item.isSelected) return total;

    const cleanPrice =
      typeof item.currentPrice === "string"
        ? parseFloat(item.currentPrice.replace(/[^0-9.]/g, ""))
        : item.currentPrice;

    const price = isNaN(cleanPrice) || !cleanPrice ? 0 : cleanPrice;
    const qty =
      isNaN(item.selectedQuantity) || item.selectedQuantity < 1
        ? 1
        : item.selectedQuantity;

    return total + price * qty;
  }, 0);

  const vatAmount = state.subTotal * state.vatRate;
  const rawTotal = state.subTotal + vatAmount - state.couponDiscount;

  state.subTotal = isNaN(state.subTotal) ? 0 : state.subTotal;
  state.totalPrice = isNaN(rawTotal) ? 0 : Math.max(0, rawTotal);
};

const initialState: CartState = {
  items: [],
  vatRate: 0.15,
  couponDiscount: 0,
  couponStatus: false,
  subTotal: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
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
        const nextQty =
          existingItem.selectedQuantity + action.payload.selectedQuantity;
        existingItem.selectedQuantity = Math.min(
          nextQty,
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

    clearCart: (state) => {
      state.items = [];
      state.subTotal = 0;
      state.totalPrice = 0;
      state.couponDiscount = 0;
      state.couponStatus = false;
    },

    setApplyCoupon: (state, action: PayloadAction<number>) => {
      state.couponDiscount = action.payload;
      state.couponStatus = true;
      calculateTotals(state);
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
} = cartSlice.actions;

export default cartSlice.reducer;
