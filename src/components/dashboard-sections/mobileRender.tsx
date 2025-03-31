
import React, { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";
import { PathContent } from "../../pages/dashboard/sections/PathContent";
import { SupportContent } from "../../pages/dashboard/sections/SupportContent";
import { TrashContent } from "../../pages/dashboard/sections/TrashContent";
import { UserContent } from "../../pages/dashboard/sections/UserContent";
import { NavigationContext } from "../../contexts/NavigationContext";



const MobileRender: React.FC = () => {

  const { mobileTab } = useContext(NavigationContext);
  const { travelInfo } = useContext(ChatContext);

  const RenderPage = () => {
    switch (mobileTab) {
      case 'road':
        return (
          <PathContent
            departure={travelInfo.departure}
            destination={travelInfo.destination}
            departureDate={travelInfo.departureDate}
            returnDate={travelInfo.returnDate}
            travelRoute={travelInfo.travelRoute}
            flightClass={travelInfo.flightClass}
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

      default:
        return null;
    }
  };

  return (
    <div className={`absolute ${mobileTab !== '' ? 'block' : 'hidden'} bg-white lg:hidden w-screen h-screen py-8`}>
      <div className="w-full h-full pt-10 px-6">
        {RenderPage()}
      </div>
    </div>
  )
}

export default MobileRender