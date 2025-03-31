import { DateSelectArg } from "@fullcalendar/core/index.js";
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import MobileRender from "../../../components/dashboard-sections/mobileRender";
import Calendar from '../../../components/modals/Calender';
import EditModal from "../../../components/modals/EditModal";
import { Modal } from "../../../components/modals/Modal";
import { Btn } from "../../../components/ui/Button";
import { ChatContext } from "../../../contexts/ChatContext";
import { UIContext } from "../../../contexts/UIContext";
import { useAuthInfo } from "../../../hooks/useAuthInfo";
import { useAirports, useDashboardInfo } from "../../../hooks/useDashboardInfo";
import { useDebounce } from "../../../hooks/useDebounce";
import { ChatBotResponseHandler, resetChatBot } from "../../../utils/ChatBotHandler";
import { RightPanel } from "../sections/RightPanel";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import RecentPromptsBar from "./RecentPromptsBar";
import SuggestionPanel from "./SuggestionPanel";

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
  const { fetchAirports, airportSuggestions } = useAirports();
  const { preferences, loadPreferences } = useDashboardInfo();
  const debounce = useDebounce();

  // Local UI state
  const [inputValue, setInputValue] = useState<string>('');
  const [searchParam, setSearchParam] = useState<string>('');
  const [dateSelect, setDateSelect] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPopData, setShowPopData] = useState(false);
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

    // Add user message to chat
    const newChatLog = [
      ...chatLog,
      { message: inputValue, sender: 'user' as const }
    ];
    setChatLog(newChatLog);

    // Save to recent prompts
    const newPrompts = [inputValue, ...recentPrompts].slice(0, 10); // Keep only the 10 most recent
    setRecentPrompts(newPrompts);

    // Get response from ChatBotHandler based on the current user input
    setBotLoader(true);
    setTimeout(() => {
      const botResponseMessage = ChatBotResponseHandler(inputValue);

      const botResponse = {
        message: botResponseMessage,
        sender: 'bot' as const
      };
      setChatLog([...newChatLog, botResponse]);
      setBotLoader(false);
    }, 500);

    setInputValue('');
    setShowPopData(false);

  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.length >= 4) {
      handleSendMessage();
    }
  };

  const toggleEditModal = () => setShowEditModal(prev => !prev);
  const handleCloseCalendar = () => setShowCalendar(false);

  const handleDateSelect = (arg: DateSelectArg) => {
    const formattedDate = arg.start?.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    setInputValue(formattedDate || '');
    setDate(arg.start);
  };

  const updateDateSelect = () => {
    setDateSelect(date);
  };

  const handleSubmitDate = () => {
    if (inputValue.length !== 0) {
      handleSendMessage();
      handleCloseCalendar();
      updateDateSelect();
    } else {
      toast.warning('Pick a date');
    }
  };

  const handleClosePopData = () => setShowPopData(false);

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

  return (
    <div className="flex">
      <div className="relative flex flex-col bg-background border border-neutral-300 w-full lg:w-[60%] h-screen">
        <RecentPromptsBar prompts={recentPrompts} onEditClick={toggleEditModal} />

        <ChatHistory chatLog={chatLog} botLoader={botLoader} isLoading={chatLoading} />

        {Array.isArray(recentPrompts) && recentPrompts.length >= 6 && (
          <Btn
            onClick={() => toggleModal('flight')}
            className="lg:hidden px-6 py-1 w-fit bg-secondary-500 text-neutral-100 self-end"
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
          position="bottom-30 lg:left-[12%]"
          lastMessage={chatLog[chatLog.length - 1]?.message || ''}
          airportSuggestions={airportSuggestions}
          searchParam={searchParam}
          onSelect={handleSelectSuggestion}
        />

        <Modal close={toggleEditModal} display={showEditModal}>
          <EditModal prompts={recentPrompts} chatSystem={chatLog} airport={[]} close={toggleEditModal} />
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
