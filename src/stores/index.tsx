import { createContext, PropsWithChildren, ReactNode, useContext } from "react";
import { useAuth } from "./AuthStore";

import { useQuestions } from "./QuestionStore";

interface Stores {
  questionsStore: ReturnType<typeof useQuestions>;
  authStore: ReturnType<typeof useAuth>;
}

const storesCtx = createContext<Stores>({} as Stores);

export function useStores() {
  return useContext(storesCtx);
}

export function StoresProvider({ children }: PropsWithChildren<ReactNode>) {
  const questionsStore = useQuestions();
  const authStore = useAuth();

  return <storesCtx.Provider value={{ questionsStore, authStore }}>{children}</storesCtx.Provider>;
}
