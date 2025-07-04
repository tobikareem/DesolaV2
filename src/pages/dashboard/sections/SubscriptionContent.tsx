
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from "react"
import { Btn } from "../../../components/ui/Button"
import { Text } from "../../../components/ui/TextComp"
import { useAuthInfo } from "../../../hooks/useAuthInfo"
import { useDashboardInfo } from "../../../hooks/useDashboardInfo"
import { useSubscription } from "../../../hooks/useSubscription"
import { CustomerSignupRequest } from "../../../models/payment/CustomerSignupRequest"
import { CreateSubscriptionResult, SubscriptionError } from "../../../models/payment/SubscriptionResult"
import { STRIPE } from "../../../utils/constants"
import { StripePaymentForm } from "../../payment/StripePaymentForm"
import { BillFrequency } from "../../pricing/BillFrequency"

const stripePromise = loadStripe(STRIPE.PUBLISHABLE_KEY || '');

export const SubscriptionContent = () => {
  
  const { plans, selectedPlan, setSelectedPlan, monthlyPrice, yearlyPrice } = useSubscription();
  const [subscriptionStep, setSubscriptionStep] = useState('plan-selection');
  const [customerData, setCustomerData] = useState<CustomerSignupRequest>();
  const { preferences } = useDashboardInfo();
  const { customerProfile } = useAuthInfo();

  useEffect(() => {
    setCustomerData({
      email: customerProfile?.email || '',
      fullName: customerProfile?.fullName || '',
      phone: customerProfile?.phone || '+1234567890',
      preferredCurrency: customerProfile?.preferences.currency || 'USD',
      defaultOriginAirport: preferences.originAirport || 'SFO',
      metadata: {
        userId: customerProfile?.id || '',
        accountType: 'premium',
        signupSource: 'web'
      }
    });
  }, [customerProfile?.email, customerProfile?.fullName, customerProfile?.id, customerProfile?.phone, customerProfile?.preferences.currency, preferences.originAirport]);

  const handlePlanSelection = () => {
    if (selectedPlan && customerData) {
      setSubscriptionStep('payment');
    }
  };

  const handleSubscriptionSuccess = (subscriptionResult: CreateSubscriptionResult) => {
    console.log('Subscription created:', subscriptionResult);
    setSubscriptionStep('success');
  };

  const handleSubscriptionError = (error: SubscriptionError) => {
    console.error('Subscription error:', error);
    setSubscriptionStep('plan-selection');
  };

  if (subscriptionStep === 'success') {
    return (
      <div className="flex-1 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <Text as="h1" size="2xl" weight="bold" className="font-grotesk text-primary-500 mb-2">
            Subscription Active!
          </Text>
          <Text size="base" color="text-neutral-600">
            Welcome to Desola Flights Premium
          </Text>
        </div>
      </div>
    );
  }

  if (subscriptionStep === 'payment') {
    return (
      <Elements stripe={stripePromise}>
        <StripePaymentForm
          customerData={customerData!}
          selectedPlan={selectedPlan}
          onSuccess={handleSubscriptionSuccess}
          onError={handleSubscriptionError}
          onBack={() => setSubscriptionStep('plan-selection')}
        />
      </Elements>
    );
  }


  return (
    <div className="flex-1 h-full">
      <Text as="h1" size="2xl" weight="bold" className="font-grotesk text-primary-500 mb-5">
        Choose Your Plan
      </Text>
      <div className="flex flex-col justify-between h-full overflow-y-auto gap-10">
        <div>
          <BillFrequency
            plans={plans}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            MonthlyPrice={monthlyPrice}
            YearlyPrice={yearlyPrice}
          />
        </div>
        <div className="mb-16">
          <Btn
            onClick={handlePlanSelection}
            disabled={!selectedPlan}
            weight="semibold"
            fontStyle="work"
            radius="48px"
            className={`w-full h-10 text-base text-neutral-100 ${selectedPlan
              ? 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] hover:!scale-95'
              : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            Continue to Payment
          </Btn>
        </div>
      </div>
    </div>
  );
};