
import React, { Suspense, useContext } from "react";
import { NavigationContext } from "../../contexts/NavigationContext";
import LoadingScreen from "../layout/LoadingScreen";
import { MdKeyboardBackspace } from "react-icons/md";

const TripHistoryContent = React.lazy(() =>
  import("../../pages/dashboard/sections/TripHistoryContent").then(module => ({
    default: module.TripHistoryContent
  }))
);
const SupportContent = React.lazy(() =>
  import("../../pages/dashboard/sections/SupportContent").then(module => ({
    default: module.SupportContent
  }))
);
const TrashContent = React.lazy(() =>
  import("../../pages/dashboard/sections/TrashContent").then(module => ({
    default: module.TrashContent
  }))
);
const UserContent = React.lazy(() =>
  import("../../pages/dashboard/sections/UserContent").then(module => ({
    default: module.UserContent
  }))
);
const DesolaAI = React.lazy(() =>
  import("../../pages/dashboard/sections/DesolaAI").then(module => ({
    default: module.DesolaAI
  }))
);
const SubscriptionContent = React.lazy(() =>
  import("../../pages/dashboard/sections/SubscriptionContent").then(module => ({
    default: module.SubscriptionContent
  }))
);


const MobileRender: React.FC = () => {

  const { mobileTab, setMobileTab } = useContext(NavigationContext);
  const RenderPage = () => {
    switch (mobileTab) {
      case 'AI' : 
        return ( <DesolaAI />)
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
      case 'subscription':
        return (<SubscriptionContent />);
      case 'support':
        return (
          <SupportContent />
        );
      default: return null;
    }
  };

  return (
    <>
      { mobileTab !== '' ? 
        <div className={`absolute block bg-white lg:hidden w-screen h-screen py-8`}>
          <div className="w-screen h-full pt-10 px-4 md:px-6">
            <Suspense fallback={<LoadingScreen message={"Loading..."} dimension="w-full h-full" background="bg-background"/>}>
              {RenderPage()}
              {mobileTab !== '' && 
                <div onClick={()=> setMobileTab('')}
                  className="fixed z-[4] bottom-8 shadow-md rounded-full font-semibold font-work  right-5 flex items-center justify-center py-2 px-2 bg-primary-700 text-white">
                  <MdKeyboardBackspace size={24} /> Back
                </div>
              }
            </Suspense>
          </div>
        </div>
        : null
      }
    </>
    
  )
}
export default MobileRender