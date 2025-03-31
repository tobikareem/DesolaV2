import React from 'react';
import { Text } from '../../../components/ui/TextComp';

interface SuggestionButtonProps {
    text: string;
    onClick: () => void;
}

const SuggestionButton: React.FC<SuggestionButtonProps> = ({ text, onClick }) => (
    <button
        type="submit"
        className="flex items-center p-3 px-6 border-b border-neutral-300"
        onClick={onClick}
    >
        <Text size="xs" color="text-neutral-500 text-left" className="font-work">
            {text}
        </Text>
    </button>
);

export default SuggestionButton;
