import React, { useEffect, useState } from 'react';
import { LeftPane } from '../../components/LeftSidePane';
import { IoSend } from 'react-icons/io5';
import { PenLine } from 'lucide-react';
import { useRef, WheelEvent } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { Text } from '../../components/TextComp';
import { PopData } from '../../components/ui/PopData';
import useApi from '../../hooks/useApi';
import debounce from 'lodash.debounce';


// interface AirportType {
//   name?: string;
//   city?: string;
//   code?: string;
//   airportType?:string;
// }


const Dashboard: React.FC = () => {

  //  const [airport, setAirport] = React.useState<AirportType[]>([]);
  //  const [Loading, setLoading] = useState<boolean>(true);
  //  const [error , setError] = useState<null>();

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

   const {getData} = useApi();

  const [AirportSearch, setAirportSearch] = useState<string>('');
  
  // const getAirportFn = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getData(`/airports`);
  //     setAirport(response);
  //     console.log('data:',response)
  //   } catch (err) {
  //     console.log(err as Error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(()=>{
    // const debouncedGetAirportSearchFn = debounce(getAirportSearchFn, 800)
    // debouncedGetAirportSearchFn()
  // },[])


    
    // useEffect(() => {
    //   const getAirportSearchFn = async () => {
    //     setLoading(true);
    //     try {
    //       const response = await getData(`/airports`);
    //       setAirport(response);
    //     } catch (err) {
    //       console.log(err as Error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   getAirportSearchFn();
    // }, [AirportSearch, getData]);

    console.log(AirportSearch)

    const HandleAirportSearchFn = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAirportSearch(e.target.value);
    };
    



  return (
    <>
      <div className="flex">
        <div className="relative flex flex-col bg-background border border-neutral-300 w-full lg:w-[60%] h-screen">
          <div
            ref={scrollContainerRef}
            onWheel={handleScroll}
            className="hidden lg:flex h-24  w-full overflow-y-hidden overflow-x-auto whitespace-nowrap no-scrollbar items-center gap-2 p-10  border-b bg-neutral-100"
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

          </div>

          <div className="flex flex-col flex-1 bg-background space-y-4 mt-16 lg:mt-0 p-5 lg:pl-20  overflow-y-auto">
            {
              ChatSystem?.map((item: { id: number; send?: string ; receive?: undefined; } | {id:number; send?: undefined ; receive?: string  }) => {
                const position = item?.send === undefined;
              return(
                <div key={item?.id}
                  className={`font-work flex  ${position ? 'justify-end' : 'items-start'} space-x-2 `}>
                  { item?.send === undefined ? 
                      <FaUser className="bg-white border border-primary-100 text-primary-500 size-7 p-1.5 rounded-full text-lg " />
                      :
                      <BsStars className="bg-primary-500 text-white  size-7 p-1.5 rounded-full text-lg " />
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
          {/* <PopData position={'bottom-10 left-10'}>
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
          </PopData> */}
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