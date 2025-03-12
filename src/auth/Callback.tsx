import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import SuccessScreen from "../components/SuccessScreen";
import authService from "../services/authService";

const Callback: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<{ message: string, details?: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const processCallback = async () => {
      try {
        if (authService.getCurrentAccount()) {
          return; // Already signed in
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