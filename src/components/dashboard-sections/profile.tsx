import profileImg from "../../assets/Ellipse 137.png";
import { Text } from "../../components/TextComp";
import { Btn } from "../Button";
import { Input } from "../InputField";

// ReadOnly profile section
export const ProfileSection = ({
    firstName,
    lastName,
    email,
    onEditProfile
}: {
    firstName: string;
    lastName: string;
    email: string;
    onEditProfile: () => void;
}) => (
    <div className="mb-8">
        <Text as="h1" size="2xl" weight="bold" className="text-primary-500 mb-5">
            Profile
        </Text>
        <div className="flex flex-col items-center">
            <img src={profileImg} className="w-24 h-24 rounded-full mb-4" alt="User Profile" />
            <Input label="First Name" value={firstName} className="w-full mb-2 rounded-[10px]" readOnly />
            <Input label="Last Name" value={lastName} className="w-full mb-2 rounded-[10px]" readOnly />
            <Input label="Email" value={email} className="w-full mb-2 rounded-[10px]" readOnly />
            <Btn
                onClick={onEditProfile}
                className="mt-4 bg-primary-500 text-white px-6 py-2"
            >
                Edit Profile in Azure B2C
            </Btn>
        </div>
    </div>
);
