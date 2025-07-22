import { useState } from 'react';
import { GeneralSettings } from './GeneralSettings';
import { Btn } from '../Button';
import { NotificationSettings } from './NotificationSettings';
import RoleManagement from './RoleManagement';
import RoleDescriptions from './RoleDescriptions';
import SecuritySettings from './SettingsAdminSecurity';
import { TabComponent } from './TabComponent';



export const SettingsTabs = () => {
  const tabs = [
    { label: 'General', content: <GeneralSettings /> },
    { label: 'Notifications', content: <NotificationSettings /> },
    {
      label: 'Role Management',
      content: (
        <div>
          <RoleManagement />
          <RoleDescriptions />
        </div>
      ),
    },
    { label: 'Security', content: <SecuritySettings /> },
  ];

  return <TabComponent tabs={tabs} />;
};