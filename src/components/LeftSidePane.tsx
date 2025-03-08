import React, {useState} from 'react';
import CaseContents from './CaseContents';
import FlightOffersModal from '../pages/result/FlightOffersModal';
import airlineLogo from '../assets/Icon.jpeg (1).png';

import {

  House,
  Trash2,
  User,
  Headset,
  LogOut,
} from 'lucide-react';


import { PiRoadHorizonBold } from 'react-icons/pi';
import { Btn } from './Button';
interface LeftPaneProps {
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}

export const LeftPane: React.FC<LeftPaneProps> = ({
  departure,
  destination,
  departureDate,
  returnDate,
  travelRoute,
  flightClass,
}) => {
  const [selectedTab, setSelectedTab] = useState<string>('home');
const [isModalOpen, setIsModalOpen] = React.useState(false);

  const sidebarOptions = [
    { id: 'home', icon: <House size={24} />, label: 'Home' },
    { id: 'road', icon: <PiRoadHorizonBold size={24} />, label: 'Road' },
    { id: 'trash', icon: <Trash2 size={24} />, label: 'Trash' },
    { id: 'user', icon: <User size={24} />, label: 'User Profile' },
    { id: 'support', icon: <Headset size={24} />, label: 'Support' },
    { id: 'logout', icon: <LogOut size={24} />, label: 'Logout' },
  ];

  const offersData = [
    {
      airlineLogo: airlineLogo,
      departureTime: '2pm',
      date: 'Fri, Feb 28',
      duration: '16hrs',
      classType: 'Economy',
      stops: '2',
      route: 'SMF–ORD',
      aircraft: 'Boeing 737CM 229',
      price: 'NGN 474,796',
      websiteLink: '#',
    },
  ];

  const renderContentsHere = () => {
    switch (selectedTab) {
      case 'home':
        return (
          <CaseContents
            caseType="home"
            departure={departure}
            destination={destination}
            departureDate={departureDate}
            returnDate={returnDate}
            travelRoute={travelRoute}
            flightClass={flightClass}
          />
        );

      case 'road':
        return (
          <CaseContents
            caseType="road"
            departure={departure}
            destination={destination}
            departureDate={departureDate}
            returnDate={returnDate}
            travelRoute={travelRoute}
            flightClass={flightClass}
          />
        );

      case 'trash':
        return <CaseContents caseType="trash" />;

      case 'user':
        return <CaseContents caseType="user" />;

      case 'support':
        return <CaseContents caseType="support" />;

      case 'logout':
        return (
          <CaseContents
            caseType={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        );
    }
  };

  return (
    <div className="hidden lg:flex w-[40%] h-screen">
      <div className="w-[10%] items-center px-10 py-8 border gap-6 flex  flex-col">
        {sidebarOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedTab(option.id)}
            className={`text-primary-600 cursor-pointer hover:scale-110 transition duration-300 ${
              selectedTab === option.id
                ? 'bg-primary-100 rounded  font-bold p-3'
                : ''
            }`}
          >
            {option.icon}
          </button>
        ))}
      </div>
      <div className="bg-white w-full shadow-md">
        <div className="flex flex-col h-full justify-between">
          {renderContentsHere()}
          <div className=" h-30 border-t items-center flex p-7">
            <Btn
              onClick={() => setIsModalOpen(true)}
              className="bg-neutral-300 text-neutral-500 p-1 w-full max-w-[385px] rounded-xl"
            >
              Search
            </Btn>
            <FlightOffersModal
              offers={offersData}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
