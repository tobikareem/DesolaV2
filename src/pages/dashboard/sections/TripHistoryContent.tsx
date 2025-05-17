import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Btn } from "../../../components/ui/Button";
import { Text } from "../../../components/ui/TextComp";
import { useClickTracking } from "../../../hooks/useClickTracking";
import { ClickHistoryItem, ClickHistoryQueryParams } from "../../../models/ClickTrackingPayload";
import { SESSION_VALUES } from "../../../utils/constants";
import { CustomStorage } from "../../../utils/customStorage";
import { Input } from "../../../components/ui/InputField";

const storage = new CustomStorage();

export const TripHistoryContent = () => {
  const { getClickHistory } = useClickTracking();
  const [historyData, setHistoryData] = useState<ClickHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [hasMoreResults, setHasMoreResults] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState<string>('today');
  const [filterVisible, setFilterVisible] = useState(false);
  const [originFilter, setOriginFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');

  const userId = storage.getItem(SESSION_VALUES.azure_b2c_userId) ?? "";

  const fetchClickHistory = async (reset = true) => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

      const params: ClickHistoryQueryParams = {
        userId,
        period: selectedPeriod !== 'Filter' ? selectedPeriod.toLowerCase() : undefined,
        origin: originFilter || undefined,
        destination: destinationFilter || undefined,
        pageToken: reset ? undefined : nextPageToken || undefined,
        pageSize: 10
      };

      const response = await getClickHistory(params);

      if (response) {
        setHistoryData(prev => reset ? response.results : [...prev, ...response.results]);
        setNextPageToken(response.nextPageToken);
        setHasMoreResults(response.hasMoreResults);
      }
    } catch (err) {
      setError('Failed to load click history. Please try again.');
      console.error('Error fetching click history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClickHistory();
  }, [userId, selectedPeriod, originFilter, destinationFilter, nextPageToken]);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  const handleLoadMore = () => {
    if (hasMoreResults) {
      fetchClickHistory(false);
    }
  };

  const handleFilterApply = () => {
    setFilterVisible(false);
  };

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

      <div className="flex flex-wrap items-center h-['100px'] mb-2 pb-4 gap-3 bg-white w-full border-b border-neutral-300">
        {['Today', 'Yesterday', 'Last Week', 'Last Month', 'Filter'].map((period) => (
          <Btn
            key={period}
            onClick={() => {
              if (period === 'Filter') {
                setFilterVisible(!filterVisible);
              } else {
                const periodValue = (period === 'Last Week' ? 'lastweek' : period === 'Last Month' ? 'lastmonth' : period.toLowerCase());
                handlePeriodChange(periodValue);
              }
            }}
            type="button"
            className={`flex items-center cursor-pointer gap-2 text-nowrap
                ${selectedPeriod === period.toLowerCase().replace(' ', '') ? 'bg-primary-100' : ''}`}
            size="sm"
          >
            <Text>{period}</Text>
            {period === 'Filter' && <SlidersHorizontal className="mt-0.5" size={14} />}
          </Btn>
        ))}
      </div>

      {filterVisible && (
        <div className="mb-4 p-4 border border-neutral-300 rounded-md bg-white">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Origin</label>
              <Input
                type="text"
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded-md"
                placeholder="e.g. SFO"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Destination</label>
              <Input
                type="text"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded-md"
                placeholder="e.g. JFK"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Btn onClick={handleFilterApply} size="sm">Apply Filters</Btn>
          </div>
        </div>
      )}

      {loading && historyData.length === 0 ? (
        <div className="text-center py-8">
          <div className="spinner"></div>
          <Text className="mt-2">Loading your trip history...</Text>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          <Text>{error}</Text>
          <Btn onClick={() => fetchClickHistory()} className="mt-2" size="sm">Retry</Btn>
        </div>
      ) : historyData.length === 0 ? (
        <div className="text-center py-8">
          <Text className="text-neutral-500">No trip history found for the selected filters.</Text>
        </div>
      ) : (
        <div className="space-y-4">
          {historyData.map((item) => (
            <FlightHistoryItem key={item.id} item={item} />
          ))}

          {hasMoreResults && (
            <div className="text-center py-4">
              <Btn
                onClick={handleLoadMore}
                disabled={loading}
                size="sm"
                className="mx-auto"
              >
                {loading ? 'Loading...' : 'Load More'}
              </Btn>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const FlightHistoryItem = ({ item }: { item: ClickHistoryItem }) => {
  let flightDetails;
  try {
    flightDetails = JSON.parse(item.flightOffer);
  } catch {
    flightDetails = null;
  }

  const clickDate = new Date(item.clickedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="p-4 border border-neutral-300 rounded-md bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between mb-2">
        <Text weight="bold" className="text-primary-500">
          {item.flightOrigin} : {item.flightDestination}
        </Text>
        <Text size="sm" className="text-neutral-500">
          Viewed on {clickDate}
        </Text>
      </div>

      {flightDetails ? (
        <div className="mt-2">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <div className="font-medium">Airline</div>
              <div>{flightDetails.airline || 'Unknown'}</div>
            </div>
            <div>
              <div className="font-medium">Price</div>
              <div>{flightDetails.price || 'Not available'}</div>
            </div>
            <div>
              <div className="font-medium">Flight Date</div>
              <div>{flightDetails.date || 'Not available'}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 text-sm">
          <Text>Flight details viewed at {new Date(item.timestamp || item.clickedAt).toLocaleTimeString()}</Text>
        </div>
      )}
    </div>
  );
};