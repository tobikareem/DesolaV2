import { GiHamburgerMenu } from 'react-icons/gi';
import { Text } from '../../components/ui/TextComp';
import { ViewType } from '../../utils/AdminSidebarMenu';
import { AdminMainContent } from '../../utils/AdminMainContent';

interface AdminRightPanelProps {
  Action: () => void;
  view: ViewType;
}

export const AdminRightPanel: React.FC<AdminRightPanelProps> = ({
  Action,
  view,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="bg-neutral-100 border-b border-neutral-300 flex items-center gap-4 w-full h-20 lg:h-30 px-4 sm:px-6">
        <div
          onClick={Action}
          className="block lg:hidden text-primary-600 text-xl cursor-pointer"
        >
          <GiHamburgerMenu />
        </div>
        <div>
          <Text
            as="h3"
            color="text-Neutral"
            size="base"
            weight="medium"
            fontStyle="font-grotesk"
            className="xs:!text-xl sm:!text-3xl"
          >
            Desola Flights Admin Dashboard
          </Text>
          <Text
            color="text-[#5c5c5c]"
            className="!text-[8px] xs:!text-xs sm:!text-sm"
          >
            Customer Support and User Management System
          </Text>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full h-full overflow-y-auto p-6 lg:pr-[5%]">
        <AdminMainContent view={view} />
      </div>
    </div>
  );
};
