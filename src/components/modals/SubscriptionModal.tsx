import { Text } from "../ui/TextComp";
import { Btn } from "../ui/Button";
import { Img as ReactImage } from 'react-image';
import Subcription from '/Subscription.jpg';

interface SubscriptionModalProps {
  Action: () => void;
  ConfirmAction: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ Action, ConfirmAction }) => {
  return (
    <div className="flex bg-white flex-col p-6 rounded-2xl items-center justify-center w-full max-w-3xl h-fit">
      <ReactImage
        src={Subcription}
        alt="Subscription"
        className="object-center max-w-lg"
        loading="lazy"
      />
      <Text
        as="h3"
        size="xl"
        weight="medium"
        className="!font-grotesk text-center !text-Neutral mt-4"
      >
        Do you want to subscribe to Desola Flight?
      </Text>

      <div className="flex flex-col md:flex-row justify-center items-center mt-4 gap-6 w-full">
        <Btn
          className="px-4 py-2 bg-neutral-300 text-Neutral w-full md:w-auto max-w-md"
          onClick={Action}
        >
            No, Cancel
        </Btn>
        <Btn
          className="px-4 py-2 bg-primary-600 text-white w-full md:w-auto max-w-md"
          onClick={ConfirmAction}
        >
          Yes, Subscribe
        </Btn>
      </div>
      <Text size="2xs" className="lg:!text-xs !text-neutral-500 text-center mt-4 max-w-2xl">
        By clicking 'Subscribe', you agree to our subscription terms, including automatic renewal and payment processing. You can cancel your subscription at any time, and cancellation will take effect at the end of the current billing cycle. See our full terms and conditions for details.
      </Text>
    </div>
  );
};

export default SubscriptionModal;
