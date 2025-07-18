import { useCallback, useState } from 'react';
import { CustomerSignupRequest } from '../models/payment/CustomerSignupRequest';
import { CustomerSignupResponse } from '../models/payment/CustomerSignupResponse';
import { ENDPOINTS_API_PATH } from '../utils/endpoints';
import useApi from './useApi';
import { CustomerSubscriptionResponse } from '../models/payment/customerSubscription';


interface UseCustomerApiResult {
    isLoading: boolean;
    error: string | null;

    getCustomerByEmail: (email: string) => Promise<CustomerSignupResponse | null>;
    createCustomer: (customerData: CustomerSignupRequest) => Promise<CustomerSignupResponse | null>;
    updateCustomer: (customerData: CustomerSignupRequest) => Promise<CustomerSignupResponse | null>;
    getCustomerSubscription: (email:string) => Promise<CustomerSubscriptionResponse | null>;

    // Utility functions
    clearError: () => void;
}

export const useCustomerApi = (): UseCustomerApiResult => {
    const { getData, postData, putData } = useApi();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    const handleApiCall = useCallback(async <T>(
        apiCall: () => Promise<T | undefined>,
        errorMessage: string
    ): Promise<T | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await apiCall();
            return result || null;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const errorMsg = err.message || errorMessage;
            setError(errorMsg);
            console.error(errorMessage, err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getCustomerByEmail = useCallback(async (email: string): Promise<CustomerSignupResponse | null> => {
        if (!email) {
            setError('Email is required');
            return null;
        }

        return handleApiCall(
            () => getData<CustomerSignupResponse>(`${ENDPOINTS_API_PATH.stripe_getCustomer}?email=${encodeURIComponent(email)}`),
            'Failed to fetch customer information'
        );
    }, [getData, handleApiCall]);

    const getCustomerSubscription = useCallback(async (email: string): Promise<CustomerSubscriptionResponse | null> => {
        if (!email) {
            setError('Email is required');
            return null;
        }

        return handleApiCall(
            () => getData<CustomerSubscriptionResponse>(`${ENDPOINTS_API_PATH.stripe_getCustomerSubscriptionDetails}?email=${encodeURIComponent(email)}`),
            'Failed to fetch customer information'
        );
    }, [getData, handleApiCall]);

    const createCustomer = useCallback(async (customerData: CustomerSignupRequest): Promise<CustomerSignupResponse | null> => {
        if (!customerData.email || !customerData.fullName) {
            setError('Email and full name are required');
            return null;
        }

        return handleApiCall(
            () => postData<CustomerSignupRequest, CustomerSignupResponse>(ENDPOINTS_API_PATH.stripe_createCustomer, customerData),
            'Failed to create customer'
        );
    }, [postData, handleApiCall]);

    const updateCustomer = useCallback(async (customerData: CustomerSignupRequest): Promise<CustomerSignupResponse | null> => {
        if (!customerData.email) {
            setError('Email is required');
            return null;
        }

        return handleApiCall(
            () => putData<CustomerSignupRequest, CustomerSignupResponse>(ENDPOINTS_API_PATH.stripe_updateCustomer, customerData),
            'Failed to update customer'
        );
    }, [putData, handleApiCall]);

    return {
        isLoading,
        error,
        getCustomerByEmail,
        createCustomer,
        updateCustomer,
        clearError,
        getCustomerSubscription,
    };
};

export default useCustomerApi;