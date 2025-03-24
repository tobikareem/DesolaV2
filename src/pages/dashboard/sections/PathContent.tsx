import { SlidersHorizontal, PlaneTakeoff, CalendarCheck, PlaneLanding, Plane, Route } from "lucide-react";
import { Text } from "../../../components/ui/TextComp"


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
  return(
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
    {
      <div className="flex flex-col gap-4 py-4 border-t border-t-neutral-300">
        <Text as="p" size="xs" className="font-work">
          {`${new Date()}`}
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
          {returnDate}
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
  )
}