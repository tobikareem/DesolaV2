import { errorLogs } from '../../../utils/ErrorLogs';
import { Text } from '../../ui/TextComp';
import { ErrorLogCard } from './ErrorLogCard';

export const ErrorLogs = () => {
  return (
    <div className="bg-white border rounded-2xl p-6 w-full mt-6 shadow-sm">
      <Text as='h2' size='lg' weight='semibold' fontStyle='font-grotesk' className="text-neutral-700 mb-4">
        Error Logs ({errorLogs.length})
      </Text>
      {errorLogs.map((log) => (
        <ErrorLogCard key={log.id} log={log} />
      ))}
    </div>
  );
};
