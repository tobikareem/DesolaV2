
import React from 'react';
import { IoIosArrowDown, IoMdCloseCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useFlightSearch } from '../../hooks/useDashboardInfo';
import { EmptyState } from '../layout/EmptyState';
import LoadingScreen from '../layout/LoadingScreen';
import { Text } from '../ui/TextComp';


type Props = {
  className?: string;
  onClose: () => void;
};

const FlightOffersModal: React.FC<Props> = ({ onClose }) => {

  const { flightLoading, flightResults } = useFlightSearch()
  const [expandedOffers, setExpandedOffers] = React.useState<boolean>(false);

  const handleExpand = () => {
    setExpandedOffers(expand => !expand)
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
        ) : flightResults?.length === 1 ? (
          <EmptyState content={'No flight result, try again later...'} position={'center'} />
        ) : (
          <div className="space-y-4 overflow-auto">
            {offers.map((offer, index) => (
              <div
                key={index} onClick={() => setExpandedOffers(!expandedOffers)}
                className={`flex flex-col w-full gap-8 ${expandedOffers ? 'h-fit' : 'h-14 lg:h-22'} p-2 md:p-4 lg:p-8 border hover:border-primary-100 border-neutral-300 rounded-lg transition overflow-hidden`}
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
                        United Arab Emirated Flight 2015
                      </Text>
                    </div>
                  </div>

                  <div className='space-y-1 hidden lg:block'>
                    <Text as='p' size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
                      {offer.duration}
                    </Text>
                    <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
                      SMF-ORD
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
                      SMF-ORD
                    </Text>
                  </div>
                  <Link to={offer.websiteLink} className='hidden lg:flex items-center rounded-lg bg-primary-100 px-2.5 py-1.5 hover:scale-105 transition-transform duration-200 ease-in-out'>
                    Website Link
                  </Link>
                  <div className='space-y-1 hidden lg:block'>
                    <Text as='p' size='sm' weight="medium" color='text-Neutral' className='lg:text-base'>
                      {offer.price}
                    </Text>
                    <Text as='p' size='xs' weight="normal" color='text-neutral-500' className='truncate'>
                      {offer.route}
                    </Text>
                  </div>
                  <IoIosArrowDown onClick={handleExpand} className={`${expandedOffers ? 'rotate-0' : '-rotate-90'} duration-300 ease-in-out`} />
                </div>
                <div className={`flex w-full ${expandedOffers ? '-translate-y-0' : 'h-0 -translate-y-[500%]'} transition-transform duration-300 delay-300 ease-in-out`}>


                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightOffersModal;



