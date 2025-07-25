import { sidebarMenu, ViewType } from '../../utils/AdminSidebarMenu';
import { Logo } from '../../components/layout/Logo';
import { Btn } from '../../components/ui/Button';
import { Close } from '../../components/ui/Close';

interface AdminLeftPanelProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  slider: ()=> void;
}

export const AdminLeftPanel = ({
  currentView,
  onViewChange,
  slider
}: AdminLeftPanelProps) => {
  const topItems = sidebarMenu.filter((item) => item.section === 'top');
  const bottomItems = sidebarMenu.filter((item) => item.section === 'bottom');

  return (
    <div className="flex flex-col size-full w-full justify-between gap-10 overflow-hidden bg-white shadow-md">
      {/* Navigations */}
      <div className="w-full">
        <div className="w-full h-30 flex items-center justify-between lg:justify-normal px-8">
          <Logo />
          <div className='lg:hidden'>
            <Close Action={slider}/>
          </div>
        </div>

        <div className="py-4 pl-3 space-y-4">
          {topItems.map(({ label, icon: Icon, view }) => {
            const isActive = currentView === view;
            return (
              <Btn
                key={view}
                onClick={() => {onViewChange(view); slider()}}
                className={`!justify-normal gap-3 w-full !px-4 !border-none !text-left rounded-tl-full rounded-bl-full !py-4 transition ${
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

      {/* Settings and logout */}
      <div className="w-full pl-3 pt-3 pb-15 border-t border-neutral-300 space-y-2">
        {bottomItems.map(({ label, icon: Icon, view }) => {
          const isActive = currentView === view;
          return (
            <Btn
              key={view}
              onClick={() => {onViewChange(view); slider()}}
              className={`!justify-normal !border-none gap-3 w-full px-4 py-4 rounded-tl-full rounded-bl-full transition ${
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
  );
};
