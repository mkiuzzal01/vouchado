import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import { baseApi } from "./API/baseAPI";
import authReducer from "./features/auth/auth.slice";
import cartReducer from "./features/cart/cart.slice";
import wishlistReducer from "./features/wishlist/wishlist.slice";
import userReducer from "./features/user/user.slice";
import providerReducer from "./features/provider/provider.slice";
import dealReducer from "./features/deal/deal.slice";
import businessReducer from "./features/provider/business_profile.slice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  user: userReducer,
  provider: providerReducer,
  deal: dealReducer,
  business: businessReducer,
});

const persistConfig = {
  key: "vouchado",
  storage,
  whitelist: ["auth", "cart", "wishlist", "user", "provider"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
