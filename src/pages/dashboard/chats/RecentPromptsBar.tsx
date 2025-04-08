import { PenLine } from 'lucide-react';
import React from 'react';
import { useScroll } from '../../../hooks/useSmoothScroll';

export interface RecentPromptsBarProps {
    prompts: string[];
    onEditClick: () => void;
}

export const getPromptColor = (index: number): string => {
    const colors = [
        'bg-primary-100', 'bg-secondary-100', 'bg-neutral-300',
        'bg-[#5C88DA60]', 'bg-[#CAFFD640]', 'bg-[#96962240]',
        'bg-[#FFC097]', 'bg-secondary-100', 'bg-neutral-300', 'bg-[#5C88DA80]'
    ];
    return colors[index % colors.length] || 'bg-primary-100';
};



const RecentPromptsBar: React.FC<RecentPromptsBarProps> = ({ prompts, onEditClick }) => {

    const {scrollContainerRef, handleScroll} = useScroll()
    

    return (
        <div
            ref={scrollContainerRef}
            onWheel={handleScroll}
            className="hidden lg:flex h-24 w-full overflow-y-hidden overflow-x-auto whitespace-nowrap no-scrollbar items-center gap-2 p-10 border-b bg-neutral-100"
        >
            {prompts.map((item, idx) => (
                <div
                    key={idx}
                    className={`flex items-center space-x-2 ${getPromptColor(idx)} py-2 px-5 rounded-full`}
                >
                    <span className="text-sm text-neutral rounded-lg max-w-[200px] truncate">
                        {item}
                    </span>
                    <PenLine onClick={onEditClick} className="cursor-pointer" size={16} />
                </div>
            ))}
        </div>
    );
};

export default RecentPromptsBar;
