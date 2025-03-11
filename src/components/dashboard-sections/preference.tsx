import { useState } from "react";
import { Text } from "../../components/TextComp";
import { Airport, UserPreferences } from "../../hooks/useDashboardInfo";
import { Btn } from "../Button";
import { Input } from "../InputField";
import { AirportSuggestions } from "./airport-suggestions";

// Editable preferences section
export const PreferencesSection = ({
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
                    <Input
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
                    <Input
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

            <Btn
                onClick={onSave}
                className="w-full bg-success text-white px-6 py-2"
            >
                Save Preferences
            </Btn>
        </div>
    );
};