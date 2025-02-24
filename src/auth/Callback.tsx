import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import SuccessScreen from "../components/SuccessScreen";
import authService from "../services/authService";
import { SESSION_VALUES } from "../utils/constants";

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const processCallback = async () => {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get("code");
        const errorParam = queryParams.get("error");

        if (errorParam) {
          throw new Error(`Authentication error: ${decodeURIComponent(errorParam)}`);
        }
        if (!code) {
          throw new Error("Authorization code not found in the URL.");
        }

        const authorizationCode = sessionStorage.getItem(SESSION_VALUES.azure_b2c_authorizationCode);

        if (!authorizationCode) {

          await authService.exchangeCodeForToken(code);
          navigate("/");
        }

      } catch (err) {
        console.error("Authentication failure:", err);
        setError(err instanceof Error ? err.message : "Authentication failed.");
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
    return <ErrorScreen message={error} />;
  }

  return <SuccessScreen message="Redirecting..." />;
};



export default AuthCallback;
