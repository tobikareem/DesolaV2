import { ReactNode } from 'react';

export interface ChatMessage {
  message: string;
  sender: 'user' | 'bot';
}

export interface TravelInformation {
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  icon2: ReactNode;
}

export interface ChatContextType {
  chatLog: ChatMessage[];
  setChatLog: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  recentPrompts: string[];
  setRecentPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  travelInfo: TravelInformation;
}

export interface UIContextType {
  showLogoutModal: boolean;
  showDeleteModal: boolean;
  showFlightModal: boolean;
  openModal: (modalType: 'logout' | 'delete' | 'flight') => void;
  closeModal: (modalType: 'logout' | 'delete' | 'flight') => void;
  toggleModal: (modalType: 'logout' | 'delete' | 'flight') => void;
}

export interface NavigationContextType {
  navigationData: NavItem[];
  setNavigationData: React.Dispatch<React.SetStateAction<NavItem[]>>;
  mobileTab: string;
  setMobileTab: React.Dispatch<React.SetStateAction<string>>;
}