import React, {useState} from 'react';

import {
  House,
  Trash2,
  User,
  Headset,
  LogOut,
} from 'lucide-react';


import { PiHeadsetFill, PiRoadHorizonBold, PiRoadHorizonFill, PiTrashFill } from 'react-icons/pi';
import { Btn } from '../../components/Button';
import { SupportContent } from './sections/SupportContent';
import { TrashContent } from './sections/TrashContent';
import { UserContent } from './sections/UserContent';
import authService from '../../services/authService';
import { useNavigate } from 'react-router';
import { RiHome5Fill, RiUserFill } from 'react-icons/ri';
import { HomeContent } from './sections/HomeContent';
import { PathContent } from './sections/PathContent';
import { Modal } from '../../components/modals/Modal';
import { ReturnContent } from './sections/ReturnContent';

interface RightPaneProps {
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}

export const RightPane: React.FC<RightPaneProps> = () =>{
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState<string>('home');
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);




  const sidebarOptions = [
    { id: 'home', icon: <House size={24} />, icon2: <RiHome5Fill />, label: 'Home' },
    { id: 'road', icon: <PiRoadHorizonBold size={24} />, icon2:<PiRoadHorizonFill />,label: 'Road' },
    { id: 'trash', icon: <Trash2 size={24} />, icon2:<PiTrashFill />, label: 'Trash' },
    { id: 'user', icon: <User size={24} />, icon2:<RiUserFill />,label: 'User Profile' },
    { id: 'support', icon: <Headset size={24} />, icon2:<PiHeadsetFill />, label: 'Support' },
  ];

   
  const toggleModal =()=> {
    setShowLogoutModal(prevState => !prevState) 
  }
  
    const handleConfirmLogout = () => {
      setShowLogoutModal(false);
      authService.signOut();
      navigate(`/`)
    };


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
          <PathContent departure={''} destination={''} departureDate={''} returnDate={''} travelRoute={''} flightClass={''}/>
        );
  
      case 'trash':
        return (
          <TrashContent/>
        );
  
      case 'user':
        return (
          <UserContent/>
        );
  
      case 'support':
        return (
          <SupportContent/>
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
              onClick={() => setSelectedTab(option.id)}
              className={`text-primary-600 text-3xl cursor-pointer hover:scale-110 transition duration-300 `}
            >
              {selectedTab === option.id ? option.icon2 : option.icon}
            </div>
          ))}
          <Btn onClick={toggleModal}
            className='text-primary-600 rounded-none border-none'
          >
            <LogOut size={24} />
          </Btn>
        </div>
        <div className="bg-white w-full shadow-md ">
          <div className="max-w-[480px] flex flex-col h-full justify-between pt-12 px-8 ">
            {renderContentsHere()}
            <div className=" h-30 border-t items-center flex p-7">
              <Btn className={`${selectedTab === 'road' ? 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-white ':'bg-neutral-300 text-neutral-500'} p-1 w-full max-w-[385px]`}>
                Search
              </Btn>
            </div>
          </div>
        </div>
      </div>


      <Modal display={showLogoutModal} close={toggleModal}>
        <ReturnContent Action={toggleModal} ConfirmAction={handleConfirmLogout}/>
      </Modal>
    </>
  );
};
