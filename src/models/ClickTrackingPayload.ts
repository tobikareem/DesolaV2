

export interface ClickTrackingPayload {
    userId: string;
    clickedAt: string; 
    unifiedFlightOffer: FlightOffer;
}



export function transformApiToUiResponse(apiResponse: FlightOffer): ClickTrackingPayload {
    // mapping of airline codes to logo URLs

    return {
        ...apiResponse,  // let us keep all original API response properties
        response: apiResponse.unifiedFlightOffer.itineraries[0]?.map(log: => {
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
  