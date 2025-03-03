
import { Img as ReactImage } from 'react-image';


export const Preloader =({visibility}:{visibility:string | undefined})=> {

  return(
    <div className={`${visibility} h-screen w-screen fixed z-[60]`}>
      <div className='w-full h-full relative'>
        <div className={`bg-primary-600 h-1/2 w-full openUp flex items-start justify-center p-10`}>
          <ReactImage
            src={'/Alt-Logo.svg'}
            alt='Desola'
            className='w-[120px] lg:w-40'
          />
        </div>
        <div className="absolute bottom-[50%] w-full">
            <ReactImage
              src={'/mini.svg'}
              alt="plane"
              className="w-[80px] z-[70] fly"
            />
        </div>
        <div className={`bg-primary-600 h-1/2 w-full openDown`}/>
      </div>
    </div>
  )
}