import { useEffect } from "react";
import { PreferencesSection } from "../../../components/dashboard-sections/preference";
import { ProfileSection } from "../../../components/dashboard-sections/profile";
import { useAuthInfo } from "../../../hooks/useAuthInfo";
import { useDashboardInfo } from "../../../hooks/useDashboardInfo";
import authService from "../../../services/authService";

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
  } = useDashboardInfo();

  // Load preferences when component mounts
  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  const handleEditProfile = async () => {
    await authService.editUserProfile();
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <ProfileSection
        firstName={accountInfo?.firstName ?? ""}
        lastName={accountInfo?.lastName ?? ""}
        email={accountInfo?.emailList?.length ? accountInfo.emailList[0] : ""}
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