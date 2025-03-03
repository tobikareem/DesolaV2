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
import { Input } from './InputField';
import { Btn } from './Button';


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
    <div className="flex w-[40%] h-screen">
      <div className="w-20 min-w-[80px] items-center px-10 py-8 border-r gap-6 flex  flex-col">
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
      <div className="bg-white w-full shadow-md">
        <div className="flex flex-col h-full justify-between">
          <div className="p-7 flex-1 overflow-y-auto">
            <Text
              as="h1"
              size="2xl"
              weight="bold"
              className="font-grotesk text-primary-500 mb-5"
            >
              Great Deals for Your Trip!
            </Text>
            <div className="mb-4">
              <div className="flex  items-center space-x-2 mb-2">
                <PlaneTakeoff
                  className="text-secondary-700 hover:scale-110 transition duration-300"
                  size={20}
                />
                <label className="block text-sm font-medium text-neutral">
                  Departure
                </label>
              </div>
              <Text as="p" className="text-xs text-neutral-500">
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
              <Text as="p" className="text-xs text-neutral-500">
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
              <Text as="p" className=" text-xs text-neutral-500">
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
              <Text as="p" className="text-xs text-neutral-500">
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
              <Text as="p" className="mt-1 text-xs text-neutral-500">
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
              <Text as="p" className="mt-1 text-xs text-neutral-500">
                {flightClass}
              </Text>
            </div>
          </div>
          <div className=" h-30 border-t items-center flex p-7">
            <Btn className="bg-neutral-300 text-neutral-500 p-1 w-full max-w-[385px] rounded-xl">
              Search
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};
