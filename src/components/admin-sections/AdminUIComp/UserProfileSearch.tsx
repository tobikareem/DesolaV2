import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../ui/InputField';
import { Btn } from '../../ui/Button';

export const UserProfileSearch = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', query);
    // we will implement the search logic here
  };

  return (
    <div className="">
    
      <div className="bg-gray-200 p-4 rounded-lg flex items-center space-x-4">
        <div className="flex items-center bg-white px-4 py-2 rounded-lg flex-1 shadow-sm">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <Input
            type="text"
            placeholder="Search user by email or ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full  outline-none border-0 text-sm text-gray-700 placeholder-gray-400 bg-transparent"
          />
        </div>

        <Btn
          onClick={handleSearch}
          className="bg-primary-500 text-white px-3 py-1 md:px-5 md:py-2 rounded-md hover:bg-primary-600 transition"
        >
          Search
        </Btn>
      </div>
      {/* <div className="flex items-center gap-18 mt-9">
        <div className="text-gray-500">
          <Text as="p" size="base" >
            Last Seen
          </Text>
          <Text as="h1" size="3xl" className="">2 hours ago</Text>
        </div>
        <div className="text-gray-500">
          <Text as="p" size="base">
            Active Device
          </Text>
          <Text as="h1" size="3xl" weight="medium" className="">
            3
          </Text>
        </div>
      </div> */}
    </div>
  );
};
