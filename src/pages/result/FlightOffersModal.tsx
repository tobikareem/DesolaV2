import React from 'react';
import { X } from 'lucide-react';

import { Btn } from '../../components/Button';

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
  onClose: () => void;
  isOpen: boolean;
};

const FlightOffersModal: React.FC<Props> = ({ offers, isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <div
        className={`bg-white rounded-xl w-4/5 max-w-4xl shadow-lg transform transition-all duration-300 ease-out ${
          isOpen ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className="flex bg-primary-100 rounded-tl rounded-tr justify-between items-center border-b pb-2">
          <h2 className="text-xl font-semibold text-center font-grotesk py-10 text-primary-500 w-full">
            Best Offer
          </h2>
          <Btn onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </Btn>
        </div>
        <div className="p-4">
          <p className="text-sm px-4 text-gray-500 my-2">
            Ranked based on price and convenience
          </p>
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
                  rel="noopener noreferrer"
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  Website link
                </a>
                <p className="text-green-600 font-semibold ml-4">
                  {offer.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightOffersModal;
