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
import BackgroundImageSection from '../../components/SideHeroComp';
import frame from '../../assets/Frame 2147207438.png';
import plane from '../../assets/Leonardo_Kino_XL_give_me_an_image_of_an_airplane_flying_2 1.png';
import { Input } from '../../components/InputField';
import { Logo } from '../../components/Logo';
import { Text } from '../../components/TextComp';
import { AuthHero } from './AuthHero';

const SignIn: React.FC = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);

  return (
    <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">
      <div className="w-full md:w-1/2 p-6 h-auto flex-grow flex justify-center items-center md:p-10">
        <div className="w-full max-w-md">
          <Link
            to={'/'}
            className="flex justify-center items-center mb-3 cursor-pointer"
          >
            <Logo />
          </Link>

          <Text as="h1" size="2xl" weight="bold" className="mb-6 text-center">
            Get Started Now
          </Text>

          <Input
            label="Email"
            placeholder="Please Enter your email"
            className="text-sm mb-2 w-full"
          />

          <div className="relative w-full">
            <Input
              type={revealPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter Password"
              className="text-sm mb-2 w-full"
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
              className="mb-3 flex justify-end  text-sm text-neutral-500 cursor-pointer"
            >
              Forget Password
            </Link>
          </div>

          <Btn className="w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] bg-orange-500 text-white py-1 rounded mt-4">
            Sign In
          </Btn>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <Text size="sm" className="mx-3 text-gray-500">
              Or
            </Text>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center gap-4">
            <FaGoogle className="text-xl text-red-500 cursor-pointer" />
            <FaFacebook className="text-xl text-blue-600 cursor-pointer" />
            <FaApple className="text-xl text-black cursor-pointer" />
            <FaWindows className="text-xl text-blue-500 cursor-pointer" />
          </div>

          <div className="text-center mt-4">
            <Text size="sm">
              Don't Have an account?{' '}
              <Link to={'/signup'} className="text-blue-600">
                Sign Up
              </Link>
            </Text>
          </div>
        </div>
      </div>

      <div className="flex  lg:min-h-full  w-full lg:w-1/2">
        <BackgroundImageSection
          backgroundImage={frame}
          imageSrc={plane}
          className="w-full min-h-full"
        />
      </div>
      <AuthHero />
    </div>
  );
};

export default SignIn;
