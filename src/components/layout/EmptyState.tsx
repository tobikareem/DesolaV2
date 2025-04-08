
import { Text } from "../ui/TextComp"
import {Img as ReactImage} from 'react-image'

export const EmptyState =({position = 'start', content}:{position:'center' | 'start' | 'end' | 'between', content:string | null})=> {

  const justify = {
    center:'justify-center',
    start:'justify-start',
    end:'justify-end',
    between:'justify-between',
  }

  return(
    <div className={`flex w-full h-full flex-col ${justify[position]}  p-10 items-center gap-4 bg-transparent`}>
      <ReactImage
        src="/empty-icon.svg"
        alt="empty"
        className="w-[100px]"
      />
      <Text size="sm" color="text-neutral-500" className="text-center">
        { content || 'Start a conversation to find your perfect flight.'}
      </Text>
    </div>
  )
}