import { useState } from "react"


export const UseEdit =()=> {
  const [promptIndex, setPromptIndex] = useState<number | null>(null)
  const [ editedValue, setEditedValue] = useState<string>("")

  const handleEditClick =(index:number, currentValue:string)=> {
    setPromptIndex(index);
    setEditedValue(currentValue);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(e.target.value);
  };

  return {handleEditClick, promptIndex, setPromptIndex, editedValue, setEditedValue, handleInputChange}
}