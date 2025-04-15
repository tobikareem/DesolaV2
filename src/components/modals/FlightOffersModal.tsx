
import React, { useContext, useEffect } from 'react';
import { IoIosArrowDown, IoMdCloseCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useFlightSearch } from '../../hooks/useDashboardInfo';
import { FlightOffer } from '../../models/FlightSearchResponse';
import { EmptyState } from '../layout/EmptyState';
import { Text } from '../ui/TextComp';
import LoadingScreen from '../layout/LoadingScreen';
import { UIContext } from '../../contexts/UIContext';
import { MobileFlightExtDetails } from '../dashboard-sections/flightSearchDetails/flightDetails';


type Props = {
  className?: string;
  onClose: () => void;
};

const FlightOffersModal: React.FC<Props> = ({ onClose }) => {

  const {flightLoading, flightResults, FlightSearchFn } = useFlightSearch()
  const {showFlightModal} = useContext(UIContext)
  const [expandedOffers, setExpandedOffers] = React.useState<{ [key: string]: boolean }>({});
  console.log('flightResults', flightResults)

  useEffect(() => {
    if (showFlightModal === true) {
      FlightSearchFn();
    }
  }, [showFlightModal, FlightSearchFn]);

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

      <div className="py-4 overflow-hidden h-[87%]">
      {flightLoading ? (
          <div className='block pt-30'>
            <LoadingScreen background='bg-transparent' dimension={'w-full h-full'} message={'Loading flight offers...'} />
          </div>
        ) : flightResults?.offers.length === 0 && !flightLoading ? (
          <div className='block pt-30'>
            <EmptyState position={'center'} content={'No flight result, try again later...'} />
          </div>
        ) : (
        <div className="p-2 md:p-4 lg:p-8 space-y-4 overflow-y-auto h-full border-b-2 border-neutral-300">
          {flightResults?.offers?.map((offer: FlightOffer) => {
            const isExpanded = expandedOffers[offer.id] || false;

            return (
              <div
                key={offer.id}
                className={` bg-neutral-100 flex flex-col w-full gap-8 ${isExpanded ? 'h-fit':'h-14 lg:h-22'} p-4 lg:p-8 border hover:border-2 hover:border-primary-100 focus-within:border-primary-100 border-neutral-300 rounded-lg transition overflow-hidden box-border`}
              >
                <div className={`flex w-full justify-between items-center z-[2] -mt-[7px] lg:-mt-2.5 gap-3`}>
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
                    <Text as='p' size='sm' weight="medium" color='text-success' className='font-grotesk lg:text-base'>
                      ${offer.totalPrice}
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

                  <div className={`flex w-full flex-col gap-4 ${isExpanded ? '-translate-y-0':'h-0 -translate-y-[500%]'}  transition-transform duration-300 delay-200 ease-in-out`}>
                    <MobileFlightExtDetails
                      duration={offer.duration}
                      route={offer.route}
                      airCodeII={offer.route}
                      airCraft={offer.aircraft}
                      flightClass={offer.classType}
                      stops={offer.stops}
                      source={offer.websiteLink}
                      price={offer.totalPrice}
                    />
                    <Text as='p' weight='medium' size='sm' color='text-primary-300' className="font-work lg:text-base">Flight Details</Text>
                    {isExpanded && offer.itineraries.map((itinerary, itineraryIndex) => (
                      <div key={itineraryIndex} className="border border-neutral-300 rounded-lg p-4">
                        <div className={`flex items-center justify-between mb-3 rounded-lg p-2 ${itinerary.direction === 'Outbound' ? 'bg-notification':'bg-success'}`}>
                          <Text as='h5' size='sm' weight="medium" color='text-neutral-100' className='lg:text:base'>{itinerary.direction}</Text>
                          <Text as='p' size='xs' color='text-neutral-100' className='lg:text-base'>{itinerary.formattedDuration}</Text>
                        </div>

                        {itinerary.segments.map((segment, segmentIndex) => (
                          <div key={segmentIndex} className="flex flex-col border-l-2 border-primary-100 pl-4 pb-2 ml-2 mb-4 gap-1 last:mb-0  relative">
                            {segmentIndex > 0 && (
                              <div className="absolute -left-[7px] -top-3 h-3 w-3 rounded-full bg-primary-300"></div>
                            )}

                            <div className="flex justify-between">
                              <div>
                                <Text size='sm' weight="medium" className='lg:text-base'>{segment.departure.formattedDateTime}</Text>
                                <Text size='xs' color='text-neutral-500'className='lg:text-sm'>{segment.departure.airportCode} {segment.departure.terminal ? `Terminal ${segment.departure.terminal}` : ''}</Text>
                              </div>
                              <div className="text-right">
                                <Text size='sm' weight='medium' className='lg:text-base'>{segment.marketingAirline} {segment.flightNumber}</Text>
                                <Text size="xs" color="text-neutral-500" className='lg:text-sm'>{segment.aircraftType}</Text>
                              </div>
                            </div>

                            <Text as='p' size='xs' color='text-Neutral' className='lg:text-base self-center bg-warning/30 px-2 py-0.5 rounded-lg'>
                              {segment.formattedDuration}
                            </Text>

                            <div className="flex justify-between">
                              <div>
                                <Text size='sm' weight="medium" className='lg:text-base'>{segment.arrival.formattedDateTime}</Text>
                                <Text size='xs' color='text-neutral-500'className='lg:text-sm'>{segment.arrival.airportCode} {segment.arrival.terminal ? `Terminal ${segment.arrival.terminal}` : ''}</Text>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    <div className="flex justify-between items-center mt-3">
                      <div className='space-y-1'>
                        <Text as='p' size='sm' weight="medium" color='text-Neutral' className='font-grotesk lg:text-base'>
                          Baggage Allowance
                        </Text>
                        <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
                          {offer.baggageAllowance.description || `Checked bags: ${offer.baggageAllowance.checkedBags}`}
                        </Text>
                      </div>
                      <Link
                        to={offer.websiteLink} target='_blank'
                        className='font-work flex items-center rounded-lg bg-secondary-500 text-white px-4 py-2 hover:scale-105 transition-transform duration-200 ease-in-out'
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
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