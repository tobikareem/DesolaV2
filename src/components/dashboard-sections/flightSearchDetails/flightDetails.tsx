import { Link } from "react-router-dom"
import { Text } from "../../ui/TextComp"

export type FlightDetails = {
  duration?:string
  route?:string
  airCodeII?:string
  airCraft?:string
  flightClass?:string
  stops?:string
  source?:string
  price?:number
}

export const MobileFlightExtDetails:React.FC<FlightDetails> =({duration, route, price, airCodeII, airCraft, flightClass, stops,source})=> {
  return (
      <div className='flex-wrap flex lg:hidden w-full gap-2 justify-between items-center'>
        <div className='space-y-1'>
          <Text as='p'size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
            {duration}
          </Text>
          <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
            {route}
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
        <Link to={source ?? '#'} className='font-work flex items-center rounded-lg bg-primary-100 px-2.5 py-1.5 text-xs'>
          Website Link
        </Link>
        <div className='space-y-1'>
          <Text as='p'size='sm'color='text-success' weight="medium" className='lg:text-base'>
            ${price}
          </Text>
          <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate lg:'>
            {route}
          </Text> 
        </div>
      </div>
  )
}