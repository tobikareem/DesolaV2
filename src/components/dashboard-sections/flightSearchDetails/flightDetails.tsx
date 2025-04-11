import { Link } from "react-router-dom"
import { Text } from "../../ui/TextComp"

export type FlightDetails = {
  duration?:string
  airCode?:string
  airCodeII?:string
  airCraft?:string
  flightClass?:string
  stops?:string
  source?:string
  mode?:'Take Off'|'Return Flight' | null
  moment?:string
}

const FlightTag =({mode = 'Take Off', moment}:FlightDetails)=> {

  return(
    <div className={`w-full h-8 lg:h-10 ${!mode ? 'bg-success':'bg-notification' } rounded-lg items-center justify-center`}>
      <Text as="p" size="xs" weight="normal" color="text-neutral-100" className="lg:text-lg">
        {moment} • {mode}
      </Text>
    </div>
  )
}


export const FlightDetails:React.FC<FlightDetails> =({duration, airCode, airCodeII, airCraft, flightClass, stops,source})=> {
  return (
    <div className="space-y-8">
      <div className='flex lg:hidden w-full gap-2 justify-between items-center'>
        <div className='space-y-1'>
          <Text as='p'size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
            {duration}
          </Text>
          <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
            {airCode}
          </Text> 
        </div>
        <div className='space-y-1'>
          <Text as='p'size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
            {flightClass}
          </Text>
          <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
            {airCraft}
          </Text> 
        </div>
        <div className='space-y-1'>
          <Text as='p'size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
            {stops}
          </Text>
          <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate lg:'>
            {airCodeII}
          </Text> 
        </div>
        <Link to={source ?? '#'} className='flex items-center rounded-lg bg-primary-100 px-2.5 py-1.5 text-xs'>
          Website Link
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col w-full">
          <FlightTag mode="Take Off" moment="" />
        </div>
      </div>
    </div>
  )
}