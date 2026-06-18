import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
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
  items: IProduct[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IProduct>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearWishlist: (state) => {
      state.items = [];
    },
    toggleWishlist: (state, action: PayloadAction<IProduct>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index !== -1) {
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
