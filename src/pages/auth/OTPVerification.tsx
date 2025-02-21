import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../components/TextComp';
import { Input } from '../../components/InputField';
import { Btn } from '../../components/Button';
import { Logo } from '../../components/Logo';
import { AuthHero } from './AuthHero';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(4).fill(null));

  const handleChange = (index: number, value: string) => {
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
          <Link to={'/'} className="cursor-pointer  fixed m-2 bg-white">
            <Logo />
          </Link>
    <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">
      <div className="w-full md:w-1/2 p-6 h-auto flex-grow flex justify-center mt-6 md:p-10">
        <div className="w-full max-w-sm py-10">
          <Text
            as="h1"
            size="4xl"
            weight="medium"
            className=" mb-2 text-center font-grotesk"
          >
            Enter your code
          </Text>
          <Text as="p" size="sm" className="text-gray-500 text-center mb-10">
            We sent a code to your email
          </Text>
          <div className="flex gap-4 mb-4 w-full  align-center justify-center">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                value={digit}
                maxLength={1}
                className="w-15 h-15 text-center text-2xl border-2 border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Didn't receive the email?{' '}
            <span className="text-gray-900 cursor-pointer">
              Click to resend
            </span>
          </p>
          <Btn className="bg-gradient-to-b mt-10 from-orange-400 to-orange-600 text-white px-6 py-2 rounded-md text-sm w-full">
            Continue
          </Btn>
        </div>
      </div>

    <AuthHero />
    </div>
    </>
  );
};

export default OTPVerification;
