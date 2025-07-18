import { useState } from "react";
import { sidebarMenu, ViewType } from "../../AdminDatas/AdminSidebarMenu.ts";
import { Logo } from "../../components/layout/Logo";

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

        <div className=" py-4 pl-3 space-y-2">
          {topItems.map(({ label, icon: Icon, view }) => {
            const isActive = currentView === view;
            return (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`flex items-center gap-3 w-full px-4  rounded-tl-full rounded-bl-full py-2  transition ${
                  isActive
                    ? 'bg-blue-700 text-white'
                    : 'text-gray-700 hover:bg-blue-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* settings and logout */}
      <div className="w-full pl-3 pt-3 pb-15 border-t border-neutral-300 space-y-2">
        {bottomItems.map(({ label, icon: Icon, view }) => {
          const isActive = currentView === view;
          return (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-tl-full rounded-bl-full transition ${
                isActive
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-700 hover:bg-blue-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
