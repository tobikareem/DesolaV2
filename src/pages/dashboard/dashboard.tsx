import { PenLine } from 'lucide-react';
import React, { useContext, useEffect, useRef, useState, WheelEvent } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { Input } from '../../components/ui/InputField';
import EditModal from '../../components/modals/EditModal';
import { Modal } from '../../components/modals/Modal';
import { RightPane } from './sections/RightPanel';
import { useAuthInfo } from '../../hooks/useAuthInfo';
import { PopData } from '../../components/layout/PopData';
import { Text } from '../../components/ui/TextComp';
import { useAirports, useRoutes } from '../../hooks/useDashboardInfo';
import { useDebounce } from '../../hooks/useDebounce';
import MobileRender from '../../components/dashboard-sections/mobileRender';
import Calendar from '../../components/modals/Calender';
import ChatBotResponseHandler, { ChatProp } from '../../utils/ChatBotHandler';
import { GiBoatPropeller } from 'react-icons/gi';
import { GlobalContext } from '../../hooks/globalContext';




const Dashboard: React.FC = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showFlightModal, setShowFlightModal] = useState<boolean>(false);
  const [showPopData, setShowPopData] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const debounce = useDebounce();
  const { userName, isAuthenticated,  } = useAuthInfo();
  const {fetchAirports, airportSuggestions} = useAirports();
  const {fetchRoutes, RouteData} = useRoutes();
  const [botResponse, setBotResponse] = useState<boolean>(false);
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const {RecentPrompts,setRecentPrompts} = useContext(GlobalContext);

  const [chatLog, setChatLog] = useState<ChatProp[]>([
    {
      message: `Hi ${isAuthenticated ? userName?.split(' ')[0] : "Anonymous"}, Which airport will you be flying from?`,
      sender: 'bot'
    }
  ]);

  useEffect(()=> {
    fetchAirports()
  },[])

  


  // console.log('Route:', RouteData)

  const [searchParam, setSearchParam] = useState<string>('');
  const airportSuggestionFilter = searchParam.trim() !== '' ?  airportSuggestions?.filter((item) => {
      return(item?.name.toLowerCase().includes(searchParam.toLowerCase()) || item?.city.toLowerCase().includes(searchParam.toLowerCase()));
  }):[];
 
  
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleOpenCalendar = () => {
    if(chatLog.length == 5 || chatLog.length == 7){
      setShowCalendar(true);
    }
  };

  const handleCloseCalendar =()=> {
    setShowCalendar(false);
  };

  const toggleFlightModal = () => {
    setShowFlightModal((prevState) => !prevState)
  }

 
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleScroll = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += event.deltaY;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage =()=> {
    const chatMessage = inputValue;
    setBotResponse(true);
    setChatLog((prevChatLog) => [...prevChatLog,  { message: inputValue, sender: 'user'}]);
    setTimeout(()=> {
      const botResponse = ChatBotResponseHandler(chatMessage);
      if (botResponse) {
        setChatLog((prevChatLog) => [...prevChatLog , {message: botResponse, sender:'bot'}]);
      }
      setBotResponse(false)
    },2000)
    setInputValue('')
  }

  const saveTosessionStorage = (key: string, value: string[]) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const handlePromptUpdate = () => {
    const newPrompt = inputValue?.trim();
    if (newPrompt && !(RecentPrompts ?? []).includes(newPrompt)) {
      setRecentPrompts((prevRecentPrompts) => {
        const updatedPrompts = [...prevRecentPrompts, newPrompt];
        saveTosessionStorage('RecentPrompts', updatedPrompts);
        return updatedPrompts;
      });
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue?.length >= 4 ) {
      handlePromptUpdate();
      handleSendMessage();
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

  const handleOpenPopData =()=> {
      if(chatLog[chatLog.length - 1]?.message?.includes('flying') 
        || chatLog[chatLog.length - 1]?.message?.includes('destination')
        || chatLog[chatLog.length - 1]?.message?.includes('routes')
      ){
        setShowPopData(true)
      }
  }

  const handleClosePopData =()=> {
    setShowPopData(false)
  }

  
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
                    return 'bg-[#5C88DA60]';
                  case 4:
                    return 'bg-[#CAFFD640]';
                  case 5:
                    return 'bg-[#96962240]';
                  case 6:
                    return 'bg-[#FFC097]';
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

          <div className={`flex flex-col flex-1 bg-background space-y-6 mt-16 lg:mt-0 p-5 lg:pl-20  ${chatLoading ? '':'overflow-y-auto'}`}>
            { chatLoading ? <div className='flex w-full h-full items-center justify-center text-3xl animate-spin text-primary-600 pointer-events-none'><GiBoatPropeller /></div>
              :
              chatLog?.map((chat:{ message?: string; sender?: string; }, index:number) => {
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
                        { chat?.sender == 'bot' && index === chatLog.length - 1 && botResponse ? <span className='text-3xl text-neutral-500 animate-pulse duration-75'>...</span> : chat?.message}
                      </span>
                  </div>
                );
              }
            )
          }
          </div>
          <div className="relative w-full p-2 flex items-center justify-center  bg-white border-t h-30">
            <div className="items-center max-w-[678px] w-full rounded-2xl py-4 px-8 flex message bg-tint">
              <Input
                value={inputValue}
                onChange={(e)=>{handleInputChange(e); 
                  debounce(() => setSearchParam(e.target.value)); 
                  handleOpenPopData() 
                }}
                onKeyDown={handleKeyPress}
                onFocus={()=> {handleOpenPopData(); handleOpenCalendar() }}
                type="text"
                placeholder="Please Enter Your Message"
                className="text-xl flex-grow bg-transparent focus:bg-transparent border-0  rounded-lg outline-0"
              />
              <IoSend
                onClick={()=>{ if (inputValue.length >= 4) {handlePromptUpdate(); handleSendMessage(); handleClosePopData()}}}
                className={`${inputValue.length >= 4 ? 'text-primary-600' : 'text-neutral-400'} cursor-pointer`}
                size={24}
              />
            </div>
            <PopData visibility={showPopData} position={'bottom-30 lg:left-[12%]'}>
              {  chatLog[chatLog.length - 1]?.message?.includes('route') ? 
                  (['Round Trip','Two way Trip','Multi city'].map((route, index:number) => (
                    <button
                      key={index}
                      type="submit"
                      className="flex items-center p-3 border-b border-neutral-300"
                      onClick={() => {
                        setInputValue(`${route}`);
                        handleClosePopData()
                      }}
                    >
                      <Text
                        size="xs"
                        color="text-neutral-500 text-left"
                        className="font-work"
                      >
                        {route}
                      </Text>
                    </button>)))
                :
                  (airportSuggestionFilter?.slice(0,6)?.map((airport, index:number) => (
                    <button
                      key={index}
                      type="submit"
                      className="flex items-center p-3 border-b border-neutral-300"
                      onClick={() => {
                        setInputValue(`${airport?.name} (${airport?.code})`);
                        handleClosePopData()
                      }}
                    >
                      <Text
                        size="xs"
                        color="text-neutral-500 text-left"
                        className="font-work"
                      >
                        {airport?.name} ({airport?.code})
                      </Text>
                    </button>
                  )))
              }
            </PopData>
          </div>
          <Modal close={toggleModal} display={showModal}>
            <EditModal
              prompts={RecentPrompts}
              chatSystem={chatLog}
              airport={[]}
              close={toggleModal}
            />
          </Modal>
          <Modal position="absolute" close={handleCloseCalendar} display={showCalendar}>
            <Calendar />
          </Modal>
          {/* mobile view */}
          <MobileRender/>
          
        </div>
        <RightPane />
      </div>
    </>
  );
};

export default Dashboard;
