import React from 'react';
import {
  Route,
  PlaneTakeoff,
  CalendarCheck,
  Plane,
  PlaneLanding,
  Trash2,
  User,
  Headset,
  LogOut,
} from 'lucide-react';

import { FaHome} from 'react-icons/fa';
import { PiRoadHorizonBold } from 'react-icons/pi';


import { Text } from './TextComp';


interface LeftPaneProps {
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}

export const LeftPane: React.FC<LeftPaneProps> = ({
  departure,
  destination,
  departureDate,
  returnDate,
  travelRoute,
  flightClass,
}) => {
  return (
    <div className="hidden lg:flex w-[40%] h-screen">
      <div className="w-[10%] items-center px-10 py-8 border gap-6 flex  flex-col">
        <FaHome
          className="text-primary-600 cursor-pointer hover:scale-110 transition duration-300"
          size={24}
        />
        <PiRoadHorizonBold
          className="text-primary-600 font-bold cursor-pointer hover:scale-110 transition duration-300"
          size={24}
        />
        <Trash2
          className="text-primary-600 cursor-pointer hover:scale-110 transition duration-300"
          size={24}
        />
        <User
          className="text-primary-600 cursor-pointer hover:scale-110 transition duration-300"
          size={24}
        />
        <Headset
          className="text-primary-600 cursor-pointer hover:scale-110 transition duration-300"
          size={24}
        />
        <LogOut
          className="text-primary-600 cursor-pointer hover:scale-110 transition duration-300"
          size={24}
        />
      </div>
      <div className="bg-white w-full flex-1 p-6 rounded-lg shadow-md">
        <Text
          as="h1"
          size="2xl"
          weight="bold"
          className="font-grotesk text-primary-500 f mb-6"
        >
          Great Deals for Your Trip!
        </Text>
        <div className="">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <PlaneTakeoff
                className="text-secondary-700 hover:scale-110 transition duration-300"
                size={20}
              />
              <label className="block text-sm font-medium text-neutral">
                Departure
              </label>
            </div>
            <Text as="p" className="mt-1 text-sm text-neutral-500">
              {departure}
            </Text>
          </div>

          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Route
                size={20}
                className="text-primary-700 hover:scale-110 transition duration-300"
              />
              <label className="block text-sm font-medium text-neutral">
                Destination
              </label>
            </div>
            <Text as="p" className="mt-1 text-sm text-neutral-500">
              {destination}
            </Text>
          </div>

          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <CalendarCheck
                className="text-success hover:scale-110 transition duration-300"
                size={20}
              />
              <label className="block text-sm font-medium text-neutral">
                Departure Date
              </label>
            </div>
            <Text as="p" className="mt-1 text-sm text-neutral-500">
              {departureDate}
            </Text>
          </div>

          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <CalendarCheck
                className="text-primary-300 hover:scale-110 transition duration-300"
                size={20}
              />
              <label className="block text-sm font-medium text-neutral">
                Returning Date
              </label>
            </div>
            <Text as="p" className="mt-1 text-sm text-neutral-500">
              {returnDate}
            </Text>
          </div>

          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <PlaneLanding
                className="text-primary-600 hover:scale-110 transition duration-300"
                size={20}
              />
              <label className="block text-sm font-medium text-neutral">
                Travel Route
              </label>
            </div>
            <Text as="p" className="mt-1 text-sm text-neutral-500">
              {travelRoute}
            </Text>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Plane
                className="text-secondary-700 hover:scale-110 transition duration-300"
                size={20}
              />
              <label className="block text-sm font-medium text-neutral">
                Flight
              </label>
            </div>
            <Text as="p" className="mt-1 text-sm text-neutral-500">
              {flightClass}
            </Text>
          </div>

        </div>
      </div>
    </div>
  );
};
