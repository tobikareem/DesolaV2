import { SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Btn } from "../../../components/ui/Button";
import { Text } from "../../../components/ui/TextComp";
import { useClickTracking } from "../../../hooks/useClickTracking";
import { ClickHistoryItem, ClickHistoryQueryParams } from "../../../models/ClickTrackingPayload";
import { SESSION_VALUES } from "../../../utils/constants";
import { CustomStorage } from "../../../utils/customStorage";
import { Input } from "../../../components/ui/InputField";
import { ImSpinner } from "react-icons/im";
import { debounce } from "lodash";
import { useHybridCache } from '../../../hooks/useHybridCache';

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
  const [pendingOrigin, setPendingOrigin] = useState('');
  const [pendingDestination, setPendingDestination] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const userId = storage.getItem(SESSION_VALUES.azure_b2c_userId) ?? "";

  const getCacheKey = useCallback(() => {
    return `trip_history_${userId}_${selectedPeriod}_${originFilter}_${destinationFilter}`;
  }, [userId, selectedPeriod, originFilter, destinationFilter]);
  
   const {
    data: cachedHistory,
    loading: cacheLoading,
    error: cacheError,
    revalidate
  } = useHybridCache(
    getCacheKey(),
    async () => {
      const params: ClickHistoryQueryParams = {
        userId,
        period: selectedPeriod !== 'Filter' ? selectedPeriod.toLowerCase() : undefined,
        origin: originFilter || undefined,
        destination: destinationFilter || undefined,
        pageSize: 10
      };
      return await getClickHistory(params);
    },
    10 * 60 * 1000 // 5 minutes cache
  );

   const debouncedFetch = useCallback(() => {
     debounce(() => {
       revalidate();
     }, 500)();
   }, [userId, selectedPeriod, originFilter, destinationFilter, revalidate]);

  // const fetchClickHistory = async (reset = true) => {
  //   if (!userId || loading) return;

  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const params: ClickHistoryQueryParams = {
  //       userId,
  //       period: selectedPeriod !== 'Filter' ? selectedPeriod.toLowerCase() : undefined,
  //       origin: originFilter || undefined,
  //       destination: destinationFilter || undefined,
  //       pageToken: reset ? undefined : nextPageToken || undefined,
  //       pageSize: 10
  //     };

  //     const response = await getClickHistory(params);

  //     if (response) {
  //       setHistoryData(prev => reset ? response.results : [...prev, ...response.results]);
  //       setNextPageToken(response.nextPageToken);
  //       setHasMoreResults(response.hasMoreResults);
  //     }
  //   } catch (err) {
  //     setError('Failed to load click history. Please try again.');
  //     console.error('Error fetching click history:', err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  useEffect(() => {
    if (cachedHistory) {
      setHistoryData(cachedHistory.results);
      setNextPageToken(cachedHistory.nextPageToken);
      setHasMoreResults(cachedHistory.hasMoreResults);
    }
  }, [cachedHistory]);


  useEffect(()=>{
    if(selectedPeriod !== 'filter') {
      debouncedFetch();
    }
  },[selectedPeriod])


  const handlePeriodChange = (period: string) => {
    if (period === selectedPeriod) return; 
    setSelectedPeriod(period);
  };

  const handleLoadMore = async () => {
    if (!hasMoreResults || loading) return;

    setLoading(true);
    try {
      const params: ClickHistoryQueryParams = {
        userId,
        period: selectedPeriod !== 'Filter' ? selectedPeriod.toLowerCase() : undefined,
        origin: originFilter || undefined,
        destination: destinationFilter || undefined,
        pageToken: nextPageToken || undefined,
        pageSize: 10
      };

      const response = await getClickHistory(params);
      if (response) {
        setHistoryData(prev => [...prev, ...response.results]);
        setNextPageToken(response.nextPageToken);
        setHasMoreResults(response.hasMoreResults);
      }
    } catch (err) {
      setError('Failed to load more results. Please try again.');
      console.log('Error loading more click history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterApply = async () => {
    if (isApplying) return;
    setIsApplying(true);
    setOriginFilter(pendingOrigin);
    setDestinationFilter(pendingDestination);
    setSelectedPeriod('filter');
    setFilterVisible(false);
    await revalidate();
    setIsApplying(false);
  };

  const handleFilterReset = useCallback(() => {
    if (isApplying) return;

    setPendingOrigin('');
    setPendingDestination('');
    setOriginFilter('');
    setDestinationFilter('');
    setSelectedPeriod('today');
    debouncedFetch();
  }, [isApplying, debouncedFetch]);

  const isLoading = cacheLoading || loading;
  const currentError = cacheError?.message || error;

  return (
    <div className="flex-1 h-full">
      <div className='h-full overflow-hidden'>
        <div className="relative bg-white">
          <Text
            as="h1"
            size="2xl"
            weight="bold"
            className="font-grotesk text-primary-500 mb-5"
          >
            My Trips
          </Text>
          <div className="z-[2] flex flex-wrap items-center h-['100px'] mb-2 pb-4 gap-3 bg-white w-full border-b border-neutral-300">
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
                    ${(selectedPeriod === period.toLowerCase().replace(' ', '') || filterVisible) ? 'bg-primary-100' : ''}`}
                size="sm"
              >
                <Text>{period}</Text>
                {period === 'Filter' && <SlidersHorizontal className="mt-0.5" size={14} />}
              </Btn>
            ))}
          </div>
          {filterVisible && (
            <div className="absolute z-[1] w-full mb-4 p-3 border-2 border-neutral-300 shadow-md rounded-md bg-white">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Input
                  type="text"
                  value={pendingOrigin}
                  onChange={(e) => setPendingOrigin(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md text-sm"
                  placeholder="e.g. SFO"
                  label="Origin"
                  labelClassName="font-grotesk font-semibold text-lg"
                />
                <Input
                  type="text"
                  value={pendingDestination}
                  onChange={(e) => setPendingDestination(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-md text-sm"
                  placeholder="e.g. JFK"
                  label="Destination"
                  labelClassName="font-grotesk font-semibold text-lg"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Btn 
                  onClick={()=>{handleFilterReset(); setFilterVisible(!filterVisible)}} 
                  size="sm" 
                  disabled={isApplying}
                  className="bg-error text-white"
                >
                  Reset
                </Btn>
                <Btn 
                  onClick={()=> {handleFilterApply(); setFilterVisible(!filterVisible)}} 
                  size="sm"
                  disabled={isApplying || (!pendingOrigin && !pendingDestination)}
                  className="min-w-[100px] bg-primary-500 text-white"
                >
                  {isApplying ? (
                    <>
                      <span className="animate-spin mr-2"><ImSpinner /></span>
                      Applying...
                    </>
                  ) : 'Apply Filters'}
                </Btn>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-full overflow-y-auto">
        {isLoading && historyData.length === 0 ? (
          <div className="text-center py-8">
            <div className="spinner"></div>
            <Text className="mt-2">Loading your trip history...</Text>
          </div>
        ) : currentError ? (
          <div className="text-center py-8 text-red-500">
            <Text>{currentError}</Text>
            <Btn onClick={() => getClickHistory({ userId, pageSize: 10 })} className="mt-2" size="sm">Retry</Btn>
          </div>
        ) : historyData.length === 0 ? (
          <div className="text-center py-40 flex flex-col w-full items-center">
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
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2"><ImSpinner /></span>
                      Loading...
                    </>
                  ) : 'View More'}
                </Btn>
              </div>
            )}
          </div>
        )}
      </div>
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
    <div className="p-4 space-y-4 border border-neutral-300 hover:border-primary-100 rounded-md bg-transparent hover:shadow-md transition-shadow ease-in-out">
      <div className="flex justify-between gap-4">
        <Text as="h3" weight="bold" className="text-primary-500">
          {item.flightOrigin} : {item.flightDestination}
        </Text>
        <Text size="xs" className="sm:text-sm text-neutral-500">
          Viewed on {clickDate}
        </Text>
      </div>

      {flightDetails ? (
          <div className="flex flex-wrap gap-2 text-xl text-Neutral">
            <div className="flex-1">
              <Text as="h5" fontStyle="grotesk" color="text-Neutral">Airline</Text>
              <Text size='xs' color="text-neutral-500">{flightDetails.airline || 'Unknown'}</Text>
            </div>
            <div className="flex-1 ">
              <Text as="h5" fontStyle="grotesk" color="text-Neutral">Price</Text>
              <Text size='xs' color="text-neutral-500">{flightDetails.price || 'Not available'}</Text>
            </div>
            <div className="flex-1">
              <Text as="h5" fontStyle="grotesk" color="text-Neutral">Flight Date</Text>
              <Text size='xs' color="text-neutral-500">{flightDetails.date || 'Not available'}</Text>
            </div>
          </div>
      ) : (
        <div className="mt-2 text-sm">
          <Text color="text-neutral-500">Flight details viewed at {new Date(item.timestamp || item.clickedAt).toLocaleTimeString()}</Text>
        </div>
      )}
    </div>
  );
};