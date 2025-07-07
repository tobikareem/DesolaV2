
import { useModals } from "../../hooks/useModals";
import { useSubscription } from "../../hooks/useSubscription";
import SubscriptionModal from "./SubscriptionModal";
import { Modal } from "./Modal"
import { CustomStorage } from "../../utils/customStorage";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuthInfo } from "../../hooks/useAuthInfo";


export const SubscriptionFlowModal =({Action}:{Action:()=>void})=> {
  const { isAuthenticated, isProfileComplete } = useAuthInfo();
  const {stage} = useSubscription();
  const {toggleSubscriptionModal, showSubscriptionModal, setShowSubscriptionModal} = useModals();
  const storage = new CustomStorage();



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
    if(!firstTimeLoad) {
      setShowSubscriptionModal(true);
      storage.setItem('Subscription', 'true');
      toast.info('Please subscribe to access all features.');
      return;
    }

  },[])

  return(
    <>
      { showSubscriptionModal && !isProfileComplete && isAuthenticated && (
        <Modal className={`backdrop-blur-sm`} display={showSubscriptionModal} close={toggleSubscriptionModal}>
          {subscriptionFlowRender()}
        </Modal>)
      }
    </>
  )
}