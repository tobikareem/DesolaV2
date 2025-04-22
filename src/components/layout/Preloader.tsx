
import { Img as ReactImage } from 'react-image';
import { useLocation} from 'react-router';


export const Preloader =({visibility}:{visibility:string | undefined})=> {
  const router = useLocation()


  return(
    <div className={`${visibility} h-screen w-screen fixed z-[70]`}>
      { router.pathname === '/dashboard' ? 
        <div className='bg-background w-full h-full flex flex-col items-center justify-center p-8'>
          <ReactImage
            src={'/Globe.gif'}
            alt='globe'
            className='size-[120px] '
          />
        </div>  
        :
        <div className='w-full h-full relative'>
          <div className={`bg-primary-600 h-1/2 w-full openUp flex items-start justify-center p-10`}>
            <ReactImage
              src={'/Alt-Logo.webp'}
              alt='Desola'
              className='w-[120px] lg:w-40'
            />
          </div>
          <div className="absolute bottom-[50%] w-full">
              <ReactImage
                src={'/mini.webp'}
                alt="plane"
                className="w-[80px] z-[70] fly"
              />
          </div>
          <div className={`bg-primary-600 h-1/2 w-full openDown`}/>
        </div>
      }
    </div>
  )
}