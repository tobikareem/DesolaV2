import { useState } from 'react';
import {
  FaApple,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaWindows,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Btn } from '../../components/Button';
import { Input } from '../../components/InputField';
import { Logo } from '../../components/Logo';
import { Text } from '../../components/TextComp';
import { AuthHero } from './AuthHero';
import { FcGoogle } from 'react-icons/fc';


const Signup: React.FC = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [revealPassword2, setRevealPassword2] = useState<boolean>(false);
  return (
    <div className="flex h-screen lg:flex-row flex-col w-full">
      <div className="w-full lg:w-1/2 p-6 flex flex-col items-center">
        <div className="w-full max-w-md">
          <div className="flex justify-center items-center cursor-pointer mb-4 md:mb-16">
            <Logo />
          </div>

          <Text as="h1" size="3xl" weight="bold" className="mb-6 text-3xl xs:!text-4xl text-center font-grotesk">
            Create An Account
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3 sm:mb-4">
            <Input
              label="First Name"
              labelClassName='!text-neutral !text-base !font-medium'              
              placeholder="First Name"
              className="w-full rounded-lg"
            />
            <Input
              label="Last Name"
              labelClassName='!text-neutral !text-base !font-medium'              
              placeholder="Last Name"
              className="w-full rounded-lg"
            />
          </div>

          <Input
            label="Email"
            labelClassName='!text-neutral !text-base !font-medium'
            placeholder="Please Enter your email"
            className="text-sm mb-3 sm:mb-4 w-full rounded-lg"
          />

          <div className="relative w-full mb-3 sm:mb-4">
            <Input
              type={revealPassword ? 'text' : 'password'}
              label="Password"
              labelClassName='!text-neutral !text-base !font-medium'
              placeholder="Enter Password"
              className="text-sm w-full rounded-lg"
            />
            {revealPassword ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer absolute right-3 top-10"
                onClick={() => setRevealPassword(!revealPassword)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-10"
                onClick={() => setRevealPassword(!revealPassword)}
              />
            )}
          </div>

          <div className="relative w-full mb-3 sm:mb-4">
            <Input
              type={revealPassword2 ? 'text' : 'password'}
              label="Confirm Password"
              labelClassName='!text-neutral !text-base !font-medium'
              placeholder="Confirm Password"
              className="text-sm w-full rounded-lg"
            />

            {revealPassword2 ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setRevealPassword2(!revealPassword2)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setRevealPassword2(!revealPassword2)}
              />
            )}
          </div>

          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Input type="checkbox"/>
            <Text size="xs" color='text-Neutral' className='!text-Neutral font-poppins'>I agree to the terms & policy</Text>
          </div>

          <Btn className="w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] bg-orange-500 text-white py-1 rounded mb-6 sm:mb-8">
            Signup
          </Btn>

          <div className="flex items-center mb-6 px-2">
            <div className="flex-grow border border-neutral-200"/>
            <Text size="xs" className="font-poppins mx-3 text-Neutral">
              Or
            </Text>
            <div className="flex-grow border border-neutral-200"/>
          </div>

          <div className="flex justify-center gap-8 mb-6">
            <FcGoogle className="text-2xl cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaFacebook className="text-2xl text-primary-500 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaApple className="text-2xl text-black cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaWindows className="text-2xl text-primary-500 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
          </div>

          <div className="text-center">
            <Text size="sm" className='font-poppins font-medium '>
              Have an account?{' '}
              <Link to={'/signin'} className="font-poppins text-primary-500 hover:font-semibold">
                Sign in
              </Link>
            </Text>
          </div>
        </div>
      </div>

   
      <AuthHero />
    </div>
  );
};

export default Signup;
