
import { useModals } from "../../hooks/useModals";
import { useSubscription } from "../../hooks/useSubscription"
import CardSubscriptionModal from "./CardSubscriptionModal";
import SubscriptionModal from "./SubscriptionModal";
import { Modal } from "./Modal"


export const SubscriptionFlowModal =({display}:{display: boolean})=> {
  const {stage, setStage} = useSubscription();
  const {toggleSubscriptionModal} = useModals();

  const subscriptionFlowRender = ()=> {
    switch (stage){
      case 1: 
        return <SubscriptionModal Action={toggleSubscriptionModal} ConfirmAction={()=> setStage(2)}/>
      case 2: 
        return <CardSubscriptionModal onCancel={toggleSubscriptionModal} onConfirm={()=> setStage(0)}/>
      default: return null
    }

  }

  return(
    <Modal className={``} display={display} close={toggleSubscriptionModal}>
      {subscriptionFlowRender()}
    </Modal>
  )
}