import type { LucideIcon } from 'lucide-react';
import { Users, CreditCard, Ticket, Plane, TrendingUp } from 'lucide-react';
import { Text } from '../TextComp';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
}

const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 w-full min-w-[200px] flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <Text className="text-sm text-neutral-500 font-medium">{title}</Text>
          <Icon className="w-5 h-5 text-neutral-700" />
        </div>
        <Text
          as="h3"
          color="text-primary-600"
          size="base"
          weight="medium"
          fontStyle="font-grotesk"
          className="xs:!text-xl sm:!text-3xl"
        >
          {value}
        </Text>
      </div>
      <div className="mt-2">
        {trend && (
          <Text className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {trend}
          </Text>
        )}
      </div>
    </div>
  );
};

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Total Users"
        value="12,847"
        icon={Users}
        trend="+12% from last month"
      />
      <StatCard
        title="Active Subscriptions"
        value="45,678"
        icon={CreditCard}
        trend="+8% from last month"
      />
      <StatCard
        title="Support Tickets"
        value="50"
        icon={Ticket }
      />
      <StatCard
        title="Top Route"
        value="NYC → LAX"
        icon={Plane}
      />
    </div>
  );
};
