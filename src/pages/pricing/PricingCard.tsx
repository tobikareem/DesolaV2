import { ReactNode } from "react";
import { Text } from "../../components/ui/TextComp";

interface PricingCardProps {
  title?:string;
  children?: ReactNode;
}

export const PricingTitle =({title}:{title?:string;})=> <Text as='h4' weight='medium' color='text-Neutral' fontStyle='font-grotesk' size='lg' className="sm:!text-xl" >
  {title}
</Text>

export const PricingCard =({title,children}:PricingCardProps)=> {
  return (
    <div className="bg-white w-full p-3 md:p-5 rounded-2xl ">
      <PricingTitle title={title}/>
      <div className="w-full mt-6">
        {children}
      </div>
    </div>
  )
}