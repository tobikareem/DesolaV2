import { Text } from '../../components/TextComp';
import { Input } from '../../components/InputField';
import { Btn } from '../../components/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthHero } from './AuthHero';
import { Logo } from '../../components/Logo';

const ForgetPassword: React.FC = () => {
  return (

      <div className="font-work flex h-screen lg:flex-row flex-col w-full">
        <div className="size-full lg:w-1/2 p-6 md:p-10 flex flex-col items-center">
          <div className="w-full flex justify-center lg:justify-normal items-center mb-30 cursor-pointer">
            <Logo />
          </div>
          <div className="w-full max-w-md">
            <Text as="h1" size="3xl" weight="bold" className="mb-2.5 text-3xl xs:!text-4xl text-center font-grotesk">
              Forget Password?
            </Text>
            <Text as="p" size="sm" className="mb-[52px] text-center text-neutral-500">
              No worries, We will send you reset instructions
            </Text>

            <Input
              label="Email" 
              labelClassName='!text-neutral !text-base !font-medium'  
              placeholder="Please Enter your email"
              className="text-sm mb-4 w-full rounded-lg"
            />

            <Btn className="w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] text-white py-1 rounded mt-8">
              Send 4-digit code
            </Btn>

            <div className="text-center flex justify-center gap-2 items-center mt-7">
              <FaArrowLeft className=" text-black" />
              <Link
                to={'/signin'}
                className="text-black hover:font-semibold text-sm cursor-pointer"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
        <AuthHero/>
      </div>
  );
};

export default ForgetPassword;
