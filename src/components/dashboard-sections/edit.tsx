
import { useEffect, useState } from "react";
import { BsStars } from "react-icons/bs";
import { toastManager } from "../../utils/toastUtils";

type EditProps = {
  message?: string | null;
  field?: string | null
}

export const EditData =({message, field}:EditProps)=> {
  const [extraMessage, setExtraMessage] = useState<string | null>(null);

  useEffect(() => {
    if (field?.toLowerCase() === 'multi-city' || field?.toLowerCase() === 'round trip') {
      setExtraMessage('Select your return date...');
      toastManager.show('select-date','Select your return date...','warn');
    } else {
      setExtraMessage(null);
    }
  }, [field]);
  
  return (
    <div className="relative flex flex-col flex-1 bg-background space-y-6 p-5 pb-16 lg:pl-20 overflow-y-auto">
        { message != '' && message != null && !field &&
          <div className={`font-work flex items-start space-x-2 cursor-default`}>
              <div className={`bg-primary-500 text-white flex items-center justify-center size-10 rounded-full text-lg border border-neutral-300`}>
                  <BsStars />
              </div>
              <span className={`bg-primary-100 text-neutral p-3 rounded-lg text-xs sm:text-sm md:text-base`}>
                  Edit {message} ?
              </span>
          </div>
        }

        { extraMessage && 
            <div className={`font-work flex items-start space-x-2 cursor-default`}>
              <div className={`bg-primary-500 text-white flex items-center justify-center size-10 rounded-full text-lg border border-neutral-300`}>
                  <BsStars />
              </div>
              <span className={`bg-primary-100 text-neutral p-3 rounded-lg text-xs sm:text-sm md:text-base`}>
                  Select your return date...
              </span>
            </div>
        }
    </div>
  );
}