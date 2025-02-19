
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Btn } from "./Button";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type CardProps = {
  color?:string;
  Tag?: string;
  TagColor?: string;
  priceColor?: string;
  price?:string;
  period?:string;
  benefit?:string[];
  benefitColor?: string;
  buttonColor?: string;
  extra?:string;
}


export const SubscriptionCard =({
  color = 'bg-white',
  TagColor,
  Tag,
  price,
  period = 'mo',
  priceColor,
  extra = 'text-[#68708C]',
  benefit,
  benefitColor,
}:CardProps)=> {

  const navigate = useNavigate();
  return(
    <div className={`${color} cursor-pointer flex flex-col w-full sm:w-[450px] p-5 xs:p-8 sm:p-10 rounded-2xl hover:scale-105 hover:z-20 transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col gap-5">
        <div className={`${TagColor} py-1.5 px-3 w-fit rounded-[100px] font-inter text-white uppercase cursor-pointer`}>
          {Tag}
        </div>  
        <div className={`${priceColor} flex items-center font-grotesk font-semibold text-[55px]`}>
          ${price}/<span className="mt-4 text-4xl font-poppins">{period}</span>
        </div>
        <div className={`${extra} text-base font-vietnam-pro font-medium `}>
          What's included
        </div>
        <div className="flex flex-col gap-4">
          {
            benefit?.map((item)=>(
              <div key={item}
                className={`flex items-center gap-3 xs:gap-4 sm:gap-5 text-base sm:text-lg text-nowrap ${benefitColor}`}
              >
                <IoIosCheckmarkCircleOutline className="text-xl sm:text-[22px]"/> {item}
              </div>
            ))
          }
        </div>
      </div>
      <Btn onClick={()=> navigate('/signup')} 
        fontStyle="work"
        radius="lg"
        className={`mt-10 bg-white border border-primary-500 text-primary-500 gap-2.5 text-base py-4.5 w-full `}>
        Get Started <MdOutlineArrowOutward />
      </Btn>
      
    </div> 
  )
}