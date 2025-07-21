import React, { useState } from 'react';
import { Btn } from '../Button'; // Replace with your actual button component
import { Text } from '../TextComp'; // Replace with your text component
import { ToggleSwitch } from './ToggleSwitch';

const activityLogs = [
  {
    action: 'Updated notification settings',
    user: 'john@desola.com',
    timestamp: '2025-06-09 14:30',
    ip: '192.168.1.100',
  },
  {
    action: 'Added new support agent',
    user: 'sarah@desola.com',
    timestamp: '2025-06-09 14:30',
    ip: '192.168.1.100',
  },
  {
    action: 'Enabled maintenance mode',
    user: 'john@desola.com',
    timestamp: '2025-06-09 14:30',
    ip: '192.168.1.100',
  },
];

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('1 hour');

  const handleUpdate = () => {
    console.log('2FA:', twoFactorEnabled);
    console.log('Session Timeout:', sessionTimeout);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full  mx-auto">
      <Text
        as="h2"
        size="xl"
        fontStyle="font-grotesk"
        weight="semibold"
        className="mb-1"
      >
        Security Settings
      </Text>
      <Text size="sm" className="text-gray-500 mb-4">
        Configure security measures and access controls
      </Text>

      <div className="border rounded-lg p-4 mb-4 flex items-center justify-between">
        <div>
          <Text size="sm" weight="semibold" className="text-gray-500 ">
            Two-factor Authentication
          </Text>
          <Text as="p" size="sm" className=" text-gray-500">
            Require 2FA for all admin accounts
          </Text>
        </div>
        <ToggleSwitch
          enabled={twoFactorEnabled}
          onToggle={() => setTwoFactorEnabled(!twoFactorEnabled)}
        />
      </div>

      <div className="mb-6 max-w-60">
        <Text size="sm" weight="semibold" className="block  text-gray-500 mb-1">
          Session Timeout Duration
        </Text>
        <select
          value={sessionTimeout}
          onChange={(e) => setSessionTimeout(e.target.value)}
          className="w-full border outline-0 rounded-lg px-3 py-2"
        >
          <option>15 minutes</option>
          <option>30 minutes</option>
          <option>1 hour</option>
          <option>2 hours</option>
        </select>
      </div>

      <hr className="my-4" />

      <div className="space-y-3 mb-6">
        {activityLogs.map((log, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <Text
                as="p"
                size="sm"
                weight="semibold"
                className=" text-gray-500"
              >
                {log.action}
              </Text>
              <p className="text-sm text-gray-500">by {log.user}</p>
            </div>

            <div className="text-sm text-gray-500 text-right">
              <Text
                as="p"
                size="sm"
                weight="semibold"
                className=" text-gray-500"
              >
                {log.timestamp}
              </Text>
              <p>IP: {log.ip}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Btn
          onClick={handleUpdate}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg"
        >
          Update Security Settings
        </Btn>
      </div>
    </div>
  );
}
