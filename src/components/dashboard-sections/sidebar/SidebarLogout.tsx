import React, { ReactNode } from 'react';
import { Btn } from '../../ui/Button';

interface SidebarLogoutProps {
    icon: ReactNode;
    onClick: () => void;
}

export const SidebarLogout: React.FC<SidebarLogoutProps> = ({ icon, onClick }) => {
    return (
        <div className='relative group h-fit'>
            <Btn
                onClick={onClick}
                className="text-primary-600 rounded-none border-none"
            >
                {icon}
            </Btn>
            <span className='absolute top-3 left-14 z-5 hidden group-hover:flex justify-center items-center 
          px-2 py-1 bg-neutral-200 rounded-md border border-neutral-300 text-primary-600 font-bold text-xs size-fit
          text-nowrap'
            >
                Log out
            </span>
        </div>
    );
};