import { TabComponent } from './TabComponent';
import ProfileLoginHistoryTab from './ProfileLoginHistoryTab';
import ProfileSessionSummary from './ProfileSessionSummary';
import ProfileRecoveryLogs from './ProfileRecoveryLogs';

export default function ActivityHistoryTabs() {
  const tabs = [
    { label: 'Login History', content: <ProfileLoginHistoryTab /> },
    { label: 'Session Summary', content: <ProfileSessionSummary /> },
    { label: 'Recovery Logs', content: <ProfileRecoveryLogs /> },
  ];

  return <TabComponent tabs={tabs} />;
}
