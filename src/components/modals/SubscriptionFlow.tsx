import { Modal } from "./Modal"


export const SubscriptionFlowModal =()=> {

  const subscriptionFlowRender = ()=> {
    switch (Flow){
      case 1: 
        return 

      case 2: 
        return

      default: return null
    }

  }

  return(
    <Modal className={``} display={false} close={}>
      {subscriptionFlowRender()}
    </Modal>
  )
}