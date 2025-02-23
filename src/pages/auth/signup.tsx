import { useState } from 'react';
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


const Signup: React.FC = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);
  const [revealPassword2, setRevealPassword2] = useState<boolean>(false);
  return (
    <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">
      <div className="w-full lg:w-1/2 p-6 flex justify-center">
        <div className="w-full max-w-md">
          <div
            className="flex justify-center items-center cursor-pointer mb-14"
          >
            <Logo />
          </div>

          <Text as="h1" size="2xl" weight="bold" className="mb-6 text-center font-grotesk">
            Create An Account
          </Text>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-2">
            <Input
              label="First Name"
              placeholder="First Name"
              className="w-full rounded-lg"
            />
            <Input
              label="Last Name"
              placeholder="Last Name"
              className="w-full rounded-lg"
            />
          </div>

          <Input
            label="Email"
            placeholder="Please Enter your email"
            className="text-sm mb-2 w-full rounded-lg"
          />

          <div className="relative w-full mb-2">
            <Input
              type={revealPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter Password"
              className="text-sm w-full rounded-lg"
            />
            {revealPassword ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setRevealPassword(!revealPassword)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setRevealPassword(!revealPassword)}
              />
            )}
          </div>

          <div className="relative w-full mb-2">
            <Input
              type={revealPassword2 ? 'text' : 'password'}
              label="Confirm Password"
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

          <div className="flex  items-center mb-2">
            <Input type="checkbox" className="mr-2 mt-1" />
            <Text size="sm">I agree to the terms & policy</Text>
          </div>

          <Btn className="w-full  bg-gradient-to-b from-[#FF9040] to-[#FF6B00] bg-orange-500 text-white py-1 rounded mb-4">
            Signup
          </Btn>

          <div className="flex items-center mb-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <Text size="sm" className="mx-3 text-gray-500">
              Or
            </Text>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center gap-8 mb-2">
            <FaGoogle className="text-xl text-red-500 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaFacebook className="text-xl text-blue-600 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaApple className="text-xl text-black cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
            <FaWindows className="text-xl text-blue-500 cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out" />
          </div>

          <div className="text-center">
            <Text size="sm">
              Have an account?{' '}
              <Link to={'/signin'} className="text-blue-600 hover:font-semibold">
                Sign In
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
