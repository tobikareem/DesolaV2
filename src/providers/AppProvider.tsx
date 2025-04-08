import React, { ReactNode } from 'react';
import { ChatProvider } from './ChatProviders';
import { NavigationProvider } from './NavigationProvider';
import { UIProvider } from './UIProvider';

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <NavigationProvider>
            <UIProvider>
                <ChatProvider>
                    {children}
                </ChatProvider>
            </UIProvider>
        </NavigationProvider>
    );
};