import React, {useEffect, useState} from 'react';
import {House,Trash2,User,Headset, LogOut,} from 'lucide-react';
import { PiHeadsetFill, PiRoadHorizonBold, PiRoadHorizonFill, PiTrashFill } from 'react-icons/pi';
import { RiHome5Fill, RiUserFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { Btn } from '../../../components/ui/Button';
import { ClearChat } from '../../../components/modals/ClearChat';
import { ReturnContent } from '../../../components/modals/LogoutModal';
import { Modal } from '../../../components/modals/Modal';
import authService from '../../../services/authService';
import { CustomStorage } from '../../../utils/customStorage';
import { HomeContent } from './HomeContent';
import { PathContent } from './PathContent';
import { SupportContent } from './SupportContent';
import { TrashContent } from './TrashContent';
import { UserContent } from './UserContent';
import { GlobalContext } from '../../../hooks/globalContext';
import FlightOffersModal from '../../../components/modals/FlightOffersModal';
import { offers } from '../../../components/layout/offers';


const storage = new CustomStorage();

export const RightPane: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>('home');
  const {showLogoutModal,
    setShowLogoutModal, 
    showDeleteModal, 
    setShowDeleteModal, 
    toggleDeleteModal,
    toggleLogoutModal,
    RecentPrompts,
    setNavigationData,
    showFlightModal,
    toggleFlightModal
  } = React.useContext(GlobalContext);

  const sidebarOptions = [
    { id: 'home', icon: <House size={24} />, icon2: <RiHome5Fill />, label: 'Home' },
    { id: 'road', icon: <PiRoadHorizonBold size={24} />, icon2: <PiRoadHorizonFill />, label: 'Trips' },
    { id: 'trash', icon: <Trash2 size={24} />, icon2: <PiTrashFill />, label: 'Clear Chat' },
    { id: 'user', icon: <User size={24} />, icon2: <RiUserFill />, label: 'Profile' },
    { id: 'support', icon: <Headset size={24} />, icon2: <PiHeadsetFill />, label: 'Support' },
  ];

  useEffect(() => {
    setNavigationData(sidebarOptions);
  },[])

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    authService.signOut();
    navigate(`/`)
  };

  const handleConfirmDelete = () => {
    storage.removeItem('RecentPrompts');
    storage.removeItem('chatLog');
    setShowDeleteModal(false);
    window.location.reload();
  };

  const renderContentsHere = () => {
    switch (selectedTab) {
      case 'home':
        return (
          <HomeContent
            departure={RecentPrompts?.[0] ?? ''} 
            destination={RecentPrompts?.[1] ?? ''} 
            departureDate={RecentPrompts?.[2] ?? ''} 
            returnDate={RecentPrompts?.[3] ?? ''} 
            travelRoute={RecentPrompts?.[4] ?? ''} 
            flightClass={RecentPrompts?.[5] ?? ''}
          />
        );

      case 'road':
        return (
          <PathContent 
            departure={RecentPrompts?.[0] ?? ''} 
            destination={RecentPrompts?.[1] ?? ''} 
            departureDate={RecentPrompts?.[2] ?? ''} 
            returnDate={RecentPrompts?.[3] ?? ''} 
            travelRoute={RecentPrompts?.[4] ?? ''} 
            flightClass={RecentPrompts?.[5] ?? ''}
          />
        );

      case 'trash':
        return (
          <TrashContent />
        );

      case 'user':
        return (
          <UserContent />
        );

      case 'support':
        return (
          <SupportContent />
        );
    }
  };

  return (
    <>
      <div className="hidden lg:flex w-[40%] h-screen">
        <div className="w-[10%] items-center px-10 py-[60px] border gap-6 flex flex-col">
          {sidebarOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => {
                setSelectedTab(option.id);
                if (option.id === 'trash') {
                  toggleDeleteModal();
                }
              }}
              className={`relative group text-primary-600 text-3xl cursor-pointer hover:scale-110 transition duration-300 `}
            >
              {selectedTab === option.id ? option.icon2 : option.icon}
              <span className='absolute inset-0 z-5 hidden group-hover:flex justify-center items-center 
                px-2 py-1 bg-neutral-100 rounded-md border border-neutral-300 text-primary-600 font-bold text-xs size-fit
                text-nowrap left-8'
              >
                {option?.label}
              </span>
            </div>
          ))}
          <div className='relative group h-fit'>
            <Btn
              onClick={toggleLogoutModal}
              className="text-primary-600 rounded-none border-none"
            >
              <LogOut size={24} />
            </Btn>
            <span className='absolute top-3 left-14 z-5 hidden group-hover:flex justify-center items-center 
                px-2 py-1 bg-neutral-100 rounded-md border border-neutral-300 text-primary-600 font-bold text-xs size-fit
                text-nowrap'
            >
               Log out 
            </span>
          </div>
        </div>
        <div className="bg-white w-full shadow-md ">
          <div className=" flex flex-col h-full justify-between pt-12">
            <div className="max-w-[480px] overflow-y-auto px-8 ">
              {renderContentsHere()}
            </div>
            <div className=" h-30 border-t items-center flex p-7">
              <Btn
                className={`${
                  Array.isArray(RecentPrompts) && RecentPrompts.length >= 6 
                    ? 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-white  '
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                } p-1 w-full max-w-[385px]`}
                onClick={()=> {
                  if(Array.isArray(RecentPrompts) && RecentPrompts?.length >= 6) {
                    toggleFlightModal()
                  }
                }}
              >
                Search
              </Btn>
            </div>
          </div>
        </div>
      </div>
      <Modal display={showDeleteModal} close={toggleDeleteModal}>
        <ClearChat Action={toggleDeleteModal} ConfirmAction={handleConfirmDelete} />
      </Modal>

      <Modal display={showLogoutModal} close={toggleLogoutModal}>
        <ReturnContent
          Action={toggleLogoutModal}
          ConfirmAction={handleConfirmLogout}
        />
      </Modal>
      <Modal
        position="absolute"
        close={toggleFlightModal}
        display={showFlightModal}
      >
        <FlightOffersModal offers={offers} onClose={toggleFlightModal} />
      </Modal>
    </>
  );
};