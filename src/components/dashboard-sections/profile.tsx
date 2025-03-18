import { CgProfile } from "react-icons/cg";
import { Text } from "../ui/TextComp";
import { useAuthInfo } from "../../hooks/useAuthInfo";
import authService from "../../services/authService";
import { Btn } from "../ui/Button";
import { Input } from "../ui/InputField";

// ReadOnly profile section
export const ProfileSection = () => {
    const { accountInfo } = useAuthInfo();

    return (
        <div className="mb-8">
            <Text as="h1" size="2xl" weight="bold" className="text-primary-500 mb-5">
                Profile
            </Text>
            <div className="flex flex-col items-center">
                <CgProfile className="w-24 h-24 text-primary-600 rounded-full mb-4"/>
                <Input label="First Name" value={accountInfo?.firstName ?? ""} className="w-full mb-2 rounded-[10px]" readOnly />
                <Input label="Last Name" value={accountInfo?.lastName ?? ""} className="w-full mb-2 rounded-[10px]" readOnly />
                <Input label="Email" value={accountInfo?.emailList?.length ? accountInfo.emailList[0] : ""} className="w-full mb-2 rounded-[10px]" readOnly />
                <Btn
                    onClick={async () => await authService.editUserProfile()}
                    className="mt-4 bg-primary-500 text-white px-6 py-2"
                >
                    Edit Profile in Azure B2C
                </Btn>
            </div>
        </div >
    );
};
