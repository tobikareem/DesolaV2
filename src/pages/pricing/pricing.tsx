import { useState } from "react";
import { PricingCard, PricingTitle } from "./PricingCard";
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'
import { Logo } from "../../components/layout/Logo";
import { Btn } from "../../components/ui/Button";
import {Img as ReactImage} from "react-image";
import { Input } from "../../components/ui/InputField";
import { Text } from "../../components/ui/TextComp";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { WEB_PAGES } from "../../utils/constants";
import { ENDPOINTS_API_PATH } from "../../utils/endpoints";
import usePageContent from "../../hooks/usePageContent";



const Pricing =()=> {
  const { content: monthlyYearly } = usePageContent(`${ENDPOINTS_API_PATH.page}`, `${WEB_PAGES.home}`, "MonthlyYearlyPrice");
  const monthlyPrice = monthlyYearly?.RowValue?.split(";")[0] ?? '2.59';
  const yearlyPrice = monthlyYearly?.RowValue?.split(";")[1] ?? '30.59';
  const plans = ['Yearly','Monthly']
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[0])
  const [selectRegion, setSelectRegion] = useState<string>('Select Country');
  const [selectMode, setSelectMode] = useState<string>('')
  const modeOfPayment = ['Debit/Credit Card','Paypal']

  const price = selectedPlan == 'Yearly' ? yearlyPrice : monthlyPrice
  const period = ''

  const Regions = [
    'United State of America', 'United Kingdom', 'Nigeria'
  ]

  return(
    <div className="bg-background w-screen min-h-screen font-work pt-8">
      <div className="mx-auto w-fit"><Logo/></div>
      <div className='relative flex flex-col lg:flex-row w-full p-4 md:p-8 lg:pb-16 lg:px-28 gap-8 lg:gap-12'>
        <div className='flex flex-col w-full max-w-3xl gap-8'>
          <PricingCard title="BILL FREQUENCY">
            <RadioGroup value={selectedPlan} 
              onChange={setSelectedPlan} 
              aria-label="Payment Plan" className='w-full space-y-4'
            >
              {plans.map((plan) => (
                <Field key={plan}
                  className="group flex items-center gap-3 w-full cursor-pointer">
                  <Radio
                    value={plan}
                    className={`flex size-4 md:size-6 items-center justify-center rounded-full border-2 border-modal bg-transparent group-data-[checked]:border-primary-500`}
                  >
                    <span className={`size-2 md:size-4 rounded-full bg-modal group-data-[checked]:bg-primary-500`} />
                  </Radio>
                  <div className={`flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 rounded-[10px] border border-modal group-data-[checked]:border-primary-500`}>
                    <Label className="font-work font-medium text-base text-Neutral">
                      {plan}
                    </Label>
                    <div className={`flex items-center font-medium text-sm ${plan == 'Monthly' ? 'text-primary-500':'text-Neutral'} gap-1`}>
                      {plan == 'Yearly' && <div className="bg-primary-500/5 text-primary-500 px-1 rounded ">Save10%</div>}
                      <span className="">${price}/{plan}</span>
                    </div>
                  </div>
                </Field>
              ))}
            </RadioGroup>
          </PricingCard>
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
          <PricingCard>
            <div className="space-y-4">
              <Input 
                label="Card Number"
                labelClassName="font-work font-medium text-Neutral text-base"
                placeholder="Card Number"
                className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Expiry date"
                  labelClassName="font-work font-medium text-Neutral text-base"
                  placeholder="MM/YY"
                  className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
                />
                <Input 
                  label="Security Code"
                  labelClassName="font-work font-medium text-Neutral text-base"
                  placeholder="CVV"
                  className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
                />
              </div>
            </div>
            <div className="w-full mt-6">
              <PricingTitle title="BILLING ADDRESS"/>
              <Text weight='medium' color='text-neutral-500' className="mt-4 mb-6">
                By providing your card information, you allow Desola Travels, Inc. to charge for future payments in accordance with their terms.
              </Text>
              <form className="w-full space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="First Name"
                    labelClassName="font-work font-medium text-Neutral text-base"
                    placeholder="First Name"
                    className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
                  />
                  <Input 
                    label="Last Name"
                    labelClassName="font-work font-medium text-Neutral text-base"
                    placeholder="Last Name"
                    className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
                  />
                </div>
                <div className="space-y-1 relative">
                  <label className="font-work font-medium text-base text-Neutral">
                    Country or Region
                  </label>
                  <Listbox name="Region" value={selectRegion}
                    onChange={(value)=>{setSelectRegion(value)}}
                  >
                    <ListboxButton className={`font-work flex items-center w-full h-12 lg:h-[52px] border px-4 py-2 rounded-[10px] justify-between hover:border-2 text-sm ${selectRegion == 'Select Country' ? 'text-neutral-300': 'text-Neutral'} font-medium`}>
                        <span>{selectRegion}</span>
                        <MdKeyboardArrowDown className="text-2xl text-Neutral"/>
                    </ListboxButton>
                    <ListboxOptions className={`absolute w-full border border-neutral-300 rounded-[10px] mt-1 bg-neutral-200 z-10 overflow-hidden text-base`}>
                      {
                        Regions.map((option) => (
                          <ListboxOption value={option}
                              key={option}
                              className="font-work border-b border-neutral-100 w-full px-4 py-2 data-[focus]:bg-primary-600 data-[focus]:text-white text-Neutral text-xs font-medium cursor-pointer"

                          >
                            {option}
                          </ListboxOption>
                        ))
                      }
                    </ListboxOptions>
                  </Listbox>
                </div>
                <Input 
                  label="Address Line 1"
                  labelClassName="font-work font-medium text-Neutral text-base"
                  placeholder="Apt, suite, unit number, street"
                  className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
                />
                <Input 
                  label="Address Line 2"
                  labelClassName="font-work font-medium text-Neutral text-base"
                  placeholder="Apt, suite, unit number, street, etc. (optional)"
                  className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
                />
                <Input 
                  label="City"
                  labelClassName="font-work font-medium text-Neutral text-base"
                  placeholder="Enter your city"
                  className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
                />
                <Input 
                  label="Postal Code"
                  labelClassName="font-work font-medium text-Neutral text-base"
                  placeholder="postal code"
                  className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
                />
                <Input 
                  label="State or District"
                  labelClassName="font-work font-medium text-Neutral text-base"
                  placeholder="Enter your state or district"
                  className="flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 !rounded-[10px] border !border-modal placeholder:text-neutral-300"
                />
              </form>
            </div>
          </PricingCard>
        </div>
        <div className="lg:sticky top-18 bg-white w-full max-w-sm p-5 px-8 rounded-2xl h-fit">
          <Text weight='medium' color='text-neutral-500' size="base" className="mt-4 mb-6">
            We will bill you ${price} + applicable taxes minus existing credits on your account, every year on {period}, unless you cancel.
          </Text>
          <Btn onClick={()=> {}}
            weight="semibold" fontStyle="work" radius="48px"
            className="mt-[68px] bg-gradient-to-b text-nowrap from-[#FF9040] to-[#FF6B00] w-full h-9 text-base text-neutral-100">
            Pay Now ${price}/{selectedPlan}
          </Btn>
        </div>
      </div>
    </div>
  )
}

export default Pricing;

