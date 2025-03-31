import { useState } from 'react';

export const useModals = (): {
    showEditModal: boolean;
    setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    showCalendar: boolean;
    setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
    showPopData: boolean;
    setShowPopData: React.Dispatch<React.SetStateAction<boolean>>;
} => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [showPopData, setShowPopData] = useState<boolean>(false);

    return { showEditModal, setShowEditModal, showCalendar, setShowCalendar, showPopData, setShowPopData };
};
