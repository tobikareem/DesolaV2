import { UserRound } from 'lucide-react'; // or use your own SVG/icon
import { Text } from '../TextComp';

export default function NoUserSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <UserRound className="w-16 h-16 mb-4 text-gray-400" />
      <Text as='p' size='base'>
        Please search and select a user to view their profile.
      </Text>
    </div>
  );
}
