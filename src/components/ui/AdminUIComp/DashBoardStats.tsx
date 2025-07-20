import type { LucideIcon } from 'lucide-react';
import { Users, CreditCard, Ticket, Plane, TrendingUp } from 'lucide-react';
import { Text } from '../TextComp';

interface StatCardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  trend?: string;
  badge?: string;
}
// components/StatCard.tsx

interface StatCardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  trend?: string;
  badge?: string; // <-- NEW for Monthly/Yearly
}

export const StatCard = ({ title, value, icon: Icon, trend, badge }: StatCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 w-full min-w-[200px] hover:scale-105 hover:z-20 transition-transform duration-300 ease-in-out flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-500 font-medium">
              {title}
            </span>
            {badge && (
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-md">
                {badge}
              </span>
            )}
          </div>
          {Icon && <Icon className="w-5 h-5 text-neutral-700" />}
        </div>
        <h3 className="text-xl sm:text-3xl text-primary-600 font-medium">
          {value}
        </h3>
      </div>
      {trend && (
        <p className="text-xs text-neutral-500 mt-5 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </p>
      )}
    </div>
  );
};


export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
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
      <StatCard title="Support Tickets" value="50" icon={Ticket} />
      <StatCard title="Top Route" value="NYC → LAX" icon={Plane} />
    </div>
  );
};
