import { BiWorld } from "react-icons/bi";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { PiBookBookmark, PiHandshake } from "react-icons/pi";
import { Img as ReactImage } from 'react-image';
import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/Button";
import { Text } from "../../components/TextComp";
import { APP_NAME } from "../../utils/constants";
import Contact from "./sections/Contact";
import FaqSupport from "./sections/FaqSupport";
import SubscriptionPlan from "./sections/SubscriptionPlan";

const HomeScreen = () => {
  return (
    <main className="w-full bg-white">
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <section className="w-full bg-[url('/flying-sunset.svg')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col bg-primary-700/85 w-full jusitfy-center items-center px-4 py-18 gap-4 isolate">
          <Text as="h1" weight="bold" size="4xl" color="text-white" className="font-grotesk font-bold text-4xl lg:text-[40px]">
            Join {APP_NAME.toUpperCase()} today
          </Text>
          <Text size="base" color="text-white" className="font-work lg:max-w-[780px] text-sm text-center">
            We make finding affordable flights easy by searching multiple sources and presenting the best deals. No hassle, just the most reliable flight options with a direct link to book on the airline's site.
          </Text>
        </div>
      </section>
      <SubscriptionPlan />
      <Contact />
      <FaqSupport />
    </main>
  );
}

export default HomeScreen;

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


const HowItWorks = () => {

  const Options = [
    { icon: <BiWorld />, color: 'bg-primary-100/30', title: 'We search the Web', description: 'We continuously scan multiple sources to find the most affordable flights available.' },
    { icon: <PiHandshake />, color: 'bg-[#FFDBC030]', title: 'We Present the Best Deals', description: 'Our platform compiles and displays detailed information about these flights, including pricing, schedules, and key details.' },
    { icon: <PiBookBookmark />, color: 'bg-[#66666620]', title: 'View Details & the Book Airline`s Site', description: 'You simply click on the flight that interest you, and we provide you with all the details along with a link' }
  ]

  return (
    <section id="how-it-works"
      className="flex w-full flex-col items-center py-18 lg:py-30 bg-[#F5F5F5] gap-10 px-4 md:px-8 ">
      <Text as="h1" weight="bold" size="4xl" className="font-grotesk font-bold text-4xl lg:text-[56px]">
        How it works
      </Text>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-8">
        {
          Options?.map((option, index) => (
            <div key={index} className={`flex flex-col lg:max-w-[400px] ${option?.color}  rounded-2xl p-5 font-work gap-4 hover:scale-105 transition-all duration-300 ease-in-out`}>
              <div className="text-3xl text-primary-600">
                {option?.icon}
              </div>
              <div className="">
                <Text as="h2" weight="bold" size="2xl" className="font-medium font-grotesk ">
                  {option?.title}
                </Text>
                <Text weight="medium" size="base" color="text-neutral-500" className="font-work font-normal text-base mt-2">
                  {option?.description}
                </Text>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

const WhyChooseUs = () => {
  const navigate = useNavigate();
  return (
    <section id="why-choose-us"
      className="flex flex-col lg:flex-row w-full py-18 lg:py-30 px-4 md:px-8 lg:px-28 gap-8"
    >
      <div className="block w-full hover:scale-105 transition-all duration-300 ease-in-out">
        <ReactImage
          src={'/Flight.png'}
          alt="Flight"
          className="w-full"
        />
      </div>
      <div className="block w-full">
        <div className="flex flex-col w-full gap-4">
          <Text as="h1" weight="bold" size="4xl" className="font-grotesk font-bold text-4xl lg:text-[56px]">
            Why Choose Us?
          </Text>
          <Text weight="medium" size="base" color="text-neutral-500" className="font-work text-base mt-2">
            We make finding affordable flights easy by searching multiple sources and presenting the best deals. No hassle, just the most reliable flight options with a direct link to book on the airline's site.
          </Text>
          <div className="flex flex-col gap-2">
            {
              ['Affordable Flights', 'Transparent Pricing', 'Time-Saving']?.map((item) => (
                <div key={item}
                  className="flex w-full flex-nowrap items-center gap-3"
                >
                  <IoCheckmarkCircleSharp className="text-lg text-success" /> {item}
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4.5 mt-10">
          <Btn onClick={() => navigate("/signup")}
            className="bg-white w-full lg:max-w-[250px] text-nowrap lg:text-lg lg:px-7 lg:h-14 text-primary-500">
            Sign Up
          </Btn>
          <Btn className="bg-gradient-to-b text-nowrap from-[#FF9040] to-[#FF6B00] w-full lg:max-w-[250px] lg:text-lg lg:px-7 lg:h-14 text-white">
            See the Best Deals
          </Btn>
        </div>
      </div>

    </section>
  )
}
