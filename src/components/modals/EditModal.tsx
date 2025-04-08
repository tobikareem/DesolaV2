
import React, { useContext, useEffect} from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useAirports, useDashboardInfo } from '../../hooks/useDashboardInfo';
import { useScroll } from '../../hooks/useSmoothScroll';
import { getPromptColor } from '../../pages/dashboard/chats/RecentPromptsBar';
import { UseEdit } from '../../hooks/useEdit';
import SuggestionPanel from '../../pages/dashboard/chats/SuggestionPanel';
import { useModals } from '../../hooks/useModals';
import { ChatContext } from '../../contexts/ChatContext';
import ChatHistory from '../../pages/dashboard/chats/ChatHistory';
import { useChatInteractions } from '../../hooks/useChatInteractions';
import { Input } from '../ui/InputField';
import { IoSend } from 'react-icons/io5';
import { Modal } from './Modal';
import Calendar from './Calender';
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
  const {handleEditClick, setPromptIndex, editedValue, setEditedValue, promptIndex} = UseEdit();
  const {date, setDate, dateSelect, setDateSelect} = useInput();
  const { preferences} = useDashboardInfo();
  const {showCalendar, setShowCalendar} = useModals()
  const { fetchAirports, airportSuggestions } = useAirports();
  const {showPopData, setShowPopData, searchParam } = useModals();
  const {chatLog} = useContext(ChatContext)
  const {botLoader} = useChatInteractions()
  const chatLoading = false;


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };


  const handleSave = (index: number) => {
    if (prompts) {
      onUpdatePrompt(index, editedValue); 
      setPromptIndex(null);
      setEditedValue('');
    }
  };


  const handleInputFocus = () => {
    if (editedValue.length === 0) return;

    const analysis = editedValue;

    if (analysis.toLowerCase().includes('airport') && preferences?.originAirport) {
      const airport = airportSuggestions.find(airport => airport.code === preferences.originAirport);
      if (airport && analysis.toLowerCase().includes(airport.code.toLowerCase())) {
        setShowPopData(true)
      }
    }

    else if (analysis.toLocaleLowerCase().includes('/')) {
      setShowCalendar(true)
    }

    else if (analysis.toLocaleLowerCase().includes('economy') || analysis.toLocaleLowerCase().includes('business') || analysis.toLocaleLowerCase().includes('first')) {
      setShowPopData(true)
    }

    else if (analysis.toLocaleLowerCase().includes('one way') || analysis.toLocaleLowerCase().includes('round trip') || analysis.toLocaleLowerCase().includes('multi city')) {
      setShowPopData(true)
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


    useEffect(() => {
      fetchAirports();
    }, [fetchAirports]);



  return (
    <div className="relative flex flex-col w-full h-full bg-white justify-between">
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
      <div className='flex flex-col flex-1 overflow-y-auto'>
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
          lastMessage={chatLog[chatLog.length - 1]?.message || ''}
          airportSuggestions={airportSuggestions}
          searchParam={searchParam}
          onSelect={()=>{}}
        />
        <Modal position="absolute" close={()=>setShowCalendar(false)} display={showCalendar}>
          <Calendar Click={handleDateSelect} selectedDate={null} Close={handleSubmitDate}  />
        </Modal>
        
        
    </div>
  );
};

export default EditModal;
