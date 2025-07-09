import { Dispatch, SetStateAction } from "react";
import { PricingCard} from "./PricingCard";
import { Field, Label, Radio, RadioGroup } from '@headlessui/react'

interface FrequencyProps {
  selectedPlan:string;
  setSelectedPlan: Dispatch<SetStateAction<string>>;
  plans: string[];
  MonthlyPrice: string;
  YearlyPrice: string;
}


export const BillFrequency =({selectedPlan, setSelectedPlan, plans, YearlyPrice, MonthlyPrice }:FrequencyProps)=> {

  return (
    <PricingCard title="BILL FREQUENCY">
      <RadioGroup value={selectedPlan} 
        onChange={setSelectedPlan} 
        aria-label="Payment Plan" className='w-full space-y-4'
      >
        {plans.map((plan) => { 
          const checked = selectedPlan == plan 
          const yearlyPlan = plan == 'Yearly'
          return(
            <Field key={plan}
              className="group flex items-center gap-3 w-full cursor-pointer">
              <Radio
                value={plan}
                className={`flex size-4 md:size-6 p-0.5 items-center justify-center rounded-full border-2 ${checked ? 'border-primary-500':'border-modal'} border-modal bg-transparent group-data-[checked]:border-primary-500`}
              >
                <span className={`size-full rounded-full ${checked ? 'bg-primary-500':'bg-modal'}`} />
              </Radio>
              <Label className={`flex items-center w-full h-12 lg:h-[52px] justify-between p-2 md:p-2.5 rounded-[10px] border ${checked ? 'border-primary-500':'border-modal'} cursor-pointer`}>
                <Label className="font-work font-medium text-base text-Neutral cursor-pointer">
                  {plan}
                </Label>
                <div className={`flex items-center font-medium text-sm ${plan == 'Monthly' ? 'text-primary-500':'text-Neutral'} gap-1 cursor-pointer`}>
                  {yearlyPlan && <div className="bg-primary-500/5 text-primary-500 px-1 rounded font-grotesk">Save10%</div>}
                  <span className="font-work">${yearlyPlan ? YearlyPrice : MonthlyPrice}/{plan}</span>
                </div>
              </Label>
            </Field>
        )})}
      </RadioGroup>
    </PricingCard>
  )
}