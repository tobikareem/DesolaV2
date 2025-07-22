import React from 'react';
import { Trash2, Calendar, GiftIcon } from 'lucide-react';
import { PromoCode, promoCodes } from '../../../utils/AdminPromoData';
import { Btn } from '../../ui/Button';
import { Text } from '../../ui/TextComp';

export const PromoTable: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 mt-6">
      <div className="flex justify-between items-center mb-4">
        <div className='flex items-center gap-2'>
            <GiftIcon />
          <Text
            as="h2"
            size="2xl"
            weight="medium"
            fontStyle="font-grotesk"
            className=" text-neutral-800"
          >
            Promo & Discount Codes
          </Text>
        </div>

        <Btn className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-all text-sm">
          + Create a Promo Code
        </Btn>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-sm text-left">
          <thead className="text-neutral-500 border-b text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Discount</th>
              <th className="py-3 px-4">Usage</th>
              <th className="py-3 px-4">Expiry Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Performance</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promoCodes.map((promo: PromoCode, index: number) => (
              <tr key={index} className="border-b hover:bg-neutral-50">
                <td className="py-3 px-4 font-medium text-neutral-800">
                  {promo.code}
                </td>
                <td className="py-3 px-4">{promo.discount}</td>
                <td className="py-3 px-4 text-neutral-600">{promo.usage}</td>
                <td className="py-3 px-4 flex items-center gap-2 text-neutral-700">
                  <Calendar className="w-4 h-4" /> {promo.expiry}
                </td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                    {promo.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-neutral-700">
                  {promo.performance} usage rate
                </td>
                <td className="py-3 px-4 flex items-center">
                  <button className="text-red-500  hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
