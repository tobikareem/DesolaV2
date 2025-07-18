import { useState } from "react";
import { sidebarMenu, ViewType } from "../../utils/AdminSidebarMenu.ts";
import { Logo } from "../../components/layout/Logo";
import { Btn } from "../../components/ui/Button.tsx";

export const AdminLeftPanel = () => {
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");

  const topItems = sidebarMenu.filter((item) => item.section === "top");
  const bottomItems = sidebarMenu.filter((item) => item.section === "bottom");

  return (
    <div className="flex flex-col size-full flex-1 justify-between gap-10 overflow-hidden">
      {/* Navigations */}
      <div className="w-full">
        <div className="w-full h-30 flex items-center px-8">
          <Logo />
        </div>

        <div className=" py-4 pl-3 space-y-4">
          {topItems.map(({ label, icon: Icon, view }) => {
            const isActive = currentView === view;
            return (
              <Btn
                key={view}
                onClick={() => setCurrentView(view)}
                className={`!justify-normal gap-3 w-full !px-4 !border-none !text-left   rounded-tl-full rounded-bl-full !py-4  transition ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-neutral-700 hover:bg-primary-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </Btn>
            );
          })}
        </div>
      </div>

      {/* settings and logout */}
      <div className="w-full pl-3 pt-3 pb-15 border-t border-neutral-300 space-y-2">
        {bottomItems.map(({ label, icon: Icon, view }) => {
          const isActive = currentView === view;
          return (
            <Btn
              key={view}
              onClick={() => setCurrentView(view)}
              className={`!justify-normal !border-none gap-3 w-full px-4 py-4 rounded-tl-full rounded-bl-full transition ${
                isActive
                  ? 'bg-Primary-500 text-white'
                  : 'text-neutral-700 hover:bg-primary-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </Btn>
          );
        })}
      </div>
    </div>
  );
};
