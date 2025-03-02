/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/AuthContext.tsx
import { AccountInfo } from '@azure/msal-browser';
import { createContext } from 'react';

export interface AuthContextType {
    user: AccountInfo | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
