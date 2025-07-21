import { Btn } from '../Button';
import { Text } from '../TextComp';

interface DeleteAdminModalProps {
  adminName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteAdminModal({
  adminName,
  onClose,
  onConfirm,
}: DeleteAdminModalProps) {
  return (
    <div className="bg-white w-[380px] p-6 rounded-xl shadow-lg">
      <Text
        as="h2"
        size="lg"
        fontStyle="font-grotesk"
        weight="semibold"
        className="mb-2"
      >
        Delete Admin User
      </Text>
      <Text as="p" size="sm" className="text-gray-600 mb-6">
        Are you sure you want to remove <strong>{adminName}</strong>? This
        action cannot be undone.
      </Text>

      <div className="flex justify-end gap-3">
        <Btn
          onClick={onClose}
          className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2"
        >
          Cancel
        </Btn>
        <Btn
          onClick={onConfirm}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete Admin
        </Btn>
      </div>
    </div>
  );
}
