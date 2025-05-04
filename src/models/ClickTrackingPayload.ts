import { FlightOffer } from "./FlightSearchResponse";

export interface ClickTrackingPayload {
    userId: string;
    clickedAt: string; 
    unifiedFlightOffer: FlightOffer;
  }
  