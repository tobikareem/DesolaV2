
import { Text } from "../../components/TextComp";
import { APP_NAME } from "../../utils/constants";
import Contact from "./sections/Contact";
import FaqSupport from "./sections/FaqSupport";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowitWorks";
import SubscriptionPlan from "./sections/SubscriptionPlan";
import { WhyChooseUs } from "./sections/WhyChooseUs";

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
