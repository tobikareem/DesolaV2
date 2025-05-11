
import { useState, PropsWithChildren } from "react";
import { EditContext } from "../contexts/EditContext";


export const EditProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [editedValue, setEditedValue] = useState<string>('');
  const [promptIndex, setPromptIndex] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState<string| null>(null);

  return (
    <EditContext.Provider value={{ editedValue, setEditedValue, promptIndex, setPromptIndex, editQuestion, setEditQuestion }}>
      {children}
    </EditContext.Provider>
  );
};