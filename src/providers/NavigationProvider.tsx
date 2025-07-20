import { ReactNode, useEffect, useState } from "react";
import { NavigationContext } from "../contexts/NavigationContext";
import { NavItem } from "../contexts/types";
import { CustomStorage } from "../utils/customStorage";
import { useIsDesktop } from "../hooks/useDesktopSize";

interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const storage = new CustomStorage();
    const isDesktop = useIsDesktop();
    const [navigationData, setNavigationData] = useState<NavItem[]>([]);
    const [mobileTab, setMobileTab] = useState<string>(()=> {
        const storedMobileTab = storage.getItem('mobileRoute')
        return storedMobileTab ? storedMobileTab : ''
    });

    useEffect(()=>{
        if (!isDesktop) {storage.setItem('mobileRoute',mobileTab)}
    },[mobileTab])

    return (
        <NavigationContext.Provider value={{
            navigationData,
            setNavigationData,
            mobileTab,
            setMobileTab
        }}>
            {children}
        </NavigationContext.Provider>
    );
};