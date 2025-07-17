import React, { ReactNode } from 'react';
import { ChatProvider } from './ChatProviders';
import { NavigationProvider } from './NavigationProvider';
import { UIProvider } from './UIProvider';
import { EditProvider } from './EditProviders';
import { SubscriptionProvider } from './SubscriptionProviders';

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <NavigationProvider>
            <UIProvider>
                <ChatProvider>
                    <EditProvider>
                        <SubscriptionProvider>
                            {children}
                        </SubscriptionProvider>
                    </EditProvider>
                </ChatProvider>
            </UIProvider>
        </NavigationProvider>
    );
};