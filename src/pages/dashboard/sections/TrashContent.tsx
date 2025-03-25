import { EmptyState } from "../../../components/layout/EmptyState"
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
      <EmptyState center={"justify-center"}/>
    </div>
  )
}