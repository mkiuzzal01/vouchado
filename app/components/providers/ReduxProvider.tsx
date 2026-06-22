"use client";

import { persistor, store } from "../../../redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

interface StoreProviderProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer position="top-right" />
        {children}
      </PersistGate>
    </Provider>
  );
}
