import {  PlaneTakeoff, CalendarCheck, PlaneLanding, Plane, Route } from "lucide-react";
import { Text } from "../ui/TextComp"


export interface PathContentProps {
  period: string;
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}

export const Flights =({period,departure, destination, departureDate, returnDate, travelRoute, flightClass }:PathContentProps) => {


  return (
    <div className="flex flex-col gap-4 pt-4 pb-6 border-b border-b-neutral-300">
      <Text as="p" size="xs" className="font-work">
        {period}
      </Text>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <PlaneTakeoff
            className="text-secondary-700 hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Departure
          </label>
        </div>
        <Text as="p" className="font-work text-xs text-neutral-500">
          {departure}
        </Text>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Route
            size={20}
            className="text-primary-700 hover:scale-110 transition duration-300"
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Destination
          </label>
        </div>
        <Text as="p" className="font-work text-xs text-neutral-500">
          {destination}
        </Text>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CalendarCheck
            className="text-success hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Departure Date
          </label>
        </div>
        <Text as="p" className="font-work  text-xs text-neutral-500">
          {departureDate}
        </Text>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <CalendarCheck
            className="text-primary-300 hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Returning Date
          </label>
        </div>
        <Text as="p" className="font-work text-xs text-neutral-500">
          {returnDate ?? 'N/A'}
        </Text>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <PlaneLanding
            className="text-primary-600 hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Travel Route
          </label>
        </div>
        <Text as="p" className="font-work mt-1 text-xs text-neutral-500">
          {travelRoute}
        </Text>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Plane
            className="text-secondary-700 hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Flight
          </label>
        </div>
        <Text as="p" className="font-work mt-1 text-xs text-neutral-500">
          {flightClass}
        </Text>
      </div>
    </div>
  )
}