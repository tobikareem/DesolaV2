
import { BsStars } from "react-icons/bs";

type EditProps = {
  message?: string | null;
}

export const EditData =({message}:EditProps)=> {
  return (
    <div className="relative flex flex-col flex-1 bg-background space-y-6 p-5 pb-16 lg:pl-20 overflow-y-auto">
        <div className={`font-work flex items-start space-x-2 cursor-default`}>
            <div className={`bg-primary-500 text-white flex items-center justify-center size-10 rounded-full text-lg border border-neutral-300`}>
                <BsStars />
            </div>
            <span className={`bg-primary-100 text-neutral p-3 rounded-lg text-xs sm:text-sm md:text-base`}>
                Edit {message} ?
            </span>
        </div>
    </div>
  );
}