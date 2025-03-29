
import { Text } from "../ui/TextComp"
import {Img as ReactImage} from 'react-image'

export const EmptyState =({center}:{center:string})=> {

  return(
    <div className={`flex flex-col ${center} p-10 items-center gap-4 bg-transparent`}>
      <ReactImage
        src="/empty-icon.svg"
        alt="empty"
        className="w-[100px]"
      />
      <Text size="sm" color="text-neutral-500 text-center" className="">
        Start a conversation to find your perfect flight.
      </Text>
    </div>
  )
}