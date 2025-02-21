import { Text } from '../../components/TextComp';
import { Input } from '../../components/InputField';
import { Btn } from '../../components/Button';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthHero } from './AuthHero';

const ForgetPassword: React.FC = () => {
  return (
    <>
      <div className="font-work flex h-screen lg:flex-row flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2 p-6 flex justify-center items-center md:p-10">
          <div className="w-full max-w-md">
            <Text as="h1" size='3xl' weight="bold" className="!font-grotesk text-center leading-normal lg:!text-[40px]">
              Forget Password?
            </Text>
            <Text as="p" size="sm" className="mb-[52px] text-center text-neutral-500">
              No worries, We will send you reset instructions
            </Text>

            <Input
              label="Email"
              placeholder="Please Enter your email"
              className="text-sm mb-4 w-full rounded-lg"
            />

            <Btn className="w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] bg-orange-500 text-white py-1 rounded mt-4">
              Send 4-digit code
            </Btn>

            <div className="text-center flex justify-center align-center mt-4">
              <FaArrowLeft className="mt-1 text-neutral-500" />
              <Link
                to={'/signin'}
                className="text-blue-600 hover:font-semibold text-sm cursor-pointer ml-1"
              >
                back to Sign in
              </Link>
            </div>
          </div>
        </div>

      <AuthHero />
      </div>
    </>
  );
};

export default ForgetPassword;
