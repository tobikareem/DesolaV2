import { MapPin, Upload } from 'lucide-react';
import { Btn } from '../../ui/Button';
import { recentSearches } from '../../../utils/AdminFlightData';
import { Text } from '../../ui/TextComp';

export const FlightSearchTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 mt-6">
      <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center mb-4">
        <Text
          as="h2"
          size="xl"
          weight="medium"
          fontStyle="font-grotesk"
          className="text-center md:text-left md:text-2xl text-neutral-800"
        >
          Recent Search History
        </Text>
        <Btn className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-all text-sm">
          <Upload className='mr-2' size={20}/>
          Export Data
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
