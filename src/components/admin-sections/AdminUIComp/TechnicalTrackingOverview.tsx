
import {  CheckCheck, TriangleAlert, Clock, MessageSquareWarning } from 'lucide-react';
import { StatCard } from './DashBoardStats';
import { Text } from '../../ui/TextComp';

export const TechnicalTrackingOverview = () => {        
  return (
    <div className="">
      <Text
        as="h2"
        size="2xl"
        weight="semibold"
        fontStyle="font-grotesk"
        className=" text-neutral-500 mb-4"
      >
        Technical Tracking
      </Text>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
        <StatCard title="Errors" value="4" icon={TriangleAlert} />
        <StatCard title="Resolved" value="2" icon={CheckCheck} />
        <StatCard title="Critical" value="1" icon={MessageSquareWarning} />
        <StatCard title="Last 24h" value="0" icon={Clock} />
      </div>
    </div>
  );
};
