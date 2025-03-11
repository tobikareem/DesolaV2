// Airport suggestion item type
type Airport = {
    code: string;
    name: string;
    city: string;
};


// Airport suggestion dropdown component
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
        <select
            name="airportSuggestions"
            title="airportSuggestions"
            id={id}
            className="absolute bg-white border shadow-lg rounded-lg w-full max-h-48 overflow-y-auto"
            size={Math.min(suggestions.length, 5)} // Show up to 5 options at once. // TODO: probably do a server side pagination
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
