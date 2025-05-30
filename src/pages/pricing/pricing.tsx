import { useState } from "react";
import { PricingCard, PricingTitle } from "./PricingCard";
import { Logo } from "../../components/layout/Logo";
import { Btn } from "../../components/ui/Button";
import { Input } from "../../components/ui/InputField";
import { Text } from "../../components/ui/TextComp";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { BillFrequency } from "./BillFrequency";
import { useSubscription } from "../../hooks/useSubscription";
import { PaymentMethod } from "./PaymentMethod";



const Pricing =()=> {
  const {selectedPlan, setSelectedPlan, monthlyPrice, yearlyPrice, plans, price} = useSubscription();
  const [selectRegion, setSelectRegion] = useState<string>('Select Country');
  const period = ''
  const Regions = [
    'United State of America', 'United Kingdom', 'Nigeria'
  ]

  return(
    <div className="bg-background w-screen min-h-screen font-work pt-8">
      <div className="mx-auto w-fit"><Logo/></div>
      <div className='relative flex flex-col lg:flex-row w-full p-4 md:p-8 lg:pb-16 lg:px-28 gap-8 lg:gap-12'>
        <div className='flex flex-col w-full max-w-3xl gap-8'>
          <BillFrequency 
            plans={plans}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            MonthlyPrice={monthlyPrice}
            YearlyPrice={yearlyPrice}
          />
          <PaymentMethod/>
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

