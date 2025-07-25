import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from "react"
import { PiUserCircleCheckFill } from 'react-icons/pi'
import { toast } from 'react-toastify'
import { SubscriptionInfoCard } from '../../../components/layout/SubscriptionInfoCard'
import { Btn } from "../../../components/ui/Button"
import { TextArea } from '../../../components/ui/TextAreaField'
import { Text } from "../../../components/ui/TextComp"
import useApi from '../../../hooks/useApi'
import { useAuthInfo } from "../../../hooks/useAuthInfo"
import useCustomerApi from '../../../hooks/useCustomerApi'
import { useDashboardInfo } from "../../../hooks/useDashboardInfo"
import { useSubscription } from "../../../hooks/useSubscription"
import { CancelSubscriptionProps } from '../../../models/payment/CancelSubscription'
import { CreateSubscriptionResult, SubscriptionError } from "../../../models/payment/SubscriptionResult"
import { STRIPE } from "../../../utils/constants"
import { ENDPOINTS_API_PATH } from '../../../utils/endpoints'
import { StripePaymentForm } from "../../payment/StripePaymentForm"
import { BillFrequency } from "../../pricing/BillFrequency"
import { Title } from '../../../components/layout/Title'

const stripePromise = loadStripe(STRIPE.PUBLISHABLE_KEY);

export const SubscriptionContent = () => {
  const { postData } = useApi();
  const { plans, selectedPlan, setSelectedPlan, monthlyPrice, yearlyPrice,
    customerFormData, setCustomerFormData, isSubscribed, customerSubscriptionData } = useSubscription();
  const [subscriptionStep, setSubscriptionStep] = useState<string>('subscription-management');
  const { preferences } = useDashboardInfo();
  const { customerProfile } = useAuthInfo();
  const { createCustomer } = useCustomerApi();
  const [canceling, setIsCanceling] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('')
  const [showCancelForm, setShowCancelForm] = useState<boolean>(false)

  useEffect(() => {
    setCustomerFormData({
      email: customerProfile?.email || '',
      fullName: customerProfile?.fullName || '',
      phone: customerProfile?.phone || 'N/A',
      preferredCurrency: customerProfile?.preferences.currency || 'USD',
      defaultOriginAirport: preferences.originAirport || 'ATL',
      metadata: {
        userId: customerProfile?.id || '',
        accountType: 'premium',
        signupSource: 'web'
      }
    });
  }, [customerProfile?.email, customerProfile?.fullName, customerProfile?.id, customerProfile?.phone, customerProfile?.preferences.currency, preferences.originAirport, setCustomerFormData]);

  const CancelDetails: CancelSubscriptionProps = {
    stripeCustomerId: customerSubscriptionData?.customer?.stripeCustomerId || '',
    CancelAtPeriodEnd: true,
    CancellationReason: inputValue,
    customerId: customerSubscriptionData?.customer?.customerId || '',
    customerEmail: customerFormData?.email || ''
  };

  const CancelSubscription = async () => {
    setIsCanceling(true)
    try {
      await postData<CancelSubscriptionProps>(`${ENDPOINTS_API_PATH?.stripe_cancelSubscription}`, CancelDetails)
      toast.success('Subscription Canceled successfully')
      setShowCancelForm(false)
      setInputValue('')
    } catch (error) {
      console.error('Error canceling subscription:', error);
    } finally {
      setIsCanceling(false)
    }
  }

  const handlePlanSelection = () => {
    if (selectedPlan && customerFormData) {
      setSubscriptionStep('payment');
    }
  };

  const handleSubscriptionSuccess = (subscriptionResult: CreateSubscriptionResult) => {
    console.log('Subscription created:', subscriptionResult);
    setSubscriptionStep('success');
  };

  const handleSubscriptionError = (error: SubscriptionError) => {
    console.error('Subscription error:', error);
  };

  const subscriptionPage = () => {
    switch (subscriptionStep) {
      case 'subscription-management':
        return (
          <>
            <div className='space-y-4 mb-8'>
              {customerProfile && (
                <SubscriptionInfoCard
                  customerName={customerProfile?.fullName}
                  subscriptionStatus={customerSubscriptionData?.status}
                  currentPlan={customerSubscriptionData?.currentPlan}
                  startDate={customerSubscriptionData?.subscriptions[0]?.currentPeriodStart?.slice(0, 10)}
                  expirationDate={customerSubscriptionData?.status === "trialing" ? customerSubscriptionData?.trialEnd?.slice(0, 10) : customerSubscriptionData?.subscriptionExpiresAt?.slice(0, 10) || 'N/A'}
                  className="mb-1"
                  gradientFrom="from-blue-50"
                  gradientTo="to-purple-50"
                />
              )}

              {!customerProfile && !isSubscribed && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <Text size="base" className="text-center text-gray-600">
                    You're not currently subscribed to Desola Flights Premium
                  </Text>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {isSubscribed ? (
                <div className="flex gap-3">
                  <Btn
                    onClick={() => setShowCancelForm(true)}
                    weight="semibold"
                    fontStyle="work"
                    radius="48px"
                    className="w-full lg:text-sm h-12 text-base text-neutral-100 bg-neutral-500 hover:!scale-95"
                  >
                    Cancel 
                  </Btn>
                  <Btn
                    onClick={() => setSubscriptionStep('plan-selection')}
                    weight="semibold"
                    fontStyle="work"
                    radius="48px"
                    className="w-full lg:text-sm h-12 text-base text-neutral-100 bg-gradient-to-b from-[#FF9040] to-[#FF6B00] hover:!scale-95"
                  >
                    Update
                  </Btn>
                </div>
              ) : (
                <Btn
                  onClick={() => setSubscriptionStep('plan-selection')}
                  weight="semibold"
                  fontStyle="work"
                  radius="48px"
                  className="w-full lg:text-sm h-12 text-base text-neutral-100 bg-gradient-to-b from-[#FF9040] to-[#FF6B00] hover:!scale-95"
                >
                  Start Subscription
                </Btn>
              )}
            </div>

            {showCancelForm && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <Text size="sm" weight="medium" className="mb-3 text-red-800">
                  Cancel Subscription
                </Text>
                <Text size="xs" color="text-red-600" className="mb-3">
                  Tell us why you want to cancel your subscription so that we can improve our service...
                </Text>
                <TextArea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your reason for cancellation..."
                  required
                  className="w-full text-xs min-h-20 max-h-30 h-auto border border-red-300 px-3 py-2 mb-3 bg-white transition-all duration-200 ease-in-out box-border rounded-lg placeholder:text-xs"
                />
                <div className="flex gap-2">
                  <Btn
                    onClick={() => {
                      setShowCancelForm(false)
                      setInputValue('')
                    }}
                    weight="medium"
                    className="px-4 py-2 text-sm bg-neutral-300 text-neutral-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </Btn>
                  <Btn
                    onClick={CancelSubscription}
                    disabled={canceling || inputValue.length < 4}
                    loading={canceling}
                    weight="medium"
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-300"
                  >
                    {canceling ? 'Canceling...' : 'Confirm Cancellation'}
                  </Btn>
                </div>
              </div>
            )}
          </>
        )

      case 'plan-selection':
        return (
          <>
            <div className="mb-6">
              <Btn
                onClick={() => setSubscriptionStep('subscription-management')}
                className="text-primary-500 hover:text-primary-600 !border-none mb-4"
              >
                ← Back to subscription management
              </Btn>
              <Text as="h2" size="xl" weight="semibold" className="font-grotesk text-primary-500">
                {isSubscribed ? 'Update Your Plan' : 'Choose Your Plan'}
              </Text>
            </div>

            <div className="flex flex-col justify-between lg:overflow-y-auto">
              <div className="space-y-6">
                <BillFrequency
                  plans={plans}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                  MonthlyPrice={monthlyPrice}
                  YearlyPrice={yearlyPrice}
                />
              </div>

              <div className="mt-8 mb-16">
                <Btn
                  onClick={() => {
                    handlePlanSelection()
                    if (selectedPlan && !isSubscribed && !customerSubscriptionData && customerFormData) {
                      createCustomer({ ...customerFormData })
                    }
                  }}
                  disabled={!selectedPlan}
                  weight="semibold"
                  fontStyle="work"
                  radius="48px"
                  className={`w-full lg:text-sm h-12 text-base text-neutral-100 ${selectedPlan
                    ? 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] hover:!scale-95'
                    : 'bg-neutral-400 cursor-not-allowed'
                    }`}
                >
                  {isSubscribed ? 'Continue to Update' : 'Continue to Payment'}
                </Btn>
              </div>
            </div>
          </>
        )

      case 'payment':
        return (
          <Elements stripe={stripePromise}>
            <StripePaymentForm
              customerData={customerFormData!}
              selectedPlan={selectedPlan}
              onSuccess={handleSubscriptionSuccess}
              onError={handleSubscriptionError}
              onBack={() => setSubscriptionStep('plan-selection')}
            />
          </Elements>
        )

      case 'success':
        return (
          <div className="flex-1 h-full flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="text-green-500 text-6xl mb-4"><PiUserCircleCheckFill /></div>
              <Text as="h1" size="2xl" weight="bold" className="font-grotesk text-primary-500 mb-2">
                Subscription {isSubscribed ? 'Updated' : 'Created'} Successfully!
              </Text>
              <Text size="base" color="text-neutral-600" className="mb-6">
                Welcome to Desola Flights Premium
              </Text>
              <Btn
                onClick={() => setSubscriptionStep('subscription-management')}
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600"
              >
                Back to Subscription Management
              </Btn>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="relative space-y-2 mb-5">
        <Title>
          Subscription Management
        </Title>
        <Text size="2xs" className="lg:!text-xs !text-neutral-500 pl-0.5">
          Manage your subscription to Desola Flights Premium. Choose a plan that suits you and enjoy exclusive benefits.
        </Text>
      </div>
      {subscriptionPage()}
    </div>
  );
};