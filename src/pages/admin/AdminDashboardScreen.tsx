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
      <section className="bg-neutral-100 absolute z-10 lg:static flex w-[80%] lg:w-[20%] border border-neutral-300 -translate-x-[100%] lg:translate-x-0">
        <AdminLeftPanel currentView={currentView} onViewChange={setCurrentView} />
      </section>
      <section className="flex flex-col w-full lg:w-[80%]">
        <AdminRightPanel view={currentView} Action={() => toggleAdminMenu} />
      </section>
    </div>
  );
}
export default AdminDashboardScreen;