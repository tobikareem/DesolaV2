import { useEffect } from "react";
import { PreferencesSection } from "../../../components/dashboard-sections/preference";
import { ProfileSection } from "../../../components/dashboard-sections/profile";
import { useAuthInfo } from "../../../hooks/useAuthInfo";
import authService from "../../../services/authService";
import { useUserDashboard } from "../../../hooks/useDashboardInfo";

export const UserContent: React.FC = () => {
  const { accountInfo } = useAuthInfo();
  const {
    airportSuggestions,
    fetchAirports,
    preferences,
    handlePreferenceChange,
    handleAirportSelect,
    savePreferences,
    loadPreferences
  } = useUserDashboard();

  // Load preferences when component mounts
  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  const email = accountInfo?.emails?.length ? accountInfo.emails[0] : "";
  const firstName = accountInfo?.name?.split(" ")[0] ?? "";
  const lastName = accountInfo?.name?.split(" ")[1] ?? "";

  const handleEditProfile = async () => {
    await authService.profileEdit();
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <ProfileSection
        firstName={firstName}
        lastName={lastName}
        email={email}
        onEditProfile={handleEditProfile}
      />

      <PreferencesSection
        preferences={preferences}
        onChange={handlePreferenceChange}
        onSave={savePreferences}
        onAirportInputChange={fetchAirports}
        airportSuggestions={airportSuggestions}
        onAirportSelect={handleAirportSelect}
      />
    </div>
  );
};