import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from './TextComp';
import fileImg from '../../src/assets/Frame 2147207552.png';
import profileImg from '../../src/assets/Ellipse 137.png';
import { Input } from './InputField';
import { TextArea } from './TextAreaField';
import { Btn } from './Button';

import {
  Route,
  PlaneTakeoff,
  CalendarCheck,
  Plane,
  PlaneLanding,
  SlidersHorizontal,
} from 'lucide-react';

interface CaseContentsProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  caseType: string;
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}

const CaseContents: React.FC<CaseContentsProps> = ({
  caseType,
  setSelectedTab,
  departure,
  destination,
  departureDate,
  returnDate,
  travelRoute,
  flightClass,
}) => {

  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
    setSelectedTab('home');
  };

  switch (caseType) {
    case 'home':
      return (
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
      );

    case 'road':
      return (
        <div className="p-7  flex-1 overflow-y-auto">
          <Text
            as="h1"
            size="2xl"
            weight="bold"
            className="font-grotesk text-primary-500 mb-5"
          >
            My Trips
          </Text>
          <div className="border-b flex items-center h-['100px'] mb-2 pb-3 gap-3 bg-white  w-full">
            <Text
              as="p"
              size="sm"
              className="bg-primary-100 py-1.5 px-2.5 rounded-lg"
            >
              Today
            </Text>
            <Text as="p" size="sm" className="cursor-pointer">
              Yesterday
            </Text>
            <Text as="p" size="sm" className="cursor-pointer">
              1 Week ago
            </Text>
            <div className="flex items-center cursor-pointer gap-2">
              <Text as="p" size="sm" className="">
                Filter
              </Text>
              <SlidersHorizontal className="mt-0.5" size={14} />
            </div>
          </div>
          <Text as="p" size="xs" className="mb-3">
            2/17/2025
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
      );

    case 'trash':
      return (
        <div className="p-7 flex-1 overflow-y-auto">
          <Text
            as="h1"
            size="2xl"
            weight="bold"
            className="font-grotesk text-primary-500 mb-5"
          >
            Great Deals for Your Trip!
          </Text>
          <div className="mt-25 items-center justify-center flex-col flex text-center">
            <img src={fileImg} alt="" />
            <Text as="p" className="mt-1 text-xs text-neutral-500">
              Start a conversation to find your perfect flight
            </Text>
          </div>
        </div>
      );

    case 'user':
      return (
        <div className="p-7 flex-1 overflow-y-auto">
          <Text
            as="h1"
            size="2xl"
            weight="bold"
            className="font-grotesk text-primary-500 mb-5"
          >
            Profile
          </Text>
          <div className="mt-7 w-96">
            <img src={profileImg} className="mt-8 mx-auto mb-8" alt="" />
            <Input
              label="First Name"
              labelClassName="!text-neutral !text-base !font-medium"
              value="Daniel"
              className="text-sm mb-4 w-full rounded-lg"
            />
            <Input
              label="Last Name"
              labelClassName="!text-neutral !text-base !font-medium"
              value="Olamide"
              className="text-sm mb-4 w-full rounded-lg"
            />
            <Input
              label="Email"
              labelClassName="!text-neutral !text-base !font-medium"
              value="danielolamide87@outlook.com"
              className="text-sm mb-4 w-full rounded-lg"
            />
          </div>
        </div>
      );

    case 'support':
      return (
        <div className="p-7 flex-1 overflow-y-auto">
          <Text
            as="h1"
            size="2xl"
            weight="bold"
            className="font-grotesk text-primary-500 mb-5"
          >
            Support
          </Text>
          <div className="mt-7 w-96">
            <Text
              as="h5"
              size="sm"
              weight="bold"
              className="font-grotesk  mb-1"
            >
              Lets chat, reach out to us
            </Text>
            <Text as="p" size="xs" weight="light" className="font-grotesk">
              Have a question or feed back we are here to help. Send us a
              message, and we’ll response in 24 hours
            </Text>
            <form className="mt-6 flex flex-col flex-grow w-full h-full gap-4">
              <div className="w-full">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  className="bg-[#F3F3F3] w-full h-8 round-md placeholder:text-[#B7B7B7] placeholder:"
                />
              </div>
              <div className="w-full">
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  className="bg-[#F3F3F3] h-8 round-md placeholder:text-[#B7B7B7] placeholder:"
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="email"
                className="bg-[#F3F3F3] w-full h-8 rounded-md placeholder:text-[#B7B7B7] placeholder:"
              />
              <div className="flex flex-col flex-grow h-full">
                <TextArea
                  label="Message"
                  placeholder="Leave us a message..."
                  className=" bg-[#F3F3F3]  flex h-[145px]  rounded-md placeholder:text-[#B7B7B7] placeholder:"
                />
              </div>

              <Btn
                type="submit"
                className=" text-nowrap rounded-xl py-3 bg-primary-700 w-full text-base text-white"
              >
                Send Message
              </Btn>
            </form>
          </div>
        </div>
      );

    case 'logout':
      return (
        <div className="p-7 overflow-y-auto ">
          <Text
            as="h1"
            size="2xl"
            weight="bold"
            className="font-grotesk text-primary-500 mb-5"
          >
            Go back to homepage
          </Text>
          <div className="bg-white mt-20 mx-auto text-center p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Confirm Logout</h3>
            <Text as='p' size='sm' >Are you sure you want to log out?</Text>
            <div className="flex justify-center mt-4">
              <Btn
                className="px-4 py-2 bg-red-600 text-white rounded mr-2"
                onClick={handleConfirmLogout}
              >
                Yes, Logout
              </Btn>
              <Btn
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={handleCancelLogout}
              >
                Cancel
              </Btn>
            </div>
          </div>
        </div>
      );

    default:
  }
};

export default CaseContents;
