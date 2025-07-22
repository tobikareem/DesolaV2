import { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch';
import { Mail, Bell } from 'lucide-react';
import { Btn } from '../Button';
import { Text } from '../TextComp';

export const NotificationSettings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [dashboardBanners, setDashboardBanners] = useState(true);

  return (
    <div className="bg-white p-6 rounded-xl border">
      <Text
        as="h2"
        size="xl"
        weight="semibold"
        fontStyle="font-grotesk"
        className=" mb-1"
      >
        Notification Settings
      </Text>
      <Text as="p" size="sm" className="text-sm text-gray-500 mb-4">
        Configure how and when you receive alerts and notifications
      </Text>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <div>
              <Text as="p" size="sm" weight="medium">
                Email Alerts
              </Text>
              <Text as="p" size="sm" className="text-gray-500">
                Receive critical system alerts via email
              </Text>
            </div>
          </div>
          <ToggleSwitch
            enabled={emailAlerts}
            onToggle={() => setEmailAlerts(!emailAlerts)}
          />
        </div>

        <div className="flex items-center justify-between border rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <div>
              <Text as="p" size="sm" weight="medium">
                Dashboard Banners
              </Text>
              <Text as="p" size="sm" className="text-gray-500">
                Show alert banners in the admin dashboard
              </Text>
            </div>
          </div>
          <ToggleSwitch
            enabled={dashboardBanners}
            onToggle={() => setDashboardBanners(!dashboardBanners)}
          />
        </div>
      </div>

      <div className='max-w-md'>
        <Text
          as="h2"
          size="xl"
          weight="semibold"
          fontStyle="font-grotesk"
          className=" mb-1"
        >
          Alert Preferences
        </Text>
        <label className="text-base font-medium block mb-1 text-gray-700">
          Timezone
        </label>
        <select className="w-full outline-0 border rounded-md p-2 text-sm">
          <option>UTC (Coordinated Universal Time)</option>
          <option>WAT (West Africa Time)</option>
          <option>EST (Eastern Standard Time)</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end">
        <Btn className="bg-blue-700 text-white px-5 py-2 rounded-md hover:bg-blue-800 text-sm font-medium">
          Save Notification Settings
        </Btn>
      </div>
    </div>
  );
};
