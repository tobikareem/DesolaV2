
import React, { useContext } from "react";
import { TripHistoryContent } from "../../pages/dashboard/sections/TripHistoryContent";
import { SupportContent } from "../../pages/dashboard/sections/SupportContent";
import { TrashContent } from "../../pages/dashboard/sections/TrashContent";
import { UserContent } from "../../pages/dashboard/sections/UserContent";
import { NavigationContext } from "../../contexts/NavigationContext";



const MobileRender: React.FC = () => {

  const { mobileTab } = useContext(NavigationContext);

  const RenderPage = () => {
    switch (mobileTab) {
      case 'road':
        return (
          <TripHistoryContent/>
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
    <>
      { mobileTab !== '' ? 
        <div className={`absolute block bg-white lg:hidden w-screen h-screen py-8`}>
          <div className="w-full h-full pt-10 px-6">
            {RenderPage()}
          </div>
        </div>
        : null
      }
    </>
    
  )
}

export default MobileRender