import React, { ReactNode } from 'react';

interface SidebarTabProps {
    id: string;
    icon: ReactNode;
    activeIcon: ReactNode;
    label: string;
    isActive: boolean;
    onClick: (id: string) => void;
}

export const SidebarTab: React.FC<SidebarTabProps> = ({
    id,
    icon,
    activeIcon,
    label,
    isActive,
    onClick
}) => {
    return (
        <div
            onClick={() => onClick(id)}
            className={`relative group  text-primary-600 text-3xl cursor-pointer hover:scale-110 transition duration-300`}
        >
            {isActive ? activeIcon : icon}
            <span className="absolute inset-0 z-5 hidden group-hover:flex justify-center items-center 
                px-2 py-1 bg-neutral-200 rounded-md border border-neutral-300 text-primary-600 
                font-bold text-xs size-fit text-nowrap left-8 backdrop-blur-sm"
            >
                {label}
            </span>
        </div>
    );
};