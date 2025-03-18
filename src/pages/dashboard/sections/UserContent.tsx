import { useEffect, useRef } from "react";
import { PreferencesSection } from "../../../components/dashboard-sections/preference";
import { ProfileSection } from "../../../components/dashboard-sections/profile";
import { useAuthInfo } from "../../../hooks/useAuthInfo";
import { useDashboardInfo } from "../../../hooks/useDashboardInfo";
import authService from "../../../services/authService";

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
    <div className="flex flex-col max-w-2xl lg:py-6 bg-white rounded-lg">
      <ProfileSection />

      {preferencesLoading ? (
        <div className="py-8 flex justify-center">
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
  );
};