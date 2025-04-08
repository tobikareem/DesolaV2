
import React from 'react';
import { Text } from '../ui/TextComp';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useFlightSearch } from '../../hooks/useDashboardInfo';
import { EmptyState } from '../layout/EmptyState';
import LoadingScreen from '../layout/LoadingScreen';
import { Link } from 'react-router-dom';



type FlightOffer = {
  airlineLogo: string;
  departureTime: string;
  date: string;
  duration: string;
  classType: string;
  stops: string;
  route: string;
  aircraft: string;
  price: string;
  websiteLink: string;
};

type Props = {
  offers: FlightOffer[];
  className?: string;
  onClose: () => void;
};

const FlightOffersModal: React.FC<Props> = ({ offers, onClose}) => {
  const {flightLoading, flightResults} = useFlightSearch()
  
  return (
    <div className="size-full rounded-2xl overflow-hidden max-w-5xl bg-neutral-100">
      <div className='flex items-center justify-between bg-primary-100 w-full lg:h-[100px] p-6 md:p-8'>
        <Text as='h3' weight="bold" color='text-primary-600' className='font-grotesk w-full text-center'>
          Best Offers
        </Text>
        <IoMdCloseCircleOutline
          onClick={onClose}
          className="text-2xl text-black hover:scale-125 transition-transform duration-200 ease-in-out"
        />
      </div>

      <div className="p-4 md:p-8 lg:p-10">
        {flightLoading ? (
          <LoadingScreen message="Loading flight offers..." />
        ) : flightResults?.length === 1 ? (
          <EmptyState content={'No flight result, try again later...'} position={'center'} />
        ) : (
          <div className="space-y-4 px-4 overflow-auto">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={offer.airlineLogo}
                  alt="Airline Logo"
                  className="w-12 h-12 rounded"
                />
                <div className="ml-4 flex-1">
                  <Text as="p" className="font-medium">
                    Departure • {offer.departureTime} {offer.date}
                  </Text>
                  <Text as="p">
                    {offer.route} • {offer.duration}
                  </Text>
                  <Text as='p'>
                    {offer.classType} • {offer.stops} Stop • {offer.aircraft}
                  </Text>
                </div>
                <Link
                  to={offer.websiteLink}
                  target="_blank"
                  rel=""
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  Website link
                </Link>
                <Text className="text-green-600 font-semibold ml-4">{offer.price}</Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightOffersModal;

