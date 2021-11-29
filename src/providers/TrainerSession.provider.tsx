import React from "react";
import { createContext, ReactNode, useContext } from "react";
import { TrainerSessionObservable } from "../components/Trainer/utils/Session";

const SessionContext = createContext<TrainerSessionObservable | undefined>(
  undefined
);
SessionContext.displayName = "SessionContext";

type SessionProviderProps = {
  session: TrainerSessionObservable;
  children?: ReactNode;
};

const SessionProvider = ({ session, children }: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useTrainerSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("SessionContext not found.");
  }

  return context;
};

export default SessionProvider;
