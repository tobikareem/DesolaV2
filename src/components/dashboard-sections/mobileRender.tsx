
import { PathContent } from "../../pages/dashboard/sections/PathContent";
import { SupportContent } from "../../pages/dashboard/sections/SupportContent";
import { TrashContent } from "../../pages/dashboard/sections/TrashContent";
import { UserContent } from "../../pages/dashboard/sections/UserContent";
import React from "react";
import { GlobalContext } from "../../hooks/globalContext";



const MobileRender:React.FC=()=> {

  const {MobileTab} = React.useContext(GlobalContext);
  
  const RenderPage = () => {
    switch (MobileTab) {
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

  return(
    <div className={`absolute ${MobileTab !== '' ? 'block':'hidden'} bg-white lg:hidden w-screen h-screen py-8`}>
      <div className="w-full h-full pt-10 px-6">
        {RenderPage()}
      </div>
    </div>
  )
}

export default MobileRender