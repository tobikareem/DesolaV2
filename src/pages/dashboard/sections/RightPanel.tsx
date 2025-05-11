import { Headset, House, LogOut, Trash2, User } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { PiHeadsetFill, PiRoadHorizonBold, PiRoadHorizonFill, PiTrashFill } from 'react-icons/pi';
import { RiHome5Fill, RiUserFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import { SidebarLogout } from '../../../components/dashboard-sections/sidebar/SidebarLogout';
import { SidebarTab } from '../../../components/dashboard-sections/sidebar/SidebarTab';
import { ClearChat } from '../../../components/modals/ClearChat';
import FlightOffersModal from '../../../components/modals/FlightOffersModal';
import { ReturnContent } from '../../../components/modals/LogoutModal';
import { Modal } from '../../../components/modals/Modal';
import { Btn } from '../../../components/ui/Button';
import { ChatContext } from '../../../contexts/ChatContext';
import { NavigationContext } from '../../../contexts/NavigationContext';
import { NavItem } from '../../../contexts/types';
import { UIContext } from '../../../contexts/UIContext';
import authService from '../../../services/authService';
import { CustomStorage } from '../../../utils/customStorage';
import { HomeContent } from './HomeContent';
import { TripHistoryContent } from './TripHistoryContent';
import { SupportContent } from './SupportContent';
import { TrashContent } from './TrashContent';
import { UserContent } from './UserContent';
import { SubscriptionContent } from './SubscriptionContent';
import { TbCreditCard, TbCreditCardFilled } from 'react-icons/tb';

const storageService = new CustomStorage();

export const RightPanel: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>('home');
  const { setNavigationData } = useContext(NavigationContext);
  const { showLogoutModal, showDeleteModal, showFlightModal, toggleModal } = useContext(UIContext);
  const { travelInfo } = useContext(ChatContext);

  const getRequiredFields = (route: string) => {
    const isOneWay = route?.toLowerCase().startsWith('one way');
    const requiredFields = ['departure', 'destination', 'departureDate', 'flightClass'];
    if (!isOneWay) {
      requiredFields.push('returnDate');
    }
    return requiredFields;
  };

  const isSearchEnabled = () => {
    if (!travelInfo || typeof travelInfo !== 'object') {
      return false;
    }
    const { travelRoute } = travelInfo;
    const requiredFields = getRequiredFields(travelRoute);
    // Check that all required fields have values
    return requiredFields.every((field: string) => {
      const value = travelInfo[field as keyof typeof travelInfo];
      return value !== undefined && value !== null && value !== '';
    });
  };

  const sidebarOptions: NavItem[] = [
    { id: 'home', icon: <House size={24} />, icon2: <RiHome5Fill />, label: 'Home' },
    { id: 'road', icon: <PiRoadHorizonBold size={24} />, icon2: <PiRoadHorizonFill />, label: 'Trips' },
    { id: 'trash', icon: <Trash2 size={24} />, icon2: <PiTrashFill />, label: 'Clear Chat' },
    { id: 'user', icon: <User size={24} />, icon2: <RiUserFill />, label: 'Profile' },
    { id: 'subscription', icon: <TbCreditCard />, icon2: <TbCreditCardFilled />, label: 'Subscription'},
    { id: 'support', icon: <Headset size={24} />, icon2: <PiHeadsetFill />, label: 'Support' },
  ];

  useEffect(() => {
    setNavigationData(sidebarOptions);
  }, []);

  const handleTabClick = (tabId: string) => {
    setSelectedTab(tabId);
    if (tabId === 'trash') {
      toggleModal('delete');
    }
  };

  const handleConfirmLogout = () => {
    toggleModal('logout');
    authService.signOut();
    navigate('/');
  };

  const handleConfirmDelete = () => {
    storageService.removeItem('RecentPrompts');
    storageService.removeItem('chatLog');
    toggleModal('delete');
    window.location.reload();
  };

  type HomeContentProps = {
    departure: string;
    destination: string;
    departureDate: string;
    returnDate: string;
    travelRoute: string;
    flightClass: string;
  };

  type PathContentProps = HomeContentProps;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  type NoProps = {};

  type TabComponentMap = {
    home: React.FC<HomeContentProps>;
    road: React.FC<PathContentProps>;
    trash: React.FC<NoProps>;
    user: React.FC<NoProps>;
    subscription: React.FC<NoProps>;
    support: React.FC<NoProps>;
  };

  const TAB_COMPONENTS: TabComponentMap = {
    home: HomeContent,
    road: TripHistoryContent,
    trash: TrashContent,
    user: UserContent,
    subscription: SubscriptionContent,
    support: SupportContent,
  };

  const renderContent = () => {
    if (selectedTab === 'home') {
      const Component = TAB_COMPONENTS[selectedTab as 'home'];
      return <Component {...travelInfo} />;
    }
    // For components that don't need props
    const Component = TAB_COMPONENTS[selectedTab as 'road' | 'trash' | 'user' | 'subscription' | 'support'];
    return Component ? <Component departure={''} destination={''} departureDate={''} returnDate={''} travelRoute={''} flightClass={''} /> : null;
  };

  return (
    <>
      <div className="hidden lg:flex w-[40%] h-screen">
        {/* Sidebar */}
        <div className="w-[10%] items-center px-10 py-[60px] border gap-6 flex flex-col">
          {sidebarOptions.map((option) => (
            <SidebarTab
              key={option.id}
              id={option.id}
              icon={option.icon}
              activeIcon={option.icon2}
              label={option.label}
              isActive={selectedTab === option.id}
              onClick={handleTabClick}
            />
          ))}

          <SidebarLogout
            icon={<LogOut size={24} />}
            onClick={() => toggleModal('logout')}
          />
        </div>
        {/* Content Area */}
        <div className="bg-white w-full shadow-md">
          <div className="flex flex-col h-full justify-between pt-12">
            <div className="max-w-[480px] overflow-y-auto px-8">
              {renderContent()}
            </div>
            {/* Search Button */}
            <div className="h-30 border-t items-center flex p-7">
              <Btn className={`p-1 w-full max-w-[385px] ${(selectedTab == 'home' || selectedTab == 'road' || selectedTab == 'user') && isSearchEnabled()
                  ? 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-white'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed opacity-50'}`} 
                  onClick={() => {if (isSearchEnabled()) {
                    toggleModal('flight');}}}>
                Search
              </Btn>
            </div>
          </div>
        </div>
      </div>
      <Modal display={showDeleteModal} close={() => {toggleModal('delete')}}>
        <ClearChat
          Action={() => toggleModal('delete')}
          ConfirmAction={handleConfirmDelete} Message={null}
        />
      </Modal>
      <Modal display={showLogoutModal} close={() => toggleModal('logout')}>
        <ReturnContent Action={() => toggleModal('logout')} ConfirmAction={handleConfirmLogout}/>
      </Modal>
      <Modal position="absolute" close={() => toggleModal('flight')} display={showFlightModal}>
        <FlightOffersModal onClose={() => toggleModal('flight')} />
      </Modal>
    </>
  );
};