// src/views/DashboardView.tsx
import UserProfileOverview from './AdminUIComp/UserProfileOverview';
import { Text } from '../ui/TextComp';
import ActivityHistoryTabs from './AdminUIComp/ActivityHistoryTab';
import { UserProfileSearch } from './AdminUIComp/UserProfileSearch';

const ProfileView = () => {
  return (
    <div>
      <Text
        as="h2"
        size="xl"
        weight="semibold"
        fontStyle="font-grotesk"
        className="mb-4 text-2xl"
      >
        Search for Users Profile
      </Text>
      <UserProfileSearch />
      <UserProfileOverview />
      <ActivityHistoryTabs />
    </div>
  );
};

export default ProfileView;
