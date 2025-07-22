import { Pencil, Trash2, UserPlus } from 'lucide-react';
import { Text } from '../../ui/TextComp';
import { Btn } from '../../ui/Button';
import { Modal } from '../../modals/Modal';
import AddAdminForm from './AddAdminForm';
import { useState } from 'react';
import DeleteAdminModal from './DeleteAdminModal';

interface AdminData {
  fullName: string;
  email: string;
  lastLogin: string;
  role: string;
  roleColor: string;
  status: string;
  statusColor: string;
  avatar: string;
}
  

const admins: AdminData[] = [
  {
    fullName: 'John Admin',
    email: 'john@desola.com',
    lastLogin: '2 hours ago',
    role: 'Super Admin',
    roleColor: 'bg-purple-100 text-purple-700',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    avatar: 'J',
  },
  {
    fullName: 'Sarah Support',
    email: 'sarah@desola.com',
    lastLogin: '1 day ago',
    role: 'Support Agent',
    roleColor: 'bg-blue-100 text-blue-700',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700',
    avatar: 'S',
  },
  {
    fullName: 'Mike Monitor',
    email: 'mike@desola.com',
    lastLogin: '1 week ago',
    role: 'Read-only',
    roleColor: 'bg-gray-100 text-gray-600',
    status: 'inactive',
    statusColor: 'bg-red-100 text-red-600',
    avatar: 'M',
  },
];



export default function RoleManagement() {
    const [openAdminModal, setOpenAdminModal] = useState(false);
    const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
    const [selectedAdmin, setSelectedAdmin] = useState<AdminData | undefined>();
    const [adminToDelete, setAdminToDelete] = useState<AdminData | null>(null);


    const handleEdit = (admin: AdminData) => {
      setSelectedAdmin(admin);
      setFormMode('edit');
      setOpenAdminModal(true); 
    };

    const handleAdd = () => {
      setSelectedAdmin(undefined);
      setFormMode('add');
      setOpenAdminModal(true); 
    };
      
  return (
    <>
      <div className="p-6 bg-white rounded-xl shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Text
              as="h2"
              size="xl"
              weight="semibold"
              fontStyle="font-grotesk"
              className=" mb-1"
            >
              Role Management
            </Text>
            <Text as="p" size="sm" className="text-gray-500 text-sm">
              Manage admin users and their permissions
            </Text>
          </div>
          <Btn
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm px-4 py-2 rounded-lg"
          >
            <UserPlus className="w-4 h-4" />
            Add New Admin
          </Btn>
        </div>

        {admins.map((admin) => (
          <div
            key={admin.email}
            className="flex justify-between items-center border rounded-lg p-4 hover:shadow-sm transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center font-grotesk justify-center rounded-full bg-blue-700 text-white font-semibold">
                {admin.avatar}
              </div>
              <div>
                <Text as="h3" fontStyle="font-grotesk" weight="medium">
                  {admin.fullName}
                </Text>
                <Text as="p" size="sm" className=" text-gray-500">
                  {admin.email}
                </Text>
                <Text as="p" size="xs" className=" text-gray-400">
                  Last login: {admin.lastLogin}
                </Text>
              </div>
            </div>

            <div className="flex gap-2">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${admin.roleColor}`}
              >
                {admin.role}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${admin.statusColor}`}
              >
                {admin.status}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Btn
                onClick={() => handleEdit(admin)}
                className="flex items-center gap-1 text-blue-700 border font-semibold border-blue-700 px-3 py-1.5 rounded-lg text-sm hover:bg-blue-50"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Btn>
              <Btn
                onClick={() => setAdminToDelete(admin)}
                className="text-red-600 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Btn>
            </div>
          </div>
        ))}
      </div>
      <Modal display={openAdminModal} close={() => setOpenAdminModal(false)}>
        <AddAdminForm
          mode={formMode}
          onClose={() => setOpenAdminModal(false)}
          defaultValues={selectedAdmin}
        />
      </Modal>
      <Modal display={!!adminToDelete} close={() => setAdminToDelete(null)}>
        {adminToDelete && (
          <DeleteAdminModal
            adminName={adminToDelete.fullName}
            onClose={() => setAdminToDelete(null)}
            onConfirm={() => {
              console.log('Deleting:', adminToDelete.email);
              setAdminToDelete(null);
            }}
          />
        )}
      </Modal>
    </>
  );
}
