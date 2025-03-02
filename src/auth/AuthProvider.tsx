/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/AuthContext.tsx

import { AccountInfo } from '@azure/msal-browser';
import React, { useEffect, useState } from 'react';
import authService from '../services/authService';
import { AuthContext } from './AuthContext';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AccountInfo | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await authService.initialize();
                const currentAccount = authService.getCurrentAccount();

                if (currentAccount) {
                    setUser(currentAccount);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                setError('Failed to initialize authentication');
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const signIn = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.signIn();
            if (result) {
                setUser(result.account);
                setIsAuthenticated(true);
            }
        } catch (error: any) {
            console.error('Sign-in error:', error);
            setError(error?.message || 'Failed to sign in');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await authService.signUp();
            if (result) {
                setUser(result.account);
                setIsAuthenticated(true);
            }
        } catch (error: any) {
            console.error('Sign-up error:', error);
            setError(error.message || 'Failed to sign up');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        setIsLoading(true);

        try {
            await authService.signOut();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error: any) {
            console.error('Sign-out error:', error);
            setError(error.message || 'Failed to sign out');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                error,
                signIn,
                signUp,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
