import { Img as ReactImage } from 'react-image';
import { FlightAnimation } from '../../../components/Animation';
import { Btn } from '../../../components/Button';
import { Text } from '../../../components/TextComp';
import { useAuthInfo } from '../../../hooks/useAuthInfo';
import authService from '../../../services/authService';

export const Hero = () => {
  const { isAuthenticated } = useAuthInfo();

  return (
    <section
      id="home"
      className="relative flex flex-col justify-between items-center px-4 md:px-8 lg:px-28 w-full bg-[url('/Hero-bg.svg')] bg-cover bg-center bg-no-repeat min-h-[80svh]  lg:min-h-[100svh] "
    >
      {/* <div className="md:hidden w-screen absolute top-20">
        <FlightAnimation props="flight !w-[60px]" />
      </div> */}
      <div className="relative flex flex-col items-center mt-24 xs:mt-30 md:mt-34 lg:mt-48 text-center">
        <div className='w-full flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-10 lg:justify-between z-[5]'>
          <div className="lg:w-1/2">
            <Text
              as="h1"
              weight="bold"
              color='text-white'
              className="!font-grotesk !text-4xl md:!text-[62px] xl:!text-[96px] !leading-tight lg:!leading-tighter xl:!leading-tight lg:text-left"
            >
              Find the Best Flight Deals
            </Text>
          </div>
          
          <div className='lg:w-1/2 z-[5]'>
            <Text
              weight="medium"
              size="base"
              color="text-white"
              className="lg:!mt-3 max-w-[450px] mx-auto lg:mx-0 font-work text-base lg:text-lg text-center lg:text-left z-[5]"
            >
              Your guide to finding efficient and cost-effect flight options. We
              search the best deals so you don't have to.
            </Text>
            {isAuthenticated ?
              (<Btn className="bg-gradient-to-b text-nowrap from-[#FF9040] to-[#FF6B00] w-full md:max-w-[250px] lg:text-lg lg:px-7 lg:h-14 text-white ">
                See the Best Deals
              </Btn>)
              :
              (<div className="flex flex-col md:flex-row w-full lg:max-w-[440px] justify-center lg:justify-normal mt-8 gap-4 z-30 ">
                <Btn
                  onClick={() => authService.signIn()}
                  className="bg-white w-full md:w-[250px] text-nowrap lg:text-lg lg:px-7 lg:h-14 text-primary-500 !rounded-[48px]"
                >
                  Get Started
                </Btn>
                <Btn className="bg-gradient-to-b text-nowrap from-[#FF9040] to-[#FF6B00] w-full md:w-[250px] lg:text-lg lg:px-7 lg:h-14 text-white !rounded-[48px]">
                  See the Best Deals
                </Btn>

              </div>)}
          </div>
        </div>
      </div>
      <div className='w-screen relative flex'>
        <div className="w-screen absolute md:top-24 lg:top-5 ">
          <FlightAnimation props="flight w-[50px] sm:w-20" />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <ReactImage
          src="/Aero.png"
          alt="Desola-logo"
          width={1200}
          height={1000}
          className="hidden xl:block"
        />
         <ReactImage
          src="/Aero.png"
          alt="Desola-logo"
          width={600}
          height={600}
          className="w-full object-fill object-center xl:hidden"
        />
      </div>
    </section>
  );
};
