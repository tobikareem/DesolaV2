import React from 'react';
import { LeftPane } from '../../components/LeftSidePane';
import { IoSend } from 'react-icons/io5';
import { PenLine } from 'lucide-react';
import { useRef, WheelEvent } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';


const Dashboard: React.FC = () => {
   const scrollContainerRef = useRef<HTMLDivElement>(null);

   const handleScroll = (event: WheelEvent<HTMLDivElement>) => {
     event.preventDefault();
     if (scrollContainerRef.current) {
       scrollContainerRef.current.scrollLeft += event.deltaY; 
     }
   };

   const Airports:string[] = [
    'Ikeja, Murtala Muhammed International Airport (MMIA)',
    'Seattle-Tacoma International Airport',
    '04/25/2025',
    '06/02/2025',
    'One way',
   ]

   const ChatSystem = [
      {
        id:1,
        send:'Hi, Oluwatobi, Where are you flying from?',
      },
      {
        id:2,
        receive:'Murtala Muhammed International Airport (MMIA)',
      },
      {
        id:3,
        send:'What`s your destination?...'
      },
      {
        id:4,
        receive:'Seattle-Tacoma International Airport (SEA)',
      },
      {
        id:5,
        send:'What`s your departure date? (MM/DD/YY)',
      },
      {
        id:6,
        receive:'04/25/2025',
      },
      {
        id:7,
        send:'Do you have a returning date? (MM/DD/YYYY)',
      },
      {
        id:8,
        receive:'08/25/2025',
      },
      {
        id:9,
        send:'Select travel Route..',
      },


   ]

  return (
    <>
      <div className="flex">
        <div className="flex flex-col bg-background border border-neutral-300 w-full lg:w-[60%] h-screen">
          <div
            ref={scrollContainerRef}
            onWheel={handleScroll}
            className="hidden lg:flex h-24 w-full overflow-y-hidden overflow-x-auto whitespace-nowrap no-scrollbar items-center gap-2 p-10 border-b bg-neutral-100"
          >
            {
              Airports?.map((item:string,idx:number)=>(
                <div key={idx}
                  className="flex items-center space-x-2 bg-primary-100 py-2 px-5 rounded-full">
                    <span className="text-sm text-neutral rounded-lg max-w-[200px] truncate">
                      {item}
                    </span>
                  <PenLine className="cursor-pointer" size={16} />
                </div>
              ))
            }

            {/* <div className="flex items-center space-x-2 bg-secondary-100 py-2 px-5 rounded-full">
              <span className="text-sm text-neutral rounded-lg max-w-[200px] truncate">
                Seattle-Tacoma International Airport (SEA)
              </span>
              <PenLine className="cursor-pointer" size={16} />
            </div>

            <div className="flex items-center space-x-2 bg-neutral-300 py-2 px-5  rounded-full">
              <span className="text-sm text-neutral rounded-lg max-w-[200px] truncate">
                04/25/2025
              </span>
              <PenLine className="cursor-pointer" size={16} />
            </div>
            <div className="flex items-center space-x-2 bg-primary-100 py-2 px-5  rounded-full">
              <span className=" text-sm text-neutral rounded-lg max-w-[200px] truncate">
                06/25/2025
              </span>
              <PenLine className="cursor-pointer" size={16} />
            </div>
            <div className="flex items-center space-x-2 bg-secondary-100 py-2 px-5  rounded-full">
              <span className=" text-sm text-neutral rounded-lg max-w-[200px] truncate">
                One way
              </span>
              <PenLine className="cursor-pointer" size={16} />
            </div> */}
          </div>

          <div className="flex flex-col flex-1 bg-background space-y-4 mt-14 lg:mt-0 p-5  overflow-y-auto">
            {
              ChatSystem?.map((item: { id: number; send?: string ; receive?: undefined; } | {id:number; send?: undefined ; receive?: string  }) => {
                const position = item?.send === undefined;
              return(
                <div key={item?.id}
                  className={`font-work flex items-center ${position ? 'items-end justify-end' : 'items-start'} space-x-2 `}>
                  { item?.send === undefined ? 
                      <FaUser className="bg-white border border-primary-100 text-primary-500 h-10 w-10 rounded-full p-2 text-4xl" />
                      :
                      <BsStars className="bg-primary-500 text-white h-10 w-10 rounded-full p-2 text-4xl" />
                  }
                  <span className={`${position ? 'bg-secondary-100' : 'bg-primary-100'} text-neutral p-3 rounded-lg`}>
                    {item?.send ?? item?.receive}
                  </span>
                </div>
              )})
            }
            
          </div>
          <div className="w-full p-2 flex items-center justify-center  bg-white border-t h-30">
            <div className="items-center max-w-[678px] w-full rounded-2xl py-4 px-8 flex message bg-gray-100">
              <input
                type="text"
                placeholder="Please Enter Your Message"
                className="text-xl flex-grow bg-transparent border-0  rounded-lg outline-0"
              />
              <IoSend className="cursor-pointer text-neutral-400" size={24} />
            </div>
          </div>
        </div>

        <LeftPane
          departure="Ikeja, Murtala Muhammed International Airport (MMIA)"
          destination="Seattle-Tacoma International Airport (SEA)"
          departureDate="04/25/2025"
          returnDate="06/25/2025"
          travelRoute="Multi-city"
          flightClass="Economy"
        />
      </div>
    </>
  );
};

export default Dashboard