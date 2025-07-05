import { Text } from "../ui/TextComp";
import { Btn } from "../ui/Button";
import { FaRegBell } from "react-icons/fa6";

interface SubscriptionModalProps {
  Action: () => void;
  ConfirmAction: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ Action, ConfirmAction }) => {
  return (
    <div className="flex bg-white flex-col p-6 rounded-lg items-center justify-center w-full max-w-[400px] h-fit">
      <FaRegBell className="text-4xl text-warning" />

      <Text
        as="h3"
        size="xl"
        weight="medium"
        className="!font-grotesk text-center !text-Neutral mt-4"
      >
        Are you sure you want to subscribe to Desola Flight?
      </Text>

      <div className="flex flex-col md:flex-row justify-center mt-6 gap-6 w-full">
        <Btn
          className="px-4 py-2 bg-neutral-300 text-Neutral w-full md:w-auto"
          onClick={ConfirmAction}
        >
            No, Cancel
        </Btn>
        <Btn
          className="px-4 py-2 bg-primary-600 text-white w-full md:w-auto"
          onClick={Action}
        >
          Yes, Subscribe
        </Btn>
      </div>
    </div>
  );
};

export default SubscriptionModal;
