import React from "react";
import { createContext, ReactNode, useContext } from "react";
import { AppState } from "../store/store";

const StoreContext = createContext<AppState | undefined>(undefined);
StoreContext.displayName = "StoreContext";

type StoreProviderProps = {
  store: AppState;
  children?: ReactNode;
};

const StoreProvider = ({ store, children }: StoreProviderProps) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("StoreContext not found.");
  }

  return context;
};

export default StoreProvider;
