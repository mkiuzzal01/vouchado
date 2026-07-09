import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  id: string;
  title: string;
  thumbnail: string;
  tagline?: string;
  rating: number;
  reviewsCount?: number;
  location: string;
  currentPrice: number;
  originalPrice?: number;
  discountBadge?: number;
  selectedQuantity: number;
  totalQuantity: number;
  isSelected: boolean;
}

interface CartState {
  items: ICartItem[];
  vatRate: number;
  couponDiscount: number;
  subTotal: number;
  totalPrice: number;
}

const calculateTotals = (state: CartState) => {
  state.subTotal = state.items.reduce((total, item) => {
    return item.isSelected
      ? total + item.currentPrice * item.selectedQuantity
      : total;
  }, 0);

  const vatAmount = state.subTotal * state.vatRate;
  const rawTotal = state.subTotal + vatAmount - state.couponDiscount;
  state.totalPrice = Math.max(0, rawTotal);
};

const initialState: CartState = {
  items: [],
  vatRate: 0.15,
  couponDiscount: 0,
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
        existingItem.selectedQuantity += action.payload.selectedQuantity;
        existingItem.totalQuantity += action.payload.totalQuantity;
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
        item.selectedQuantity = Math.max(1, action.payload.quantity);
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
    },

    applyCoupon: (state, action: PayloadAction<number>) => {
      state.couponDiscount = action.payload;
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
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
