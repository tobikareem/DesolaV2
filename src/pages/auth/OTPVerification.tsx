import React, { useState, useRef } from 'react';
import { Text } from '../../components/TextComp';
import { Input } from '../../components/InputField';
import { Btn } from '../../components/Button';



const OTPVerification = ({click}:{click:()=> void}) => {
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
      <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">
        <div className="w-full p-6 h-auto flex-grow flex justify-center items-center md:p-10">
          <div className="w-full max-w-md">
            <Text
              as="h1"
              size="4xl"
              weight="medium"
              className=" mb-2.5 text-center font-grotesk"
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
                  className={`w-15 h-15 text-center text-2xl ${otp[index] !== '' ? 'border-secondary-500':'border-neutral-300'} border-2 hover:border-secondary-500 rounded-md focus:outline-none focus:ring-0 focus:border-secondary-500`}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el; }}
                />
              ))}
            </div>
            <p className="text-sm text-neutral-500 text-center">
              Didn't receive the email?{' '}
              <span className="text-black cursor-pointer hover:font-semibold">
                Click to resend
              </span>
            </p>
            <Btn onClick={click}
              className="bg-gradient-to-b mt-24 from-[#FF9040] to-[#FF6B00] text-white px-6 py-2 rounded-md text-sm w-full">
              Continue
            </Btn>
          </div>
        </div>
      </div>
  );
};

export default OTPVerification;
