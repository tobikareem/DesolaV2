import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";// Your service to exchange code for token
import { Text } from "../components/TextComp"; // Optional custom Text component
import authService from "../services/authService";

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

        await authService.exchangeCodeForToken(code);

        navigate("/home");
      } catch (err: unknown) {
        console.error("Authentication failure: ", err)
        if (err instanceof Error) {
          const errorMessage = err.message || "Authentication failed.";
          setError(errorMessage);
        } else {
          setError("Authentication failed.");
        }

      } finally {
        setLoading(false);
      }
    };

    processCallback();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Text as="h1" weight="bold" size="xl">
          Authenticating, please wait...
        </Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Text as="h1" weight="bold" size="xl" color="text-red-500">
          Error: {error}
        </Text>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Text as="h1" weight="bold" size="xl">
        Redirecting...
      </Text>
    </div>
  );
};

export default AuthCallback;
