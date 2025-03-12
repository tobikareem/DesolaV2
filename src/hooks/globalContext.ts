import { createContext} from "react";

interface GlobalContextType {
  user: object | undefined;
  setUser: React.Dispatch<React.SetStateAction<object | undefined>>;
  RecentPromptsData: string[] | undefined;
  setRecentPromptsData: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}
export const GlobalContext = createContext<GlobalContextType>({
  user: undefined,
  setUser: () => { },
  RecentPromptsData: undefined,
  setRecentPromptsData: () => { },
});