import { ReactNode, useState } from "react";
import { UIContext } from "../contexts/UIContext";

interface UIProviderProps {
    children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFlightModal, setShowFlightModal] = useState(false);

    const openModal = (modalType: 'logout' | 'delete' | 'flight') => {
        if (modalType === 'logout') setShowLogoutModal(true);
        if (modalType === 'delete') setShowDeleteModal(true);
        if (modalType === 'flight') setShowFlightModal(true);
    };

    const closeModal = (modalType: 'logout' | 'delete' | 'flight') => {
        if (modalType === 'logout') setShowLogoutModal(false);
        if (modalType === 'delete') setShowDeleteModal(false);
        if (modalType === 'flight') setShowFlightModal(false);
    };

    const toggleModal = (modalType: 'logout' | 'delete' | 'flight') => {
        if (modalType === 'logout') setShowLogoutModal(prev => !prev);
        if (modalType === 'delete') setShowDeleteModal(prev => !prev);
        if (modalType === 'flight') setShowFlightModal(prev => !prev);
    };

    return (
        <UIContext.Provider value={{
            showLogoutModal,
            showDeleteModal,
            showFlightModal,
            openModal,
            closeModal,
            toggleModal
        }}>
            {children}
        </UIContext.Provider>
    );
};