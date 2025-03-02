import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import SuccessScreen from "../components/SuccessScreen";
import { SESSION_VALUES } from "../utils/constants";
import { msalInstance } from "./msalConfig";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<{message: string, details?: string} | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const processCallback = async () => {
      try {

        await msalInstance.initialize();
        
        const response = await msalInstance.handleRedirectPromise();

        if (response && response.account) {
          msalInstance.setActiveAccount(response.account);
          sessionStorage.setItem(SESSION_VALUES.azure_b2c_idToken, response.idToken ?? "");
          console.log("User signed in successfully.");
          navigate("/");
        } else {
          // Check if user needs to sign in or if this is just not a redirect return
          const accounts = msalInstance.getAllAccounts();
          if (accounts.length > 0) {
            msalInstance.setActiveAccount(accounts[0]);
            navigate("/");
          } else {
            navigate("/");
          }
        }
      } catch (err) {
        console.error("Authentication failure:", err);
        const errorMessage = err instanceof Error ? err.message : "Authentication failed";
        const errorDetails = err instanceof Error && err.stack ? err.stack : undefined;
        setError({message: errorMessage, details: errorDetails});
      } finally {
        setLoading(false);
      }
    };

    processCallback();
  }, [navigate]);

  if (loading) {
    return <LoadingScreen message="Authenticating, please wait..." />;
  }

  if (error) {
    return <ErrorScreen message={error.message} />;
  }

  return <SuccessScreen message="Redirecting..." />;
};

export default Callback;