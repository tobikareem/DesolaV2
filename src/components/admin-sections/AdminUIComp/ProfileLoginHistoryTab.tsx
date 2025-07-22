import React from 'react';
import { CheckCircle, Shield, XCircle } from 'lucide-react';
import { Text } from '../../ui/TextComp';
import { Btn } from '../../ui/Button';
import ActivityHistoryTabs from './ActivityHistoryTab';

const activityLogs = [
  {
    status: 'success',
    label: 'Login Success',
    timestamp: '2024-06-25 14:30:00',
    device: 'iPhone 14 Pro',
    browser: 'Mobile Safari',
    location: 'San Francisco, CA',
    ip: '192.168.1.100',
  },
  {
    status: 'failed',
    label: 'Login Failed',
    timestamp: '2024-06-25 09:15:22',
    device: 'MacBook Pro',
    browser: 'Chrome 125',
    location: 'Unknown',
    ip: '45.123.67.89',
    risk: 'High Risk',
  },
  {
    status: 'success',
    label: 'Login Success',
    timestamp: '2024-06-24 18:45:10',
    device: 'iPhone 14 Pro',
    browser: 'Mobile Safari',
    location: 'San Francisco, CA',
    ip: '192.168.1.100',
  },
  {
    status: 'success',
    label: 'Login Success',
    timestamp: '2024-06-24 09:20:33',
    device: 'MacBook Pro',
    browser: 'Chrome 125',
    location: 'San Francisco, CA',
    ip: '192.168.1.101',
  },
];

const ProfileLoginHistoryTab = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex items-center gap-2">
        <Shield />
        <Text
          as="h2"
          size="2xl"
          weight="medium"
          fontStyle="font-grotesk"
          className=" text-neutral-800"
        >
          Authentication & Activity History
        </Text>
      </div>

      <div className="space-y-4">
        {activityLogs.map((log, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="text-green-600">
                {log.status === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>

              <div className="space-y-1 text-sm">
                <Text as="p" size="sm" weight="medium">
                  {log.label}
                </Text>
                <Text as="p" size="xs" className="text-gray-500">
                  {log.timestamp}
                </Text>
              </div>
            </div>

            <div className="flex items-center justify-between gap-8 text-sm text-gray-700">
              <div>
                <Text as="p" size="sm" weight="medium">
                  {log.device}
                </Text>
                <Text as="p" size="xs" className=" text-gray-500">
                  {log.browser}
                </Text>
              </div>

              <div>
                <Text as="p" size="sm" weight="medium">
                  {log.location}
                </Text>
                <Text as="p" size="xs" className=" text-gray-500">
                  {log.ip}
                </Text>
                {log.risk && (
                  <span className="inline-block mt-1 px-3 py-1 text-xs text-white bg-red-600 rounded-full">
                    {log.risk}
                  </span>
                )}
              </div>

              <Btn className="px-3 py-1 border text-sm rounded-md hover:bg-gray-50">
                View Details
              </Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileLoginHistoryTab;
