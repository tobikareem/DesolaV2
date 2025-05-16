import { IoMdCloseCircleOutline } from "react-icons/io"

export const Close = ({Action}:{Action: (() => void) | ((e:React.MouseEvent<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | SVGElement>) => void)}) => 
      <IoMdCloseCircleOutline
        onClick={Action}
        className="text-2xl md:text-4xl text-black self-end mt-2 mr-2 cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
      />