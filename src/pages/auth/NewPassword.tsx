import React, { useState } from 'react';

import { Text } from '../../Components/TextComp';
import { Input } from '../../components/InputField';
import { Btn } from '../../Components/Button';
import BackgroundImageSection from '../../Components/SideHeroComp';
import frame from '../../assets/Frame 2147207438.png';
import plane from '../../assets/Leonardo_Kino_XL_give_me_an_image_of_an_airplane_flying_2 1.png';
import { FaKey, FaEye, FaEyeSlash } from 'react-icons/fa';

const NewPassword: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const getPasswordStrength = (): number => {
    if (password.length < 4) return 1;
    if (password.length < 6) return 2;
    if (password.length < 8) return 3;
    return 4;
  };

  const strength = getPasswordStrength();
  const getStrengthColor = (index: number) => {
    if (strength >= index + 1) {
      if (strength === 1) return 'bg-red-500';
      if (strength === 2) return 'bg-orange-500';
      if (strength === 3) return 'bg-orange-500';
      return 'bg-green-500';
    }
    return 'bg-gray-300';
  };

  return (
    <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">
      <div className="w-full md:w-1/2 p-6 h-auto flex-grow flex justify-center items-center md:p-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-500 p-3 rounded">
              <FaKey className="text-white w-15 h-6" />
            </div>
          </div>
          <Text
            as="h1"
            size="4xl"
            weight="medium"
            className=" mb-2 text-center font-grotesk"
          >
            Set password
          </Text>
          <Text as="p" size="sm" className="text-gray-500 text-center mb-6">
            Must be at least 8 characters
          </Text>
          <div className="relative w-full">
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter Password"
              className="text-sm mb-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer absolute right-3 top-11 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-11 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <div className="flex gap-2 mt-1">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded ${getStrengthColor(i)}`}
              />
            ))}
          </div>

          <div className="relative w-full mt-3">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              placeholder="Confirm Password"
              className="text-sm w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {showConfirmPassword ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer absolute right-3 top-11 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-11 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          <Btn className="bg-gradient-to-b mt-20 from-orange-400 to-orange-600 text-white px-6 py-2 rounded-md text-sm w-full">
            Set new password
          </Btn>
        </div>
      </div>

      <div className="flex  lg:min-h-full  w-full lg:w-1/2">
        <BackgroundImageSection
          backgroundImage={frame}
          imageSrc={plane}
          className="w-full min-h-full"
        />
      </div>
    </div>
  );
};

export default NewPassword;
