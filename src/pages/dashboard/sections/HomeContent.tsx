import { Title } from "../../../components/layout/Title";
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
  // Check if it's a one-way trip
  const isOneWay = travelRoute.toLowerCase().includes('one way');

  return (
    <div className="flex-1 overflow-hidden">
      <Title>
        Great deals for your trip!
      </Title>
      <div className="space-y-4 mt-5">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 ">
            <PlaneTakeoff
              className="text-secondary-700 hover:scale-110 transition duration-300"
              size={20}
            />
            <label className="font-grotesk block !text-xl font-bold text-neutral">
              Departure
            </label>
          </div>
          { departure &&
            <Text as="p" className="text-xs text-neutral-500 font-work ml-2">
              {departure}
            </Text>
          }
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Route
              size={20}
              className="text-primary-700 hover:scale-110 transition duration-300"
            />
            <label className="font-grotesk block !text-xl font-bold text-neutral">
              Destination
            </label>
          </div>
          {  destination &&
            <Text as="p" className="text-xs text-neutral-500 font-work ml-2">
              {destination}
            </Text>
          }
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <PlaneLanding
              className="text-primary-600 hover:scale-110 transition duration-300"
              size={20}
            />
            <label className="font-grotesk block !text-xl font-bold text-neutral">
              Travel Route
            </label>
          </div>
          {  travelRoute &&
            <Text as="p" className="text-xs text-neutral-500 font-work ml-2">
              {travelRoute}
            </Text>
          }
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <CalendarCheck
              className="text-success hover:scale-110 transition duration-300"
              size={20}
            />
            <label className="font-grotesk block !text-xl font-bold text-neutral">
              Departure Date
            </label>
          </div>
          {  departureDate &&
            <Text as="p" className="text-xs text-neutral-500 font-work ml-2">
              {departureDate}
            </Text>
          }
        </div>

        {/* Only show return date for non-one-way trips */}
        {!isOneWay && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CalendarCheck
                className="text-primary-300 hover:scale-110 transition duration-300"
                size={20}
              />
              <label className="font-grotesk block !text-xl font-bold text-neutral">
                Returning Date
              </label>
            </div>
            { returnDate  &&
              <Text as="p" className="text-xs text-neutral-500 font-work ml-2">
                {returnDate}
              </Text>
            }
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center space-x-2 ">
            <Plane
              className="text-secondary-700 hover:scale-110 transition duration-300"
              size={20}
            />
            <label className="font-grotesk block !text-xl font-bold text-neutral">
              Flight
            </label>
          </div>
          { flightClass &&
            <Text as="p" className="text-xs text-neutral-500 font-work ml-2">
              {flightClass}
            </Text>
          }
        </div>
      </div>
    </div>
  )
}