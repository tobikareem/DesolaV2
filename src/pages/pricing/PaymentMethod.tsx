import { Btn } from "../../components/ui/Button";
import { useSubscription } from "../../hooks/useSubscription";
import { PricingCard } from "./PricingCard"
import {Img as ReactImage} from "react-image"

export const PaymentMethod =()=> {

  const {modeOfPayment, selectMode, setSelectMode} = useSubscription();

  return(
    <PricingCard title="SELECT PAYMENT METHOD">
      <div className='space-y-4'>
        { modeOfPayment?.map((mode)=>(
          <Btn key={mode}
            type="button" weight="medium"
            value={mode}
            onClick={()=> setSelectMode(mode)}
            className={`flex items-center w-full h-12 lg:h-[52px] justify-between !p-2 !md:p-2.5 !text-left !rounded-[10px] border ${selectMode == mode ? 'border-primary-300' : 'border-modal'}`}>
            <div className="flex items-center gap-1">
              <label className="font-work font-medium text-base text-Neutral">
                {mode}
              </label>
              {mode == 'Paypal' && <ReactImage src={'/PayPal.webp'} alt='' width={26} height={18} loading={'lazy'}/>}
            </div>
            <div className='flex items-center gap-1'>
              {mode != 'Paypal' && 
                ['Visa','Mastercard','Amex','Discover'].map((item)=>(
                  <ReactImage key={item} src={`/${item}.webp`} alt='' width={26} height={18} loading={'lazy'}/>
                ))
              }
            </div>
          </Btn>
        ))}
      </div>
    </PricingCard>
  )
}