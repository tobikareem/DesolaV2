import { ReactNode } from "react"



export const PopData =({children, position, visibility = 'flex'}:{children:ReactNode, position:string, visibility: string}) => {
  

  return(
    <>
      <div 
        className={`${position} absolute z-30 bg-white ${visibility} flex-col max-w-xs border border-neutral-300 shadow-md rounded-lg overflow-hidden`}>
          {children}
      </div>
    </>
  )
}



