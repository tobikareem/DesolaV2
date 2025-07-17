import { GiHamburgerMenu } from "react-icons/gi"
import { Text } from "../../components/ui/TextComp"


interface AdminRightPanelProps {
  Action: ()=> void;
}

export const AdminRightPanel =({Action}:AdminRightPanelProps)=> {
  
  // const View =()=> {
  //   // switch ()
  // }
  return (
    <div className="flex flex-col w-full h-full">
      <div className="bg-neutral-100 border-b border-neutral-300 flex items-center gap-4 w-full h-20 lg:h-30 px-4 sm:px-6">
        <div className="">
          <div onClick={Action}
            className={`block lg:hidden text-primary-600 text-xl`}>
            <GiHamburgerMenu />
          </div>
        </div>
        <div>
          <Text as="h3" color='text-Neutral' size="base" weight="medium" fontStyle='font-grotesk' className="xs:!text-xl sm:!text-3xl">Desola Flights Admin Dashboard</Text>
          <Text color='text-[#5c5c5c]' className="!text-[8px] xs:!text-xs sm:!text-sm">Customer Support and User management system</Text>
        </div>
      </div>
      <div className="flex-1 w-full h-full overflow-y-auto p-6 lg:pr-[5%]">
        {}
      </div>
    </div>
  )
}