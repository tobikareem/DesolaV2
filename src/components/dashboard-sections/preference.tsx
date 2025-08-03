import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useAuthInfo } from "../../hooks/useAuthInfo";
import useCustomerApi from "../../hooks/useCustomerApi";
import { Airport, UserPreferences } from "../../hooks/useDashboardInfo";
import { CustomerSignupRequest } from "../../models/payment/CustomerSignupRequest";
import { Btn } from "../ui/Button";
import { Input } from "../ui/InputField";
import { Text } from "../ui/TextComp";
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
    preferences?: UserPreferences;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSave?: () => void;
    onAirportInputChange?: (value: string) => void;
    airportSuggestions?: Airport[];
    onAirportSelect?: (code: string, field: string) => void;
}) => {
    const { customerProfile } = useAuthInfo();
    const { updateCustomer } = useCustomerApi();
    const [activeField, setActiveField] = useState<string | null>(null);
    const [filteredSuggestions, setFilteredSuggestions] = useState<Airport[]>(airportSuggestions || []);

    useEffect(() => {
        setFilteredSuggestions(airportSuggestions || []);
    }, [airportSuggestions]);
    const savePreferences = preferences || {
        originAirport: "",
        destinationAirport: "",
        travelClass: "Economy",
        stopOvers: "Non-Stop",
        userId: "",
    };

    const handleAirportInputChange = (value: string) => {
        const suggestions = airportSuggestions || [];
        const filtered = suggestions.filter(
            (airport) =>
                airport.name.toLowerCase().includes(value.toLowerCase()) ||
                airport.city.toLowerCase().includes(value.toLowerCase()) ||
                airport.code.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    };

    const customerData: CustomerSignupRequest = {
        fullName: customerProfile?.fullName || '',
        email: customerProfile?.email || '',
        phone: customerProfile?.phone || '',
        preferredCurrency: 'USD',
        defaultOriginAirport: preferences?.originAirport,
        metadata: {}
    }

    return (
        <div className="h-fit">
            <Text as="h2" size="xl" weight="bold" className="text-primary-500 mb-4">
                Travel Preferences
            </Text>
            {/* Origin Airport */}
            <div className="h-full">
                <div className="mb-4">
                    <label htmlFor="originAirportInput" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Origin Airport
                    </label>
                    <div className="relative">
                        <Input
                            id="originAirportInput"
                            type="text"
                            name="originAirport"
                            value={savePreferences.originAirport}
                            onChange={(e) => {
                                onChange?.(e);
                                onAirportInputChange?.(e.target.value);
                                setActiveField("originAirport");
                                handleAirportInputChange(e.target.value);
                            }}
                            className="w-full px-4 py-2 border rounded-[10px]"
                            onBlur={() => setTimeout(() => setActiveField(null), 200)}
                            placeholder="Search airports..."
                        />
                        <AirportSuggestions
                            id="origin-airport-suggestions"
                            suggestions={filteredSuggestions}
                            onSelect={(code) => onAirportSelect?.(code, "originAirport")}
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
                            value={savePreferences.destinationAirport}
                            onChange={(e) => {
                                onChange?.(e);
                                onAirportInputChange?.(e.target.value);
                                setActiveField("destinationAirport");
                                handleAirportInputChange(e.target.value);
                            }}
                            className="w-full px-4 py-2 border rounded-[10px]"
                            onBlur={() => setTimeout(() => setActiveField(null), 200)}
                            placeholder="Search airports..."
                        />
                        <AirportSuggestions
                            id="destination-airport-suggestions"
                            suggestions={filteredSuggestions}
                            onSelect={(code) => onAirportSelect?.(code, "destinationAirport")}
                            isVisible={activeField === "destinationAirport"}
                        />
                    </div>
                </div>

                {/* Travel Class Selection */}
                <div className="mb-4 relative">
                    <label htmlFor="travelClass" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Class of Travel
                    </label>
                    <Listbox
                        name="travelClass"
                        value={savePreferences.travelClass}
                        onChange={(value) => {
                            onChange?.({target:{ name: 'travelClass', value }} as React.ChangeEvent<HTMLSelectElement>)
                        }}
                    >
                        <ListboxButton className="font-work flex items-center w-full border px-4 py-2 rounded-[10px] justify-between hover:bg-neutral-300 text-Neutral font-medium">
                            <span>
                                {savePreferences.travelClass}
                            </span>
                            <MdKeyboardArrowDown />
                        </ListboxButton>
                        <ListboxOptions className={`absolute w-full border border-neutral-300 rounded-[10px] mt-1 bg-neutral-300 z-10 overflow-hidden`}>
                            {
                                ['Economy', 'Business', 'First Class'].map((option) => (

                                    <ListboxOption value={option}
                                        key={option}
                                        className="font-work border-b border-neutral-100 w-full px-4 py-2 data-[focus]:bg-primary-600 data-[focus]:text-white text-Neutral font-medium cursor-pointer"

                                    >
                                        {option}
                                    </ListboxOption>
                                ))
                            }
                        </ListboxOptions>
                    </Listbox>
                </div>

                {/* Stop-Overs Selection */}
                <div className="mb-6 relative">
                    <label htmlFor="stopOvers" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Stop-Overs
                    </label>
                    <Listbox
                        name="stopOvers"
                        value={savePreferences.stopOvers}
                        onChange={(value) => {
                            onChange?.({ target: { name: 'stopOvers', value } } as React.ChangeEvent<HTMLSelectElement>)
                        }}
                    >
                        <ListboxButton className="font-work flex items-center w-full border px-4 py-2 rounded-[10px] justify-between hover:bg-neutral-300 text-Neutral font-medium">
                            <span>
                                {savePreferences.stopOvers}
                            </span>
                            <MdKeyboardArrowDown />
                        </ListboxButton>
                        <ListboxOptions className={`absolute w-full border border-neutral-300 rounded-[10px] mt-1 bg-neutral-300 z-10 overflow-hidden`}>
                            {
                                ['Non-Stop', '1 Stop', '2+ Stops'].map((option) => (

                                    <ListboxOption value={option}
                                        key={option}
                                        className="font-work border-b border-neutral-100 w-full px-4 py-2 data-[focus]:bg-primary-600 data-[focus]:text-white text-Neutral font-medium cursor-pointer"

                                    >
                                        {option}
                                    </ListboxOption>
                                ))
                            }
                        </ListboxOptions>
                    </Listbox>
                </div>

                <Btn onClick={() => { onSave?.(); updateCustomer({ ...customerData }) }} className="hover:!scale-95 w-full bg-success text-white px-6 py-2 mb-20">
                    Save Preferences
                </Btn>
            </div>
        </div>
    );
};