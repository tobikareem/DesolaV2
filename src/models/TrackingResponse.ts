import { ClickTrackingPayload } from "./ClickTrackingPayload";

interface FlightSegment {
    departure: {
        airportCode: string;
        formattedDateTime: string;
    };
    arrival: {
        airportCode: string;
        formattedDateTime: string;
    };
}

export function ClickTrackingToUiResponse(apiResponse: ClickTrackingPayload) {
  // mapping of airline codes to logo URLs

  return {
      ...apiResponse,  // let us keep all original API response properties
      response: apiResponse.unitedFlightOffer.itineraries[0]?.map((log: { segments: FlightSegment[]; stops: number; }) => {
          const outbound = log?.segments[0];
          
          return {
              ...history,  
              // Add UI-specific fields
              Departure: outbound?.departure?.airportCode,
              Destination: outbound?.arrival?.airportCode,
              departureDate: outbound?.departure?.formattedDateTime,
              returnDate: outbound?.arrival?.formattedDateTime,
              stops: log.stops === 0 ? 'Non-stop' : `${log.stops} stop${log.stops > 1 ? 'Two-way/Multi-city' : ''}`,
              flight: `${firstSegment.departure.airportCode}-${lastSegment.arrival.airportCode}`,
          };
      })
  };
}