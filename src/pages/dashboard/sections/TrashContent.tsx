import { EmptyState } from "../../../components/layout/EmptyState"
import { Title } from "../../../components/layout/Title"


export const TrashContent: React.FC = () => {
  return(
    <div className="flex-1 overflow-y-auto">
      <Title>
        Clear your chat
      </Title>
      <EmptyState position={"center"} content={null}/>
    </div>
  )
}