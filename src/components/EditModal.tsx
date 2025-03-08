import React from 'react';
import { X } from 'lucide-react';
import { Btn } from './Button';
import { Input } from './InputField';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const EditModal: React.FC<Props> = ({ isOpen, onClose }) => {

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center  transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        className={`bg-white   rounded-xl w-2/5 h-1/3 max-w-2xl shadow-lg transform transition-all duration-300 ${
          isOpen ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">Edit</h2>
          <Btn onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </Btn>
        </div>
        <div className="p-6 ">
          
          {/* This is where we will put the edit skeleton*/}
          <Input type='text' />

          {/* end of edit skeleton*/}
        </div>
      </div>
    </div>
  );
};

export default EditModal;
