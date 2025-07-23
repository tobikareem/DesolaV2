import { useState } from "react";
import { AdminLeftPanel } from "./AdminLeftPanel";
import { AdminRightPanel } from "./AdminRightPanel";
import { ViewType } from "../../utils/AdminSidebarMenu";

const AdminDashboardScreen = () => {
    const [currentView, setCurrentView] = useState<ViewType>("dashboard");
    const [isAdminSideMenu, setIsAdminSideMenu] = useState<boolean>(false)
    const toggleAdminMenu =()=> {
      setIsAdminSideMenu(!isAdminSideMenu)
    }
  return (
    <div className="bg-background flex w-full h-svh lg:h-screen">
      <section className={`bg-neutral-100 absolute z-20 lg:static flex w-full lg:w-[20%] h-full border border-neutral-300 ${!isAdminSideMenu ? '-translate-x-[100%]' :'-translate-x-0 !bg-Neutral/50 backdrop-blur-sm'} lg:translate-x-0 transition-transform duration-300 ease-linear`}>
        <AdminLeftPanel currentView={currentView} onViewChange={setCurrentView} slider={toggleAdminMenu}/>
      </section>
      <section className="flex flex-col w-full lg:w-[80%]">
        <AdminRightPanel view={currentView} Action={toggleAdminMenu}/>
      </section>
    </div>
  );
}
export default AdminDashboardScreen;