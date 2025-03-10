import { useState } from "react";
import profileImg from "../../../assets/Ellipse 137.png";
import { Input } from "../../../components/InputField";
import { Text } from "../../../components/TextComp";
import { useAuthInfo } from "../../../hooks/useAuthInfo";
import { useAirports } from "../../../hooks/useAirports";
import authService from "../../../services/authService";

// Airport suggestion item type
type Airport = {
  code: string;
  name: string;
  city: string;
};

// User preferences type
type UserPreferences = {
  originAirport: string;
  destinationAirport: string;
  travelClass: string;
  stopOvers: string;
  userId: string;
};

// Airport suggestion dropdown component
const AirportSuggestions = ({
  suggestions,
  onSelect,
  isVisible,
  id
}: {
  suggestions: Airport[];
  onSelect: (code: string) => void;
  isVisible: boolean;
  id: string;
}) => {
  if (!isVisible || suggestions.length === 0) return null;

  return (
    <select
      name="airportSuggestions"
      title="airportSuggestions"
      id={id}
      className="absolute bg-white border shadow-lg rounded-lg w-full max-h-48 overflow-y-auto"
      size={Math.min(suggestions.length, 5)} // Show up to 5 options at once
      onChange={(e) => onSelect(e.target.value)}
      onBlur={() => { }} 
    >
      <option value="" disabled>Select an airport</option>
      {suggestions.map((airport) => (
        <option
          key={airport.code}
          value={airport.code}
        >
          {airport.name} ({airport.code}) - {airport.city}
        </option>
      ))}
    </select>
  );
};

// ReadOnly profile section
const ProfileSection = ({
  firstName,
  lastName,
  email,
  onEditProfile
}: {
  firstName: string;
  lastName: string;
  email: string;
  onEditProfile: () => void;
}) => (
  <div className="mb-8">
    <Text as="h1" size="2xl" weight="bold" className="text-primary-500 mb-5">
      Profile
    </Text>
    <div className="flex flex-col items-center">
      <img src={profileImg} className="w-24 h-24 rounded-full mb-4" alt="User Profile" />
      <Input label="First Name" value={firstName} className="w-full" readOnly />
      <Input label="Last Name" value={lastName} className="w-full" readOnly />
      <Input label="Email" value={email} className="w-full" readOnly />
      <button
        onClick={onEditProfile}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Edit Profile in Azure B2C
      </button>
    </div>
  </div>
);

// Editable preferences section
const PreferencesSection = ({
  preferences,
  onChange,
  onSave,
  onAirportInputChange,
  airportSuggestions,
  onAirportSelect
}: {
  preferences: UserPreferences;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSave: () => void;
  onAirportInputChange: (value: string) => void;
  airportSuggestions: Airport[];
  onAirportSelect: (code: string, field: string) => void;
}) => {
  const [activeField, setActiveField] = useState<string | null>(null);

  return (
    <div>
      <Text as="h2" size="xl" weight="bold" className="text-primary-500 mb-3">
        Travel Preferences
      </Text>

      {/* Origin Airport */}
      <div className="mb-4">
        <label htmlFor="originAirportInput" className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Origin Airport
        </label>
        <div className="relative">
          <input
            id="originAirportInput"
            type="text"
            name="originAirport"
            value={preferences.originAirport}
            onChange={(e) => {
              onChange(e);
              onAirportInputChange(e.target.value);
              setActiveField("originAirport");
            }}
            className="w-full px-4 py-2 border rounded-lg"
            onBlur={() => setTimeout(() => setActiveField(null), 200)}
            placeholder="Search airports..."
          />
          <AirportSuggestions
            id="origin-airport-suggestions"
            suggestions={airportSuggestions}
            onSelect={(code) => onAirportSelect(code, "originAirport")}
            isVisible={activeField === "originAirport"}
          />
        </div>
      </div>

      {/* Destination Airport */}
      <div className="mb-4">
        <label htmlFor="destinationAirportInput" className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Destination Airport
        </label>
        <div className="relative">
          <input
            id="destinationAirportInput"
            type="text"
            name="destinationAirport"
            value={preferences.destinationAirport}
            onChange={(e) => {
              onChange(e);
              onAirportInputChange(e.target.value);
              setActiveField("destinationAirport");
            }}
            className="w-full px-4 py-2 border rounded-lg"
            onBlur={() => setTimeout(() => setActiveField(null), 200)}
            placeholder="Search airports..."
          />
          <AirportSuggestions
            id="destination-airport-suggestions"
            suggestions={airportSuggestions}
            onSelect={(code) => onAirportSelect(code, "destinationAirport")}
            isVisible={activeField === "destinationAirport"}
          />
        </div>
      </div>

      {/* Travel Class Selection */}
      <div className="mb-4">
        <label htmlFor="travelClass" className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Class of Travel
        </label>
        <select
          id="travelClass"
          name="travelClass"
          value={preferences.travelClass}
          onChange={onChange}
          className="w-full border px-4 py-2 rounded-lg"
        >
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="First Class">First Class</option>
        </select>
      </div>

      {/* Stop-Overs Selection */}
      <div className="mb-5">
        <label htmlFor="stopOvers" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Stop-Overs
        </label>
        <select
          id="stopOvers"
          name="stopOvers"
          value={preferences.stopOvers}
          onChange={onChange}
          className="w-full border px-4 py-2 rounded-lg"
        >
          <option value="Non-Stop">Non-Stop</option>
          <option value="1 Stop">1 Stop</option>
          <option value="2+ Stops">2+ Stops</option>
        </select>
      </div>

      <button
        onClick={onSave}
        className="w-full bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Save Preferences
      </button>
    </div>
  );
};

export const UserContent: React.FC = () => {
  const { accountInfo } = useAuthInfo();
  const { airportSuggestions, fetchAirports } = useAirports();

  const email = accountInfo?.emails?.length ? accountInfo.emails[0] : "";
  const firstName = accountInfo?.name?.split(" ")[0] ?? "";
  const lastName = accountInfo?.name?.split(" ")[1] ?? "";
  const userId = accountInfo?.oid ?? accountInfo?.sub;

  // Editable User Preferences State
  const [preferences, setPreferences] = useState<UserPreferences>({
    originAirport: "",
    destinationAirport: "",
    travelClass: "Economy",
    stopOvers: "Non-Stop",
    userId: userId ?? "",
  });

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleAirportSelect = (airportCode: string, field: string) => {
    setPreferences({ ...preferences, [field]: airportCode });
  };

  const handleSavePreferences = async () => {
    try {
      validatePreferences(preferences);
      
      const response = await fetch("/api/user/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      if (response.ok) {
        alert("Preferences saved successfully!");
      } else {
        alert("Error saving preferences.");
      }
    } catch (error) {
      console.error("Failed to save preferences", error);
      alert("Network error!");
    }
  };

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
        onSave={handleSavePreferences}
        onAirportInputChange={fetchAirports}
        airportSuggestions={airportSuggestions}
        onAirportSelect={handleAirportSelect}
      />
    </div>
  );
};

function validatePreferences(preferences: UserPreferences) {
  if(preferences.userId === "") {
    throw new Error("User ID is required.");
  }
}
