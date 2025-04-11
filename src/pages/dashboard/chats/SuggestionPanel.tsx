import React from 'react';
import { PopData } from '../../../components/layout/PopData';
import SuggestionButton from './SuggestionButton';

export interface AirportSuggestion {
    name: string;
    city: string;
    code: string;
}

interface SuggestionPanelProps {
    visible: boolean;
    position: string;
    lastMessage?: string;
    entryMessage?:string;
    airportSuggestions?: AirportSuggestion[];
    searchParam: string;
    onSelect: (selected: string) => void;
    editContent?: boolean;
}

const SuggestionPanel: React.FC<SuggestionPanelProps> = ({
    visible,
    position,
    lastMessage,
    entryMessage,
    airportSuggestions,
    searchParam,
    onSelect,
    editContent = false,
}) => {
    if (!visible) return null;

    const getSuggestionContent = () => {
        if (lastMessage?.includes('class')) {
            return ['First class', 'Business class', 'Premium Economy', 'Economy'].map((item, idx) => (
                <SuggestionButton key={idx} text={item} onClick={() => onSelect(item)} />
            ));
        }

        if (lastMessage?.includes('route')) {
            return ['One way Trip', 'Round Trip', 'Multi city'].map((route, idx) => (
                <SuggestionButton key={idx} text={route} onClick={() => onSelect(route)} />
            ));
        }

        const query = searchParam.trim().toLowerCase();
        if (!query || !airportSuggestions) return null;

        const exactMatches = airportSuggestions.filter(airport => {
            return airport.code.toLowerCase() === query;
        });

        let filteredAirports = exactMatches.length > 0
            ? exactMatches
            : airportSuggestions.filter(airport => {
                const code = airport.code.toLowerCase();
                const name = airport.name.toLowerCase();
                const city = airport.city.toLowerCase();

                if (code.startsWith(query)) return true;

                if (city === query || city.startsWith(query)) return true;

                if (name.startsWith(query)) return true;

                if (city.split(' ').some(word => word === query || word.startsWith(query))) return true;
                if (name.split(' ').some(word => word === query || word.startsWith(query))) return true;

                if (query.length >= 3 && (code.includes(query) || city.includes(query) || name.includes(query))) 
                    return true;
                
                return false;
            });

        // Sort results by relevance:
        filteredAirports = filteredAirports.sort((a, b) => {
            // Exact code matches come first.
            if (a.code.toLowerCase() === query) return -1;
            if (b.code.toLowerCase() === query) return 1;
            // Then code starts with.
            if (a.code.toLowerCase().startsWith(query)) return -1;
            if (b.code.toLowerCase().startsWith(query)) return 1;
            // Then city exact match.
            if (a.city.toLowerCase() === query) return -1;
            if (b.city.toLowerCase() === query) return 1;
            return a.code.localeCompare(b.code);
        }).slice(0, 8);

        return filteredAirports?.map((airport, idx) => (
            <SuggestionButton
                key={idx}
                text={`${airport.name} (${airport.code})`}
                onClick={() => onSelect(`${airport.name} (${airport.code})`)}
            />
        )) || null;
    };

    const editSuggestionContent = () => {
        const classKeywords = ['first class', 'economy', 'business class', 'premium economy'];
        const routeKeywords = ['one way trip', 'round trip', 'multi city'];
    
        if (classKeywords.some(keyword => entryMessage?.toLowerCase().includes(keyword))) {
            return classKeywords.map((item, idx) => (
                <SuggestionButton key={idx} text={item} onClick={() => onSelect(item)} />
            ));
        }
    
        if (routeKeywords.some(keyword => entryMessage?.toLowerCase().includes(keyword))) {
            return routeKeywords.map((route, idx) => (
                <SuggestionButton key={idx} text={route} onClick={() => onSelect(route)} />
            ));
        }
    
        const query = searchParam.trim().toLowerCase();
        if (!query || !airportSuggestions) return null;
    
        const exactMatches = airportSuggestions.filter(airport => airport.code.toLowerCase() === query);
    
        const filteredAirports = exactMatches.length > 0
            ? exactMatches
            : airportSuggestions.filter(airport => {
                const code = airport.code.toLowerCase();
                const name = airport.name.toLowerCase();
                const city = airport.city.toLowerCase();
    
                return (
                    code.startsWith(query) ||
                    city === query ||
                    city.startsWith(query) ||
                    name.startsWith(query) ||
                    city.split(' ').some(word => word.startsWith(query)) ||
                    name.split(' ').some(word => word.startsWith(query)) ||
                    (query.length >= 3 && (code.includes(query) || city.includes(query) || name.includes(query)))
                );
            });
    
        const sortedAirports = filteredAirports.sort((a, b) => {
            if (a.code.toLowerCase() === query) return -1;
            if (b.code.toLowerCase() === query) return 1;
            if (a.code.toLowerCase().startsWith(query)) return -1;
            if (b.code.toLowerCase().startsWith(query)) return 1;
            if (a.city.toLowerCase() === query) return -1;
            if (b.city.toLowerCase() === query) return 1;
            return a.code.localeCompare(b.code);
        }).slice(0, 8);
    
        return sortedAirports.map((airport, idx) => (
            <SuggestionButton
                key={idx}
                text={`${airport.name} (${airport.code})`}
                onClick={() => onSelect(`${airport.name} (${airport.code})`)}
            />
        ));
    };

    return <PopData visibility={visible} position={position}>{ editContent ? editSuggestionContent() : getSuggestionContent()}</PopData>;
};

export default SuggestionPanel;