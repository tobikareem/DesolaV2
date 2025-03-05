import { Img as ReactImage } from 'react-image';

export const FlightAnimation =({props}: {props: string})=> {
  return(
    <ReactImage 
      src='/Aero.png'
      alt="flight"
      className={`${props} w-[100px]`}
    />
  )
}