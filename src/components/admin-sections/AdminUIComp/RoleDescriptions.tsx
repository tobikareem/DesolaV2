import { Text } from "../../ui/TextComp";

const roles = [
  {
    title: 'Super Admin',
    color: 'text-purple-700',
    permissions: [
      'Full system access',
      'User management',
      'Settings configuration',
      'Security controls',
    ],
  },
  {
    title: 'Support Agent',
    color: 'text-purple-700',
    permissions: [
      'Chat support access',
      'Error log viewing',
      'Customer data access',
      'Limited settings',
    ],
  },
  {
    title: 'Read-only',
    color: 'text-purple-700',
    permissions: [
      'View-only access',
      'Dashboard monitoring',
      'Report generation',
      'No edit permissions',
    ],
  },
];

export default function RoleDescriptions() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm space-y-6 mt-6">
      <div>
        <Text
          as="h2"
          size="xl"
          weight="semibold"
          fontStyle="font-grotesk"
          className=" mb-1"
        >
          Role Descriptions
        </Text>
        <Text as="p" className="text-gray-500">
          Understanding different permission levels
        </Text>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {roles.map((role) => (
          <div
            key={role.title}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <Text
              as="h2"
              size="2xl"
              fontStyle="font-grotesk"
              className={`font-semibold  mb-2 ${role.color}`}
            >
              {role.title}
            </Text>
            <ul className="list-disc list-inside  text-sm text-gray-700 space-y-1">
              {role.permissions.map((perm, i) => (
                <li key={i}>{perm}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
