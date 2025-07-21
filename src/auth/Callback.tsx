import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ErrorScreen from "../components/layout/ErrorScreen";
import LoadingScreen from "../components/layout/LoadingScreen";
import SuccessScreen from "../components/layout/SuccessScreen";
import authService from "../services/authService";
import { EventManager } from "../utils/EventManager";
import { SESSION_VALUES } from "../utils/constants";
import { CustomStorage } from "../utils/customStorage";

const storage = new CustomStorage();

interface CallbackState {
  status: 'loading' | 'success' | 'error';
  message?: string;
  details?: string;
}


const Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState<CallbackState>({ status: 'loading' });

  useEffect(() => {
    const eventCleanupFunctions: (() => void)[] = [];

    const setupEventListeners = () => {
      const unsubscribeSuccess = EventManager.listen('msal:login-success', () => {
        handleAuthSuccess();
      });

      const unsubscribeError = EventManager.listen('auth:interactive-required', (event) => {
        handleAuthError('Authentication required', event.detail.reason);
      });

      eventCleanupFunctions.push(unsubscribeSuccess, unsubscribeError);
    };

    const handleAuthSuccess = () => {
      setState({ status: 'success', message: 'Authentication successful' });

      const redirectUrl = storage.getItem(SESSION_VALUES.postLoginRedirectUrl) ?? "/dashboard";
      storage.removeItem(SESSION_VALUES.postLoginRedirectUrl);

      console.log("Authentication successful, redirecting to:", redirectUrl);

      toast.success("Successfully signed in!");

      setTimeout(() => navigate(redirectUrl), 1000);
    };

    const handleAuthError = (message: string, details?: string) => {
      setState({
        status: 'error',
        message: message || 'Authentication failed',
        details
      });
    };

    const processCallback = async () => {
      try {
        // If user is already authenticated, redirect immediately
        if (authService.getCurrentAccount()) {
          handleAuthSuccess();
          return;
        }

        const queryParams = new URLSearchParams(location.search);
        const errorResult = parseB2CErrors(queryParams);

        if (errorResult) {
          handleB2CError(errorResult);
          return;
        }

        // Setup event listeners before processing
        setupEventListeners();

        await authService.initialize();

        // If no events were fired and no account exists, it's an error
        setTimeout(() => {
          if (state.status === 'loading' && !authService.getCurrentAccount()) {
            handleAuthError(
              'Authentication incomplete',
              'No authentication response received. Please try signing in again.'
            );
          }
        }, 3000);

      } catch (error) {
        console.error("Callback processing error:", error);
        handleAuthError(
          error instanceof Error ? error.message : 'Authentication failed',
          error instanceof Error ? error.stack : undefined
        );
      }
    };

    const parseB2CErrors = (params: URLSearchParams) => {
      const errorCode = params.get("error");
      const errorDescription = params.get("error_description");

      if (!errorCode) return null;

      return { errorCode, errorDescription };
    };

    const handleB2CError = ({ errorCode, errorDescription }: { errorCode: string, errorDescription: string | null }) => {
      // Handle password reset cancellation
      if (errorCode === "access_denied" && errorDescription?.includes("AADB2C90091")) {
        toast.info("Password reset was canceled.");
        setTimeout(() => navigate("/"), 1000);
        return;
      }

      // Handle password reset redirect
      if (errorCode === "server_error" && errorDescription?.includes("AADB2C90118")) {
        toast.info("Redirecting to password reset...");
        authService.editUserProfile(); // This handles password reset
        return;
      }

      // Handle other B2C errors
      const message = errorDescription || `Authentication error: ${errorCode}`;
      console.error("B2C error:", message);
      handleAuthError("Authentication failed", message);
    };

    processCallback();

    // Cleanup function
    return () => {
      eventCleanupFunctions.forEach(cleanupFn => cleanupFn());
    };
  }, [navigate, location.search, state.status]);

  // Render based on state
  switch (state.status) {
    case 'loading':
      return <LoadingScreen message="Completing authentication, please wait..." dimension='w-screen h-screen' background='bg-background' />;

    case 'error':
      return (
        <ErrorScreen
          message={state.message!}
          details={state.details}
          onRetry={() => navigate("/")}
        />
      );

    case 'success':
      return <SuccessScreen message={state.message || "Authentication successful. Redirecting..."} />;

    default:
      return <LoadingScreen message="Processing..." dimension='w-screen h-screen' background='bg-background' />;
  }
};

export default Callback;