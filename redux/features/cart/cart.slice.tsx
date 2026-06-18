import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  rating: number;
  location: string;
  currentPrice: number;
  originalPrice?: number;
  currencySymbol?: string;
  discountPercentage?: number;
  distance?: string;
  endsIn?: string;
  quantity?: number;
}

interface CartState {
  items: ICartItem[];
  vatRate: number;
  couponDiscount: number;
  subTotal: number;
  totalPrice: number;
}

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
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      const quantityToAdd = action.payload.quantity ?? 1;

      if (item) {
        item.quantity = (item.quantity ?? 0) + quantityToAdd;
      } else {
        state.items.push({
          ...action.payload,
          quantity: quantityToAdd,
        });
      }

      state.subTotal = state.items.reduce(
        (total, item) => total + item.currentPrice * item.quantity!,
        0,
      );
      state.totalPrice = state.subTotal + state.vatRate;
      state.totalPrice = state.totalPrice - state.couponDiscount;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.subTotal = state.items.reduce(
        (total, item) => total + item.currentPrice * item.quantity!,
        0,
      );
      state.totalPrice = state.subTotal + state.vatRate;
      state.totalPrice = state.totalPrice - state.couponDiscount;
    },

    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity = (item.quantity || 1) + 1;
      state.subTotal = state.items.reduce(
        (total, item) => total + item.currentPrice * item.quantity!,
        0,
      );
      state.totalPrice = state.subTotal + state.vatRate;
      state.totalPrice = state.totalPrice - state.couponDiscount;
    },

    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);

      if (item && item.quantity && item.quantity > 1) {
        item.quantity -= 1;
      }
      state.subTotal = state.items.reduce(
        (total, item) => total + item.currentPrice * item.quantity!,
        0,
      );
      state.totalPrice = state.subTotal + state.vatRate;
      state.totalPrice = state.totalPrice - state.couponDiscount;
    },

    clearCart: (state) => {
      state.items = [];
      state.subTotal = 0;
      state.totalPrice = 0;
      state.couponDiscount = 0;
      state.vatRate = 0.15;
    },
    applyCoupon: (state, action: PayloadAction<number>) => {
      state.couponDiscount = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
  applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
