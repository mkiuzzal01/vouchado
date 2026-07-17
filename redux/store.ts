import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import { baseApi } from "./API/baseAPI";
import authReducer from "./features/auth/auth.slice";
import cartReducer from "./features/cart/cart.slice";
import providerReducer from "./features/provider/provider.slice";
import dealReducer from "./features/deal/deal.slice";
import businessReducer from "./features/provider/business_profile.slice";
import systemReducer from "./features/system/system.slice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  cart: cartReducer,
  provider: providerReducer,
  deal: dealReducer,
  business: businessReducer,
  system: systemReducer,
});

const persistConfig = {
  key: "vouchado",
  storage,
  whitelist: ["auth", "cart", "system"],
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
