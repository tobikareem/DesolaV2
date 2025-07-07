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
    showSubscriptionModal: boolean;
    setShowSubscriptionModal: React.Dispatch<React.SetStateAction<boolean>>;
    toggleSubscriptionModal: () => void;
} => {
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [showPopData, setShowPopData] = useState<boolean>(false);
    const [searchParam, setSearchParam] = useState<string>('');
    const [showSubscriptionModal, setShowSubscriptionModal] = useState<boolean>(false);
    const toggleSubscriptionModal =()=> setShowSubscriptionModal(!showSubscriptionModal);

    return { showEditModal, setShowEditModal, showCalendar, setShowCalendar, 
        showPopData, setShowPopData, searchParam, setSearchParam, showSubscriptionModal, setShowSubscriptionModal, toggleSubscriptionModal };
};
