import { useEffect, useRef } from "react";
import { PreferencesSection } from "../../../components/dashboard-sections/preference";
import { ProfileSection } from "../../../components/dashboard-sections/profile";
import { useDashboardInfo } from "../../../hooks/useDashboardInfo";
import authService from "../../../services/authService";
import { useAuthInfo } from "../../../hooks/useAuthInfo";

export const UserContent: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuthInfo();
  const loadedRef = useRef(false);
  const {
    airportSuggestions,
    fetchAirports,
    preferences,
    preferencesLoading,
    handlePreferenceChange,
    handleAirportSelect,
    savePreferences,
    loadPreferences
  } = useDashboardInfo();

  useEffect(() => {
    if (isAuthenticated && !loadedRef.current) {
      loadPreferences();
      loadedRef.current = true;
    }

    if (!isAuthenticated) {
      loadedRef.current = false;
    }

  }, [isAuthenticated, loadPreferences]);

  if (authLoading) {
    return <div className="flex justify-center items-center h-64">
      <span>Loading your profile...</span>
    </div>;
  }

  if (!isAuthenticated) {
    return <div className="flex flex-col items-center justify-center h-64">
      <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
      <p className="text-gray-600 mb-4">Please sign in to view your profile and preferences.</p>
      <button
        onClick={() => authService.signIn()}
        className="px-6 py-2 bg-primary-500 text-white rounded-lg"
      >
        Sign In
      </button>
    </div>;
  }


  return (
    <div className="w-full h-full lg:py-6 bg-white ">
      <div className="flex flex-col gap-4 pr-2 lg:overflow-y-auto h-full">
        <ProfileSection />

        {preferencesLoading ? (
          <div className="py-8 flex justify-center gap-2 items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"/>
            <span>Loading your preferences...</span>
          </div>
        ) : (
          <PreferencesSection
            preferences={preferences}
            onChange={handlePreferenceChange}
            onSave={savePreferences}
            onAirportInputChange={fetchAirports}
            airportSuggestions={airportSuggestions}
            onAirportSelect={handleAirportSelect}
          />
        )}
      </div>
    </div>
  );
};