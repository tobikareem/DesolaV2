import { SlidersHorizontal } from "lucide-react";
import { Text } from "../../../components/ui/TextComp"
import { Btn } from "../../../components/ui/Button";
import { useState } from "react";
import { Flights } from "../../../components/dashboard-sections/flightTripsData";



export const PathContent =()=> {

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  const [selectPeriod, setSelectPeriod] = useState<string>('Today');
  const [page, setPage] = useState<number>(0);

  return (
    <div className="flex-1">
      <Text
        as="h1"
        size="2xl"
        weight="bold"
        className="font-grotesk text-primary-500 mb-5"
      >
        My Trips
      </Text>
      <div className="flex items-center h-['100px'] mb-2 pb-4 gap-3 bg-white w-full border-b border-neutral-300">
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
      <div className="">
        {
          <Flights
            period={today ?? ''} departure={''} destination={''} departureDate={''} returnDate={''}
            travelRoute={''} flightClass={''}
          />
        }
      </div>
      <div className="">

      </div>
    </div>
  );
}