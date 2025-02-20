import { Text } from '../../components/TextComp';
import { Input } from '../../components/InputField';
import { Btn } from '../../components/Button';
import frame from '../../assets/Frame 2147207438.png';
import plane from '../../assets/Leonardo_Kino_XL_give_me_an_image_of_an_airplane_flying_2 1.png';
import { FaArrowLeft } from 'react-icons/fa';
import BackgroundImageSection from '../../components/SideHeroComp';
import { Link } from 'react-router-dom';

const ForgetPassword: React.FC = () => {
  return (
    <div className="flex h-screen lg:flex-row flex-col md:flex-row w-full">
      <div className="w-full md:w-1/2 p-6 h-auto flex-grow flex justify-center items-center md:p-10">
        <div className="w-full max-w-md">
          <Text as="h1" size="2xl" weight="bold" className="mb-2 text-center">
            Forget Password?
          </Text>
          <Text as="p" size="sm" className="mb-6 text-center text-neutral-500">
            No worries, We will send you reset instructions
          </Text>

          <Input
            label="Email"
            placeholder="Please Enter your email"
            className="text-sm mb-2 w-full"
          />

          <Btn className="w-full bg-gradient-to-b from-[#FF9040] to-[#FF6B00] bg-orange-500 text-white py-1 rounded mt-4">
            Send 4-digit code
          </Btn>

          <div className="text-center flex justify-center align-center mt-4">
            <FaArrowLeft className="mt-1 text-neutral-500" />
            <Link
              to={'/signin'}
              className="text-blue-600 text-sm cursor-pointer ml-1"
            >
              back to Sign in
            </Link>
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
    </div>
  );
};

export default ForgetPassword;
