/* eslint-disable @typescript-eslint/no-explicit-any */
// Base API response from the flight search
export interface ApiFlightSearchResponse {
    totalResults: number;
    currencyCode: string;
    origin: string | null;
    destination: string | null;
    departureDate: string;
    returnDate: string | null;
    offers: ApiFlightOffer[];
    airlines: Record<string, any>;
    airports: Record<string, any>;
    locations: Record<string, any>;
    metadata: {
        searchId: string;
        searchTimestamp: string;
        parameters: any | null;
        activeFilters: any | null;
        pagination: any | null;
    };
}

// The flight offer structure from the API
export interface ApiFlightOffer {
    id: string;
    provider: string;
    flightSource: string;
    totalPrice: number;
    formattedPrice: string;
    itineraries: {
        direction: 'Outbound' | 'Inbound';
        duration: string;
        formattedDuration: string;
        stops: number;
        segments: {
            id: string;
            departure: {
                airportCode: string;
                terminal: string | null;
                cityCode: string | null;
                countryCode: string | null;
                dateTime: string;
                formattedDateTime: string;
            };
            arrival: {
                airportCode: string;
                terminal: string | null;
                cityCode: string | null;
                countryCode: string | null;
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
        }[];
    }[];
    baggageAllowance: {
        checkedBags: number;
        weightKg: number | null;
        description: string | null;
    };
    isRefundable: boolean;
    lastTicketingDate: string;
    validatingCarrier: string;
    availableSeats: number;
    fareConditions: string[];
}