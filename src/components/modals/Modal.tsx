import React from "react"

interface ModalProps {
  children?: React.ReactNode;
  close?: ()=> void ;
  position?: 'fixed'  | 'absolute';
  className?: string | undefined;
  display?: boolean;
}

export const Modal:React.FC<ModalProps> = ({display = false, children, close, position = 'fixed', className})=> {


  return(
    <div 
      onClick={close}
      className={`${display ? 'block' : 'hidden'} ${position} ${className} top-0 left-0 w-full h-full bg-black bg-opacity-50 fixed flex p-4 md:p-8 items-center justify-center z-[60]`}
    >
      <div id="content" onClick={(e)=> e.stopPropagation()}
        className="bg-white rounded-2xl p-7 overflow-hidden h-full md:h-fit max-h-[650px]">
        {children}
      </div>
    </div>
  )
}