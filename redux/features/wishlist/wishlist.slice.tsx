import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  id: string;
  imageUrl: string;
  category: string;
  title: string;
  rating: number;
  location?: string;
  currentPrice: number;
  originalPrice?: number;
  currencySymbol?: string;
  discountPercentage?: number;
  distance?: string;
  endsIn?: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const exists = (state: WishlistState, id: string) =>
  state.items.some((item) => item.id === id);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      if (!exists(state, action.payload.id)) {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearWishlist: (state) => {
      state.items = [];
    },

    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const id = action.payload.id;
      const index = state.items.findIndex((item) => item.id === id);

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
