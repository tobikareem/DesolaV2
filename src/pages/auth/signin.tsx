import React, { useState } from 'react';
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

const SignIn: React.FC = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);

  return (
    <div className="flex h-screen lg:flex-row flex-col  w-full">
      <div className="w-full lg:w-1/2 p-6 flex-grow flex flex-col items-center md:p-10">
        <div className="w-full md:max-w-md">
          <div className="w-full flex justify-center items-center  mb-14 cursor-pointer">
            <Logo />
          </div>

          <Text as="h1" size="3xl" weight="bold" className="mb-6 text-3xl xs:!text-4xl text-center font-grotesk">
            Welcome Back!
          </Text>

          <Input
            label="Email"
            labelClassName='!text-neutral !text-base !font-medium'  
            placeholder="Please enter your email"
            className="text-sm mb-4 w-full rounded-lg"
          />

          <div className="relative w-full mb-3 sm:mb-4">
            <Input
              type={revealPassword ? 'text' : 'password'}
              label="Password"
              labelClassName='!text-neutral !text-base !font-medium'  
              placeholder="Enter Password"
              className="text-sm mb-1 w-full rounded-lg"
            />
            {revealPassword ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer absolute right-3 top-11 transform -translate-y-1/2"
                onClick={() => setRevealPassword(false)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-11 transform -translate-y-1/2"
                onClick={() => setRevealPassword(true)}
              />
            )}
            <Link
              to={'/reset'}
              className="mb-3 flex w-fit justify-self-end text-sm text-neutral-500 cursor-pointer hover:font-semibold"
            >
              Forget Password?
            </Link>
          </div>

          <Btn className="w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] bg-orange-500 text-white py-1 rounded mb-8">
            Sign In
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
            <FaFacebook className="text-xl text-primary-500 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaApple className="text-2xl text-black cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaWindows className="text-xl text-primary-500 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
          </div>

          <div className="text-center">
            <Text size="sm" className='font-poppins font-medium '>
              Don't have an account?{' '}
              <Link to={'/signup'} className="font-poppins text-primary-500 hover:font-semibold">
                Sign up
              </Link>
            </Text>
          </div>
        </div>
      </div>
      <AuthHero />
    </div>
  );
};

export default SignIn;
