import { useCallback, useContext, useEffect, useState } from "react";
import { ChatContext } from "../contexts/ChatContext";
import { FlightSearchResponse, transformApiToUiResponse } from "../models/FlightSearchResponse";
import { LOCAL_STORAGE_VALUES } from "../utils/constants";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import { ApiFlightSearchResponse } from './../models/ApiFlightSearchResponse';
import useApi from "./useApi";
import { useAuthInfo } from "./useAuthInfo";
import { toastManager } from "../utils/toastUtils";

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
  const cacheExpiryTime = 40 * 24 * 60 * 60 * 1000;


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
      toastManager.show("fetch-airport", `Error fetching airports: ${error instanceof Error ? error.message : 'Unknown error'}`, "error");
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
  const getUserId = ()=> accountInfo?.objectId ?? accountInfo?.subject ?? "";


  const loadPreferences = useCallback(async () => {
    if (authLoading || loading) {
      return;
    }

    if (!isAuthenticated) {
      return;
    }

    const userId = getUserId();
    if (!userId) {
      console.warn("Cannot load preferences: No user ID available");
      return;
    }

    setLoading(true);
    setLoadAttempted(true);

    try {
      const cachedPreferenceString = localStorage.getItem('userPreference')
      if (cachedPreferenceString) {
        try {
          const cachedPreference = JSON.parse(cachedPreferenceString);
          setPreferences({ ...cachedPreference, userId }); 
        } catch {
          console.warn("Invalid cached user preferences. Clearing cache.");
          localStorage.removeItem("userPreference");
        }
      } else {
        const data = await getData<UserPreferences>(`${ENDPOINTS_API_PATH.user_preferences}/${userId}`);
        if (data) {
          setPreferences(data);
          localStorage.setItem('userPreference', JSON.stringify(data))
        } 
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
      toastManager.show("load-preference",`Failed to load preferences: ${error instanceof Error ? error.message : "Unknown error"}`,"error");
    } finally {
      setLoading(false);
    }
  }, [accountInfo, getData, isAuthenticated, authLoading, loading]);

  useEffect(() => {
    if (isInitialized && isAuthenticated && !loadAttempted && !loading) {
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
      toastManager.show("user-id","User ID is required.","error");
      throw new Error("User ID is required.");
    }
  };

  const savePreferences = useCallback(async () => {
    if (!isAuthenticated) {
      toastManager.show("authentication","You must be logged in to save preferences", "error");
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

      toastManager.show("preference-success","Preferences saved successfully!", "success");
      localStorage.setItem('userPreference', JSON.stringify(updatedPreferences))

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      toastManager.show("failed-preference",`Failed to save preferences. ${errorMessage}`, "error");
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
