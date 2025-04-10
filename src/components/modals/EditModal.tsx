
import React, { useContext, useEffect, useRef} from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useAirports, useDashboardInfo } from '../../hooks/useDashboardInfo';
import { useScroll } from '../../hooks/useSmoothScroll';
import { getPromptColor } from '../../pages/dashboard/chats/RecentPromptsBar';
import { useEdit } from '../../hooks/useEdit';
import SuggestionPanel from '../../pages/dashboard/chats/SuggestionPanel';
import { useModals } from '../../hooks/useModals';
import { ChatContext } from '../../contexts/ChatContext';
import ChatHistory from '../../pages/dashboard/chats/ChatHistory';
import { useChatInteractions } from '../../hooks/useChatInteractions';
import { Input } from '../ui/InputField';
import { IoSend } from 'react-icons/io5';
import { Modal } from './Modal';
import Calendar from './Calendar';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { toast } from 'react-toastify';
import { useInput } from '../../hooks/useInput';

interface EditModalProps {
  prompts: string[] | undefined;
  close: () => void;
  onUpdatePrompt: (index: number, value: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  prompts,
  close,
  onUpdatePrompt,
}) => {

  const {scrollContainerRef, handleScroll} = useScroll();
  const {handleEditClick, setPromptIndex, editedValue, setEditedValue, promptIndex} = useEdit();
  const {date, setDate, setDateSelect} = useInput();
  const { preferences} = useDashboardInfo();
  const {showCalendar, setShowCalendar} = useModals()
  const { fetchAirports,airportSuggestions } = useAirports();
  const {showPopData, setShowPopData, searchParam, setSearchParam } = useModals();
  const {chatLog} = useContext(ChatContext)
  const {botLoader} = useChatInteractions()
  const chatLoading = false;

  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
      if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
  }, [chatLog]);

  useEffect(()=> { fetchAirports()},[fetchAirports])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEditedValue(value);
    setSearchParam(value);

    if (value.toLowerCase().includes('airport')) {
      setShowPopData(true);
    } else if (value.toLowerCase().includes('/')) {
      setShowCalendar(true);
    } else if (value.toLowerCase().includes('economy') || value.toLowerCase().includes('business') || value.toLowerCase().includes('first')) {
      setShowPopData(true);
    } else if (value.toLowerCase().includes('one way') || value.toLowerCase().includes('round trip') || value.toLowerCase().includes('multi city')) {
      setShowPopData(true);
    }
  
  };

  const analysis = editedValue;

  const handleInputFocus = () => {
    if (editedValue.trim().length === 0) return;
  
    const lowerCaseAnalysis = analysis.toLowerCase();
  
    if (lowerCaseAnalysis.includes('airport')) {
      const airport = airportSuggestions.find(
        airport => airport.code === preferences?.originAirport
      );
      if (airport && lowerCaseAnalysis.includes(airport.code.toLowerCase())) {
        setShowPopData(true);
        return;
      }
    }

    if (lowerCaseAnalysis.includes('/')) {
      setShowCalendar(true);
      return; 
    }
  
    const keywords = [
      'economy',
      'business class',
      'first class',
      'premium economy',
      'one way',
      'trip',
      'city',
    ];
  
    if (keywords.some(keyword => lowerCaseAnalysis.includes(keyword))) {
      setShowPopData(true);
    }
  };

  const handleDateSelect = (arg: DateSelectArg) => {
      const formattedDate = arg.start?.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      setEditedValue(formattedDate || '');
      setDate(arg.start);
    };
  
    const updateDateSelect = (date: Date | null) => {
      setDateSelect(date);
    };
  
    const handleSubmitDate = () => {
      if (editedValue.length !== 0 && promptIndex !== null) {
        handleSave(promptIndex);
        updateDateSelect(date);
        setShowCalendar(false);
      } else {
        toast.warning('Pick a date');
      }
    };

    const handleSave = (index: number) => {
      if (!editedValue.trim()) {
        toast.warning('Input cannot be empty');
        return;
      }
      if (prompts) {
        onUpdatePrompt(index, editedValue); 
        setPromptIndex(null);
        setShowPopData(false);
        setEditedValue('');
      }
    };

  return (
    <div className="relative flex flex-col w-full h-full bg-white justify-between rounded-2xl">
      <IoMdCloseCircleOutline
        onClick={close}
        className="text-2xl text-black self-end mt-2 mr-2 cursor-pointer"
      />
      <div
        ref={scrollContainerRef}
        onWheel={handleScroll}
        className="flex w-full overflow-x-auto whitespace-nowrap no-scrollbar items-center gap-2 p-5 border-b bg-neutral-100"
      >
        {prompts?.map((item, idx) => (
            <div
                key={idx}
                onClick={() => handleEditClick(idx,item)}
                className={`flex items-center space-x-2 ${getPromptColor(idx)} py-2 px-4 lg:px-5 rounded-full cursor-pointer`}
            >
                <span className="text-sm text-neutral rounded-lg max-w-[200px] truncate">
                    {item}
                </span>
            </div>
        ))}
      </div>
      <div ref={chatContainerRef}
        className='flex flex-col flex-1 overflow-y-auto'>
        <ChatHistory chatLog={chatLog} botLoader={botLoader} isLoading={chatLoading}/>
      </div>
      
      <div className="relative w-full p-2 flex items-center justify-center bg-white border-t h-30">
        <div className="items-center max-w-[678px] w-full rounded-2xl py-4 px-4 lg:px-8 flex message bg-tint">
          <Input
              value={editedValue}
              onChange={handleInputChange}
              onKeyDown={(e)=> {if(e.key === 'Enter' && promptIndex !== null) handleSave(promptIndex)}}
              onFocus={handleInputFocus}
              type="text"
              placeholder="Please Enter Your Message"
              className="text-xs md:text-sm lg:text-xl flex-grow bg-transparent focus:bg-transparent border-0 rounded-lg outline-0"
          />
          <IoSend
              onClick={() => promptIndex !== null && handleSave(promptIndex)}
              className={`${editedValue.length >= 4 ? 'text-primary-600' : 'text-neutral-400'} cursor-pointer`}
              size={24}
          />
        </div>
      </div>

        <SuggestionPanel
          visible={showPopData}
          position="bottom-30 lg:left-[12%]"
          lastMessage={''}
          entryMessage={editedValue}
          editContent={true}
          airportSuggestions={airportSuggestions}
          searchParam={searchParam}
          onSelect={(value:string)=>{setEditedValue(value);
          setShowPopData(false);
        }}
        />
        <Modal position="absolute" close={()=>setShowCalendar(false)} display={showCalendar} className='backdrop-blur-md'>
          <Calendar Click={handleDateSelect} selectedDate={null} Close={handleSubmitDate}  />
        </Modal>
        
        
    </div>
  );
};

export default EditModal;
