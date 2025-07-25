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
            className={`relative group lg:z-[5]  text-primary-600 text-3xl cursor-pointer hover:scale-110 transition duration-300`}
        >
            {isActive ? activeIcon : icon}
            <span className="absolute inset-0 lg:z-[6] hidden group-hover:flex justify-center items-center 
                px-2 py-1 bg-neutral-300 rounded-md border border-neutral-300 text-primary-600 
                font-bold text-xs size-fit text-nowrap left-8 "
            >
                {label}
            </span>
        </div>
    );
};