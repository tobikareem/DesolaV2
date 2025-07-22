// DashboardCharts.tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Text } from '../../ui/TextComp';

const COLORS = ['#003B85', '#CC5500', '#FFC107'];

const barData = [
  { name: 'NYC-LAX', value: 82000 },
  { name: 'LAX-ATL', value: 10000 },
  { name: 'SFO-JFK', value: 15000 },
  { name: 'DAL-MIA', value: 7000 },
  { name: 'ORD-DEN', value: 82000 },
  { name: 'SEA-BOS', value: 42000 },
  { name: 'PHX-LAS', value: 30000 },
];

const pieData = [
  { name: 'Pro Monthly', value: 45 },
  { name: 'Pro Yearly', value: 30 },
];

export const DashboardCharts = () => {
  return (
    <div className="flex flex-col lg:flex-row max-w-7xl gap-6 w-full mt-8">
      {/* Bar Chart Container */}
      <div className="flex-1 basis-2/3 hover:scale-105 hover:z-20 transition-transform duration-300 ease-in-out">
        <Text
          as="h3"
          color="text-neutral-600"
          size="xl"
          weight="medium"
          fontStyle="font-grotesk"
          className="mb-2"
        >
          Search Analytics
        </Text>
        <div className="bg-white p-6 rounded-2xl shadow border min-h-[300px]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-gray-800">
              Top Searched Routes
            </h3>
            <select className="text-sm border font-medium rounded px-2 py-1 text-gray-700">
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData} className="text-xs">
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {barData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm mt-3 font-medium text-gray-500">
            Pro Yearly: 30%
          </p>
        </div>
      </div>

      {/* Pie Chart Container */}
      <div className="flex-1 basis-1/3 hover:scale-105 hover:z-20 transition-transform duration-300 ease-in-out">
        <Text
          as="h4"
          color="text-neutral-600"
          size="xl"
          weight="medium"
          fontStyle="font-grotesk"
          className=" mb-2"
        >
          Subscription Distribution
        </Text>
        <div className="bg-white p-6 rounded-2xl shadow border min-h-[300px]">
          <div className="mt-5 space-y-1 text-right font-medium text-sm text-gray-600">
            <p>Pro Monthly: 45%</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 font-medium space-y-1 text-sm text-gray-600">
            <p>Pro Yearly: 30%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
