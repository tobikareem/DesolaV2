import { PenLine } from 'lucide-react';
import React, { useRef } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { Input } from '../ui/InputField';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Text } from '../ui/TextComp';
import { PopData } from '../layout/PopData';
import { Airport } from '../../hooks/useDashboardInfo';
import { ChatProp } from '../../utils/ChatBotHandler';

interface EditModalProps {
  prompts: string[] | undefined;
  chatSystem: ChatProp[];
  airport: Airport[];
  close: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  prompts,
  chatSystem,
  airport,
  close,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="w-full max-w-[600px]  bg-white max-h-[618px]">
      <div className="relative flex p-1 flex-col w-full">
        <IoMdCloseCircleOutline
          onClick={close}
          className="text-2xl text-black self-end"
        />
        <div
          ref={scrollContainerRef}
          onWheel={handleScroll}
          className="hidden lg:flex h-16  w-full overflow-y-hidden overflow-x-auto whitespace-nowrap no-scrollbar items-center gap-2 p-10  border-b bg-neutral-100"
        >
          {prompts?.map((item: string, idx: number) => {
            const promptColor = (): string => {
              switch (idx) {
                case 0:
                  return 'bg-primary-100';
                case 1:
                  return 'bg-secondary-100';
                case 2:
                  return 'bg-neutral-300';
                case 3:
                  return 'bg-[#5C88DA40]';
                case 4:
                  return 'bg-[#CAFFD640]';
                case 5:
                  return 'bg-[#96962240]';
                default:
                  return 'bg-primary-100';
              }
            };

            return (
              <div
                key={idx}
                className={`flex items-center space-x-2 ${promptColor()} py-2 px-5 rounded-full`}
              >
                <span className="text-sm text-neutral rounded-lg max-w-[200px] truncate">
                  {item}
                </span>
                <PenLine className="cursor-pointer" size={16} />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col flex-1 max-h-[520px] md:max-h-[430px] space-y-3 py-5 px-5 lg:px-20 overflow-y-auto">
            {chatSystem?.map((chat:{ message?: string; sender?: string; }, index:number) => {
                const position = chat?.sender === 'user';
                return (
                  <div
                    key={index}
                    className={`font-work flex ${position ? 'justify-end' : 'items-start'} space-x-2 `}
                  >
                    <div className={`${position ? 'bg-white text-primary-500' : 'bg-primary-500 text-white'} flex items-center justify-center size-10 rounded-full text-lg border border-neutral-300`}>
                      { position ? 
                        (<FaUser />) 
                        :         
                        (<BsStars />)
                      }
                    </div>
                      <span
                        className={`${
                          position ? 'bg-secondary-100' : 'bg-primary-100'} text-neutral p-3 rounded-lg text-xs sm:text-sm md:text-base`}
                      >
                        {chat?.message}
                      </span>
                  </div>
                );
              }
            )}
        </div>
        <div className="relative w-full p-2 flex items-center justify-center bg-white">
          <div className="items-center max-w-[678px] w-full h-14 rounded-2xl py-4 px-8 flex message bg-tint">
            <Input
              type="text"
              placeholder="Please Enter Your Message"
              className="text-xl flex bg-transparent !w-full h-full border-0  rounded-lg outline-0"
            />
            <IoSend className="cursor-pointer text-primary-600" size={20} />
          </div>
            <PopData position={'bottom-10 left-10'} visibility={false}>
              {
                airport?.map((item,index)=>(
                  <button key={index}
                      type='submit'
                      className='flex items-center p-2.5 border-b border-neutral-300'>
                    <Text size="xs" color="text-neutral-500"
                      className="font-work"
                    >
                      {item?.name} ({item?.code})
                    </Text>
                  </button>
                ))
              }
            </PopData>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
