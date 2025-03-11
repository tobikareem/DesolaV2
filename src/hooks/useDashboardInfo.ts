import { useCallback, useState } from "react";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import useApi from "./useApi";
import { toast } from 'react-toastify';
import { useAuthInfo } from "./useAuthInfo";

export interface Airport {
  name: string;
  city: string;
  code: string;
  airportType: string;
}

export interface UserPreferences {
  originAirport: string;
  destinationAirport: string;
  travelClass: string;
  stopOvers: string;
  userId: string;
}

export const useAirports = () => {
  const [airportSuggestions, setAirportSuggestions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);
  const { getData } = useApi();

  const fetchAirports = useCallback(async (query: string) => {
    if (!query) {
      setAirportSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const data = await getData<Airport[]>(`${ENDPOINTS_API_PATH.airports_autocomplete}?name=${query}`);
      setAirportSuggestions(data || []);
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setLoading(false);
    }
  }, [getData]);

  return { airportSuggestions, fetchAirports, loading };
};

export const useUserPreferences = () => {
  const { accountInfo } = useAuthInfo();
  const { postData, getData } = useApi();
  const [preferences, setPreferences] = useState<UserPreferences>({
    originAirport: "",
    destinationAirport: "",
    travelClass: "Economy",
    stopOvers: "Non-Stop",
    userId: "",
  });
  const [loading, setLoading] = useState(false);

  // Load user preferences
  const loadPreferences = useCallback(async () => {
    const userId = accountInfo?.oid ?? accountInfo?.sub ?? "";
    if (!userId) return;

    setLoading(true);
    try {
      const data = await getData<UserPreferences>(`${ENDPOINTS_API_PATH.user_preferences}/${userId}`);
      if (data) {
        setPreferences(data);
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    } finally {
      setLoading(false);
    }
  }, [accountInfo, getData]);

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleAirportSelect = (airportCode: string, field: string) => {
    setPreferences({ ...preferences, [field]: airportCode });
  };

  const validatePreferences = (prefsToValidate: UserPreferences) => {
    if (!prefsToValidate.userId) {
      throw new Error("User ID is required.");
    }
  };

  const savePreferences = useCallback(async () => {
    try {
      const updatedPreferences = {
        ...preferences,
        userId: accountInfo?.oid ?? accountInfo?.sub ?? ""
      };

      validatePreferences(updatedPreferences);
      setLoading(true);

      await postData<UserPreferences, { success: boolean }>(
        ENDPOINTS_API_PATH.user_preferences,
        updatedPreferences
      );

      toast.success("Preferences saved successfully!");

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Failed to save preferences. ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [preferences, accountInfo, postData]);

  return {
    preferences,
    loading,
    handlePreferenceChange,
    handleAirportSelect,
    savePreferences,
    loadPreferences
  };
};

// Main composite hook for the dashboard
export const useUserDashboard = () => {
  const { airportSuggestions, fetchAirports } = useAirports();
  const {
    preferences,
    loading: preferencesLoading,
    handlePreferenceChange,
    handleAirportSelect,
    savePreferences,
    loadPreferences
  } = useUserPreferences();

  return {
    airportSuggestions,
    fetchAirports,

    // Preference functionality
    preferences,
    preferencesLoading,
    handlePreferenceChange,
    handleAirportSelect,
    savePreferences,
    loadPreferences
  };
};