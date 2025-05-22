import { useContext, useEffect} from "react"
import { EditContext } from "../contexts/EditContext";
import { ChatContext } from "../contexts/ChatContext";
import { ChatBotResponseHandler } from "../utils/ChatBotHandler";


export const useEdit =()=> {
  const {promptIndex, setPromptIndex, editedValue, setEditedValue, editQuestion, setEditQuestion, fieldString, setFieldString, multiLegValue, setMultiLegValue} = useContext(EditContext);
  const { chatLog } = useContext(ChatContext);
  
  const handleEditClick =(index:number, currentValue:string)=> {
    setPromptIndex(index);
    setEditedValue(currentValue);
    setEditQuestion(currentValue);
  }

  useEffect(()=> {
    const lastMessage = chatLog[chatLog.length - 1]?.message;
    const isDepartureQuestion = lastMessage === 'What is your departure date? (YYYY-MM-DD)';
    const isMultiLeg = multiLegValue?.toLowerCase() === 'round trip' || multiLegValue?.toLowerCase() === 'multi city';

    if (isDepartureQuestion && isMultiLeg) {
      ChatBotResponseHandler(multiLegValue);
      return;
    }
  }, [chatLog, multiLegValue]);
 
  return {handleEditClick, promptIndex, setPromptIndex, editedValue, setEditedValue, editQuestion, setEditQuestion, fieldString, setFieldString, multiLegValue, setMultiLegValue}
}