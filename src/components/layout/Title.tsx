import { useContext,ReactNode } from "react"
import { Text } from "../ui/TextComp"
import { NavigationContext } from "../../contexts/NavigationContext"
import { useIsDesktop } from "../../hooks/useDesktopSize"
import { MdKeyboardBackspace } from "react-icons/md"

export const Title =({children}:{children:ReactNode})=> {
  const {mobileTab, setMobileTab} = useContext(NavigationContext)
  const isDesktop = useIsDesktop()
  return (
    <div className="flex items-center gap-5">
      {mobileTab !== '' && !isDesktop && 
        <div onClick={()=> setMobileTab('')}
            className="rounded-full font-semibold font-work  right-5  text-primary-600">
            <MdKeyboardBackspace size={28} />
        </div>
      }
      <Text
        as="h1"
        size="xl"
        weight="bold"
        className="font-grotesk text-primary-500 inline-flex sm:text-2xl"
      >
        {children}
      </Text>
    </div>
    
)
}