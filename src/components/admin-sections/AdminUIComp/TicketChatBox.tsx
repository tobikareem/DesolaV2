import React, { useEffect, useRef, useState } from "react"
import { Text } from "../../ui/TextComp"
import { supportChatMessage, useSupport } from "../../../hooks/useSupport";
import { EllipsisVertical,Send, User } from "lucide-react";
import { Btn } from "../../ui/Button";
import { useIsDesktop } from "../../../hooks/useDesktopSize";
import { Close } from "../../ui/Close";
import { AiOutlinePaperClip } from "react-icons/ai";
import { TextArea } from "../../ui/TextAreaField";

export interface TicketChatProps {
  subject: string | undefined;
  priority: string | undefined;
  status: string | undefined;
  ticketID:string | undefined;
  user:string | undefined;
  ticketTime: string | undefined;
  ticketDate: string | undefined;
}
type ActionProps = {
  Action: ()=> void
}
type CombinedProps = TicketChatProps & ActionProps;



export const TicketChatBox: React.FC<CombinedProps> =({
  subject,
  priority,
  status,
  ticketID,
  user,
  ticketDate,
  ticketTime,
  Action
})=> {
    const isDesktop = useIsDesktop();
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const {supportChatLog, updateSupportChatLog} = useSupport();
    const [inputValue, setInputValue] = useState<string>('');

    useEffect(()=>{
      if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
    },[supportChatLog])


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

  const handleSubmit = (e: React.FormEvent) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = new Date().toLocaleDateString();
    e.preventDefault();
    if (!inputValue.trim()) return;
    updateSupportChatLog(
      inputValue, 
      'support', 
      time,
      date
    );
    setInputValue('');
  }

  return(
    <div className={`bg-neutral-100 flex flex-col flex-1 w-full h-full justify-between border border-neutral-300 rounded-2xl`}>
      <div className="flex flex-col gap-2.5 w-full items-center justify-between p-6">
        <div className="flex items-center w-full justify-between">
          <Text as="h5" weight="medium" size="xl" color="text-[#111827]" fontStyle="font-grotesk">
            {subject}
          </Text>
          <div className="flex items-center gap-2">
            <Text fontStyle="semibold" size='sm' color={priorityColor()} className={`flex items-center px-2 py-1 rounded-full`}>{priority}</Text>
            <Text fontStyle="semibold" size='sm' color={statusColor()} className={`flex items-center px-2 py-1 rounded-full`}>{status}</Text>
            <div className="">
              {!isDesktop ? <Close Action={Action}/> : <EllipsisVertical />}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full gap-x-4 gap-y-2 font-work text-sm text-[#4B5563]">
          <span>Ticket ID: {ticketID}</span> <span>{user}</span> <span>{ticketDate}, {ticketTime}</span>
        </div>
      </div>
      <div ref={chatContainerRef} 
        className={`w-full border-y border-neutral-300 flex-1 space-y-4 overflow-y-auto py-2 sm:py-2.5 md:py-4 lg:py-6 px-6`}>
        { ticketID &&
          <div className={`flex pr-[20%] items-center w-full h-fit gap-3`}>
            <div className={`flex -mt-8 items-center justify-center rounded-full size-8 bg-[#f3f4f6] text-[#4B5563]`}>
              <User size={16} />
            </div>
            <div className="space-y-1.5">
              <div className="bg-[#F3F4F6] flex px-3 py-2 rounded-lg min-h-12">
                <Text size="sm" color="text-[#111827]">
                  {subject}
                </Text>
              </div>
              <span className="font-work text-xs text-[#6B7280]">{user} • {ticketDate}, {ticketTime}</span>
            </div>
          </div>
        }
        { supportChatLog.map((item:supportChatMessage, index) => {
            const isUser = item.role == 'customer'
          return(
              <div key={index}
                className={`flex ${isUser ? 'flex-row pr-[20%]' : 'flex-row-reverse pl-[20%]'} w-full h-fit gap-3`}>
                <div className={`rounded-full size-8 flex items-center justify-center
                  ${isUser ? 'bg-[#D1D5DB] text-[#4B5563]' : 'bg-primary-500 text-neutral-100'}
                `}>
                  <User size={16} />
                </div>
                <div className="space-y-1.5">
                  <div className={`flex px-3 py-2 rounded-lg ${isUser ? 'bg-[#F3F4F6]':'bg-[#DBEAFE]'}`}>
                    <Text size="sm" color="text-[#111827]">
                      {item?.message}
                    </Text>
                  </div>
                  <span className={`inline-flex w-full items-center font-work text-xs text-[#6B7280] ${!isUser && 'justify-end'}`}>{item?.role} • {item?.date}, {item?.time}</span>
                </div>
              </div>
          )})
        }
      </div>
      <div className="w-full space-y-4 p-6">
        <div className="flex items-end w-full gap-4">
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your reply..."
            className="bg-transparent rounded-lg w-full placeholder:text-base min-h-[34px] max-h-30 overflow-hidden resize-none h-auto"
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = target.scrollHeight + 'px';
            }}
            onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e);
            }}}
          />
          <Btn 
            radius="lg"
            className="flex items-center justify-center h-[42px] !text-neutral-600">
            <AiOutlinePaperClip size={24} />
          </Btn>
          <Btn 
            onClick={handleSubmit}
            radius="lg"
            weight="normal"
            className="flex gap-1 items-center h-[42px] px-2 text-white bg-primary-500 text-base">
            <Send /> Send
          </Btn>
        </div>
        <div className="flex items-end w-full justify-between">
          <div className="flex gap-2">
            <Btn
              className="text-Neutral px-2 h-[30px] "
              radius="lg"
              weight="normal"
            >
              Close Ticket 
            </Btn>
            <Btn
              className="border-[#FCA5A5] text-red-600 px-2 h-[30px]"
              radius="lg"
              weight="normal"
            >
              Escalate
            </Btn>
          </div>
          <Btn
            className="bg-success text-white px-2 h-7"
            radius="lg"
          >
            Mark Resolved
          </Btn>
        </div>
      </div>

    </div>
  )
}