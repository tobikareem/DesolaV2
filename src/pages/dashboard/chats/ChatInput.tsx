import React from 'react';
import { IoSend } from 'react-icons/io5';
import { Input } from '../../../components/ui/InputField';

interface ChatInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
    onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    suggestionsVisible: boolean;
    setSuggestionsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatInput: React.FC<ChatInputProps> = ({
    value,
    onChange,
    onSend,
    onKeyPress,
    onFocus
}) => {
    return (
        <div className="relative w-full p-2 flex items-center justify-center bg-white border-t h-30">
            <div className="items-center max-w-[678px] w-full rounded-2xl py-4 px-8 flex message bg-tint">
                <Input
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyPress}
                    onFocus={onFocus}
                    type="text"
                    placeholder="Please Enter Your Message"
                    className="text-xl flex-grow bg-transparent focus:bg-transparent border-0 rounded-lg outline-0"
                />
                <IoSend
                    onClick={onSend}
                    className={`${value.length >= 4 ? 'text-primary-600' : 'text-neutral-400'} cursor-pointer`}
                    size={24}
                />
            </div>
        </div>
    );
};

export default ChatInput;
