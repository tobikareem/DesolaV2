import { PricingCard } from "./PricingCard"
import {Img as ReactImage} from "react-image"
import { Text } from "../../components/ui/TextComp"
import { RiDeleteBin2Fill } from "react-icons/ri"
import { Btn } from "../../components/ui/Button"
import { Modal } from "../../components/modals/Modal"
import { ClearChat } from "../../components/modals/ClearChat"
import { useState } from "react"

export const CardDetails =()=> {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  
  const CardDetails = [
    {id:1, icon:'Mastercard.webp',cardType:'Mastercard', cardNumber:2345, expiryDat:'08/29'},
    {id:2, icon:'Visa.webp',cardType:'Visa', cardNumber:2345, expiryDat:'08/29'},
    {id:3, icon:'Mastercard.webp',cardType:'Mastercard', cardNumber:2345, expiryDat:'08/29'},
  ]

  const handleCardDeletion =()=> {
    if(selectedCardId != null) {
      console.log('Delete:', selectedCardId);
      setShowDeleteModal(false)
    }
    
  }

  return(
    <PricingCard title="CARD DETAILS">
      <div className="relative space-y-4">
        {
          CardDetails?.map((item)=> {
            return(
              <div key={item?.id} className="flex w-full items-center gap-2 py-3.5">
                <ReactImage src={`/${item?.icon}`} alt="icon" width={35} height={24}/>
                <div className="flex items-center w-full justify-between gap-2">
                  <Text size="sm" color="text-Neutral" className="w-full lg:text-xs xl:text-sm">
                    {item?.cardType} ending in {item?.cardNumber} 
                  </Text>
                  <Text size="sm" color="text-Neutral" className="lg:text-xs xl:text-sm">
                    {item?.expiryDat} 
                  </Text>
                  <div onClick={()=>{
                    setSelectedCardId(item.cardNumber)
                    setShowDeleteModal(!showDeleteModal);
                  }}
                    className="text-error text-xl cursor-pointer ml-4">
                    <RiDeleteBin2Fill />
                  </div>
                </div>
              </div>
            )})
        }
      </div>
      <Btn weight="medium" size='base' className="bg-primary-600 text-white !rounded mt-8" 
        onClick={()=>{}}
      >
        <span className="text-xl mr-2">+</span> Add new card
      </Btn>
      <Modal display={showDeleteModal} close={()=> setShowDeleteModal(false)}>
        <ClearChat Action={()=> setShowDeleteModal(!showDeleteModal)} 
          ConfirmAction={handleCardDeletion} 
          Message={`Are you sure you want to delete card with number ${selectedCardId}?`}
        />
      </Modal>
      
    </PricingCard>
  )
}