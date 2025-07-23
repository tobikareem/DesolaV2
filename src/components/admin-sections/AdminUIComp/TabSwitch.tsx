interface TabSwitchProps {
  activeTab: 'issues' | 'agents';
  setActiveTab: (tab: 'issues' | 'agents') => void;
}

export const TabSwitch = ({ activeTab, setActiveTab }: TabSwitchProps) => {
  return (
    <div className="flex space-x-4 w-full bg-white mt-6 justify-between px-2 lg:px-4 py-2 rounded-lg shadow">
      <div
        onClick={() => setActiveTab('issues')}
        className={`px-4 lg:px-6 py-2 rounded-md w-[50%] text-center hover:scale-105 hover:z-20 transition-transform duration-300 ease-in-out font-grotesk text-xs xs:text-base lg:text-xl font-semibold cursor-pointer ${
          activeTab === 'issues'
            ? 'bg-blue-100 text-black'
            : 'text-black hover:bg-gray-100'
        }`}
      >
        Issue Categories
      </div>

      <div
        onClick={() => setActiveTab('agents')}
        className={`px-4 lg:px-6 py-2 rounded-md font-semibold hover:scale-105 hover:z-20 transition-transform duration-300 ease-in-out font-grotesk text-xs xs:text-base lg:text-xl w-[50%] text-center cursor-pointer ${
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
