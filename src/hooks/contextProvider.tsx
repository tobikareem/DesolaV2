import { ReactNode, useState } from "react"
import { GlobalContext } from "./globalContext";


interface ContextProps {
  children?: ReactNode;
}


export const GlobalProvider = ({children}:ContextProps) => {
  const [user, setUser] = useState<object | undefined>({});
  const [RecentPromptsData, setRecentPromptsData] = useState<string[] | undefined>([]);

  return(
    <GlobalContext.Provider value={{ user, setUser, RecentPromptsData, setRecentPromptsData }}>
      {children}
    </GlobalContext.Provider>
  )
}
