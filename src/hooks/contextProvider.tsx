import { ReactNode, useState } from "react"
import { GlobalContext } from "./globalContext";


interface ContextProps {
  children?: ReactNode;
}


export const GlobalProvider = ({children}:ContextProps) => {
  const [user, setUser] = useState<object | undefined>({});
  const [NavigationData, setNavigationData] = useState<{id:string; label:string; icon:ReactNode; icon2:ReactNode; }[] | undefined>([]);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [MobileTab, setMobileTab] = useState<string>('');
  const [RecentPrompts, setRecentPrompts] = useState<string[]>([]);
  const [showFlightModal, setShowFlightModal] = useState<boolean>(false);
  
  const toggleLogoutModal = () => {
    setShowLogoutModal(prevState => !prevState)
  }

  const toggleDeleteModal = () => {
    setShowDeleteModal(prevState => !prevState)
  }

  const toggleFlightModal = () => {
    setShowFlightModal(prevState => !prevState)
  }


  return(
    <GlobalContext.Provider value={{ 
      user, 
      setUser, 
      NavigationData, 
      setNavigationData, 
      showLogoutModal,
      setShowLogoutModal, 
      showDeleteModal, 
      setShowDeleteModal, 
      toggleLogoutModal, 
      toggleDeleteModal,
      MobileTab,
      setMobileTab ,
      RecentPrompts,
      setRecentPrompts,
      showFlightModal, 
      setShowFlightModal,
      toggleFlightModal,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
