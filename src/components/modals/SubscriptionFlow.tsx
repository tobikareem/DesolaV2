import { useModals } from "../../hooks/useModals";
import { useSubscription } from "../../hooks/useSubscription";
import SubscriptionModal from "./SubscriptionModal";
import { Modal } from "./Modal"
import { CustomStorage } from "../../utils/customStorage";
import { useEffect, useState } from "react";
import { useAuthInfo } from "../../hooks/useAuthInfo";
import { useCustomerApi } from "../../hooks/useCustomerApi";
import { toast } from "react-toastify";


export const SubscriptionFlowModal =({Action}:{Action:()=>void})=> {
  const {customerProfile} = useAuthInfo();
  const {stage} = useSubscription();
  const {toggleSubscriptionModal, showSubscriptionModal} = useModals();
  const storage = new CustomStorage();
  const {getCustomerByEmail} = useCustomerApi();
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);



  const subscriptionFlowRender =()=> {
    switch (stage){
      case 1: 
        return <SubscriptionModal Action={toggleSubscriptionModal} ConfirmAction={()=> {Action(); toggleSubscriptionModal();}}/>
      // case 2: 
        // return <CardSubscriptionModal onCancel={toggleSubscriptionModal} onConfirm={()=> setStage(0)}/>
      default: return null
    }

  }

  useEffect(() => {
    const firstTimeLoad = storage.getItem('Subscription') === 'true';
    const email = customerProfile?.email;
    async function checkSubscription() {
      if (email) {
        try{
          const customer = await getCustomerByEmail(email);
          storage.setItem('Subscription', 'true');
          setIsSubscribed(!!customer?.hasActiveSubscription);
          console.log(customer)
          if(!isSubscribed){
            toggleSubscriptionModal()
          }
        } catch (error) {
          toast.error(`Error fetching customer subscription: ${error instanceof Error ? error.message : String(error)}`);
        }
      }

    }

    checkSubscription()
  },[])

  return(
    <>
      { showSubscriptionModal && !isSubscribed && (
        <Modal className={`backdrop-blur-sm`} display={showSubscriptionModal} close={toggleSubscriptionModal}>
          {subscriptionFlowRender()}
        </Modal>)
      }
    </>
  )
}