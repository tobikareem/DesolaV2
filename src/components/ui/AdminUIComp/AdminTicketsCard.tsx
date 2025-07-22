import { ArrowUp, CircleCheckBig, Clock } from "lucide-react";
import { Text } from "../TextComp";

interface TicketsCardProp {
  user: string
  subject: string;
  priority: string; 
  status: string;
  selected: ()=> void;
  issue:string
  ticketDate:string
  isSelected:boolean
}

export const AdminTicketsCard: React.FC<TicketsCardProp> =({
  subject,
  priority,
  status,
  selected,
  issue,
  ticketDate,
  user,
  isSelected,
})=> {

  const priorityColor =()=> {
    switch(priority) {
      case 'low': return 'text-[#166534] !bg-[#DCFCE7]'
      case 'medium': return 'text-[#854D0E] !bg-[#FEF9C3]'
      case 'high': return 'text-[#991B1B] !bg-[#FEE2E2]'
      default: return 'text-[#166534] !bg-[#DCFCE7]'
    }
  }
  const statusColor =()=> {
    switch(status) {
      case 'resolved': return 'text-[#166534] !bg-[#DCFCE7]'
      case 'open': return 'text-[#1E40AF] !bg-[#DBEAFE]'
      case 'escalated': return 'text-[#991B1B] !bg-[#FEE2E2]'
      default: return 'text-[#166534] !bg-[#DCFCE7]'
    }
  }
  
  return (
    <div onClick={selected}
      className={`flex flex-col w-full rounded-lg p-4 gap-2 border ${isSelected ? 'border-[#BFDBFE] bg-[#EFF6FF]':'border-neutral-300 bg-transparent'}`}>
      <div className="flex w-full justify-between items-center gap-6">
        <Text fontStyle='semibold' size='sm'>{subject}</Text>
        <Text fontStyle="semibold" size='xs' color={priorityColor()} className={`px-2 py-1 rounded-full`}>{priority}</Text>
      </div>
      <div className="flex items-center gap-2">
        {status == 'open' && <Clock size={16}/>}
        {status == 'resolved' && <CircleCheckBig size={16}/>}
        {status == 'escalated' && <ArrowUp size={16}/>}
        <Text fontStyle="semibold" size='xs' color={statusColor()} className={`px-2 py-1 rounded-full`}>{status}</Text>
      </div>
      <Text size="sm" color="text-{#4B5563]">
        {issue}
      </Text>
      <div className="flex w-full justify-between items-center gap-6">
        <Text size='xs' color="text-[#6B7280]">{user}</Text>
        <Text size='xs' color='text-[#6B7280]'>{ticketDate}</Text>
      </div>
    </div>
  )
}