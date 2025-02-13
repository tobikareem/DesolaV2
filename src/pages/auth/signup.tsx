import React, { useState } from 'react';
import { Text } from '../../Components/TextComp';
import { Input } from '../../components/InputField';
import { Btn } from '../../components/Button';
import { FaGoogle, FaFacebook, FaApple, FaWindows } from 'react-icons/fa';
import frame from '../../assets/Frame 2147207438.png'
import plane from '../../assets/Leonardo_Kino_XL_give_me_an_image_of_an_airplane_flying_2 1.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import BackgroundImageSection from '../../Components/SideHeroComp';
import { Link } from 'react-router-dom';

const Signup: React.FC = () => {
   const [revealPassword, setRevealPassword] = useState<boolean>(false);
   const [revealPassword2, setRevealPassword2] = useState<boolean>(false);
  return (
    <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">
 
      <div className="w-full lg:w-1/2  flex-grow p-4 flex justify-center items-center  md:p-10">
        <div className="w-full max-w-md">
          <Text as="h1" size="4xl" weight="bold" className="mb-4 text-center">
            Create An Account
          </Text>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-2">
            <Input
              label="First Name"
              placeholder="First Name"
              className="w-full"
            />
            <Input
              label="Last Name"
              placeholder="Last Name"
              className="w-full"
            />
          </div>

         
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
                onClick={() => setRevealPassword(!revealPassword)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-11 transform -translate-y-1/2"
                onClick={() => setRevealPassword(!revealPassword)}
              />
            )}
          </div>

          <div className="relative w-full">
            <Input
              type={revealPassword2 ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="Confirm Password"
              className="text-sm w-full"
            />

            {revealPassword2 ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer absolute right-3 top-11 transform -translate-y-1/2"
                onClick={() => setRevealPassword2(!revealPassword2)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-11 transform -translate-y-1/2"
                onClick={() => setRevealPassword2(!revealPassword2)}
              />
            )}
          </div>

          <div className="flex items-center mt-4">
            <input type="checkbox" className="mr-2" />
            <Text size="sm">I agree to the terms & policy</Text>
          </div>

          <Btn className="w-full  bg-orange-500 text-white py-1 rounded mt-4">
            Signup
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
              Have an account?{' '}
              <Link to={'/signin'} className="text-blue-600">
                Sign In
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

export default Signup;
