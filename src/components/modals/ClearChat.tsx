import { Text } from "../ui/TextComp"
import { Btn } from "../ui/Button"
import { FaRegBell } from "react-icons/fa6";

export const ClearChat
 = ({Action, ConfirmAction, Message}:{Action:()=> void; ConfirmAction:()=> void; Message:string | null;}) => {
  return (
    <div className="flex p-6 bg-white rounded-lg flex-col items-center justify-center flex-1 w-full max-w-[522px] h-fit">
      <FaRegBell className="text-4xl text-warning"/>
        <Text as='h3' size='xl' weight='medium' className="!font-grotesk text-center !text-Neutral mt-4">
          {Message ?? 'Are you sure you want to clear your conversation with us?'}
        </Text>
        <div className="flex flex-col md:flex-row justify-center mt-6 gap-6">
          <Btn
            className="px-4 py-2 bg-neutral-300 text-Neutral min-w-30"
            onClick={Action}
          >
            No
          </Btn>
          <Btn
            className="px-4 py-2 bg-primary-600 text-white min-w-30"
            onClick={ConfirmAction}
          >
            Yes
          </Btn>
        </div>
    </div>
  )
}