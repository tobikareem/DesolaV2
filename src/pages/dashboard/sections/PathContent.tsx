import { SlidersHorizontal, PlaneTakeoff, CalendarCheck, PlaneLanding, Plane, Route } from "lucide-react";
import { Text } from "../../../components/ui/TextComp"
import { Btn } from "../../../components/ui/Button";
import { useState } from "react";

interface PathContentProps {
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travelRoute: string;
  flightClass: string;
}

export const PathContent: React.FC<PathContentProps> = ({
  departure,
  destination,
  departureDate,
  returnDate,
  travelRoute,
  flightClass,
}) => {

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  const [selectPeriod, setSelectPeriod] = useState<string>('Today');

  return (
    <div className=" flex-1 overflow-y-auto">
      <Text
        as="h1"
        size="2xl"
        weight="bold"
        className="font-grotesk text-primary-500 mb-5"
      >
        My Trips
      </Text>
      <div className="flex items-center h-['100px'] mb-2 pb-3 gap-3 bg-white w-full">
        {
          ['Today','Yesterday','1 Week ago', 'Filter'].map((period)=>(
            <Btn key={period}
              onClick={()=> setSelectPeriod(period)}
              type="submit"
              className={`flex items-center cursor-pointer gap-2  ${selectPeriod == period ? 'bg-primary-100':''}`} size="sm">
              <Text className="">{period}</Text>
              {period == 'Filter' && <SlidersHorizontal className="mt-0.5" size={14} />}
            </Btn>
          ))

        }
      </div>
      {
        <div className="flex flex-col gap-4 py-4 border-t border-t-neutral-300">
          <Text as="p" size="xs" className="font-work">
            {today}
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
              {returnDate ?? 'Not Available'}
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
      }
    </div>
  );
}