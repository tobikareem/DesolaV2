
import { Text } from "../../../components/ui/TextComp"
import { BillFrequency } from "../../pricing/BillFrequency"
import { useSubscription } from "../../../hooks/useSubscription"
import { CardDetails } from "../../pricing/CardDetails"
import { Btn } from "../../../components/ui/Button"

export const SubscriptionContent =()=> {
  const {plans, selectedPlan, setSelectedPlan, monthlyPrice, yearlyPrice} = useSubscription();

  
  return(
    <div className="flex flex-col flex-1">
      <Text
        as="h1"
        size="2xl"
        weight="bold"
        className="font-grotesk text-primary-500 mb-5"
      >
        Subscription
      </Text>
      <div className="">
        <BillFrequency 
          plans={plans}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          MonthlyPrice={monthlyPrice}
          YearlyPrice={yearlyPrice}
        />
        <CardDetails/>
      </div>
      <Btn onClick={()=> {}} weight="semibold" fontStyle="work" radius="48px"
        className="mt-16 bg-gradient-to-b text-nowrap from-[#FF9040] to-[#FF6B00] w-full h-10 text-base text-neutral-100 hover:!scale-95"
      >
        Cancel Subscription
      </Btn>
    </div>
  )
}