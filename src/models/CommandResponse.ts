/* eslint-disable @typescript-eslint/no-explicit-any */


export interface CommandResponse {

    status: 'success' | 'error' | 'pending';

    /**
     * Message to display to the user
     */
    message: string;

    /**
     * The command that should be executed next in the flow
     */
    nextCommand?: string;

    command: string;

    error?: {
        code: string;
        details: string;
    };

    bookingData?: {
        origin?: string;
        destination?: string;
        departureDate?: string;
        returnDate?: string;
        passengers?: number;
        flightOptions?: Array<{
            id: string;
            airline: string;
            departureTime: string;
            arrivalTime: string;
            price: number;
            stops: number;
        }>;
        selectedFlightId?: string;
        confirmationCode?: string;
        totalPrice?: number;
        [key: string]: any;
    };

    metadata?: Record<string, any>;
}