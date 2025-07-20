
import { Users, } from 'lucide-react';
import { StatCard } from './DashBoardStats';
import { Text } from '../TextComp';

export const SubscriptionOverview = () => {        
  return (
    <div className=''>
      <Text
        as="h2"
        size="2xl"
        weight="semibold"
        fontStyle="font-grotesk"
        className=" text-neutral-500 mb-4"
      >
        User Subscription Overview
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
        <StatCard
          title="Pro Plan"
          badge="Monthly"
          value="12,847"
          icon={Users}
          trend="+12% from last month"
        />
        <StatCard
          title="Pro Plan"
          badge="Yearly"
          value="5,847"
          icon={Users}
          trend="+12% from last month"
        />
        <StatCard title="Active Promo’s" value="300" />
        <StatCard title="Discounts Given" value="$18,450" />
      </div>
    </div>
  );
};
