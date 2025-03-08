import { Text } from "../../../components/TextComp";
import { Input } from '../../../components/InputField';
import profileImg from '../../../assets/Ellipse 137.png';

export const UserContent: React.FC = () => {
  return(
    <div className="flex-1 overflow-y-auto">
      <Text
        as="h1"
        size="2xl"
        weight="bold"
        className="font-grotesk text-primary-500 mb-5"
      >
        Profile
      </Text>
      <div className="mt-7 w-96">
        <img src={profileImg} className="mt-8 mx-auto mb-8" alt="" />
        <Input
          label="First Name"
          labelClassName="!text-neutral !text-base !font-medium"
          value="Daniel"
          className="text-sm mb-4 w-full rounded-lg"
        />
        <Input
          label="Last Name"
          labelClassName="!text-neutral !text-base !font-medium"
          value="Olamide"
          className="text-sm mb-4 w-full rounded-lg"
        />
        <Input
          label="Email"
          labelClassName="!text-neutral !text-base !font-medium"
          value="danielolamide87@outlook.com"
          className="text-sm mb-4 w-full rounded-lg"
        />
      </div>
    </div>
  )
}