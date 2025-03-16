import { Text } from "../ui/TextComp"
import { Btn } from "../ui/Button"
import { FaRegBell } from "react-icons/fa6";

export const ReturnContent = ({Action, ConfirmAction}:{Action:()=> void; ConfirmAction:()=> void; }) => {
  return (
    <div className="flex bg-white flex-col p-5 rounded-lg items-center justify-center flex-1 w-full max-w-[400px]">
      <FaRegBell className="text-4xl text-warning"/>
        <Text as='h3' size='xl' weight='medium' className="!font-grotesk text-center !text-Neutral mt-4">
          Are you sure you want to Logout?
        </Text>
        <div className="flex flex-col md:flex-row justify-center mt-6 gap-6">
          <Btn
            className="px-4 py-2 bg-neutral-300 text-Neutral"
            onClick={Action}
          >
            Cancel
          </Btn>
          <Btn
            className="px-4 py-2 bg-primary-600 text-white"
            onClick={ConfirmAction}
          >
            Yes, Logout
          </Btn>
        </div>
    </div>
  )
}