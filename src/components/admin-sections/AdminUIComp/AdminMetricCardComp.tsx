import React from 'react';
import { AdminMetricItem } from '../../../utils/AdminTechnicalTracking';
import clsx from 'clsx';
import { Text } from '../../ui/TextComp';

interface MetricCardProps {
  title: string;
  subtitle: string;
  items: AdminMetricItem[];
}

export const AdminMetricCardComp: React.FC<MetricCardProps> = ({
  title,
  subtitle,
  items,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 w-full">
      <Text
        as="h3"
        size="xl"
        weight="semibold"
        fontStyle="font-grotesk"
        className=""
      >
        {title}
      </Text>
      <Text
        as="p"
        size="base"
        fontStyle="font-grotesk"
        className=" text-gray-500 mb-4"
      >
        {subtitle}
      </Text>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-base my-4 text-gray-700">{item.label}</span>
            <span
              className={clsx(
                'text-base font-medium px-3 py-0.5 rounded-full',
                item.color === 'blue' && 'bg-blue-100 text-neutral-700',
                item.color === 'orange' && 'bg-orange-100 text-neutral-700',
                item.color === 'green' && 'bg-green-100 text-neutral-700'
              )}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
