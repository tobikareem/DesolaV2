import React, { createContext, ReactNode } from "react";
import { ChatMessage } from "../utils/ChatBotHandler";

interface GlobalContextType {
  chatLog: ChatMessage[];
  setChatLog: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  NavigationData: { id: string; label: string; icon: ReactNode; icon2: ReactNode; }[] | undefined;
  setNavigationData: React.Dispatch<React.SetStateAction<{ id: string; label: string; icon: ReactNode; icon2: ReactNode; }[] | undefined>>;
  showLogoutModal: boolean
  setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDeleteModal: () => void;
  toggleLogoutModal: () => void;
  MobileTab: string | undefined;
  setMobileTab: React.Dispatch<React.SetStateAction<string>>;
  RecentPrompts: string[] | undefined;
  setRecentPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  showFlightModal: boolean;
  setShowFlightModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleFlightModal: () => void;
}
export const GlobalContext = createContext<GlobalContextType>({
  NavigationData: undefined,
  setNavigationData: () => { },
  showLogoutModal: false,
  setShowLogoutModal: () => { },
  showDeleteModal: false,
  MobileTab: undefined,
  setMobileTab: () => { },
  setShowDeleteModal: () => { },
  toggleDeleteModal: () => { },
  toggleLogoutModal: () => { },
  RecentPrompts: undefined,
  setRecentPrompts: () => { },
  showFlightModal: false,
  setShowFlightModal: () => { },
  toggleFlightModal: () => { },
  chatLog: {} as ChatMessage[],
  setChatLog: () => { }
});