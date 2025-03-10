import React, { useEffect, useState } from 'react';
import { RightPane } from './sections/RightPanel';
import { IoSend } from 'react-icons/io5';
import { PenLine } from 'lucide-react';
import { useRef, WheelEvent } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { Text } from '../../components/TextComp';
import { PopData } from '../../components/ui/PopData';
import useApi from '../../hooks/useApi';
import debounce from 'lodash.debounce';
import { Modal } from '../../components/modals/Modal';
import { Input } from '../../components/InputField';
import EditModal from '../../components/modals/EditModal';
import { useAsyncError } from 'react-router';

// interface AirportType {
//   name?: string;
//   city?: string;
//   code?: string;
//   airportType?:string;
// }

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showPopData, setShowPopData] = useState<boolean>(true);
  const [RecentPrompts, setRecentPrompts] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  //  const [airport, setAirport] = React.useState<AirportType[]>([]);
  //  const [Loading, setLoading] = useState<boolean>(true);
  //  const [error , setError] = useState<null>();

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const toggleCalendar = () => {
    setShowCalendar((prevState) => !prevState);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY;
    }
  };

  // const RecentPrompts:string[] = [
  // 'Ikeja, Murtala Muhammed International Airport (MMIA)',
  // 'Seattle-Tacoma International Airport',
  // '04/25/2025',
  // '06/02/2025',
  // 'One way',
  // ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const saveTosessionStorage = (key: string, value: string[]) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const handlePromptUpdate = () => {
    const newPrompt = inputValue?.trim();
    if (newPrompt && !(RecentPrompts ?? []).includes(newPrompt)) {
      setRecentPrompts((prevRecentPrompts) => {
        const updatedPrompts = [...prevRecentPrompts, newPrompt];
        saveTosessionStorage('RecentPrompts', updatedPrompts);
        console.log('updatedPrompts:', updatedPrompts);
        return updatedPrompts;
      });
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePromptUpdate();
    }
  };

  useEffect(() => {
    const storedPrompts = sessionStorage.getItem('RecentPrompts');
    if (storedPrompts) {
      const parsedPrompts = JSON.parse(storedPrompts);
      setRecentPrompts(parsedPrompts);
      setRecentPrompts((prevRecentPrompts) => {
        const updatedPrompts = [...prevRecentPrompts];
        parsedPrompts.forEach((prompt: string) => {
          if (!(updatedPrompts ?? []).includes(prompt)) {
            updatedPrompts.push(prompt);
          }
        });
        return updatedPrompts;
      });
    }
  }, []);

  const ChatSystem = [
    {
      id: 1,
      send: 'Hi, Oluwatobi, Where are you flying from?',
    },
    {
      id: 2,
      receive: 'Murtala Muhammed International Airport (MMIA)',
    },
    {
      id: 3,
      send: 'What`s your destination?...',
    },
    {
      id: 4,
      receive: 'Seattle-Tacoma International Airport (SEA)',
    },
    {
      id: 5,
      send: 'What`s your departure date? (MM/DD/YY)',
    },
    {
      id: 6,
      receive: '04/25/2025',
    },
    {
      id: 7,
      send: 'Do you have a returning date? (MM/DD/YYYY)',
    },
    {
      id: 8,
      receive: '08/25/2025',
    },
    {
      id: 9,
      send: 'Select travel Route..',
    },
  ];

  const airport = [
    { id: 1, name: 'Murtala Muhammed International Airport', code: 'MMIA' },
    { id: 2, name: 'Seattle-Tacoma International Airport', code: 'SEA' },
    { id: 3, name: 'Los Angeles International Airport', code: 'LAX' },
  ];

  // const {getData} = useApi();

  // const [AirportSearch, setAirportSearch] = useState<string>('');

  // const getAirportFn = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getData(`/airport`);
  //     setAirport(response);
  //     console.log('data:',response)
  //   } catch (err) {
  //     console.log(err as Error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(()=>{
  //   const debouncedGetAirportSearchFn = debounce(getAirportFn, 500)
  //   debouncedGetAirportSearchFn()
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

  // const HandleAirportSearchFn = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setAirportSearch(e.target.value);
  // };

  return (
    <>
      <div className="flex">
        <div className="relative flex flex-col bg-background border border-neutral-300 w-full lg:w-[60%] h-screen">
          <div
            ref={scrollContainerRef}
            onWheel={handleScroll}
            className="hidden lg:flex h-24  w-full overflow-y-hidden overflow-x-auto whitespace-nowrap no-scrollbar items-center gap-2 p-10  border-b bg-neutral-100"
          >
            {RecentPrompts?.map((item: string, idx: number) => {
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
                  case 6:
                    return 'bg-primary-100';
                  case 7:
                    return 'bg-secondary-100';
                  case 8:
                    return 'bg-neutral-300';
                  case 9:
                    return 'bg-[#5C88DA80]';

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
                  <PenLine
                    onClick={() => {
                      toggleModal();
                    }}
                    className="cursor-pointer"
                    size={16}
                  />
                </div>
              );
            })}
          </div>

          <div className="flex flex-col flex-1 bg-background space-y-4 mt-16 lg:mt-0 p-5 lg:pl-20  overflow-y-auto">
            {ChatSystem?.map(
              (
                item:
                  | { id: number; send?: string; receive?: undefined }
                  | { id: number; send?: undefined; receive?: string }
              ) => {
                const position = item?.send === undefined;
                return (
                  <div
                    key={item?.id}
                    className={`font-work flex  ${
                      position ? 'justify-end' : 'items-start'
                    } space-x-2 `}
                  >
                    {item?.send === undefined ? (
                      <FaUser className="bg-white border border-primary-100 text-primary-500 size-7 p-1.5 rounded-full text-lg " />
                    ) : (
                      <BsStars className="bg-primary-500 text-white  size-7 p-1.5 rounded-full text-lg " />
                    )}
                    <span
                      className={`${
                        position ? 'bg-secondary-100' : 'bg-primary-100'
                      } text-neutral p-3 rounded-lg`}
                    >
                      {item?.send ?? item?.receive}
                    </span>
                  </div>
                );
              }
            )}
          </div>
          <div className="relative w-full p-2 flex items-center justify-center  bg-white border-t h-30">
            <div className="items-center max-w-[678px] w-full rounded-2xl py-4 px-8 flex message bg-tint">
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                type="text"
                placeholder="Please Enter Your Message"
                className="text-xl flex-grow bg-transparent border-0  rounded-lg outline-0"
              />
              <IoSend
                onClick={handlePromptUpdate}
                className="cursor-pointer text-neutral-400"
                size={24}
              />
            </div>
            <PopData visibility={showPopData} position={'bottom-30 left-30'}>
              {airport?.map((item, index) => (
                <button
                  key={index}
                  type="submit"
                  className="flex items-center p-3 border-b border-neutral-300"
                  onClick={() => {
                    setInputValue(item?.name);
                  }}
                >
                  <Text
                    size="xs"
                    color="text-neutral-500 text-left"
                    className="font-work"
                  >
                    {item?.name} ({item?.code})
                  </Text>
                </button>
              ))}
            </PopData>
          </div>

          <Modal close={toggleModal} display={showModal}>
            <EditModal
              prompts={RecentPrompts}
              chatSystem={ChatSystem}
              airport={[]}
              close={toggleModal}
            />
          </Modal>

          <Modal
            position="absolute"
            close={toggleCalendar}
            display={showCalendar}
          >
            {}
          </Modal>
        </div>

        <RightPane />
      </div>
    </>
  );
};

export default Dashboard;
