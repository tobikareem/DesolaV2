import React, { createContext, ReactNode} from "react";

interface GlobalContextType {
  user: object | undefined;
  setUser: React.Dispatch<React.SetStateAction<object | undefined>>;
  NavigationData: {id:string; label:string; icon:ReactNode; icon2:ReactNode; }[] | undefined;
  setNavigationData: React.Dispatch<React.SetStateAction<{id:string; label:string; icon:ReactNode; icon2:ReactNode; }[] | undefined>>;
  showLogoutModal: boolean
  setShowLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal: boolean
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDeleteModal: ()=> void;
  toggleLogoutModal: ()=> void;
  MobileTab: string | undefined;
  setMobileTab:React.Dispatch<React.SetStateAction<string>>;
  RecentPrompts: string[] | undefined;
  setRecentPrompts: React.Dispatch<React.SetStateAction<string[]>>;

}
export const GlobalContext = createContext<GlobalContextType>({
  user: undefined,
  setUser:() => {},
  NavigationData: undefined,
  setNavigationData: () => { },
  showLogoutModal: false,
  setShowLogoutModal: () => {},
  showDeleteModal:false,
  MobileTab:undefined,
  setMobileTab:() => {},
  setShowDeleteModal: () => {},
  toggleDeleteModal: () => {},
  toggleLogoutModal: () => {},
  RecentPrompts:undefined,
  setRecentPrompts:() => {},
});