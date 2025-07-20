
import { Users, Plane, Ticket, TrendingUp } from 'lucide-react';
import { StatCard } from './DashBoardStats';
import { Text } from '../TextComp';

export const FlightOverview = () => {        
  return (
    <div className="">
      <Text
        as="h2"
        size="2xl"
        weight="semibold"
        fontStyle="font-grotesk"
        className=" text-neutral-500 mb-4"
      >
        Flight Search Activity
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
        <StatCard
          title="Total Searches"
          value="32,000"
          icon={Plane}
        />
        <StatCard
          title="This month Search"
          value="2,000"
          icon={Plane}
        />
        <StatCard
          title="most popular class"
          value="Economy"
          icon={Ticket}
        />
        <StatCard
          title="Average Clicks"
          value="$18,450"
          icon={TrendingUp}
        />
      </div>
    </div>
  );
};
