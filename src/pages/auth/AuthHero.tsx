import { FlightAnimation } from "../../components/layout/Animation"
import BackgroundImageSection from "../../components/layout/SideHeroComp"
import frame from '../../../public/AuthHeroFrame.png';
import plane from '../../../public/liftoff.png';


export const AuthHero =()=> {
  return (
    <div className="relative hidden lg:flex lg:w-1/2">
      <div className="w-full h-fit absolute bottom-[150px] -rotate-12">
        <FlightAnimation props="takeoff " />
      </div>
      <BackgroundImageSection
        backgroundImage={frame}
        imageSrc={plane}
        className="w-full min-h-full"
      />
    </div>
  );
}