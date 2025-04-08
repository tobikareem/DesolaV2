import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { Img as ReactImage } from 'react-image';
import { useNavigate } from "react-router-dom";
import { Btn } from "../../../components/ui/Button";
import { Text } from "../../../components/ui/TextComp";
import { useSmoothScroll } from "../../../hooks/useSmoothScroll";

export const WhyChooseUs = () => {
    const navigate = useNavigate();
    const smoothScroll = useSmoothScroll();
    return (
        <section id="why-choose-us"
            className="flex flex-col lg:flex-row lg:items-center  w-full py-18 lg:py-30 px-4 md:px-8 lg:px-28 gap-8"
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
                    <Btn onClick={()=> {smoothScroll('#subscription');}}
                        className="bg-gradient-to-b text-nowrap from-[#FF9040] to-[#FF6B00] w-full lg:max-w-[250px] lg:text-lg lg:px-7 lg:h-14 text-white">
                        See the Best Deals
                    </Btn>
                </div>
            </div>

        </section>
    )
}