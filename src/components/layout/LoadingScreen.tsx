import {Img as ReactImage} from 'react-image'
import { Text } from "../ui/TextComp";

const LoadingScreen = ({message, dimension='w-screen h-screen',background = 'bg-background'}: {message: string, dimension:'w-screen h-screen' | 'w-full h-full', background:string}) => (
    <div className={`flex flex-col gap-8 items-center justify-center ${dimension} ${background}`}>
        <ReactImage
            src="/Globe.png"
            alt="Globe"
            className="w-[120px]"
        />
        <Text as="h1" weight="bold" size="xl" color="text-primary-600 animate-pulse duration-300 ease-in">{message}</Text>
    </div>
);

export default LoadingScreen;