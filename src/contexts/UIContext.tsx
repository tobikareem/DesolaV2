import { createContext } from 'react';
import { UIContextType } from './types';

export const UIContext = createContext<UIContextType>({
  showLogoutModal: false,
  showDeleteModal: false,
  showFlightModal: false,
  openModal: () => { },
  closeModal: () => { },
  toggleModal: () => { }
});
