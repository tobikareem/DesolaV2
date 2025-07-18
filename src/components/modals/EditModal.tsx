
import React, { useContext, useEffect, useState} from 'react';
import { useAirports, useDashboardInfo } from '../../hooks/useDashboardInfo';
import { useScroll } from '../../hooks/useSmoothScroll';
import { getPromptColor } from '../../pages/dashboard/chats/PromptColor';
import { useEdit } from '../../hooks/useEdit';
import SuggestionPanel from '../../pages/dashboard/chats/SuggestionPanel';
import { useModals } from '../../hooks/useModals';
import { Input } from '../ui/InputField';
import { IoSend } from 'react-icons/io5';
import { Modal } from './Modal';
import Calendar from './Calendar';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import { toast } from 'react-toastify';
import { useInput } from '../../hooks/useInput';
import { PenLine } from 'lucide-react';
import { EditData } from '../dashboard-sections/edit';
import { Close } from '../ui/Close';
import { ChatContext } from '../../contexts/ChatContext';


interface EditModalProps {
  prompts: string[] | undefined;
  close: () => void;
  onUpdatePrompt: (index: number, value: string) => void;
  onUpdateReturnDate: (date:string) => void;
  onChangeToOneWay: () => void;
  onUpdateSelectedDate: Date | null;
}

const EditModal: React.FC<EditModalProps> = ({
  prompts,
  close,
  onUpdatePrompt,
  onUpdateReturnDate,
  onChangeToOneWay,
  onUpdateSelectedDate,
}) => {

  const {scrollContainerRef, handleScroll} = useScroll();
  const { chatLog } = useContext(ChatContext);
  const {handleEditClick, setPromptIndex, editedValue, 
    setEditedValue, promptIndex, editQuestion, fieldString, setFieldString, setMultiLegValue
  } = useEdit();
  const {date, setDate, setDateSelect} = useInput();
  const {preferences} = useDashboardInfo();
  const {showCalendar, setShowCalendar} = useModals()
  const {fetchAirports, airportSuggestions} = useAirports();
  const {showPopData, setShowPopData, searchParam, setSearchParam } = useModals();
  const [selectedReturnDate, setSelectedReturnDate] = useState<string | null>(null);


  const fields = ['one way', 'round trip', 'multi city'];
  const isChangeFields = fields?.some(field => editQuestion?.toLowerCase().includes(field))  
  const isMultiLegTrip = fieldString?.toLowerCase() === 'round trip' || fieldString?.toLowerCase() === 'multi city';
  const isLastMessageWithDate = chatLog.length > 0 && chatLog[chatLog.length - 1].message.includes('What is your departure date?');

 
  useEffect(()=> { fetchAirports()},[fetchAirports])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEditedValue(value);
    setSearchParam(value);

    if (value.toLowerCase().includes('airport') && editQuestion?.toLowerCase().includes('airport')) {
      setShowPopData(true);
    } else if (value.toLowerCase().includes('-') || value.toLowerCase().includes('/')) {
      setShowCalendar(true);
    } else if (value.toLowerCase().includes('economy') || value.toLowerCase().includes('business') || value.toLowerCase().includes('first')) {
      setShowPopData(true);
    } else if (value.toLowerCase().includes('one way') || value.toLowerCase().includes('round trip') || value.toLowerCase().includes('multi city')) {
      setShowPopData(true);
    }
  
  };

  const analysis = editedValue;

  const handleInputFocus = () => {
    if (editedValue.trim().length === 0) return null;
  
    const lowerCaseAnalysis = analysis.toLowerCase();
  
    if (
      ( editQuestion && lowerCaseAnalysis.includes('airport')) &&
      airportSuggestions.some(
        airport =>
          airport.code === preferences?.originAirport &&
          lowerCaseAnalysis.includes(airport.code.toLowerCase())
      )
    ) {
      setShowPopData(true);
      return;
    }

    if (['-', '/'].some((char) => lowerCaseAnalysis.includes(char))) {
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
      'round trip',
      'multi city',
    ];

    if (editQuestion && keywords.some(keyword => editQuestion.toLowerCase().includes(keyword) && lowerCaseAnalysis.includes(keyword))) {
      setShowPopData(true);
    }
  };

  const handleDateSelect = (arg: DateSelectArg) => {
    if(!arg.start) return;
    const formattedDate =arg.start ? `${arg.start.getFullYear()}-${String(arg.start.getMonth() + 1).padStart(2, '0')}-${String(arg.start.getDate()).padStart(2, '0')}`
    : '';
    setEditedValue(formattedDate || '');
    setDate(arg.start);
     if (isMultiLegTrip) {
      setSelectedReturnDate(formattedDate);
    }
  };
  
  const updateDateSelect = (date: Date | null) => {
    setDateSelect(date);
  };

  const handleSubmitDate = () => {
    if (editedValue.length === 0) {
      toast.warning('Pick a date');
      return;
    }
    
    if (isMultiLegTrip && selectedReturnDate && onUpdateSelectedDate) {
      const returnDate = new Date(selectedReturnDate)
      returnDate.setHours(0, 0, 0, 0);
      const departureDate = new Date(onUpdateSelectedDate)
      departureDate.setHours(0, 0, 0, 0);
      if (departureDate.getTime() >= returnDate.getTime()) {
        toast.error('Return date should be after departure date');
        return;
      }
      onUpdateReturnDate(selectedReturnDate);
      setFieldString(null);
      toast.success('Return date updated');
      close();
      return;
    }

    if (promptIndex !== null) {
      handleSave(promptIndex);
    }
    updateDateSelect(date);
    setShowCalendar(false);
  };

  const handleSave = (index: number) => {
    if (!editedValue.trim()) {
      toast.warning('Input cannot be empty');
      return;
    }
    if (prompts) {

      const dateIndices = prompts
        .map((item, idx) => ({ item, idx }))
        .filter(({ item }) => /^\d{4}-\d{2}-\d{2}$/.test(item));

      if (dateIndices.length >= 2 && index === dateIndices[1].idx) {
        const newDeparture = new Date(editedValue);
        const returnDate = new Date(prompts[dateIndices[1].idx]);
        newDeparture.setHours(0,0,0,0);
        returnDate.setHours(0,0,0,0);
        if (newDeparture.getTime() >= returnDate.getTime()) {
          toast.error('Departure date must be before return date');
          return;
        }
      }
      onUpdatePrompt(index, editedValue); 
      setPromptIndex(null);
      setShowPopData(false);
      setEditedValue('');
      if (
        isChangeFields && !isLastMessageWithDate &&
        editedValue.toLowerCase() !== 'one way' &&
        (editedValue.toLowerCase() === 'round trip' || editedValue.toLowerCase() === 'multi city')
      ) {
        setFieldString(editedValue);
        setMultiLegValue(editedValue);
        setShowCalendar(true);
      } else {
        onChangeToOneWay()
        setMultiLegValue(editedValue);
        close();
      }
    }
  };

  return (
    <div className="relative flex flex-col w-full h-full bg-white justify-between rounded-2xl">
      <Close Action={() => {close(); setFieldString(null)}} />
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
              <PenLine className="cursor-pointer" size={16} />
            </div>
        ))}
      </div>

      <EditData message={editQuestion} field={fieldString} />
      
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
      { showPopData &&
        <SuggestionPanel
          visible={showPopData}
          position="bottom-30 lg:left-[12%]"
          lastMessage={''}
          entryMessage={editedValue}
          editContent={true}
          airportSuggestions={airportSuggestions}
          searchParam={searchParam}
          onSelect={(value:string)=>{setEditedValue(value); setShowPopData(false);}}
        />
      }
      { showCalendar &&
        <Modal position="absolute" close={()=>setShowCalendar(false)} display={showCalendar} className=''>
          <Calendar Click={handleDateSelect} selectedDate={null} Close={handleSubmitDate}  />
        </Modal>
      }
    </div>
  );
};
export default EditModal;