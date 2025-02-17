import { Img as ReactImage } from 'react-image';
import { useNavigate } from "react-router-dom";
import { Text } from "../../../components/TextComp";
import { Btn } from "../../../components/Button";

export const Hero = () => {

  const navigate = useNavigate();

  return (
    <section id="home" className="relative flex flex-col items-center px-4 md:px-8 lg:px-28 w-full bg-[url('/Hero-bg.svg')] bg-cover bg-center bg-no-repeat min-h-[75svh]  lg:min-h-[100vh] ">
      <div className="flex flex-col items-center mt-20 md:mt-30 lg:mt-48 text-center">
        <Text as="h1" weight="bold" className="font-grotesk font-bold text-4xl text lg:text-[56px]">
          Find the <span className="text-[#4E50C7]">Best</span> <span className="text-primary-500">Flight</span> Deals
        </Text>
        <Text weight="medium" size="base" color="text-neutral-500" className="mt-8 font-work lg:max-w-[520px] text-base lg:text-lg text-center">
          Your guide to finding efficient and cost-effect flight options. We search the best deals so you don't have to.
        </Text>
        <div className="flex flex-col lg:flex-row w-full items-center justify-center mt-8 gap-4 z-30">
          <Btn onClick={() => navigate("/signup")}
            className="bg-white w-full md:max-w-[250px] text-nowrap lg:text-lg lg:px-7 lg:h-14 text-primary-500">
            Sign Up
          </Btn>
          <Btn className="bg-gradient-to-b text-nowrap from-[#FF9040] to-[#FF6B00] w-full md:max-w-[250px] lg:text-lg lg:px-7 lg:h-14 text-white">
            See the Best Deals
          </Btn>
        </div>
      </div>
      <div className="absolute bottom-5 w-full">
        <ReactImage src="/Aero.png" alt="Desola-logo"
          width={500}
          height={500}
          className="w-full"
        />
      </div>
    </section>
  )
}
