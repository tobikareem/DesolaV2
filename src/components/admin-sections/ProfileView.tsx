// src/views/DashboardView.tsx
import React, { useState } from 'react';
import UserProfileOverview from '../ui/AdminUIComp/UserProfileOverview';
import { Text } from '../ui/TextComp';
import ActivityHistoryTabs from '../ui/AdminUIComp/ActivityHistoryTab';
import { UserProfileSearch } from '../ui/AdminUIComp/UserProfileSearch';

const ProfileView = () => {
  return (
    <div>
      <Text
        as="h2"
        size="2xl"
        weight="semibold"
        fontStyle="font-grotesk"
        className="mb-4"
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
