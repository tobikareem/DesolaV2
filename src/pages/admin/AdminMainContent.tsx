
import React, { Suspense, lazy } from 'react';
import { ViewType } from '../../utils/AdminSidebarMenu';
import LoadingScreen from '../../components/layout/LoadingScreen';

const DashboardView = lazy(() => import('../../components/admin-sections/DashboardView'));
const ProfileView = lazy(() => import('../../components/admin-sections/ProfileView'));
const SubscriptionView = lazy(() => import('../../components/admin-sections/SubscriptionView'));
const FlightActivityView = lazy(() => import('../../components/admin-sections/FlightActivityView'));
const ErrorTrackingView = lazy(() => import('../../components/admin-sections/ErrorTrackingView'));
const ChatSupportView = lazy(() => import('../../components/admin-sections/ChatSupportView'));
const SettingsView = lazy(() => import('../../components/admin-sections/SettingsView'));

interface AdminMainContentProps {
  view: ViewType;
}

export const AdminMainContent: React.FC<AdminMainContentProps> = ({ view }) => {
  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <DashboardView />;
      case 'profile':
        return <ProfileView />;
      case 'subscription':
        return <SubscriptionView />;
      case 'flight':
        return <FlightActivityView />;
      case 'tracking':
        return <ErrorTrackingView />;
      case 'support':
        return <ChatSupportView />;
      case 'settings':
        return <SettingsView />;
      default:
        return null    
    }
  };

  return (
    <Suspense fallback={<div className="flex w-full h-full flex-1"><LoadingScreen dimension='w-full h-full' message='Loading...' background={'bg-tranparent'}/></div>}>
      {renderView()}
    </Suspense>
  );
};
