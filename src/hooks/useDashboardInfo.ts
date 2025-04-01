import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { ENDPOINTS_API_PATH } from "../utils/endpoints";
import useApi from "./useApi";
import { useAuthInfo } from "./useAuthInfo";

export interface Airport {
  name: string;
  city: string;
  code: string;
  airportType: string;
}

export interface Route {
  Type: string;
  Subtype: string;
  Name: string;
  IataCode: string;
  GeoCode:{Latitude:number; Longitude:number},
  Address:{CountryName:string; CountryCode:string; StateCode:string; RegionCode:string;}
  TimeZone: string;
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
  const { getData} = useApi();
  const cacheExpiryTIme = 5*24*60*60*1000; // 3 days


  const fetchAirports = useCallback(async () => {
    const cachedData = localStorage.getItem("cachedAirportData");
    const cachedAirportData = cachedData ? JSON.parse(cachedData) : null;
    if (cachedAirportData) {
      if (Date.now() - cachedAirportData.timestamp > cacheExpiryTIme){
        localStorage.removeItem("cachedAirportData");
      }
    } 
    if (cachedAirportData && Array.isArray(cachedAirportData)) {
      setAirportSuggestions(cachedAirportData);
      return;
    }

    setLoading(true);
    try {
      const data = await getData<Airport[]>(`${ENDPOINTS_API_PATH.airports}`);
      const cachedData = {data , timestamp: Date.now()};
      localStorage.setItem("cachedAirportData", JSON.stringify(cachedData));
      setAirportSuggestions(data ?? []);
    } catch (error) {
      console.error("Error fetching airports:", error);
      toast.error(`Error fetching airports: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [cacheExpiryTIme, getData]);

  return { airportSuggestions, fetchAirports, loading };
};

// export const useFlightSearch =()=> {
//   const {postData} = useApi();
//   const [flightSearch, setFlightSearch] = useState<>({
//     origin: "",
//     destination: "",
//     departureDate: "",
//     returnDate:"",
//   })

//   const FlightSearchFn = useCallback(async()=> {

//     try { 
//       await postData<flightSearch>(`${ENDPOINTS_API_PATH.flight_search}`, { ...flightSearch})
//       toast.success('Flight search was successful')
  
//     } catch (error: unknown) {
//       console.error(error)
//       toast.error(`Error searching flights: ${error instanceof Error ? error.message : 'Unknown error'}`)
//     }

//   },[]); 

//   return {FlightSearchFn, flightSearch, setFlightSearch}
  
// }


export const useRoutes =()=> {
  const [RouteData, setRouteData] = useState<Route[]>([])
  const [loading, setLoading] = useState(false);
  const {getData} = useApi();

  const fetchRoutes = useCallback( async() => {
    setLoading(true);
    try {
      const data = await getData<Route[]>(`${ENDPOINTS_API_PATH.route}?airlineCode=AA&max=20`)
      setRouteData(data ?? [])
    }
    catch (error){
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
    
  },[getData])
  return {fetchRoutes, RouteData, loading };
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


