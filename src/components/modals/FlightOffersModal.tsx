
import React from 'react';
import { Text } from '../ui/TextComp';
import { IoMdCloseCircleOutline } from 'react-icons/io';



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
  return (
    <div className="w-full rounded-2xl overflow-hidden max-w-5xl bg-neutral-100">
      <div className='flex items-center justify-between bg-primary-100 w-full lg:h-[100px] p-6 md:p-8'>
        <Text as='h3' weight="bold" color='text-primary-600' className='font-grotesk w-full text-center'>
          Best Offers
        </Text>
        <IoMdCloseCircleOutline
          onClick={onClose}
          className="text-2xl text-black hover:scale-125 transition-transform duration-200 ease-in-out"
        />
      </div>

      <div className="p-4">
        
        <div className="space-y-4 px-4 max-h-96 overflow-auto">
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
                <p className="font-medium">
                  Departure • {offer.departureTime} {offer.date}
                </p>
                <p className="text-gray-500 text-sm">
                  {offer.route} • {offer.duration}
                </p>
                <p className="text-gray-500 text-sm">
                  {offer.classType} • {offer.stops} Stop • {offer.aircraft}
                </p>
              </div>
              <a
                href={offer.websiteLink}
                target="_blank"
                rel=""
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
              >
                Website link
              </a>
              <p className="text-green-600 font-semibold ml-4">{offer.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightOffersModal;

