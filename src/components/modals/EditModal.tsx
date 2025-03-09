import React from 'react';
import { X } from 'lucide-react';
import { Input } from '../InputField';
import { Modal } from './Modal'; // Import reusable modal

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const EditModal: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      display={isOpen}
      close={onClose}
      className="w-full max-w-lg bg-white p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-xl font-semibold">Edit</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Input
          type="text"
          placeholder="Enter text..."
          className="w-full border p-2 rounded"
        />
      </div>
    </Modal>
  );
};

export default EditModal;
