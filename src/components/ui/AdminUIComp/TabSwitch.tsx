import { useState } from 'react';


export const TabSwitch = () => {
  const [activeTab, setActiveTab] = useState<'issues' | 'agents'>('issues');

  return (
    <div className="flex space-x-4 w-full max-w-7xl bg-white mt-6 justify-between px-4 py-2 rounded-lg shadow">
      <div
        onClick={() => setActiveTab('issues')}
        className={`px-6 py-2 rounded-md w-[50%] text-center text-xl font-semibold cursor-pointer transition ${
          activeTab === 'issues'
            ? 'bg-blue-100 text-black'
            : 'text-black hover:bg-gray-100'
        }`}
      >
        Issue Categories
      </div>

      <div
        onClick={() => setActiveTab('agents')}
        className={`px-6 py-2 rounded-md font-semibold text-xl w-[50%] text-center cursor-pointer transition ${
          activeTab === 'agents'
            ? 'bg-blue-100 text-black'
            : 'text-black hover:bg-gray-100'
        }`}
      >
        Agent Performance
      </div>
    </div>
  );
};
