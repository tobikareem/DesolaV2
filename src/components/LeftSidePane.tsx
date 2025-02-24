import React from 'react';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaCalendarCheck,
} from 'react-icons/fa';

interface LeftPaneProps {
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}

const LeftPane: React.FC<LeftPaneProps> = ({
  departure,
  destination,
  departureDate,
  returnDate,
  travelRoute,
  flightClass,
}) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">DASOLA.com</h2>
      <h3 className="text-lg font-semibold mb-2">Great Deals for Your Trip!</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <FaPlaneDeparture className="text-gray-600" />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Departure:
            </label>
            <p className="mt-1 text-sm text-gray-900">{departure}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaPlaneArrival className="text-gray-600" />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Destination:
            </label>
            <p className="mt-1 text-sm text-gray-900">{destination}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-gray-600" />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Departure Date:
            </label>
            <p className="mt-1 text-sm text-gray-900">{departureDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaCalendarCheck className="text-gray-600" />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Returning Date:
            </label>
            <p className="mt-1 text-sm text-gray-900">{returnDate}</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Travel Route:
          </label>
          <p className="mt-1 text-sm text-gray-900">{travelRoute}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Flight:
          </label>
          <p className="mt-1 text-sm text-gray-900">{flightClass}</p>
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
