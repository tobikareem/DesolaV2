
import { Text } from "../../components/ui/TextComp";
import { VITE_APP_NAME } from "../../utils/constants";
import Contact from "./sections/Contact";
import FaqSupport from "./sections/FaqSupport";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowitWorks";
import SubscriptionPlan from "./sections/SubscriptionPlan";
import { WhyChooseUs } from "./sections/WhyChooseUs";

const HomeScreen = () => {
  return (
    <main className="w-screen bg-background">
      <Hero />
      <HowItWorks />
      <WhyChooseUs />
      <section className="w-full bg-[url('/flying-sunset.webp')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col bg-primary-700/85 w-full justify-center items-center px-4 py-18 gap-4 isolate">
          <Text as="h1" weight="bold" size="4xl" color="text-white" className="font-grotesk font-bold text-4xl lg:text-[40px]">
            Join {VITE_APP_NAME.toUpperCase()} today
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