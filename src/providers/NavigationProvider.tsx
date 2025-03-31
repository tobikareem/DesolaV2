import { ReactNode, useState } from "react";
import { NavigationContext } from "../contexts/NavigationContext";
import { NavItem } from "../contexts/types";

interface NavigationProviderProps {
    children: ReactNode;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
    const [navigationData, setNavigationData] = useState<NavItem[]>([]);
    const [mobileTab, setMobileTab] = useState('');

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