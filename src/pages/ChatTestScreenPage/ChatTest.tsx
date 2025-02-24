import React from 'react';
import LeftPane from '../../components/LeftSidePane';

const ChatTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <LeftPane
            departure="Ikeja, Murtala Muhammed International Airport (MMIA)"
            destination="Seattle-Tacoma International Airport (SEA)"
            departureDate="04/25/2025"
            returnDate="06/25/2025"
            travelRoute="Multi city"
            flightClass="Economy"
          />
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Hi, Oluwatobi, Where are you flying from?
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Departure Airport:
              </label>
              <input
                type="text"
                defaultValue="Murtala Muhammed International Airport (MMIA)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Destination Airport:
              </label>
              <input
                type="text"
                defaultValue="Seattle-Tacoma International Airport (SEA)"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Departure Date (MM/DD/YY):
              </label>
              <input
                type="text"
                defaultValue="04/25/25"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTest;
