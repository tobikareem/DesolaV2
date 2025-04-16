import { Img as ReactImage } from 'react-image';

export const FlightAnimation =({props}: {props: string})=> {
  return(
    <ReactImage 
      src='/mini.webp'
      alt="Aero"
      className={`${props} w-[100px]`}
    />
  )
}