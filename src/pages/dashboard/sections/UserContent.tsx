import { PreferencesSection } from "../../../components/dashboard-sections/preference";
import { ProfileSection } from "../../../components/dashboard-sections/profile";
import { useAuthInfo } from "../../../hooks/useAuthInfo";
import { Title } from "../../../components/layout/Title";
import { Airport, UserPreferences } from "../../../hooks/useDashboardInfo";
import authService from "../../../services/authService";



interface UserContentProps {
  preferences?: UserPreferences;
  airportSuggestions?: Airport[];
  preferencesLoading?: boolean;
  handlePreferenceChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAirportSelect?: (airportCode: string, field: string) => void;
  savePreferences?: () => Promise<void>;
  fetchAirports?: () => Promise<void>;
}

export const UserContent: React.FC<UserContentProps> = ({
  preferences,
  airportSuggestions,
  preferencesLoading,
  handlePreferenceChange,
  handleAirportSelect,
  savePreferences,
  fetchAirports
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuthInfo();

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
    <div className="flex flex-col w-full h-full bg-white ">
      <div className="space-y-5 h-full">
        <Title>
          Profile
        </Title>
        <div className="flex flex-col gap-4 pr-2 h-full lg:overflow-y-auto py-2">
          <ProfileSection />
          {preferencesLoading ? (
            <div className="py-8 flex flex-1 justify-center gap-2 items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
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
    </div>
  );
};