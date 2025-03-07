import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeContent } from './sections/homeContent';

import { PathContent } from './sections/PathContent';
import { TrashContent } from './sections/TrashContent';
import { UserContent } from './sections/UserContent';
import { SupportContent } from './sections/SupportContent';
import { ReturnContent } from './sections/ReturnContent';

interface NavigationProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  caseType: string;
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}

const DashboardNavigation: React.FC<NavigationProps> = ({
  caseType,
  setSelectedTab,
}) => {



  switch (caseType) {
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

    case 'logout':
      return (
        <ReturnContent Action={function (): void {
          throw new Error('Function not implemented.');
        } } ConfirmAction={function (): void {
          throw new Error('Function not implemented.');
        } } />
      );

    default:
  }
};

export default DashboardNavigation;
