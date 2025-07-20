import { MapPin } from 'lucide-react';
import { Btn } from '../Button';
import { recentSearches } from '../../../utils/AdminFlightData';
import { Text } from '../TextComp';

export const FlightSearchTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
       <Text
                  as="h2"
                  size="2xl"
                  weight="medium"
                  fontStyle="font-grotesk"
                  className=" text-neutral-800"
                >
                  Recent Search History
                </Text>
        <Btn className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-all text-sm">
                  + Export Data
                </Btn>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-500 border-b">
            <tr>
              <th className="py-3 px-4">Route</th>
              <th className="py-3 px-4">Details</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Results</th>
              <th className="py-3 px-4">Interaction</th>
              <th className="py-3 px-4">Filters</th>
            </tr>
          </thead>
          <tbody>
            {recentSearches.map((flight, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  {flight.route}
                </td>
                <td className="py-3 px-4">{flight.details}</td>
                <td className="py-3 px-4">{flight.date}</td>
                <td className="py-3 px-4">{flight.results}</td>
                <td className="py-3 px-4">{flight.interaction}</td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-md">
                    {flight.filters}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
