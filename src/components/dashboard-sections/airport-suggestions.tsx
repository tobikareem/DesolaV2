
import { Listbox, ListboxOption } from '@headlessui/react'

type Airport = {
    code: string;
    name: string;
    city: string;
};


export const AirportSuggestions = ({
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
        <div className="absolute z-10 bg-neutral-200 border shadow-lg rounded-lg w-full overflow-hidden mt-1">
            <Listbox
                name="airportSuggestions"
                onChange={(value) => onSelect(value)}
            >
            <ListboxOption value="" disabled className={'font-work border-b border-neutral-100 w-full px-4 py-2 hover:bg-primary-600 hover:text-white text-Neutral text-xs font-medium cursor-pointer'}>
                Select an airport
            </ListboxOption>
            {suggestions?.slice(0,5).map((airport) => (
                <ListboxOption
                    key={airport.code}
                    value={airport.code}
                    id={id}
                    className="font-work border-b border-neutral-100 w-full px-4 py-2 hover:bg-primary-600 hover:text-white text-Neutral text-xs font-medium cursor-pointer"
                >
                    {airport.name} ({airport.code}) - {airport.city}
                </ListboxOption>
            ))}
            </Listbox>
        </div>
    );
};
