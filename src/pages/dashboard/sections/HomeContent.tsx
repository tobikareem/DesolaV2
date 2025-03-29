import { Text } from "../../../components/ui/TextComp";
import {
  Route,
  PlaneTakeoff,
  CalendarCheck,
  Plane,
  PlaneLanding,
} from 'lucide-react';

interface homeProps {
  
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}



export const HomeContent: React.FC<homeProps> = ({
  departure,
  destination,
  departureDate,
  returnDate,
  travelRoute,
  flightClass,
}) => {
  return(
    <div className="flex-1 overflow-y-auto">
      <Text
        as="h1"
        size="2xl"
        weight="bold"
        className="font-grotesk text-primary-500 mb-5"
      >
        Great Deals for Your Trip!
      </Text>
      <div className="mb-4 space-y-2">
        <div className="flex  items-center space-x-2 mb-2">
          <PlaneTakeoff
            className="text-secondary-700 hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Departure
          </label>
        </div>
        <Text as="p" className="text-xs text-neutral-500 font-work">
          {departure}
        </Text>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <Route
            size={20}
            className="text-primary-700 hover:scale-110 transition duration-300"
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Destination
          </label>
        </div>
        <Text as="p" className="text-xs text-neutral-500 font-work">
          {destination}
        </Text>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <CalendarCheck
            className="text-success hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Departure Date
          </label>
        </div>
        <Text as="p" className=" text-xs text-neutral-500 font-work">
          {departureDate}
        </Text>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <CalendarCheck
            className="text-primary-300 hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Returning Date
          </label>
        </div>
        <Text as="p" className="text-xs text-neutral-500 font-work">
          {returnDate}
        </Text>
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <PlaneLanding
            className="text-primary-600 hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Travel Route
          </label>
        </div>
        <Text as="p" className="mt-1 text-xs text-neutral-500 font-work">
          {travelRoute}
        </Text>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Plane
            className="text-secondary-700 hover:scale-110 transition duration-300"
            size={20}
          />
          <label className="font-grotesk block !text-xl font-bold text-neutral">
            Flight
          </label>
        </div>
        <Text as="p" className="mt-1 text-xs text-neutral-500 font-work">
          {flightClass}
        </Text>
      </div>
    </div>
  )
}