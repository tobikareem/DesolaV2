import React, { useState } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onSave: (newValue: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  value,
  onSave,
}) => {
  const [inputValue, setInputValue] = useState(value); 

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          className="border p-2 w-full"
        />
        <div className="flex justify-end mt-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded mr-2"
          >
            Close
          </button>
          <button
            onClick={() => onSave(inputValue)} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
