import { ReactNode, useState } from "react"
import { GlobalContext } from "./globalContext";
import { ChatProp } from "../utils/ChatBotHandler";
import { useAuthInfo } from './useAuthInfo';


interface ContextProps {
  children?: ReactNode;
}


export const GlobalProvider = ({children}:ContextProps) => {
  const { userName, isAuthenticated,  } = useAuthInfo();
  const [NavigationData, setNavigationData] = useState<{id:string; label:string; icon:ReactNode; icon2:ReactNode; }[] | undefined>([]);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [MobileTab, setMobileTab] = useState<string>('');
  const [RecentPrompts, setRecentPrompts] = useState<string[]>([]);
  const [showFlightModal, setShowFlightModal] = useState<boolean>(false);
  const [chatLog, setChatLog] = useState<ChatProp[]>(() => { 
    const storedChatLog = sessionStorage.getItem('chatLog');
    return storedChatLog ? JSON.parse(storedChatLog) : [
    {
      message: `Hi ${isAuthenticated ? userName?.split(' ')[0] : "Traveler"}, Which airport will you be flying from?`,
      sender: 'bot'
    }
  ]});

  
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
      chatLog,
      setChatLog,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
