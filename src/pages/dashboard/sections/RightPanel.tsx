import React, { useEffect, useState} from 'react';
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

  const {setNavigationData} = React.useContext(GlobalContext);

  const [selectedTab, setSelectedTab] = useState<string>('home');
  const {showLogoutModal,
    setShowLogoutModal, 
    showDeleteModal, 
    setShowDeleteModal, 
    toggleDeleteModal,
    toggleLogoutModal
  } = React.useContext(GlobalContext);

  const [showFlightModal, setShowFlightModal] = useState<boolean>(false);

  const sidebarOptions = [
    { id: 'home', icon: <House size={24} />, icon2: <RiHome5Fill />, label: 'Home' },
    { id: 'road', icon: <PiRoadHorizonBold size={24} />, icon2: <PiRoadHorizonFill />, label: 'Trip' },
    { id: 'trash', icon: <Trash2 size={24} />, icon2: <PiTrashFill />, label: 'Clear Chat' },
    { id: 'user', icon: <User size={24} />, icon2: <RiUserFill />, label: 'Profile' },
    { id: 'support', icon: <Headset size={24} />, icon2: <PiHeadsetFill />, label: 'Support' },
  ];

  useEffect(() => {
    setNavigationData(sidebarOptions);
  },[])

  //We can later tweak this to get data from the Api request

  // const offers = [
  //   {
  //     airlineLogo: airFlightLogo, 
  //     departureTime: '10:30 AM',
  //     date: '04/25/2025',
  //     duration: '6h 30m',
  //     classType: 'Economy',
  //     stops: '1',
  //     route: 'Lagos (LOS) → New York (JFK)',
  //     aircraft: 'Boeing 787',
  //     price: '$450',
  //     websiteLink: 'https://www.example.com',
  //   },
  // ];

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    authService.signOut();
    navigate(`/`)
  };

  const handleConfirmDelete = () => {
    storage.removeItem('RecentPrompts');
    setShowDeleteModal(false);
    window.location.reload();
  };

  const toggleFlightModal = () => {
    setShowFlightModal(prevState => !prevState)
  }


  const renderContentsHere = () => {
    switch (selectedTab) {
      case 'home':
        return (
          <HomeContent
            departure={''} destination={''} departureDate={''} returnDate={''} travelRoute={''} flightClass={''}
          />
        );

      case 'road':
        return (
          <PathContent departure={''} destination={''} departureDate={''} returnDate={''} travelRoute={''} flightClass={''} />
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
              className={`text-primary-600 text-3xl cursor-pointer hover:scale-110 transition duration-300 `}
            >
              {selectedTab === option.id ? option.icon2 : option.icon}
            </div>
          ))}
          <Btn
            onClick={toggleLogoutModal}
            className="text-primary-600 rounded-none border-none"
          >
            <LogOut size={24} />
          </Btn>
        </div>
        <div className="bg-white w-full shadow-md ">
          <div className=" flex flex-col h-full justify-between pt-12">
            <div className="max-w-[480px] overflow-y-auto px-8 ">
              {renderContentsHere()}
            </div>
            <div className=" h-30 border-t items-center flex p-7">
              <Btn
                className={`${
                  selectedTab === 'road'
                    ? 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-white '
                    : 'bg-neutral-300 text-neutral-500'
                } p-1 w-full max-w-[385px]`}
                onClick={toggleFlightModal}
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