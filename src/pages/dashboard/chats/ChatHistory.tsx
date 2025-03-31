import React, { useEffect, useRef } from 'react';
import { BsStars } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { TbPropeller } from 'react-icons/tb';

export interface ChatMessage {
    message: string;
    sender: 'user' | 'bot';
}

interface ChatHistoryProps {
    chatLog: ChatMessage[];
    botLoader: boolean;
    isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ chatLog, botLoader, isLoading }) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatLog]);

    if (isLoading) {
        return (
            <div className="flex w-full h-full items-center justify-center text-5xl animate-spin duration-300 transition-transform text-primary-600 pointer-events-none">
                <TbPropeller />
            </div>
        );
    }

    return (
        <div
            ref={chatContainerRef}
            className="relative flex flex-col flex-1 bg-background space-y-6 mt-6 lg:mt-0 p-5 lg:pl-20 overflow-y-auto"
        >
            {chatLog.map((chat, index) => {
                const isUser = chat.sender === 'user';
                const isLastBotMessage = !isUser && index === chatLog.length - 1 && botLoader;
                return (
                    <div
                        key={index}
                        className={`font-work flex ${isUser ? 'justify-end' : 'items-start'} space-x-2`}
                    >
                        <div className={`${isUser ? 'bg-white text-primary-500' : 'bg-primary-500 text-white'} flex items-center justify-center size-10 rounded-full text-lg border border-neutral-300`}>
                            {isUser ? <FaUser /> : <BsStars />}
                        </div>
                        <span className={`${isUser ? 'bg-secondary-100' : 'bg-primary-100'} text-neutral p-3 rounded-lg text-xs sm:text-sm md:text-base`}>
                            {isLastBotMessage ?
                                <span className="text-3xl text-neutral-500 animate-pulse duration-75">...</span> :
                                chat.message}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default ChatHistory;
