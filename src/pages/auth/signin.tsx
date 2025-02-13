import React, { useState } from 'react';
import { Text } from '../../Components/TextComp';
import { Input } from '../../components/InputField';
import { Btn } from '../../components/Button';
import frame from '../../assets/Frame 2147207438.png';
import plane from '../../assets/Leonardo_Kino_XL_give_me_an_image_of_an_airplane_flying_2 1.png';
import { FaEye, FaEyeSlash,FaGoogle,FaFacebook,FaApple,FaWindows,} from 'react-icons/fa';
import BackgroundImageSection from '../../Components/SideHeroComp';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [revealPassword, setRevealPassword] = useState<boolean>(false);

  return (
    <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">

      <div className="w-full md:w-1/2 p-6 h-auto flex-grow flex justify-center items-center md:p-10">
        <div className="w-full max-w-md">
          <Text as="h1" size="4xl" weight="bold" className="mb-6 text-center">
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
          </div>

          <Btn className="w-full bg-orange-500 text-white py-1 rounded mt-4">
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

      <div className="flex min-h-[300px] lg:min-h-full  w-full lg:w-1/2">
        <BackgroundImageSection
          backgroundImage={frame}
          imageSrc={plane}
          className="w-full min-h-full"
        />
      </div>
    </div>
  );
};

export default SignIn;
