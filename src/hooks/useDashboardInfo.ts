import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { ChatContext } from "../contexts/ChatContext";
import { FlightSearchResponse, transformApiToUiResponse } from "../models/FlightSearchResponse";
import { LOCAL_STORAGE_VALUES } from "../utils/constants";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import { ApiFlightSearchResponse } from './../models/ApiFlightSearchResponse';
import useApi from "./useApi";
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
  const cacheExpiryTime = 5 * 24 * 60 * 60 * 1000;


  const fetchAirports = useCallback(async () => {
    const cachedDataString = localStorage.getItem(LOCAL_STORAGE_VALUES.usa_airports);

    if (cachedDataString) {
      try {
        const cachedData = JSON.parse(cachedDataString);

        if (cachedData &&
          cachedData.timestamp &&
          cachedData.data &&
          Array.isArray(cachedData.data) &&
          (Date.now() - cachedData.timestamp <= cacheExpiryTime)) {

          setAirportSuggestions(cachedData.data);
          return;
        } else {
          localStorage.removeItem(LOCAL_STORAGE_VALUES.usa_airports);
        }
      } catch (error) {
        console.error("Error parsing cached airport data:", error);
        localStorage.removeItem(LOCAL_STORAGE_VALUES.usa_airports);
      }
    }

    setLoading(true);
    try {
      const data = await getData<Airport[]>(`${ENDPOINTS_API_PATH.airports}`);

      if (data) {
        const cachedData = { data, timestamp: Date.now() };
        localStorage.setItem(LOCAL_STORAGE_VALUES.usa_airports, JSON.stringify(cachedData));
        setAirportSuggestions(data);
      } else {
        setAirportSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching airports:", error);
      toast.error(`Error fetching airports: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [cacheExpiryTime, getData]);

  return { airportSuggestions, setAirportSuggestions, fetchAirports, loading };
};

export const useFlightSearch = () => {
  const { getData } = useApi();
  const { travelInfo } = useContext(ChatContext);
  const [flightResults, setFlightResults] = useState<FlightSearchResponse | null>(null);
  const [flightLoading, setFlightLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const originCode = travelInfo.departure?.match(/\(([^)]+)\)/)?.[1] ?? travelInfo.departure;
  const destinationCode = travelInfo.destination?.match(/\(([^)]+)\)/)?.[1] ?? travelInfo.destination;

  const FlightSearchFn = useCallback(async () => {
    setFlightLoading(true);
    try {
  
      const apiResponse = await getData<ApiFlightSearchResponse>(
        `${ENDPOINTS_API_PATH.flight_search}/amadeus?` +
        `originLocationCode=${originCode}&destinationLocationCode=${destinationCode}` +
        `&departureDate=${travelInfo.departureDate}&returnDate=${travelInfo.returnDate}` +
        `&adults=1&travelClass=${travelInfo.flightClass}&nonStop=${travelInfo?.travelRoute}` +
        `&max=20&sortBy=price&sortOrder=asc`
      );

      if (!apiResponse) {
        throw new Error("No flight search results found for your destination");
      }

      // Transform the API response into UI-friendly format
      const uiResponse = transformApiToUiResponse(apiResponse);
      setFlightResults(uiResponse);
    } catch (error: unknown) {
      console.error(error);
      setError(`${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setFlightLoading(false);
    }
  }, [getData, travelInfo, originCode, destinationCode]);

  return { FlightSearchFn, flightResults, flightLoading, error};
};


export const useUserPreferences = () => {
  const { accountInfo, isAuthenticated, isLoading: authLoading, isInitialized } = useAuthInfo();
  const { postData, getData } = useApi();
  const [preferences, setPreferences] = useState<UserPreferences>({
    originAirport: "",
    destinationAirport: "",
    travelClass: "Economy",
    stopOvers: "Non-Stop",
    userId: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadAttempted, setLoadAttempted] = useState(false);

  const loadPreferences = useCallback(async () => {
    if (authLoading || loading) {
      return;
    }

    if (!isAuthenticated) {
      if (isInitialized) {
        console.log("Cannot load preferences: User not authenticated");
      }
      return;
    }

    const userId = accountInfo?.objectId ?? accountInfo?.subject ?? "";
    if (!userId) {
      console.warn("Cannot load preferences: No user ID available");
      return;
    }

    setLoading(true);
    setLoadAttempted(true);

    try {
      const data = await getData<UserPreferences>(`${ENDPOINTS_API_PATH.user_preferences}/${userId}`);

      if (data) {
        setPreferences(data);
      } else {
        console.log("No preferences found for user");
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
      toast.error(`Failed to load preferences: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }, [accountInfo, getData, isAuthenticated, authLoading, loading, isInitialized]);

  useEffect(() => {
    if (isInitialized && isAuthenticated && !loadAttempted && !loading) {
      console.log("Auth state settled, attempting to load preferences");
      loadPreferences();
    }
  }, [isInitialized, isAuthenticated, loadAttempted, loading, loadPreferences]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoadAttempted(false);
    }
  }, [isAuthenticated]);

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleAirportSelect = (airportCode: string, field: string) => {
    setPreferences({ ...preferences, [field]: airportCode });
  };

  const validatePreferences = (prefsToValidate: UserPreferences) => {
    if (!prefsToValidate.userId) {
      toast.error("User ID is required.");
      throw new Error("User ID is required.");
    }
  };

  const savePreferences = useCallback(async () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to save preferences");
      return;
    }

    try {
      const updatedPreferences = {
        ...preferences,
        userId: accountInfo?.objectId ?? accountInfo?.subject ?? ""
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
  }, [preferences, accountInfo, postData, isAuthenticated]);

  return {
    preferences,
    loading: loading || authLoading,
    handlePreferenceChange,
    handleAirportSelect,
    savePreferences,
    loadPreferences
  };
};

// Main composite hook for the dashboard
export const useDashboardInfo = () => {
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
