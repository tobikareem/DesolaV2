/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { AccountInfo } from "@azure/msal-browser";
import { CustomerProfile } from "../models/UserProfile/CustomerProfile";

export enum CustomEventTypeEnum {
    // MSAL Events
    MSAL_LOGIN_SUCCESS = 'msal:login-success',
    MSAL_LOGIN_FAILURE = 'msal:login-failure',
    MSAL_LOGOUT_SUCCESS = 'msal:logout-success',

    // Auth Service Events
    AUTH_INTERACTIVE_REQUIRED = 'auth:interactive-required',
    AUTH_TOKEN_EXPIRED = 'auth:token-expired',
    AUTH_INITIALIZATION_COMPLETE = 'auth:initialization-complete',
    AUTH_INITIALIZATION_FAILED = 'auth:initialization-failed',

    // Customer Events
    CUSTOMER_PROFILE_UPDATED = 'customer:profile-updated',

    // Application Events
    APP_REDIRECT_REQUIRED = 'app:redirect-required',
    APP_ERROR = 'app:error'
}

interface CustomEventDetails {
    'msal:login-success': {
        account: AccountInfo;
        accessToken: string;
        idToken: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        idTokenClaims: any;
    };
    'msal:login-failure': {
        error: string;
        timestamp: number;
    };
    'msal:logout-success': {
        reason: 'user-initiated' | 'token-expired' | 'error';
        timestamp: number;
    };
    'auth:interactive-required': {
        reason: string;
        timestamp: number;
    };
    'auth:token-expired': {
        tokenType: 'access' | 'id';
        expiredAt: number;
    };
    'auth:initialization-complete': {
        hasRedirectResponse: boolean;
        hasActiveAccount: boolean;
        timestamp: number;
    };
    'auth:initialization-failed': {
        error: string;
        timestamp: number;
    };
    'customer:profile-updated': CustomerProfile;
    'app:redirect-required': {
        url: string;
        delay?: number;
        reason: string;
    };
    'app:error': {
        message: string;
        details?: string;
        recoverable: boolean;
        timestamp: number;
    };
}

// Define specific event types
type MSALLoginSuccessEvent = CustomEvent<CustomEventDetails['msal:login-success']>;
type MSALLoginFailureEvent = CustomEvent<CustomEventDetails['msal:login-failure']>;
type MSALLogoutSuccessEvent = CustomEvent<CustomEventDetails['msal:logout-success']>;
type AuthInteractiveRequiredEvent = CustomEvent<CustomEventDetails['auth:interactive-required']>;
type AuthTokenExpiredEvent = CustomEvent<CustomEventDetails['auth:token-expired']>;
type AuthInitializationCompleteEvent = CustomEvent<CustomEventDetails['auth:initialization-complete']>;
type AuthInitializationFailedEvent = CustomEvent<CustomEventDetails['auth:initialization-failed']>;
type CustomerProfileUpdatedEvent = CustomEvent<CustomEventDetails['customer:profile-updated']>;
type AppRedirectRequiredEvent = CustomEvent<CustomEventDetails['app:redirect-required']>;
type AppErrorEvent = CustomEvent<CustomEventDetails['app:error']>;

// Extend the global WindowEventMap to include all our custom events
declare global {
    interface WindowEventMap {
        'msal:login-success': MSALLoginSuccessEvent;
        'msal:login-failure': MSALLoginFailureEvent;
        'msal:logout-success': MSALLogoutSuccessEvent;
        'auth:interactive-required': AuthInteractiveRequiredEvent;
        'auth:token-expired': AuthTokenExpiredEvent;
        'auth:initialization-complete': AuthInitializationCompleteEvent;
        'auth:initialization-failed': AuthInitializationFailedEvent;
        'customer:profile-updated': CustomerProfileUpdatedEvent;
        'app:redirect-required': AppRedirectRequiredEvent;
        'app:error': AppErrorEvent;
    }
}

export class EventManager {
    private static listeners = new Map<string, number>();
    private static handlerMap = new WeakMap<Function, EventListener>();

    /**
     * Dispatch a custom application event
     */
    static dispatch<K extends keyof CustomEventDetails>(
        eventType: K,
        detail: CustomEventDetails[K]
    ): void {
        try {
            const event = new CustomEvent(eventType, { detail });

            window.dispatchEvent(event);

            const currentCount = EventManager.listeners.get(eventType) || 0;
            EventManager.listeners.set(eventType, currentCount + 1);

        } catch (error) {
            console.error(`Failed to dispatch event ${eventType}:`, error);
        }
    }

    /**
     * Listen for a custom application event
     */
    static listen<K extends keyof WindowEventMap>(
        eventType: K,
        handler: (event: WindowEventMap[K]) => void | Promise<void>,
        options?: AddEventListenerOptions
    ): () => void {
        const wrappedHandler = async (event: Event) => {
            try {
                await handler(event as WindowEventMap[K]);

            } catch (error) {
                console.error(`Error handling event ${eventType}:`, error);

                // Emit error event for unhandled errors
                if (eventType !== 'app:error') {
                    EventManager.dispatch('app:error', {
                        message: `Error in ${eventType} handler`,
                        details: error instanceof Error ? error.message : String(error),
                        recoverable: true,
                        timestamp: Date.now()
                    });
                }
            }
        };

        // Store the mapping between original handler and wrapped handler
        EventManager.handlerMap.set(handler, wrappedHandler);

        window.addEventListener(eventType, wrappedHandler, options);

        return () => {
            window.removeEventListener(eventType, wrappedHandler);
            EventManager.handlerMap.delete(handler);
        };
    }

    /**
     * Listen for an event only once
     */
    static once<K extends keyof WindowEventMap>(
        eventType: K,
        handler: (event: WindowEventMap[K]) => void | Promise<void>
    ): () => void {
        return EventManager.listen(eventType, handler, { once: true });
    }

    /**
     * Remove an event listener using the original handler function
     */
    static unlisten<K extends keyof WindowEventMap>(
        eventType: K,
        handler: (event: WindowEventMap[K]) => void | Promise<void>
    ): void {
        const wrappedHandler = EventManager.handlerMap.get(handler);
        if (wrappedHandler) {
            window.removeEventListener(eventType, wrappedHandler);
            EventManager.handlerMap.delete(handler);
        } else {
            console.warn(`Handler not found for event ${eventType}. It may have already been removed.`);
        }
    }

    /**
     * Dispatch an event and wait for all listeners to complete
     */
    static async dispatchSync<K extends keyof CustomEventDetails>(
        eventType: K,
        detail: CustomEventDetails[K]
    ): Promise<void> {
        return new Promise((resolve) => {
            const event = new CustomEvent(eventType, { detail });
            window.dispatchEvent(event);
            // Use setTimeout to ensure all synchronous listeners have executed
            setTimeout(resolve, 0);
        });
    }

    /**
     * Wait for a specific event to occur
     */
    static waitFor<K extends keyof WindowEventMap>(
        eventType: K,
        timeout: number = 5000
    ): Promise<WindowEventMap[K]> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                cleanup();
                reject(new Error(`Timeout waiting for event: ${eventType}`));
            }, timeout);

            const cleanup = EventManager.listen(eventType, (event) => {
                clearTimeout(timer);
                cleanup();
                resolve(event);
            });
        });
    }

    /**
     * Clear all handler mappings (useful for cleanup)
     */
    static clearHandlerMappings(): void {
        EventManager.handlerMap = new WeakMap<Function, EventListener>();
    }

}

// Specific event helper classes for better organization
export const AuthEvents = {
    /**
     * Dispatch when user login is successful
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loginSuccess: (account: AccountInfo, accessToken: string, idToken: string, idTokenClaims: any) => {
        EventManager.dispatch('msal:login-success', {
            account,
            accessToken,
            idToken,
            idTokenClaims
        });
    },

    /**
     * Dispatch when login fails
     */
    loginFailure: (error: string) => {
        EventManager.dispatch('msal:login-failure', {
            error,
            timestamp: Date.now()
        });
    },

    /**
     * Dispatch when interactive authentication is required
     */
    interactiveRequired: (reason: string) => {
        EventManager.dispatch('auth:interactive-required', {
            reason,
            timestamp: Date.now()
        });
    },

    /**
     * Dispatch when a token has expired
     */
    tokenExpired: (tokenType: 'access' | 'id', expiredAt: number) => {
        EventManager.dispatch('auth:token-expired', {
            tokenType,
            expiredAt
        });
    },

    /**
     * Dispatch when user logout is successful
     */
    logoutSuccess: (reason: 'user-initiated' | 'token-expired' | 'error') => {
        EventManager.dispatch('msal:logout-success', {
            reason,
            timestamp: Date.now()
        });
    },

    /**
     * Dispatch when auth initialization completes
     */
    initializationComplete: (details: { hasRedirectResponse: boolean; hasActiveAccount: boolean; timestamp: number }) => {
        EventManager.dispatch('auth:initialization-complete', details);
    },

    /**
     * Dispatch when auth initialization fails
     */
    initializationFailed: (error: string) => {
        EventManager.dispatch('auth:initialization-failed', {
            error,
            timestamp: Date.now()
        });
    },

    /**
     * Dispatch customer profile update
     */
    profileUpdated: (profile: CustomerProfile) => {
        EventManager.dispatch('customer:profile-updated', profile);
    }
};

export const CustomerEvents = {
    /**
     * Dispatch when customer profile is updated
     */
    profileUpdated: (profile: CustomerProfile) => {
        EventManager.dispatch('customer:profile-updated', profile);
    }
};

export const AppEvents = {
    /**
     * Dispatch when app needs to redirect
     */
    redirectRequired: (url: string, reason: string, delay?: number) => {
        EventManager.dispatch('app:redirect-required', {
            url,
            delay,
            reason
        });
    },

    /**
     * Dispatch when an application error occurs
     */
    error: (message: string, details?: string, recoverable: boolean = true) => {
        EventManager.dispatch('app:error', {
            message,
            details,
            recoverable,
            timestamp: Date.now()
        });
    }
};