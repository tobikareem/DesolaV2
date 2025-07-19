// src/components/AdminMainContent.tsx
import React, { Suspense, lazy } from 'react';
import { ViewType } from './AdminSidebarMenu';

// Lazy-loaded components (must be default exports)
const DashboardView = lazy(() => import('../components/AdminComponents/DashboardView'));
const ProfileView = lazy(() => import('../components/AdminComponents/ProfileView'));
const SubscriptionView = lazy(() => import('../components/AdminComponents/SubscriptionView'));
const FlightActivityView = lazy(() => import('../components/AdminComponents/FlightActivityView'));
const ErrorTrackingView = lazy(() => import('../components/AdminComponents/ErrorTrackingView'));
const ChatSupportView = lazy(() => import('../components/AdminComponents/ChatSupportView'));
const SettingsView = lazy(() => import('../components/AdminComponents/SettingsView'));
const LogoutView = lazy(() => import('../components/AdminComponents/LogoutView'));

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
      case 'logout':
        return <LogoutView />;
      default:
        return <div>404: Page Not Found</div>;
    }
  };

  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading...</div>}>
      {renderView()}
    </Suspense>
  );
};
