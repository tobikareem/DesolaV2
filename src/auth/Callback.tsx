import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import authService from "../services/authService";
import { toast } from "react-toastify";
import { CustomStorage } from "../utils/customStorage";
import { SESSION_VALUES } from "../utils/constants";
import ErrorScreen from "../components/layout/ErrorScreen";
import LoadingScreen from "../components/layout/LoadingScreen";
import SuccessScreen from "../components/layout/SuccessScreen";

const storage = new CustomStorage();

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<{ message: string, details?: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const processCallback = async () => {
      try {
        if (authService.getCurrentAccount()) {
          const redirectUrl = storage.getItem(SESSION_VALUES.postLoginRedirectUrl) ?? "/dashboard";
          storage.removeItem(SESSION_VALUES.postLoginRedirectUrl);

          setTimeout(() => navigate(redirectUrl), 1000);
          return;
        }

        // Parse query parameters
        const queryParams = new URLSearchParams(location.search);
        const errorCode = queryParams.get("error");
        const errorDescription = queryParams.get("error_description");

        if (errorCode) {
          if (errorCode === "access_denied" && errorDescription?.includes("AADB2C90091")) {
            toast.info("Password reset was canceled.");
            setTimeout(() => navigate("/"), 1000);
            return;
          }

          if (errorCode === "server_error" && errorDescription?.includes("AADB2C90118")) {
            toast.info("Redirecting to password reset...");
            authService.handlePasswordReset();
            return;
          }

          // Handle other errors
          const errorMessage = errorDescription || `Authentication error: ${errorCode}`;
          console.error("B2C error:", errorMessage);
          setError({ message: "Authentication failed", details: errorMessage });
          return;
        }

        await authService.handleRedirectResult();

        if (authService.getCurrentAccount()) {
          const redirectUrl = storage.getItem(SESSION_VALUES.postLoginRedirectUrl) ?? "/dashboard";
          storage.removeItem(SESSION_VALUES.postLoginRedirectUrl);

          window.dispatchEvent(new CustomEvent('userSignedIn'));

          toast.success("Successfully signed in!");
          setTimeout(() => navigate(redirectUrl), 1000);
        } else {
          setError({
            message: "Authentication failed",
            details: "Could not establish user session. Please try signing in again."
          });
        }
      } catch (err) {
        console.error("Authentication failure:", err);
        const errorMessage = err instanceof Error ? err.message : "Authentication failed";
        const errorDetails = err instanceof Error && err.stack ? err.stack : undefined;
        setError({ message: errorMessage, details: errorDetails });
      } finally {
        setLoading(false);
      }
    };

    processCallback();
  }, [navigate, location.search]);

  if (loading) {
    return <LoadingScreen message="Completing authentication, please wait..." />;
  }

  if (error) {
    return (
      <ErrorScreen
        message={error.message}
        details={error.details}
        onRetry={() => navigate("/")}
      />
    );
  }

  return <SuccessScreen message="Authentication successful. Redirecting..." />;
};

export default Callback;