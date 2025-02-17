import { BiWorld } from "react-icons/bi";
import { PiBookBookmark, PiHandshake } from "react-icons/pi";
import { Text } from "../../../components/TextComp";

export const HowItWorks = () => {

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