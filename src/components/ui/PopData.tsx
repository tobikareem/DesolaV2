import { ReactNode } from "react"



export const PopData =({children, position, visibility = false}:{children:ReactNode, position:string, visibility: boolean}) => {
  

  return(
    <>
      <div className={`${position} absolute z-30 bg-white ${visibility ? 'flex' : 'hidden'} flex-col max-w-xs border border-neutral-300 shadow-md rounded-lg overflow-hidden`}>
          {children}
      </div>
    </>
  )
}



