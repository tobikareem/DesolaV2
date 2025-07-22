import { useState } from 'react';
import { Btn } from '../../ui/Button';
import { Input } from '../../ui/InputField';
import { Text } from '../../ui/TextComp';
import { ToggleSwitch } from './ToggleSwitch';

export const GeneralSettings = () => {
  const [companyName, setCompanyName] = useState('Desola Flights');
  const [email, setEmail] = useState('admin@desola.com');
  const [timezone, setTimezone] = useState('UTC');
  const [timeout, setTimeout] = useState(60);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="p-6 rounded-xl bg-white shadow-sm border  mx-auto">
      <Text as='h2' size='xl' weight='semibold' fontStyle='font-grotesk' className=" mb-6">General Settings</Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
            type="text"
          />
        </div>

        <div>
          <Input
            label="Admin Contact Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
            type="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full border outline-0 rounded-md px-3 py-[6px] text-sm"
          >
            <option value="UTC">UTC (Coordinated Universal Time)</option>
            <option value="WAT">WAT (West Africa Time)</option>
            <option value="EST">EST (Eastern Standard Time)</option>
          </select>
        </div>

        <div>
          <Input
            label="Session Timeout (minutes)"
            type="number"
            value={timeout}
            onChange={(e) => setTimeout(Number(e.target.value))}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <Text
            as="h6"
            size="sm"
            weight="medium"
            className=" text-gray-500 mt-1"
          >
            Maintenance Mode
          </Text>
          <Text as="p" size="xs" className=" text-gray-500 mt-1">
            Enable maintenance mode to temporarily disable user access
          </Text>
        </div>

        <ToggleSwitch
          enabled={maintenanceMode}
          onToggle={() => setMaintenanceMode(!maintenanceMode)}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Btn className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm">
          Save Changes
        </Btn>
      </div>
    </div>
  );
};
