
import React from 'react';
import { IoIosArrowDown, IoMdCloseCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useFlightSearch } from '../../hooks/useDashboardInfo';
import { FlightOffer } from '../../models/FlightSearchResponse';
import { EmptyState } from '../layout/EmptyState';
import { Text } from '../ui/TextComp';
import LoadingScreen from '../layout/LoadingScreen';



type Props = {
  className?: string;
  onClose: () => void;
};

const FlightOffersModal: React.FC<Props> = ({ onClose }) => {

  const {flightLoading, flightResults } = useFlightSearch()
  const [expandedOffers, setExpandedOffers] = React.useState<{ [key: string]: boolean }>({});


  if (!flightResults || flightResults.offers.length === 0) {
    return <EmptyState content="No flight results available" position="center" />;
  }

  const toggleExpand = (offerId: string) => {
    setExpandedOffers(prev => ({
      ...prev,
      [offerId]: !prev[offerId]
    }));
  };


  return (
    <div className="size-full rounded-2xl overflow-hidden w-full bg-neutral-100">
      <div className='flex items-center justify-between bg-primary-100 w-full lg:h-[100px] p-6 md:p-8'>
        <Text as='h3' weight="bold" color='text-primary-600' className='font-grotesk w-full text-center'>
          Best Offers
        </Text>
        <IoMdCloseCircleOutline
          onClick={onClose}
          className={`text-2xl text-black hover:scale-125 transition-transform duration-200 ease-in-out`}
        />
      </div>

      <div className="p-2 md:p-4 lg:p-8 overflow-y-auto h-full">
      {flightLoading ? (
          <LoadingScreen message="Loading flight offers..." />
        ) : flightResults?.offers.length === 1 ? (
          <EmptyState content={'No flight result, try again later...'} position={'center'} />
        ) : (
        <div className="space-y-4 overflow-auto">
          {flightResults.offers.map((offer: FlightOffer) => {
            const isExpanded = expandedOffers[offer.id] || false;

            return (
              <div
                key={offer.id}
                className={`flex flex-col w-full gap-8 ${isExpanded ? 'h-fit' : 'h-14 lg:h-22'} p-2 md:p-4 lg:p-8 border hover:border-primary-100 border-neutral-300 rounded-lg transition overflow-hidden`}
              >
                <div className={`flex w-full justify-between items-center bg z-[2]-mt-0.5 lg:-mt-2.5 gap-3`}>
                  <div className='flex items-center gap-2'>
                    <img
                      src={offer.airlineLogo}
                      alt="Airline Logo"
                      className="size-10 rounded-sm"
                    />
                    <div className='space-y-1'>
                      <Text as='p' size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
                        Departure • {offer.departureTime}
                      </Text>
                      <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
                        {offer.validatingCarrier} {offer.itineraries[0].segments[0].flightNumber}
                      </Text>
                    </div>
                  </div>

                  <div className='space-y-1 hidden lg:block'>
                    <Text as='p' size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
                      {offer.duration}
                    </Text>
                    <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
                      {offer.route}
                    </Text>
                  </div>
                  <div className='space-y-1 hidden lg:block'>
                    <Text as='p' size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
                      {offer.classType}
                    </Text>
                    <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
                      {offer.aircraft}
                    </Text>
                  </div>
                  <div className='space-y-1 hidden lg:block'>
                    <Text as='p' size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
                      {offer.stops}
                    </Text>
                    <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
                      {offer.route}
                    </Text>
                  </div>
                  <Link to={offer.websiteLink} className='hidden lg:flex items-center rounded-lg bg-primary-100 px-2.5 py-1.5 hover:scale-105 transition-transform duration-200 ease-in-out'>
                    Website Link
                  </Link>
                  <div className='space-y-1 hidden lg:block'>
                    <Text as='p' size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
                      {offer.totalPrice}
                    </Text>
                    <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
                      {offer.route}
                    </Text>
                  </div>
                  <IoIosArrowDown
                    onClick={() => toggleExpand(offer.id)}
                    className={`${isExpanded ? 'rotate-0' : '-rotate-90'} duration-300 ease-in-out cursor-pointer`}
                  />
                </div>

                {isExpanded && (
                  <div className={`flex w-full flex-col gap-4 transition-transform duration-300 ease-in-out`}>
                    <h4 className="font-medium">Flight Details</h4>

                    {offer.itineraries.map((itinerary, itineraryIndex) => (
                      <div key={itineraryIndex} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex justify-between mb-3">
                          <span className="font-medium">{itinerary.direction}</span>
                          <span>{itinerary.formattedDuration}</span>
                        </div>

                        {itinerary.segments.map((segment, segmentIndex) => (
                          <div key={segmentIndex} className="flex flex-col border-l-2 border-primary-300 pl-4 ml-2 mb-4 last:mb-0 relative">
                            {segmentIndex > 0 && (
                              <div className="absolute -left-1.5 -top-3 h-3 w-3 rounded-full bg-primary-300"></div>
                            )}

                            <div className="flex justify-between mb-2">
                              <div>
                                <div className="font-medium">{segment.departure.formattedDateTime}</div>
                                <div className="text-sm text-neutral-500">{segment.departure.airportCode} {segment.departure.terminal ? `Terminal ${segment.departure.terminal}` : ''}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm">{segment.marketingAirline} {segment.flightNumber}</div>
                                <div className="text-xs text-neutral-500">{segment.aircraftType}</div>
                              </div>
                            </div>

                            <div className="text-center text-xs text-neutral-500 my-1">
                              {segment.formattedDuration}
                            </div>

                            <div className="flex justify-between mt-2">
                              <div>
                                <div className="font-medium">{segment.arrival.formattedDateTime}</div>
                                <div className="text-sm text-neutral-500">{segment.arrival.airportCode} {segment.arrival.terminal ? `Terminal ${segment.arrival.terminal}` : ''}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    <div className="flex justify-between items-center mt-3">
                      <div>
                        <h5 className="font-medium">Baggage Allowance</h5>
                        <p className="text-sm text-neutral-500">{offer.baggageAllowance.description || `Checked bags: ${offer.baggageAllowance.checkedBags}`}</p>
                      </div>
                      <Link
                        to={offer.websiteLink}
                        className='flex items-center rounded-lg bg-primary-600 text-white px-4 py-2 hover:bg-primary-700 transition-colors duration-200 ease-in-out'
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
};

export default FlightOffersModal;