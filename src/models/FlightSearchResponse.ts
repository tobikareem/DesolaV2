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
    const airlineLogoMap: Record<string, string> = {
        'F9': 'https://example.com/logos/frontier.png',
        'NK': 'https://example.com/logos/spirit.png',
        'UA': 'https://example.com/logos/united.png',
    };

    return {
        ...apiResponse,  // let us keep all original API response properties
        offers: apiResponse.offers.map(offer => {
            const firstItinerary = offer.itineraries[0];
            const firstSegment = firstItinerary.segments[0];
            const lastSegment = firstItinerary.segments[firstItinerary.segments.length - 1];

            // Extract airline code from validatingCarrier field (e.g., "UA - United Airlines" -> "UA")
            const airlineCode = offer.validatingCarrier.split(' ')[0];

            // Return the original offer plus the UI-specific fields
            return {
                ...offer,  // Keep all the original offer properties

                // Add UI-specific fields
                airlineLogo: airlineLogoMap[airlineCode] || 'https://example.com/logos/default.png',
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