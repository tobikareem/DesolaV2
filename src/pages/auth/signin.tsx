import React, { useState } from 'react';
import {
  FaApple,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGoogle,
  FaWindows,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Btn } from '../../components/Button';
import { Input } from '../../components/InputField';
import { Logo } from '../../components/Logo';
import { Text } from '../../components/TextComp';
import { AuthHero } from './AuthHero';

const SignIn: React.FC = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);

  return (
    <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">
      <div className="w-full md:w-1/2 p-6 flex-grow flex justify-center md:p-10">
        <div className="w-full md:max-w-md">
          <div
            className="flex justify-center items-center mb-14 cursor-pointer"
          >
            <Logo />
          </div>

          <Text as="h1" size="2xl" weight="bold" className="mb-8 text-center font-grotesk">
            Get Started Now
          </Text>

          <Input
            label="Email"
            placeholder="Please Enter your email"
            className="text-sm mb-4 w-full rounded-lg"
          />

          <div className="relative w-full mb-4">
            <Input
              type={revealPassword ? 'text' : 'password'}
              label="Password"
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
                className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setRevealPassword(true)}
              />
            )}
            <Link
              to={'/reset'}
              className="mb-3 flex justify-end  text-sm text-neutral-500 cursor-pointer hover:font-semibold"
            >
              Forget Password?
            </Link>
          </div>

          <Btn className="w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] bg-orange-500 text-white py-1 rounded mb-8">
            Sign In
          </Btn>

          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <Text size="sm" className="mx-3 text-gray-500">
              Or
            </Text>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center gap-8 mb-6">
            <FaGoogle className="text-xl text-red-500 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaFacebook className="text-xl text-blue-600 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaApple className="text-xl text-black cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaWindows className="text-xl text-blue-500 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
          </div>

          <div className="text-center">
            <Text size="sm">
              Don't Have an account?{' '}
              <Link to={'/signup'} className="text-blue-600 hover:font-semibold">
                Sign Up
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
