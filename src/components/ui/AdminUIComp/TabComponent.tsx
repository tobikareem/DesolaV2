
import { useState } from 'react';

type Tab = {
  label: string;
  content: React.ReactNode;
};

export const TabComponent = ({ tabs }: { tabs: Tab[] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div>
      <div className="flex justify-between mt-6 bg-[#EAEDF1] mb-6 p-2 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-8 border-0 py-2 text-sm font-medium rounded-lg ${
              activeTab === tab.label
                ? 'bg-white text-black'
                : 'border-transparent text-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>{tabs.find((tab) => tab.label === activeTab)?.content}</div>
    </div>
  );
};
