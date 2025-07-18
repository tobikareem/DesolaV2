import { Headset, House, LogOut, Trash2, User } from 'lucide-react';
import React, { useContext, useEffect, useState, Suspense } from 'react';
import { PiHeadsetFill, PiRoadHorizonBold, PiRoadHorizonFill, PiTrashFill } from 'react-icons/pi';
import { RiHome5Fill, RiRobot2Fill, RiRobot2Line, RiUserFill } from 'react-icons/ri';
import { TbCreditCard, TbCreditCardFilled } from 'react-icons/tb';
import { SidebarLogout } from '../../../components/dashboard-sections/sidebar/SidebarLogout';
import { SidebarTab } from '../../../components/dashboard-sections/sidebar/SidebarTab';
import { ClearChat } from '../../../components/modals/ClearChat';
import FlightOffersModal from '../../../components/modals/FlightOffersModal';
import { ReturnContent } from '../../../components/modals/LogoutModal';
import { Modal } from '../../../components/modals/Modal';
import { SubscriptionFlowModal } from '../../../components/modals/SubscriptionFlow';
import { Btn } from '../../../components/ui/Button';
import { ChatContext } from '../../../contexts/ChatContext';
import { NavigationContext } from '../../../contexts/NavigationContext';
import { NavItem } from '../../../contexts/types';
import { UIContext } from '../../../contexts/UIContext';
import { useAuthInfo } from '../../../hooks/useAuthInfo';
import { CustomStorage } from '../../../utils/customStorage';
import LoadingScreen from '../../../components/layout/LoadingScreen';

const HomeContent = React.lazy(() => import('./HomeContent').then(module => ({ default: module.HomeContent })));
const DesolaAI = React.lazy(() => import('./DesolaAI').then(module => ({ default: module.DesolaAI })));
const TripHistoryContent = React.lazy(() => import('./TripHistoryContent').then(module => ({ default: module.TripHistoryContent })));
const TrashContent = React.lazy(() => import('./TrashContent').then(module => ({ default: module.TrashContent })));
const UserContent = React.lazy(() => import('./UserContent').then(module => ({ default: module.UserContent })));
const SubscriptionContent = React.lazy(() => import('./SubscriptionContent').then(module => ({ default: module.SubscriptionContent })));
const SupportContent = React.lazy(() => import('./SupportContent').then(module => ({ default: module.SupportContent })));

const storageService = new CustomStorage();

export const GetRequiredFields = (route: string) => {
  const isOneWay = route?.toLowerCase().startsWith('one way');
  const requiredFields = ['departure', 'destination', 'departureDate', 'flightClass'];
  if (!isOneWay) {
    requiredFields.push('returnDate');
  }
  return requiredFields;
};

export const RightPanel: React.FC = () => {

  const { chatLog } = useContext(ChatContext);
  const [selectedTab, setSelectedTab] = useState<string>('home');
  const { setNavigationData, setMobileTab } = useContext(NavigationContext);
  const { showLogoutModal, showDeleteModal, showFlightModal, toggleModal } = useContext(UIContext);
  const { travelInfo } = useContext(ChatContext);
  const { logout } = useAuthInfo();

  const isSearchEnabled = () => {
    if (!travelInfo || typeof travelInfo !== 'object') {
      return false;
    }
    const { travelRoute } = travelInfo;
    const requiredFields = GetRequiredFields(travelRoute);
    // Check that all required fields have values
    return requiredFields.every((field: string) => {
      const value = travelInfo[field as keyof typeof travelInfo];
      return value !== undefined && value !== null && value !== '';
    });
  };

  const sidebarOptions: NavItem[] = [
    { id: 'home', icon: <House size={24} />, icon2: <RiHome5Fill />, label: 'Home' },
    { id: 'AI', icon: <RiRobot2Line size={24} />, icon2: <RiRobot2Fill size={24} />, label: 'AI Assistant' },
    { id: 'road', icon: <PiRoadHorizonBold size={24} />, icon2: <PiRoadHorizonFill />, label: 'Trips' },
    { id: 'trash', icon: <Trash2 size={24} />, icon2: <PiTrashFill />, label: 'Clear Chat' },
    { id: 'user', icon: <User size={24} />, icon2: <RiUserFill />, label: 'Profile' },
    { id: 'subscription', icon: <TbCreditCard />, icon2: <TbCreditCardFilled />, label: 'Subscription' },
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
    logout();
    storageService.removeItem('RecentPrompts');
    storageService.removeItem('chatLog');
  };

  const handleConfirmDelete = () => {
    storageService.removeItem('RecentPrompts');
    storageService.removeItem('chatLog');
    storageService.removeItem('AiMessageLog');
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
    AI: React.FC<NoProps>;
    road: React.FC<PathContentProps>;
    trash: React.FC<NoProps>;
    user: React.FC<NoProps>;
    subscription: React.FC<NoProps>;
    support: React.FC<NoProps>;
  };

  const TAB_COMPONENTS: TabComponentMap = {
    home: HomeContent,
    AI: DesolaAI,
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
    const Component = TAB_COMPONENTS[selectedTab as 'AI' | 'road' | 'trash' | 'user' | 'subscription' | 'support'];
    return Component ? <Component departure={''} destination={''} departureDate={''} returnDate={''} travelRoute={''} flightClass={''} /> : null;
  };

  const isLastMessage = chatLog.length > 0 && chatLog[chatLog.length - 1].message.toLowerCase().includes('click the search button')

  return (
    <>
      <div className="hidden lg:flex w-[40%] h-svh">
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
        <div className="bg-white w-full">
          <div className="flex flex-col h-full justify-between pt-12">
            <div className="max-w-[600px] h-full lg:px-5 xl:px-8 overflow-hidden">
              <Suspense fallback={<LoadingScreen message="Loading..." dimension="w-full h-full" background="bg-background" />}>
                {renderContent()}
              </Suspense>
            </div>
            {/* Search Button */}
            <div className="border-t items-center h-[120px] flex p-7">
              <Btn className={`p-1 w-full max-w-[385px] ${(selectedTab == 'home' || selectedTab == 'road') && isLastMessage && isSearchEnabled()
                ? 'bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-white'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed opacity-50'}`}
                onClick={() => {
                  if (isSearchEnabled()) {
                    toggleModal('flight');
                  }
                }}>
                Search
              </Btn>
            </div>
          </div>
        </div>
      </div>
      {<SubscriptionFlowModal Action={() => { setSelectedTab('subscription'); setMobileTab('subscription') }} />}

      {showDeleteModal && (
        <Modal display={showDeleteModal} close={() => { toggleModal('delete') }}>
          <ClearChat
            Action={() => toggleModal('delete')}
            ConfirmAction={handleConfirmDelete} Message={null}
          />
        </Modal>
      )}
      {showLogoutModal && (
        <Modal display={showLogoutModal} close={() => toggleModal('logout')}>
          <ReturnContent Action={() => toggleModal('logout')} ConfirmAction={handleConfirmLogout} />
        </Modal>
      )}
      {showFlightModal && (
        <Modal position="absolute" close={() => toggleModal('flight')} display={showFlightModal}>
          <FlightOffersModal onClose={() => toggleModal('flight')} />
        </Modal>
      )}
    </>
  );
};