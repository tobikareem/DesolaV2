import { ReactNode } from "react"



export const PopData =({children, position}:{children:ReactNode, position:string}) => {
  

  return(
    <>
      <div 
        className={`${position} absolute z-30 bg-white flex flex-col max-w-xs border border-neutral-300 rounded-lg overflow-hidden`}>
          {children}
        
      </div>
    
    </>
  )
}



