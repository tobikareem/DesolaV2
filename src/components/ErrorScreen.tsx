import { Text } from "./TextComp";

const ErrorScreen = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center h-screen">
        <Text as="h1" weight="bold" size="xl" className="text-red-500">Error: {message}</Text>
    </div>
);

export default ErrorScreen;