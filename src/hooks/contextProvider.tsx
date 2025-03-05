import { ReactNode, useState } from "react"
import { GlobalContext } from "./globalContext";


interface ContextProps {
  children?: ReactNode;
}


export const GlobalProvider = ({children}:ContextProps) => {
  const [user, setUser] = useState<object | undefined>({});

  return(
    <GlobalContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </GlobalContext.Provider>
  )
}
