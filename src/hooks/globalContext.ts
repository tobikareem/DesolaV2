import { createContext } from "react";

interface GlobalContextType {
  user: object | undefined;
  setUser: React.Dispatch<React.SetStateAction<object | undefined>>;
}
export const GlobalContext = createContext<GlobalContextType>({
  user: undefined,
  setUser: () => {},
});