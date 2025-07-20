import { useModals } from "../../hooks/useModals";
import { useSubscription } from "../../hooks/useSubscription";
import SubscriptionModal from "./SubscriptionModal";
import { Modal } from "./Modal"
import { CustomStorage } from "../../utils/customStorage";
import { useEffect } from "react";
import { useAuthInfo } from "../../hooks/useAuthInfo";
import { useCustomerApi } from "../../hooks/useCustomerApi";
import { CustomerSignupRequest } from "../../models/payment/CustomerSignupRequest";
import { useDashboardInfo } from "../../hooks/useDashboardInfo";

const storage = new CustomStorage();

export const SubscriptionFlowModal = ({ Action }: { Action: () => void }) => {
  const { customerProfile } = useAuthInfo();
  const { stage } = useSubscription();
  const { toggleSubscriptionModal, showSubscriptionModal } = useModals();

  const { getCustomerSubscription, createCustomer } = useCustomerApi();
  const { isSubscribed, setIsSubscribed, setCustomerSubscriptionData, customerSubscriptionData } = useSubscription();
  const { preferences } = useDashboardInfo();

  const customerData: CustomerSignupRequest = {
    fullName: customerProfile?.fullName || '',
    email: customerProfile?.email || '',
    phone: customerProfile?.phone || '',
    preferredCurrency: 'USD',
    defaultOriginAirport: preferences?.originAirport || 'ATL', // the busiest airport
    metadata: {}
  }


  const subscriptionFlowRender = () => {
    switch (stage) {
      case 1:
        return <SubscriptionModal Action={toggleSubscriptionModal} ConfirmAction={() => {
          Action();
          toggleSubscriptionModal();
          if (customerProfile && !customerSubscriptionData) {
            createCustomer({ ...customerData })
          }
        }} />
      default: return null
    }
  }

  useEffect(() => {
    const firstTimeLoad = storage.getItem('Subscription') === 'true';
    async function checkSubscription() {
      if (customerProfile?.email) {
        try {
          if (!firstTimeLoad) {
            const customer = await getCustomerSubscription(customerProfile?.email);
            storage.setItem('Subscription', 'true');
            storage.setItem('customer', JSON.stringify(customer))
            setIsSubscribed(!!customer?.hasActiveSubscription);
            setCustomerSubscriptionData(customer)
            if (!isSubscribed) {
              toggleSubscriptionModal()
            }
          }
          const storedCustomer = storage.getItem('customer')
          if (storedCustomer) {
            const parsedCustomer = JSON.parse(storedCustomer);
            setIsSubscribed(!!parsedCustomer?.hasActiveSubscription);
            setCustomerSubscriptionData(parsedCustomer);
          }
        } catch (error) {
          console.error(`Error fetching customer subscription: ${error}`);
        }
      }
    }
    checkSubscription()
  }, [customerProfile?.email])

  return (
    <>
      {showSubscriptionModal && !isSubscribed && (
        <Modal className={`backdrop-blur-sm`} display={showSubscriptionModal} close={toggleSubscriptionModal}>
          {subscriptionFlowRender()}
        </Modal>)
      }
    </>
  )
}