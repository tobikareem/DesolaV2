import { useContext} from "react"
import { EditContext } from "../contexts/EditContext";


export const useEdit =()=> {
  const {promptIndex, setPromptIndex, editedValue, setEditedValue, editQuestion, setEditQuestion, fieldString, setFieldString} = useContext(EditContext);
  
  
  const handleEditClick =(index:number, currentValue:string)=> {
    setPromptIndex(index);
    setEditedValue(currentValue);
    setEditQuestion(currentValue);
  }
 
  return {handleEditClick, promptIndex, setPromptIndex, editedValue, setEditedValue, editQuestion, setEditQuestion, fieldString, setFieldString}
}