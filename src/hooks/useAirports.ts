import { useState, useCallback } from "react";
import apiClient from "../services/apiClient";
import { ENDPOINTS_API_PATH } from "../utils/endpoints";

export interface Airport {
  name: string;
  city: string;
  code: string;
  airportType: string;
}

export const useAirports = () => {
  const [airportSuggestions, setAirportSuggestions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAirports = useCallback(async (query: string) => {
    if (!query) {
      setAirportSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.get<Airport[]>(`${ENDPOINTS_API_PATH.airports_autocomplete}?name=${query}`);
      setAirportSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { airportSuggestions, fetchAirports, loading };
};
