
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MobileRender from "../../../components/dashboard-sections/mobileRender";
import Calendar from '../../../components/modals/Calendar';
import EditModal from "../../../components/modals/EditModal";
import { Modal } from "../../../components/modals/Modal";
import { Btn } from "../../../components/ui/Button";
import { ChatContext } from "../../../contexts/ChatContext";
import { UIContext } from "../../../contexts/UIContext";
import { useAuthInfo } from "../../../hooks/useAuthInfo";
import { useAirports, useDashboardInfo, useFlightSearch } from "../../../hooks/useDashboardInfo";
import { useDebounce } from "../../../hooks/useDebounce";
import { ChatBotResponseHandler, resetChatBot } from "../../../utils/ChatBotHandler";
import { RightPanel } from "../sections/RightPanel";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import RecentPromptsBar from "./RecentPromptsBar";
import SuggestionPanel from "./SuggestionPanel";
import { useModals } from "../../../hooks/useModals";
import { useInput } from "../../../hooks/useInput";
import { DateSelectArg } from "@fullcalendar/core/index.js";
import { PenLine } from "lucide-react";

const analyzeLastMessage = (message?: string) => {
  if (!message) return {
    needsDate: false,
    needsLocation: false,
    needsClass: false,
    needsRoute: false
  };

  const lowerMessage = message.toLowerCase();
  return {
    needsDate: lowerMessage.includes('date'),
    needsLocation: lowerMessage.includes('flying') ||
      lowerMessage.includes('destination') ||
      lowerMessage.includes('airport') ||
      lowerMessage.includes('from') ||
      lowerMessage.includes('to'),
    needsClass: lowerMessage.includes('class'),
    needsRoute: lowerMessage.includes('route') || lowerMessage.includes('way')
  };
};

const Dashboard: React.FC = () => {
  // Context hooks
  const { chatLog, setChatLog, recentPrompts, setRecentPrompts } = useContext(ChatContext);
  const { toggleModal } = useContext(UIContext);
  // Custom hooks
  const { showEditModal, setShowEditModal, showCalendar, setShowCalendar, showPopData, setShowPopData, setSearchParam, searchParam } = useModals();
  const {inputValue, setInputValue, dateSelect, setDateSelect, setDate, date} = useInput();
  const { fetchAirports, airportSuggestions } = useAirports();
  const { preferences, loadPreferences } = useDashboardInfo();
  const {FlightSearchFn} = useFlightSearch();
  const debounce = useDebounce();
  // Local UI state
  const [botLoader, setBotLoader] = useState(false);
  const [chatLoading] = useState(false);
  const { isAuthenticated } = useAuthInfo();
  const loadedRef = useRef(false);

  useEffect(() => {
    fetchAirports();
    resetChatBot();

    if (isAuthenticated && !loadedRef.current) {
      loadPreferences();
      loadedRef.current = true;
    }

    if (!isAuthenticated) {
      loadedRef.current = false;
    }

  }, [fetchAirports, loadPreferences, isAuthenticated]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const lastBotMessage = [...chatLog].reverse().find(msg => msg.sender === 'bot')?.message;
    if (lastBotMessage && (
      lastBotMessage.toLowerCase().includes('destination') ||
      lastBotMessage.toLowerCase().includes('airport') ||
      lastBotMessage.toLowerCase().includes('flying from')
    )) {
      setShowPopData(true);
    }

    if (value.length <= 3) {
      setSearchParam(value);
    } else {
      debounce(() => setSearchParam(value));
    }
  };

  const handleSendMessage = () => {
    if (inputValue.length < 4) return;

    const newChatLog = [
      ...chatLog,
      { message: inputValue, sender: 'user' as const }
    ];
    setChatLog(newChatLog);

    const newPrompts = [inputValue, ...recentPrompts].slice(0, 10); // Keep only the 10 most recent
    setRecentPrompts(newPrompts);


    setBotLoader(true);
    setTimeout(() => {
      const botResponseMessage = ChatBotResponseHandler(inputValue);

      const botResponse = {
        message: botResponseMessage,
        sender: 'bot' as const
      };
      setChatLog([...newChatLog, botResponse]);
      setBotLoader(false);
    }, 1000);

    setInputValue('');
    setShowPopData(false);

  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.length >= 4) {
      handleSendMessage();
    }
  };

  const toggleEditModal = () => setShowEditModal(prev => !prev);
  const handleClosePopData = () => setShowPopData(false);
  const handleCloseCalendar = () => setShowCalendar(false);

  const handleDateSelect = (arg: DateSelectArg) => {
    const formattedDate = arg.start?.toISOString().split('T')[0]; 
    setInputValue(formattedDate || '');
    setDate(arg.start);
  };

  const updateDateSelect = () => {
    setDateSelect(date);
  };


  const handleSubmitDate = () => {
    if (inputValue.length !== 0) {
      handleSendMessage();
      updateDateSelect();
      handleCloseCalendar();
    } else {
      toast.error('Pick a date');
    }
  };



  const handleSelectSuggestion = (value: string) => {
    setInputValue(value);
    handleClosePopData();
  };

  const handleInputFocus = () => {
    if (chatLog.length === 0) return;

    const lastBotMessage = [...chatLog].reverse().find(msg => msg.sender === 'bot')?.message;

    if (!lastBotMessage) return;

    const analysis = analyzeLastMessage(lastBotMessage);

    if (lastBotMessage.toLowerCase().includes('flying from') && preferences?.originAirport) {
      const airport = airportSuggestions.find(airport => airport.code === preferences.originAirport);
      if (airport) {
        // setInputValue(`${airport?.name} (${airport?.code})`);
      }
    } else if (lastBotMessage.toLowerCase().includes('destination') && preferences?.destinationAirport) {
      const airport = airportSuggestions.find(airport => airport.code === preferences.destinationAirport);
      if (airport) {
        // setInputValue(`${airport?.name} (${airport?.code})`);
      }
    } else if (analysis.needsClass && lastBotMessage.toLowerCase().includes('class') && preferences?.travelClass) {
      // setInputValue(preferences.travelClass);
    }


    if (analysis.needsDate) {
      setShowCalendar(true);
    }

    if (analysis.needsLocation || lastBotMessage.includes('destination') ||
      analysis.needsClass || analysis.needsRoute) {
      setShowPopData(true);
    }

  };

  const handleUpdatePrompt = (index: number, newValue: string) => {
    const updatedPrompts = [...recentPrompts];
    const oldValue = updatedPrompts[index];
    updatedPrompts[index] = newValue;
    setRecentPrompts(updatedPrompts);

    const updatedChatLog = chatLog.map((chat) =>
      chat.message === oldValue ? { ...chat, message: newValue } : chat
    );
    setChatLog(updatedChatLog);
  };

  const isOneWay = chatLog.some(msg => msg.message.toLowerCase().includes('one way'));

  return (
    <div className="flex">
      <div className="relative flex flex-col bg-background border border-neutral-300 w-full lg:w-[60%] h-screen">
        <RecentPromptsBar prompts={recentPrompts} onEditClick={toggleEditModal} />

        <div className={`flex lg:hidden w-full mt-14 justify-end items-center px-5`}>
          <PenLine onClick={toggleEditModal} className={`${recentPrompts?.length != 0 ? '':'hidden'} text-primary-500 text-4xl`} />
        </div>

        <ChatHistory chatLog={chatLog} botLoader={botLoader} isLoading={chatLoading}/>

        {Array.isArray(recentPrompts) && (isOneWay ? recentPrompts.length >= 5 : recentPrompts.length >= 6) && (
          <Btn
            onClick={() => {
              toggleModal('flight');
              FlightSearchFn();
            }}
            className="fixed lg:hidden px-6 py-1 w-fit bg-secondary-500 text-neutral-100 self-end bottom-[130px] right-4"
          >
            Search
          </Btn>
        )}

        <ChatInput
          value={inputValue}
          onChange={handleInputChange}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
          suggestionsVisible={showPopData}
          setSuggestionsVisible={setShowPopData}
        />

        <SuggestionPanel
          visible={showPopData}
          position="bottom-30 left-4 lg:left-[12%]"
          lastMessage={chatLog[chatLog.length - 1]?.message || ''}
          airportSuggestions={airportSuggestions}
          searchParam={searchParam}
          onSelect={handleSelectSuggestion}
        />

        <Modal close={toggleEditModal} display={showEditModal}>
          <EditModal prompts={recentPrompts} close={toggleEditModal} onUpdatePrompt={handleUpdatePrompt}
          />
        </Modal>

        <Modal position="absolute" close={handleCloseCalendar} display={showCalendar}>
          <Calendar Click={handleDateSelect} selectedDate={dateSelect} Close={handleSubmitDate} />
        </Modal>

        <MobileRender />
      </div>

      <RightPanel />
    </div>
  );
};

export default Dashboard;
