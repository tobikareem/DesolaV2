import { Text } from "../../../components/ui/TextComp"

export const TrashContent: React.FC = () => {
  return(
    <div className="flex-1 overflow-y-auto">
      <Text
        as="h1"
        size="2xl"
        weight="bold"
        className="font-grotesk text-primary-500 mb-5"
      >
        Great Deals for Your Trip!
      </Text>
      <div className="mt-25 items-center justify-center flex-col flex text-center">
        <img src={''} alt="" />
        <Text as="p" className="mt-1 text-xs text-neutral-500">
          Start a conversation to find your perfect flight
        </Text>
      </div>
    </div>
  )
}