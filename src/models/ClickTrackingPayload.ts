

export interface ClickTrackingPayload {
    userId: string;
    clickedAt: string; 
    unifiedFlightOffer: ClickTrackingProps
}

export interface ClickTrackingProps {
  id: string;
  provider: string;
  flightSource: "GDS";
  totalPrice: number;
  formattedPrice: string;
  itineraries: Array<{
    direction: "Outbound" | "Return";
    duration: string;
    formattedDuration: string;
    stops: number;
    segments: Array<{
      id: string;
      departure: {
        airportCode: string;
        airportName: string | null;
        terminal: string | null;
        cityCode: string | null;
        cityName: string | null;
        country: string | null;
        dateTime: string;
        formattedDateTime: string;
      };
      arrival: {
        airportCode: string;
        airportName: string | null;
        terminal: string | null;
        cityCode: string | null;
        cityName: string | null;
        country: string | null;
        dateTime: string;
        formattedDateTime: string;
      };
      duration: string;
      formattedDuration: string;
      marketingAirline: string;
      operatingAirline: string;
      flightNumber: string;
      aircraftType: string;
      cabinClass: string | null;
      baggageAllowance: {
        checkedBags: number;
        weightKg: number | null;
        description: string | null;
      };
      airlineLogo: string | null;
    }>;
  }>;
  baggageAllowance: {
    checkedBags: number;
    weightKg: number | null;
    description: string;
  };
  isRefundable: boolean;
  lastTicketingDate: string;
  validatingCarrier: string;
  validatingCarrierAirlineName: string | null;
  operatingCarrierAirlineCode: string | null;
  operatingCarrierAirlineName: string | null;
  availableSeats: number;
  fareConditions: string[];
}






  