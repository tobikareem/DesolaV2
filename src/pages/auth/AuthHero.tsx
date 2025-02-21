import { FlightAnimation } from "../../components/Animation"
import BackgroundImageSection from "../../components/SideHeroComp"
import frame from '../../assets/Frame 2147207438.png';
import plane from '../../assets/Leonardo_Kino_XL_give_me_an_image_of_an_airplane_flying_2 1.png';


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