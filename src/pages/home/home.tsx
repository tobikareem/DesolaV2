import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/Button";
import {Text} from "../../components/TextComp";
import { Img as ReactImage } from 'react-image';
import { BiWorld } from "react-icons/bi";
import { PiBookBookmark, PiHandshake } from "react-icons/pi";
import { IoCallOutline, IoCheckmarkCircleSharp } from "react-icons/io5";
import { SubscriptionCard } from "../../components/SubscriptionCard";
import { Input, TextArea } from "../../components/InputField";
import { MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { RxCaretRight } from "react-icons/rx";

const HomeScreen = () => {
  return (
    <main className="w-full bg-white">
      <Hero/>
      <HowItWorks/>
      <WhyChooseUs/>
      <section className="w-full bg-[url('/flying-sunset.svg')] bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col bg-primary-700/85 w-full jusitfy-center items-center px-4 py-18 gap-4 isolate">
          <Text as="h1"weight="bold" size="4xl" color="text-white" className="font-grotesk font-bold text-4xl lg:text-[40px]">
            Join DESOLA today
          </Text>
          <Text size="base" color="text-white" className="font-work lg:max-w-[780px] text-sm text-center">
            We make finding affordable flights easy by searching multiple sources and presenting the best deals. No hassle, just the most reliable flight options with a direct link to book on the airline's site.
          </Text>
        </div>
      </section>
      <SubscriptionPlan/>
      <Contact/>
      <Support/>
    </main>
  );
}

export default HomeScreen;



export const Hero = () => {

    const navigate = useNavigate();

  return(
    <section id="home" className="relative flex flex-col items-center px-4 md:px-8 lg:px-28 w-full bg-[url('/Hero-bg.svg')] bg-cover bg-center bg-no-repeat min-h-[75svh]  lg:min-h-[100vh] ">
      <div className="flex flex-col items-center mt-20 md:mt-30 lg:mt-48 text-center">
        <Text as="h1"weight="bold" className="font-grotesk font-bold text-4xl text lg:text-[56px]">
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


const HowItWorks =()=> {

  const Options = [
    {icon:<BiWorld/>, color:'bg-primary-100/30', title:'We search the Web',description:'We continuously scan multiple sources to find the most affordable flights available.'},
    {icon:<PiHandshake />, color:'bg-[#FFDBC030]',title:'We Present the Best Deals', description: 'Our platform compiles and displays detailed information about these flights, including pricing, schedules, and key details.'},
    {icon:<PiBookBookmark />, color:'bg-[#66666620]', title:'View Details & the Book Airline`s Site', description:'You simply click on the flight that interest you, and we provide you with all the details along with a link'}
  ]

  return(
    <section id="how-it-works"
      className="flex w-full flex-col items-center py-18 lg:py-30 bg-[#F5F5F5] gap-10 px-4 md:px-8 ">
      <Text as="h1"weight="bold" size="4xl" className="font-grotesk font-bold text-4xl lg:text-[56px]">
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

const WhyChooseUs =()=> {
  const navigate = useNavigate();
  return(
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
          <Text as="h1"weight="bold" size="4xl" className="font-grotesk font-bold text-4xl lg:text-[56px]">
            Why Choose Us?
          </Text>
          <Text weight="medium" size="base" color="text-neutral-500" className="font-work text-base mt-2">
            We make finding affordable flights easy by searching multiple sources and presenting the best deals. No hassle, just the most reliable flight options with a direct link to book on the airline's site.
          </Text>
          <div className="flex flex-col gap-2">
            {
              ['Affordable Flights', 'Transparent Pricing', 'Time-Saving']?.map((item)=>(
                  <div key={item}
                    className="flex w-full flex-nowrap items-center gap-3"
                  >
                  <IoCheckmarkCircleSharp className="text-lg text-success"/> {item}
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

const SubscriptionPlan =()=> {

  const BenefitList = ['Unlimited flight searches',
    'Access to the best flight deals',
    'Direct links to book on airline sites',
    'Price updates in real-time',
    'Email Support',
    'Flexible Date Search',
  ]
  return(
    <section id="subscription"
      className="bg-[#F5F5F5] flex w-full flex-col items-center py-18 lg:py-30 px-4 md:px-8 gap-10">
        <div className="text-center">
          <Text as="h1"weight="bold" size="4xl" className="font-grotesk font-bold text-4xl text-lg:text-[56px]">
            Your Perfect Plan
          </Text>
          <Text weight="medium" size="base" color="text-neutral-500" className="mt-8 font-work lg:max-w-[520px] text-base lg:text-lg text-center">
            Affordable and Scalable options for everyone.
          </Text>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <SubscriptionCard
            Tag="Monthly"
            TagColor="bg-primary-500"
            color="bg-white"
            price={2.99}
            priceColor="text-secondary-500"
            benefit={BenefitList} 
            benefitColor="text-primary-500"   
          />
          <SubscriptionCard 
            Tag="Yearly"
            TagColor="bg-secondary-500"
            color="bg-primary-500"
            priceColor="text-white"
            extra="text-white/50"
            price={30.50} period="yr"
            benefitColor="text-white"
            benefit={BenefitList}
          />
        </div>

    </section>
  )
}

const Contact =()=> {

  const ContactInfo = [
    {
      icon:<MdOutlineEmail />,
      contact:'info@desola.com'
    },
    {
      icon:<IoCallOutline />,
      contact:'+1 (808) 323 4455 '
    },
  ]

  return(
    <section id="contact"
      className="bg-[#F5F5F5] w-full py-18 lg:py-30 gap-10 px-4 md:px-8 lg:px-28 ">
      <div className="flex flex-col lg:flex-row w-full gap-8">
        {/* Contact Form */}
        <div className="flex flex-col flex-1 bg-white rounded-3xl p-8">
          <div className={`cursor-pointer bg-gradient-to-r from-white from-[05%] to-[98%]  to-[#CECECE20] border border-[#E4E4E7] py-3 px-3.5 w-fit rounded-[60px] font-poppins text-neutral-800 uppercase`}>
            Get in Touch
          </div>
          <div className="mt-3 flex flex-col gap-2 w-full">
            <Text as="h1"weight="bold" size="4xl" color="text-neutral-800"
              className="font-grotesk font-bold text-4xl text-lg:text-[56px]">
              Let's chat, Reach Out to Us
            </Text>
            <Text weight="normal" size="base" color="text-neutral-500" className=" font-work lg:max-w-[520px] text-base ">
              Have a question or feedback? We are here to help. Send us a message, and we'll respond in 24 hours. 
            </Text>
          </div>

          <form 
            className="mt-6 flex flex-col flex-grow w-full h-full gap-4">
            <div className="flex w-full gap-4 lg:gap-6">
              <div className="w-full">
                <Input 
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  className="bg-[#F3F3F3] w-full h-13 rounded-sm placeholder:text-[#B7B7B7] placeholder:"
                />
              </div>
              <div className="w-full">
                <Input 
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  className="bg-[#F3F3F3] w-full h-13 rounded-sm placeholder:text-[#B7B7B7] placeholder:"
                />
              </div>
            </div>
            <Input 
              label="Email Address"
              type="email"
              placeholder="email"
              className="bg-[#F3F3F3] w-full h-13 rounded-sm placeholder:text-[#B7B7B7] placeholder:"
            />
            <div className="flex flex-col flex-grow h-full">
              <TextArea
                label="Message"
                placeholder="Leave us a message..."
                className=" bg-[#F3F3F3]  flex h-[300px]  rounded-sm placeholder:text-[#B7B7B7] placeholder:"
              />
            </div>
            
            <Btn type="submit"
              className="mt-3 bg-gradient-to-b text-nowrap from-[#FF9040] to-[#FF6B00] w-full text-base lg:h-12 text-white">
              Send Message
            </Btn>
          </form>
        </div>

        <div className="flex flex-col flex-1 gap-8">
          <div className="bg-white w-full rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out ">
            <ReactImage src={'/contact.svg'}
              alt="contact"
              className="w-full"
            />
          </div>
          <div className=" bg-white w-full h-fit rounded-3xl px-4 py-6 lg:px-8 lg:py-8 ">
            <div className="flex flex-col w-full gap-4">
              {
                ContactInfo?.map((item, index)=>(
                  <div key={index}
                    className="flex w-full h-20 px-5 items-center bg-[#F3F3F3] rounded-2xl gap-2 text-nowrap font-inter font-normal text-[#15141F] text-base sm:text-xl hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <div className="bg-[#0D3180] flex items-center justify-center w-10 h-10 border-4 border-[#0D3180/30] rounded-full text-white text-base box-border">
                      {item?.icon}
                    </div>
                    {item?.contact}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      
    </section>
  )
}

const Support =()=> {

     const FAQ = [
      {
        question:'How does this website work?',
        answer:'Check the How it works section of the landing page'
      },
      {
        question:'Can I book flights directly on your website?',
        answer:'Check the How it works section of the landing page'
      },
      {
        question:'Are the prices on your site always accurate?',
        answer:'Check the How it works section of the landing page'
      },
      {
        question:'Do you charge any fees for using this services?',
        answer:'Check the How it works section of the landing page'
      },
      {
        question:'Which airlines do you compare?',
        answer:'Check the How it works section of the landing page'
      },

    ]

    const [open, setOpen] = useState<boolean[]>(Array(FAQ.length).fill(false));

    const ToggleState =(index: number)=> {
      setOpen((prevState) => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    }

  return(
    <section id="support"
      className="bg-white flex w-full flex-col items-center py-18 lg:py-30 px-4 md:px-8 lg:px-28 gap-10">
        <div className="text-center">
          <Text as="h1"weight="bold" size="4xl" className="font-grotesk font-bold text-4xl text-lg:text-[56px]">
            FAQ/Supports
          </Text>
        </div>

        <div className="flex flex-col w-full lg:w-[800px] gap-4">
          { 
            FAQ?.map((_item, index)=> (
              <div key={index}
                onClick={() => ToggleState(index)}
                className={`bg-primary-100/40 flex flex-col p-4 md:p-6 w-full gap-4 rounded-[24px] ${ open[index] ? 'h-fit' : 'h-16 items-center'} hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer`}>
                <div className="flex w-full justify-between items-center text-nowrap">
                  <Text weight="normal" size='base' color="text-[#1A1A1A]" className="font-work tracking-tight">
                    {_item?.question}
                  </Text>
                  <div className={`${open[index] ? 'rotate-90':'rotate-0'} text-2xl text-[#1A1A1A] transition-transform duration-1000 ease-in-out`}>
                    <RxCaretRight />
                  </div>
                </div>
                <div className={`${open[index] ? 'h-fit':'h-0' } transition-all duration-500 delay-300 ease-linear  pl-2 overflow-hidden`}>
                  <Text weight="normal" size='base' color="text-neutral-500" className="tracking-tight">
                    {_item?.answer}
                  </Text>
                </div>
              </div>
            ))
          }
        </div>

    </section>
  )
}