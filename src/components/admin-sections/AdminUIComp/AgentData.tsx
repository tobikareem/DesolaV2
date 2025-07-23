import { Star } from "lucide-react";
import { Text } from "../../ui/TextComp";

interface AgentData {
  name: string;
  initials: string;
  tickets: number;
  resolved: number;
  responseTime: string;
  rating: number;
  resolutionRate: number;
}

const AgentCard = ({
  name,
  initials,
  tickets,
  resolved,
  responseTime,
  rating,
  resolutionRate,
}: AgentData) => (
  <div className="flex flex-col xs:flex-row w-full justify-between gap-2 xs:items-center bg-white rounded-xl border p-2 sm:p-4 shadow-sm mb-4">
    <div className="flex items-center space-x-1 sm:space-x-4">
      <div className="w-10 h-10 font-grotesk rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold">
        {initials}
      </div>
      <div>
        <Text as="h6" size="xs" weight="medium" fontStyle="font-grotesk" className="sm:text-base">
          {name}
        </Text>
        <Text as="p" size="2xs" className="text-gray-500 sm:text-sm">
          {tickets} tickets • {resolved} resolved
        </Text>
      </div>
    </div>

    <div className="flex items-center justify-end space-x-3 xs:space-x-1.5 sm:space-x-3 md:space-x-6 text-sm text-gray-600">
      <div className="sm:text-right">
        <Text as="p" size="2xs" className="sm:text-xs">
          Avg Response
        </Text>
        <Text
          as="p"
          size="xs"
          weight="semibold"
          className="text-blue-600 font-medium sm:text-base"
        >
          {responseTime}
        </Text>
      </div>
      <div className="text-right">
        <Text as="p" size="2xs" className="sm:text-xs">
          Rating
        </Text>
        <Text as="p" size="sm" className="flex items-center gap-1 text-[#D29F07] sm:text-base">
          <Star className="w-4 h-4 text-[#D29F07]" />
          <span className="font-medium">{rating.toFixed(1)}</span>
        </Text>
      </div>
      <div>
        <span className="bg-[#28a74610] text-green-700 px-2 py-1 rounded-lg text-sm font-semibold">
          {resolutionRate}%
        </span>
      </div>
    </div>
  </div>
);

export const AgentPerformance = () => {
  const agents: AgentData[] = [
    {
      name: 'Timmy Agbabiaka',
      initials: 'T',
      tickets: 120,
      resolved: 100,
      responseTime: '8 min',
      rating: 4.5,
      resolutionRate: 83,
    },
    {
      name: 'Oluwatobi Kareem',
      initials: 'O',
      tickets: 95,
      resolved: 85,
      responseTime: '10 min',
      rating: 4.2,
      resolutionRate: 89,
    },
    {
      name: 'Feranmi Tiepo',
      initials: 'F',
      tickets: 80,
      resolved: 70,
      responseTime: '12 min',
      rating: 4.0,
      resolutionRate: 88,
    },
    {
      name: 'Boluwatife Belleti',
      initials: 'B',
      tickets: 60,
      resolved: 50,
      responseTime: '15 min',
      rating: 3.8,
      resolutionRate: 83,
    },
  ];

  return (
    <div className="w-full p-2 sm:p-6 mt-6">
      <Text
        as="h3"
        size="xl"
        weight="medium"
        fontStyle="font-grotesk"
        className=" mb-2 lg:text-2xl"
      >
        Agent Performance
      </Text>
      <Text
        as="p"
        size="xs"
        weight="medium"
        fontStyle="font-grotesk"
        className="font-grotesk mb-6 lg:text-sm"
      >
        Individual agent statistics rankings
      </Text>
      {agents.map((agent, index) => (
        <AgentCard key={index} {...agent} />
      ))}
    </div>
  );
};


