import { useState } from 'react';

export const useModals = (): {
    showEditModal: boolean;
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    showCalendar: boolean;
    setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
    showPopData: boolean;
    setShowPopData: React.Dispatch<React.SetStateAction<boolean>>;
    searchParam: string;
    setSearchParam: React.Dispatch<React.SetStateAction<string>>;
} => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [showPopData, setShowPopData] = useState<boolean>(false);
    const [searchParam, setSearchParam] = useState<string>('');

    return { showEditModal, setShowEditModal, showCalendar, setShowCalendar, showPopData, setShowPopData, searchParam, setSearchParam };
};
