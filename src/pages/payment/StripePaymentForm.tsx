import { CardElement, CardElementProps, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Btn } from "../../components/ui/Button";
import { Text } from "../../components/ui/TextComp";
import useApi from "../../hooks/useApi";
import useCustomerApi from '../../hooks/useCustomerApi';
import { useSubscription } from "../../hooks/useSubscription";
import { CustomerSignupResponse } from "../../models/payment/CustomerSignupResponse";
import { StripePaymentFormProps } from "../../models/payment/StripePaymentFormProps";
import { CreateDirectSubscriptionRequest, CreateSubscriptionResult } from "../../models/payment/SubscriptionResult";
import { STRIPE } from "../../utils/constants";
import { ENDPOINTS_API_PATH } from "../../utils/endpoints";
import { SelectedPlanCard } from '../../components/layout/SubscriptionInfoCard';


const cardElementOptions: CardElementProps['options'] = {
    style: {
        base: {
            fontSize: '16px',
            color: '#424770',
            fontFamily: '"Work Sans", sans-serif',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
    hidePostalCode: false,
};


export const StripePaymentForm = ({
    customerData: customerProfileInfo,
    selectedPlan,
    onSuccess,
    onError,
    onBack
}: StripePaymentFormProps) => {
    const { getCustomerByEmail } = useCustomerApi();
    const stripe = useStripe();
    const elements = useElements();
    const { getData, postData } = useApi();
    const { monthlyPrice, yearlyPrice, paymentState, setPaymentState, setIsSubscribed, setIsCustomerCreated } = useSubscription();
    const [cardRequirements, setCardRequirements] = useState<boolean>(false)

    useEffect(() => {
        const fetchCustomer = async () => {
            if (!customerProfileInfo.email) {
                setPaymentState(prev => ({ ...prev, step: 'ready' }));
                return;
            }
            setPaymentState(prev => ({ ...prev, isLoadingCustomer: true }));
            try {
                const customer = await getData<CustomerSignupResponse>(
                    `${ENDPOINTS_API_PATH.stripe_getCustomer}?email=${encodeURIComponent(customerProfileInfo.email)}`
                );

                setPaymentState(prev => ({
                    ...prev,
                    customerData: customer || undefined,
                    step: 'ready',
                    isLoadingCustomer: false
                }));

            } catch (error) {
                console.error('Error fetching customer:', error);

                setPaymentState(prev => ({
                    ...prev,
                    step: 'ready',
                    isLoadingCustomer: false
                }));
            }
        };

        fetchCustomer();
    }, [customerProfileInfo.email, getData, setPaymentState]);

    useEffect(() => {
        const checkSubscription = async () => {
            try {
                const customer = await getCustomerByEmail(customerProfileInfo?.email);
                setIsSubscribed(!!customer?.hasActiveSubscription);
                setIsCustomerCreated(customer)
            } catch (error) {
                throw new Error(`${error}`)
            }
        }
        checkSubscription()
    }, [customerProfileInfo?.email, getCustomerByEmail, setIsCustomerCreated, setIsSubscribed])

    const handleSubmit = async () => {

        if (!stripe || !elements || !customerProfileInfo) {
            return;
        }

        setPaymentState(prev => ({ ...prev, isProcessing: true, error: undefined }));

        try {
            // Step 1: Get card element
            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error('Card element not found');
            }

            // Step 2: Create payment method
            const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: customerProfileInfo.fullName,
                    email: customerProfileInfo.email,
                    phone: customerProfileInfo.phone,
                },
            });

            if (methodError) {
                throw new Error(methodError.message || 'Failed to create payment method');
            }

            // Step 3: Create subscription directly            
            const subscriptionRequest: CreateDirectSubscriptionRequest = {
                email: customerProfileInfo.email,
                fullName: customerProfileInfo.fullName,
                phone: customerProfileInfo.phone || '',
                paymentMethodId: paymentMethod.id,
                priceId: selectedPlan === 'Yearly' ? STRIPE.YEARLY_PRICE_ID : STRIPE.MONTHLY_PRICE_ID,
                customerId: paymentState.customerData?.stripeCustomerId || '',
                trialPeriodDays: 7,
                metadata: {
                    planType: selectedPlan.toLowerCase(),
                    source: 'desola_flights_web',
                    userId: customerProfileInfo.metadata?.userId || '',
                    signupDate: new Date().toISOString().split('T')[0]
                }
            };
            const subscriptionResponse = await postData<CreateDirectSubscriptionRequest, CreateSubscriptionResult>(
                ENDPOINTS_API_PATH.stripe_createSubscription,
                subscriptionRequest
            );

            if (!subscriptionResponse) {
                throw new Error('Failed to create subscription');

            }

            // Step 4: Handle additional authentication if required
            if (subscriptionResponse.requiresAction && subscriptionResponse.clientSecret) {
                const { error: confirmError } = await stripe.confirmCardPayment(
                    subscriptionResponse.clientSecret
                );

                if (confirmError) {
                    throw new Error(confirmError.message || 'Payment confirmation failed');
                }
            }

            // Step 5: Success!
            setPaymentState(prev => ({
                ...prev,
                step: 'success',
                subscriptionResult: subscriptionResponse,
                isProcessing: false
            }));

            onSuccess?.(subscriptionResponse);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            const errorMessage = error.message || 'Payment processing failed';
            console.error('Payment processing error:', errorMessage);

            setPaymentState(prev => ({
                ...prev,
                step: 'error',
                error: errorMessage,
                isProcessing: false
            }));

            onError?.({ message: errorMessage });
        }
    };

    const planPrice = selectedPlan === 'Yearly' ? yearlyPrice : monthlyPrice;

    if (paymentState.step === 'loading') {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4" />
                <Text size="base" color="text-neutral-600">Setting up your subscription...</Text>
            </div>
        );
    }

    if (paymentState.step === 'error') {
        return (
            <div className="flex flex-col flex-1">
                <div className="mb-6">
                    <Btn onClick={onBack} className="text-primary-500 hover:text-primary-600 !border-none">
                        ← Back to plan selection
                    </Btn>
                </div>
                <div className="text-center p-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <Text as="h2" size="xl" weight="bold" className="text-red-600 mb-2">
                        Subscription Failed...
                    </Text>
                    <Text size="base" color="text-neutral-600" className="mb-6">
                        {paymentState.error}
                    </Text>
                    <div className="space-y-3">
                        <Btn
                            onClick={() => setPaymentState(prev => ({ ...prev, step: 'ready', error: undefined, isProcessing: false }))}
                            className="bg-secondary-500 text-white w-full hover:!scale-95"
                        >
                            Try Again
                        </Btn>
                    </div>
                </div>
            </div>
        );
    }

    if (paymentState.step === 'success') {
        return (
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-center p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <Text as="h2" size="xl" weight="bold" className="text-green-600 mb-2">
                        Welcome to Desola Flights!
                    </Text>
                    <Text size="base" color="text-neutral-600" className="mb-4">
                        Your subscription has been activated successfully. You now have access to all premium features.
                    </Text>

                    {/* Subscription Details */}
                    {paymentState.subscriptionResult && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                            <Text size="sm" weight="medium" className="mb-2">Subscription Details:</Text>
                            <div className="space-y-1 text-xs text-gray-600">
                                <div className="flex justify-between">
                                    <span>Subscription ID:</span>
                                    <span className="font-mono">{paymentState.subscriptionResult.subscriptionId}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Status:</span>
                                    <span className="capitalize font-medium text-green-600">
                                        {paymentState.subscriptionResult.status}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Amount:</span>
                                    <span>${paymentState.subscriptionResult.amount} {paymentState.subscriptionResult.currency.toUpperCase()}</span>
                                </div>
                                {paymentState.subscriptionResult.trialEnd && (
                                    <div className="flex justify-between">
                                        <span>Trial Ends:</span>
                                        <span>{new Date(paymentState.subscriptionResult.trialEnd).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <Btn
                        onClick={onBack}
                        className="w-full !text-white bg-primary-500"
                    >
                        View Subscription
                    </Btn>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col flex-1 h-full">
            {/* Processing Overlay */}
            {paymentState.isProcessing && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 rounded-lg">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4" />
                        <Text size="base" color="text-neutral-600" weight="medium">
                            Creating your subscription...
                        </Text>
                        <Text size="sm" color="text-neutral-500" className="mt-2">
                            Please don't refresh or close this page
                        </Text>
                    </div>
                </div>
            )}
            <div className="">
                <button onClick={onBack} className="text-primary-500 hover:text-primary-600 hover:font-semibold transition-all ease-in-out mb-4">
                    ← Back to plan selection
                </button>
                <Text as="h1" size="xl" weight="bold" className="!font-grotesk text-primary-500">
                    Complete Your Subscription
                </Text>
            </div>
            <div className="h-full lg:overflow-y-auto p-1.5 mt-4 mb-20">
                <div className="space-y-6">
                    <div className="space-y-6">
                        {paymentState.isLoadingCustomer && (
                            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                    <Text className="text-blue-800 text-sm">Loading customer information...</Text>
                                </div>
                            </div>
                        )}

                        {paymentState.customerData && !paymentState.isLoadingCustomer && (
                            <div className="bg-green-50 border border-green-200 rounded-md p-3">
                                <Text className="text-green-700 text-sm">
                                    Customer Name: <strong>{paymentState.customerData.fullName}</strong>
                                </Text>
                                {paymentState.customerData.hasActiveSubscription && (
                                    <div className="mt-2 p-2 bg-amber-100 rounded text-secondary-700 text-xs">
                                        <strong>Note:</strong> You already have an active subscription. This will replace it.
                                    </div>
                                )}
                            </div>
                        )}

                        <SelectedPlanCard
                            selectedPlan={selectedPlan}
                            planPrice={planPrice}
                            showSavings={true}
                        />

                        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                            <Text className="text-blue-800 text-sm font-medium">One-Step Subscription</Text>
                            <Text className="text-blue-700 text-xs mt-1">
                                Your subscription will be created immediately with a 7-day free trial.
                            </Text>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <Text size="base" weight='medium' color="text-neutral-600" className="mb-1">
                                Subscription for:
                            </Text>
                            <Text weight="semibold">{customerProfileInfo.fullName}</Text>
                            <Text size="sm" weight='medium' color="text-neutral-600">{customerProfileInfo.email}</Text>
                            {customerProfileInfo.phone && (
                                <Text size="sm" color="text-neutral-600"><span className='font-medium'>Phone:</span> {customerProfileInfo.phone}</Text>
                            )}
                        </div>

                        <div>
                            <Text size="base" weight="medium" className="mb-3">
                                Payment Method
                            </Text>
                            <div className="border border-gray-300 rounded-lg p-4 bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200">
                                <CardElement options={cardElementOptions} onFocus={() => setCardRequirements(true)} onBlur={() => setCardRequirements(false)} />
                            </div>
                            {cardRequirements && <Text size="2xs" className='text-notification mt-1'>All Fields are required...</Text>}
                            <Text size="xs" color="text-neutral-500" className="mt-2">
                                Your payment information is secure and encrypted. You won't be charged during the 7-day trial.
                            </Text>
                        </div>

                        {paymentState.error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <div className="flex items-start">
                                    <svg className="w-4 h-4 text-red-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <Text size="sm" className="text-red-600">{paymentState.error}</Text>
                                </div>
                            </div>
                        )}

                        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded border">
                            By starting your subscription, you agree to our{' '}
                            <Link to="/terms" className="text-primary-600 hover:underline"><strong>Terms of Service</strong></Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="text-primary-600 hover:underline"><strong>Privacy Policy</strong></Link>.
                            You can cancel anytime during or after your trial period.
                        </div>
                    </div>
                    <div className="pb-6">
                        <Btn onClick={handleSubmit}
                            disabled={!stripe || paymentState.isProcessing}
                            loading={paymentState?.isProcessing}
                            weight="semibold"
                            fontStyle="work"
                            radius="48px"
                            className={`w-full h-12 text-base ${paymentState.isProcessing || !stripe
                                ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                                : 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-neutral-100'
                                } hover:!scale-95 `}
                        >
                            {paymentState.isProcessing ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Creating subscription...
                                </div>
                            ) : (`Start 7-Day Free Trial - $${planPrice}/${selectedPlan.toLowerCase()}`)}
                        </Btn>

                        <div className="text-center text-xs text-gray-400 my-3 space-y-1">
                            <div className="flex items-center justify-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                Secured by Stripe • SSL Encrypted
                            </div>
                            <Text>No charge for 7 days • Cancel anytime</Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};