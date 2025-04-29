import { ApiFlightSearchResponse, ApiFlightOffer } from "./ApiFlightSearchResponse";

export interface FlightSearchResponse extends ApiFlightSearchResponse {
    // Override the offers property with our UI-friendly format
    offers: FlightOffer[];
}


// Additional UI-specific fields
export interface FlightOffer extends ApiFlightOffer {
    airlineLogo: string;
    departureTime: string;
    duration: string;
    classType: string;
    aircraft: string;
    stops: string;  // "Non-stop" or "1 stop" instead of a number
    websiteLink: string;
    route: string;  // e.g., "IAH-SEA"
}

export function transformApiToUiResponse(apiResponse: ApiFlightSearchResponse): FlightSearchResponse {
    // mapping of airline codes to logo URLs

    return {
        ...apiResponse,  // let us keep all original API response properties
        offers: apiResponse.offers.map(offer => {
            const firstItinerary = offer.itineraries[0];
            const firstSegment = firstItinerary.segments[0];
            const lastSegment = firstItinerary.segments[firstItinerary.segments.length - 1];
            // Return the original offer plus the UI-specific fields
            return {
                ...offer,  // Keep all the original offer properties

                // Add UI-specific fields
                airlineLogo: firstSegment.airLineLogo, // Placeholder URL for airline logo
                departureTime: firstSegment.departure.formattedDateTime,
                duration: firstItinerary.formattedDuration,
                classType: firstSegment.cabinClass || 'Economy',
                aircraft: firstSegment.aircraftType,
                stops: firstItinerary.stops === 0 ? 'Non-stop' : `${firstItinerary.stops} stop${firstItinerary.stops > 1 ? 's' : ''}`,
                websiteLink: `https://googleflights.com/${offer.provider}/${offer.id}`,
                route: `${firstSegment.departure.airportCode}-${lastSegment.arrival.airportCode}`,
            };
        })
    };
}