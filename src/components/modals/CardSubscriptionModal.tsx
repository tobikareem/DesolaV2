import { useState } from 'react';
import { Text } from '../ui/TextComp';
import { Btn } from '../ui/Button';
import {Input} from "../ui/InputField";
import { FaCreditCard } from 'react-icons/fa';
import Visa from '/Visa.webp';
import Mastercard from '/Mastercard.webp';
import Amex from '/Amex.webp';
import Express from '/Express.webp';
import Subscription from '/Subscription.webp';
import {toast} from 'react-toastify';

interface CardSubscriptionModalProps {
  onCancel: () => void;
  onConfirm: (card: {
    name: string;
    number: string;
    expiry: string;
    cvv: string;
  }) => void;
}

const CardSubscriptionModal: React.FC<CardSubscriptionModalProps> = ({
  onCancel,
  onConfirm,
}) => {
  const [card, setCard] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (card.name && card.number && card.expiry && card.cvv) {
      onConfirm(card);
    } else {
      toast.error('Please fill out all fields.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white rounded-2xl overflow-hidden shadow-lg w-full max-w-4xl">

      <div className="hidden md:items-center md:justify-center md:block">
        <img
          src={Subscription}
          alt="Subscription"
          className="w-full h-full   object-cover"
        />
      </div>

   
      <div className="flex items-center justify-center p-6">
        <div className="flex bg-white flex-col p-6 rounded-lg items-center justify-center w-full max-w-[400px] h-fit ">
          <FaCreditCard className="text-4xl text-primary-600" />
          <Text
            as="h3"
            size="xl"
            weight="medium"
            className="text-center text-Neutral mt-4"
          >
            Subscription Payment
          </Text>

          <div className="w-full mt-6 space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Cardholder's Name"
              value={card.name}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />

            <Input
              type="text"
              name="number"
              placeholder="Card Number"
              value={card.number}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, '');
                val = val.slice(0, 16);
                const formatted = val.match(/.{1,4}/g)?.join('-') || val;
                setCard({ ...card, number: formatted });
              }}
              maxLength={19}
              className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />

            <div className="flex items-center gap-1 mt-1 ml-1">
              { [Visa, Mastercard, Express, Amex, ]?.map((index) => (
                <img src={index} alt={index} className="h-3.5 w-auto" />
              ))}
            </div>

            <Input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={(e) => {
                let val = e.target.value.replace(/\D/g, '').slice(0, 4); // max 4 digits
                if (val.length >= 3) {
                  val = `${val.slice(0, 2)}/${val.slice(2)}`;
                }
                setCard({ ...card, expiry: val });
              }}
              maxLength={5}
              className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />

            <Input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={card.cvv}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                setCard({ ...card, cvv: val });
              }}
              maxLength={4}
              className="w-full border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-center mt-6 gap-4 w-full">
            <Btn
              className="px-4 py-2 bg-neutral-300 text-Neutral w-full md:w-auto"
              onClick={onCancel}
            >
              Cancel
            </Btn>
            <Btn
              className="px-4 py-2 bg-primary-600 text-white w-full md:w-auto"
              onClick={handleSubmit}
            >
              Subscribe
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSubscriptionModal;
