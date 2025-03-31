import { createContext } from 'react';
import { NavigationContextType } from './types';

export const NavigationContext = createContext<NavigationContextType>({
    navigationData: [],
    setNavigationData: () => { },
    mobileTab: '',
    setMobileTab: () => { }
});

