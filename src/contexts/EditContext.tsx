import{ createContext} from 'react';

export interface EditContextType {
  editedValue: string;
  setEditedValue: (value: string) => void;
  promptIndex: number | null;
  setPromptIndex: (index: number | null) => void;
  editQuestion: string | null;
  setEditQuestion: (question: string | null) => void;
  fieldString: string | null;
  setFieldString: (field: string | null) => void;
}

export const EditContext = createContext<EditContextType>({
  editedValue: '',
  setEditedValue: () => { },
  promptIndex: null,
  setPromptIndex: () => { },
  editQuestion: '',
  setEditQuestion: () => { },
  fieldString: '',
  setFieldString: () => { },
});



