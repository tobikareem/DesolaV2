
import { Text } from "../ui/TextComp";

const LoadingScreen = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center h-screen">
        <Text as="h1" weight="bold" size="xl">{message}</Text>
    </div>
);

export default LoadingScreen;