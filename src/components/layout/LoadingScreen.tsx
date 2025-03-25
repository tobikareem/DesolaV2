import {Img as ReactImage} from 'react-image'
import { Text } from "../ui/TextComp";

const LoadingScreen = ({ message }: { message: string }) => (
    <div className="flex flex-col gap-8 items-center justify-center w-screen h-screen bg-background">
        <ReactImage
            src="/Globe.png"
            alt="Globe"
            className="w-[120px]"
        />
        <Text as="h1" weight="bold" size="xl" color="text-primary-600">{message}</Text>
    </div>
);

export default LoadingScreen;