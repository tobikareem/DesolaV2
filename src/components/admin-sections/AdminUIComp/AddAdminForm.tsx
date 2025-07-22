import { X } from 'lucide-react';
import { Btn } from '../../ui/Button';
import { Input } from '../../ui/InputField';
import { Text } from '../../ui/TextComp';
import React, { useEffect, useState } from 'react';

interface AdminData {
  fullName: string;
  email: string;
  role: string;
  status: string;
}

interface Props {
  onClose: () => void;
  mode: 'add' | 'edit';
  defaultValues?: AdminData;
}

export default function AddAdminForm({ onClose, mode, defaultValues }: Props) {
  const [fullName, setFullName] = useState(defaultValues?.fullName || '');
  const [email, setEmail] = useState(defaultValues?.email || '');
  const [role, setRole] = useState(defaultValues?.role || 'Support Agent');
  const [status, setStatus] = useState(defaultValues?.status || 'Active');

  const isEdit = mode === 'edit';

  useEffect(() => {
    if (defaultValues) {
      setFullName(defaultValues.fullName);
      setEmail(defaultValues.email);
      setRole(defaultValues.role);
      setStatus(defaultValues.status);
    }
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: AdminData = {
      fullName,
      email,
      role,
      status,
    };

    console.log(isEdit ? 'Updating admin:' : 'Creating admin:', formData);

    // Awaiting API from Tobi Kareem
    // onClose(); 
  };

  return (
    <div className="p-4 w-[400px] bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <Text
          as="h2"
          size="lg"
          fontStyle="font-grotesk"
          weight="semibold"
          className=" text-gray-900"
        >
          {isEdit ? 'Edit Admin' : 'Add New Admin'}
        </Text>
        <X className="cursor-pointer" onClick={onClose} />
      </div>
      <Text as="p" size="sm" className="text-sm text-gray-500 mb-4">
        {isEdit
          ? "Update this admin's information and permissions."
          : 'Create a new admin account with the appropriate permissions.'}
      </Text>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter full name"
          className="w-full border rounded-lg px-3 py-2 "
        />

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="w-full border rounded-lg px-3 py-2"
        />

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded-lg px-3 py-[5px] outline-0"
          >
            <option>Super Admin</option>
            <option>Support Agent</option>
            <option>Read-only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border outline-0 rounded-lg px-3 py-[5px]"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Btn
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700"
          >
            Cancel
          </Btn>
          <Btn
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800"
          >
            {isEdit ? 'Update Admin' : 'Add Admin'}
          </Btn>
        </div>
      </form>
    </div>
  );
}
