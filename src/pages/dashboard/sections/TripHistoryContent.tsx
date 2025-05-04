import { SlidersHorizontal } from "lucide-react";
import { Text } from "../../../components/ui/TextComp"
import { useClickTracking } from "../../../hooks/useClickTracking";
import { useEffect, useState } from "react";
import { CustomStorage } from "../../../utils/customStorage";
import { SESSION_VALUES } from "../../../utils/constants";
import { Flights } from "../../../components/dashboard-sections/flightTripsData";
import { Btn } from "../../../components/ui/Button";


const storage = new CustomStorage();

export const TripHistoryContent = () => {

  const { getClickTracking } = useClickTracking();

  useEffect(() => {
    const fetchClickTracking = async () => {
      try {
        const userId = storage.getItem(SESSION_VALUES.azure_b2c_userId) ?? "";

        const response = await getClickTracking(userId);

        if (!response) {
          return;
        }

        console.log("Click tracking data:", response);
      } catch (error) {
        console.error("Error fetching click tracking data:", error);
      }
    };

    fetchClickTracking();
  }
    , [getClickTracking]);

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
          ['Today', 'Yesterday', '1 Week ago', 'Filter'].map((period) => (
            <Btn key={period}
              onClick={() => setSelectPeriod(period)}
              type="submit"
              className={`flex items-center cursor-pointer gap-2  ${selectPeriod == period ? 'bg-primary-100' : ''}`} size="sm">
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