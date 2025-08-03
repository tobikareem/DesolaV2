import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EventManager } from '../utils/EventManager';
import { CustomStorage } from '../utils/customStorage';
import { SESSION_VALUES } from '../utils/constants';
import authService from '../services/authService';
import { toastManager } from '../utils/toastUtils';

const storage = new CustomStorage();

interface UseAuthEventsOptions {
    setIsProcessingAuth?: (processing: boolean) => void;
    defaultRedirectUrl?: string;
}

/**
 * Custom hook to handle authentication events.
 * It listens for login success and failure events, and manages redirects accordingly.
 *
 * @param {UseAuthEventsOptions} options - Options for the hook.
 * @returns {void}
 */
export const useAuthEvents = (options: UseAuthEventsOptions = {}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        setIsProcessingAuth,
        defaultRedirectUrl = '/dashboard'
    } = options;

    useEffect(() => {
        const eventCleanupFunctions: (() => void)[] = [];

        const handleLoginSuccess = () => {
            setIsProcessingAuth?.(false);

            const redirectUrl = storage.getItem(SESSION_VALUES.postLoginRedirectUrl);

            if (redirectUrl && redirectUrl !== location.pathname) {
                storage.removeItem(SESSION_VALUES.postLoginRedirectUrl);
                toastManager.show("sign-in","Successfully signed in!","success");
                navigate(redirectUrl);
            } else {
                toastManager.show("welcome", "Welcome to your dashboard!", "success")
                navigate(defaultRedirectUrl);
            }
        };

        const handleLoginFailure = () => {
            setIsProcessingAuth?.(false);
            toastManager.show("Login-failure","Authentication failed. Please try again.", "error");
            storage.removeItem(SESSION_VALUES.postLoginRedirectUrl);

            if (location.pathname !== '/') {
                navigate('/');
            }
        };

        const handleInitComplete = (event: CustomEvent) => {

            const { hasRedirectResponse, hasActiveAccount } = event.detail;

            if (hasRedirectResponse) {
                setIsProcessingAuth?.(true);
            } else if (hasActiveAccount && location.pathname === '/') {
                navigate(defaultRedirectUrl);
            } else {
                setIsProcessingAuth?.(false);
            }
        };

        const loginSuccessCleanup = EventManager.listen('msal:login-success', handleLoginSuccess);
        const loginFailureCleanup = EventManager.listen('msal:login-failure', handleLoginFailure);
        const initCompleteCleanup = EventManager.listen('auth:initialization-complete', handleInitComplete);

        eventCleanupFunctions.push(
            loginSuccessCleanup,
            loginFailureCleanup,
            initCompleteCleanup
        );

        const checkCurrentAuthState = () => {
            try {
                const currentAccount = authService.getCurrentAccount();
                const isAuthenticated = storage.getItem(SESSION_VALUES.azure_isAuthenticated) === 'true';

                if (currentAccount && isAuthenticated && location.pathname === '/') {
                    setTimeout(() => {
                        navigate(defaultRedirectUrl);
                    }, 100);
                }
            } catch (error) {
                console.error("Error checking current auth state:", error);
            }
        };

        checkCurrentAuthState();
        const checkTimer = setTimeout(checkCurrentAuthState, 200);

        return () => {
            clearTimeout(checkTimer);
            eventCleanupFunctions.forEach(cleanup => cleanup());
        };
    }, [navigate, location.pathname, setIsProcessingAuth, defaultRedirectUrl]);
};

export default useAuthEvents;