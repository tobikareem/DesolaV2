
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useEffect, useState } from "react"
import { Btn } from "../../../components/ui/Button"
import { Text } from "../../../components/ui/TextComp"
import { useAuthInfo } from "../../../hooks/useAuthInfo"
import { useDashboardInfo } from "../../../hooks/useDashboardInfo"
import { useSubscription } from "../../../hooks/useSubscription"
import { CreateSubscriptionResult, SubscriptionError } from "../../../models/payment/SubscriptionResult"
import { STRIPE } from "../../../utils/constants"
import { StripePaymentForm } from "../../payment/StripePaymentForm"
import { BillFrequency } from "../../pricing/BillFrequency"
import useCustomerApi from '../../../hooks/useCustomerApi'
import { CancelSubscriptionProps } from '../../../models/payment/CancelSubscription'
import { toast } from 'react-toastify';
import { TextArea } from '../../../components/ui/TextAreaField'
import { ENDPOINTS_API_PATH } from '../../../utils/endpoints'
import useApi from '../../../hooks/useApi'

const stripePromise = loadStripe(STRIPE.PUBLISHABLE_KEY);

export const SubscriptionContent = () => {

  const {postData} = useApi();
  const { plans, selectedPlan, setSelectedPlan, monthlyPrice, yearlyPrice, customerData, setCustomerData, isSubscribed, isCustomerCreated } = useSubscription();
  const [subscriptionStep, setSubscriptionStep] = useState('plan-selection');
  const { preferences } = useDashboardInfo();
  const { customerProfile } = useAuthInfo();
  const { createCustomer } = useCustomerApi();
  const [canceling, setIsCanceling] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('')
  const [TextBox, setTextBox] = useState<boolean>(false)

  useEffect(() => {
    setCustomerData({
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

    
  }, [customerProfile?.email, customerProfile?.fullName, customerProfile?.id, customerProfile?.phone, customerProfile?.preferences.currency, preferences.originAirport, setCustomerData]);


  const CancelDetails: CancelSubscriptionProps = {
    stripeCustomerId: isCustomerCreated?.stripeCustomerId || '',
    CancelAtPeriodEnd: true,
    CancellationReason: inputValue,
    customerId: isCustomerCreated?.customerId|| '',
    customerEmail: customerData?.email || ''
  };

  const CancelSubscription = async () => {
    setIsCanceling(true)
    try {
        await postData<CancelSubscriptionProps>(`${ENDPOINTS_API_PATH?.stripe_cancelSubscription}`, CancelDetails)
    } catch (error) {
        console.error('Error canceling subscription:', error);
    } finally {
        setIsCanceling(false)
        toast.success('Subscription Canceled successfully')
    }
  }


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
    <div className="">
      <div className="relative space-y-2 mb-5">
        <Text as="h1" size="2xl" weight="bold" className="font-grotesk text-primary-500">
          Subscription Management
        </Text>
        <Text size="2xs" className="lg:!text-xs !text-neutral-500 pl-0.5">
          Manage your subscription to Desola Flights Premium. Choose a plan that suits you and enjoy exclusive benefits.
        </Text>
      </div>
        <div className='space-y-3 mb-5'>
          <Text as="h2" size="xl" weight="semibold" className="font-grotesk text-primary-500">
            Subscriber
          </Text>
          { customerProfile &&
            <div className="mb-5 space-y-2 border border-neutral-300 rounded-2xl p-2">
              <Text size="lg" weight="medium" color="text-primary-600">
                Name: <span className="text-base font-normal !text-Neutral">{customerProfile?.fullName ?? 'N/A'}</span>
              </Text>
              <Text size="lg" weight="medium" color="text-primary-600">
                Subscription Status: <span className={`text-base font-normal ${isSubscribed ? 'text-success' : 'text-error'}`}>{isSubscribed ? 'Active' : 'Inactive'}</span>
              </Text>
              <Text size="lg" weight="medium" color="text-primary-600">
                Expires: <span className={`text-base font-normal ${isSubscribed ? 'text-notification' : 'text-error'}`}>{isSubscribed ? `${isCustomerCreated?.subscriptionExpiresAt?.slice(0,10)}` : 'Expired'}</span>
              </Text>
            </div>
          }
          {!customerProfile && !isSubscribed && (
            <Text size="base" className="">
              You're not a subscriber...Choose a plan to be a subscriber
            </Text>
          )}
      </div>


      <Text as="h2" size="xl" weight="semibold" className="font-grotesk text-primary-500 mb-3">
        Choose Your Plan
      </Text>
      <div className="flex flex-col justify-between h-full overflow-y-auto">
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
          {   
            TextBox &&
            <div className="px-3">  
              <Text size="xs" color="text-neutral-500" className="mt-2">
                Tell us why you want to cancel your subscription so that we can improve on our service...
              </Text>
              <TextArea value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter your message..." required 
                  className="bg-transparent text-xs min-h-20 max-h-30 h-auto !border-none px-3 py-2 my-2 !bg-tint transition-all duration-200 ease-in-out box-border rounded-lg"  
              />
            </div>
          }
          <div className='flex flex-col md:flex-row gap-2 mt-6'>
            <Btn
              onClick={()=>{
                handlePlanSelection()
                if (!isSubscribed){
                  if(!isCustomerCreated && customerData) {
                    createCustomer({...customerData})
                  }
                }
              }}
              disabled={!selectedPlan}
              weight="semibold"
              fontStyle="work"
              radius="48px"
              className={`w-full lg:text-xs xl:text-sm h-10 text-base text-neutral-100 ${selectedPlan
                ? 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] hover:!scale-95'
                : 'bg-gray-400 cursor-not-allowed'
                }`}
            >
              {isSubscribed ? 'Update Subscription' : 'Continue to Payment'}
            </Btn>
            {isSubscribed && (
              <Btn
                onClick={()=>{
                  if(!TextBox) {
                    setTextBox(true)
                  } else {
                    CancelSubscription()
                    setTextBox(false)
                    setInputValue('')
                  }
                }}
                disabled={canceling}
                loading={canceling}
                weight="semibold"
                fontStyle="work"
                radius="48px"
                className={`w-full lg:text-xs xl:text-sm text-nowrap h-10 text-base text-neutral-100 ${selectedPlan
                  ? 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] hover:!scale-95'
                  : 'bg-gray-400 cursor-not-allowed'
                  }`}
              >
                {!TextBox &&<span>Cancel Subscription</span>}
                {TextBox && <span>{canceling ? 'Canceling subscription...':'Proceed to Cancel Subscription'}</span>}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};