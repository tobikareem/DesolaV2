import React, { useState } from 'react';

import { Text } from '../../components/TextComp';
import { Input } from '../../components/InputField';
import { Btn } from '../../components/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoKey } from 'react-icons/go';

const NewPassword =({click}:{click:()=>void})=> {
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
      if (strength === 2) return 'bg-secondary-500';
      return 'bg-green-500';
    }
    return 'bg-neutral-300';
  };

  return (
    <div className="font-work flex h-screen lg:flex-row flex-col w-full">
      <div className="w-full p-6 h-auto flex-grow flex justify-center items-center md:p-10">
        <div className="w-full max-w-md md:p-10">
          <div className="flex justify-center mb-4">
            <div className="bg-secondary-500 p-3 rounded">
              <GoKey className="text-white w-15 h-6" />
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
          <Text as="p" size="sm" className="text-neutral-500 text-center mb-10">
            Must be at least 8 characters
          </Text>
          <div className="relative w-full">
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              labelClassName='!text-neutral !text-base !font-medium'  
              placeholder="Enter Password"
              className="text-sm  w-full rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>

          <div className="flex gap-2 mt-2 mb-4">
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
              labelClassName='!text-neutral !text-base !font-medium'  
              placeholder="Confirm Password"
              className="text-sm w-full rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {showConfirmPassword ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer absolute right-3 top-10 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          <Btn onClick={click}
            className="bg-gradient-to-b mt-24 from-orange-400 to-orange-600 text-white px-6 py-2 rounded-md text-sm w-full">
            Set new password
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
