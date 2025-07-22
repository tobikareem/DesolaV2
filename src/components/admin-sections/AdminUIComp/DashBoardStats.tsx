import type { LucideIcon } from 'lucide-react';
import { Users, CreditCard, Ticket, Plane, TrendingUp } from 'lucide-react';
import { Text } from '../../ui/TextComp';

type StatCardVariant = 'dashboard' | 'subscription';

interface StatCardProps {
  title: string;
  value: string;
  icon?: LucideIcon;
  trend?: string;
  badge?: string;
  variant?: StatCardVariant;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  badge,
  variant = 'dashboard',
}: StatCardProps) => {
  const isSubscription = variant === 'subscription';

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border p-5 w-full min-w-[200px] flex flex-col justify-between ${
        isSubscription ? 'gap-3' : 'gap-2'
      }`}
    >
      <div className="flex flex-col justify-between gap-2 items-start">
        <div className="flex items-center gap-2">
          <Text className="text-sm text-neutral-500 font-medium">{title}</Text>
          {isSubscription && badge && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-md">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between w-full">
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
          {Icon && <Icon className="w-6 h-6 text-neutral-700" />}
        </div>
      </div>

      {trend && (
        <Text className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </Text>
      )}
    </div>
  );
};


export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Pro Plan"
        badge="Monthly"
        value="12,847"
        icon={Users}
        trend="+12% from last month"
        variant="subscription"
      />
      <StatCard
        title="Active Subscriptions"
        value="45,678"
        icon={CreditCard}
        trend="+8% from last month"
        variant="dashboard"
      />
      <StatCard
        title="Support Tickets"
        value="50"
        icon={Ticket}
        variant="dashboard"
      />
      <StatCard
        title="Top Route"
        value="NYC → LAX"
        icon={Plane}
        variant="dashboard"
      />
    </div>
  );
};
