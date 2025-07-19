import { useState } from 'react';
import { Search } from 'lucide-react';
import { Text } from '../TextComp';
import { Input } from '../InputField';
import { Btn } from '../Button';

export const UserProfileSearch = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', query);
    // we will implement the search logic here
  };

  return (
    <div className="max-w-4xl">
      <Text
        as="h2"
        size="2xl"
        weight="semibold"
        fontStyle="font-grotesk"
        className=" text-neutral-500 mb-4"
      >
        Search for User's Profile
      </Text>

      <div className="bg-blue-100 p-4 rounded-lg flex items-center space-x-4">
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
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Search
        </Btn>
      </div>
      <div className="flex items-center gap-18 mt-9">
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
      </div>
    </div>
  );
};
