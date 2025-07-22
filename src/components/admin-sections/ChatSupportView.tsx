import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { TicketChatBox, TicketChatProps } from "./AdminUIComp/TicketChatBox"
import { Btn } from "../ui/Button"
import { Text } from "../ui/TextComp"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useState } from "react"
import { AdminTicketsCard } from "./AdminUIComp/AdminTicketsCard"

const ChatSupportView = () => {
  const [selectedTicket, setSelectedTicket] = useState<TicketChatProps | null>(null);
  const [selectedID, setSelectedID] = useState<string | undefined>(undefined);
  const [selectPeriod, setSelectPeriod] = useState<string>('All Time')
  const Ticket = [
    {
      subject: 'Flight search not working',
      user: 'Mike Rodriguez',
      priority: 'high',
      status: 'open',
      issue:'User reports search results not loading for international flights',
      ticketDate:'1/15/24',
      ticketID: '3435738',
      ticketTime: '13:45',
    },
    {
      subject: 'Flight search not working',
      user: 'Mike Rodriguez',
      priority: 'high',
      status: 'open',
      issue:'User reports search results not loading for international flights',
      ticketDate:'1/15/24',
      ticketID: '3435733',
      ticketTime: '13:45',
    },
    {
      subject: 'Flight search not working',
      user: 'Mike Rodriguez',
      priority: 'high',
      status: 'open',
      issue:'User reports search results not loading for international flights',
      ticketDate:'1/15/24',
      ticketID: '3435737',
      ticketTime: '13:45',
    },
  ]

  const handleTicketClick = (ticket: TicketChatProps)=> {
    setSelectedTicket(ticket)
    setSelectedID(ticket?.ticketID)
  }

  return (
    <div>
      <Text
        as="h2"
        size="2xl"
        weight="semibold"
        fontStyle="font-grotesk"
        className=" text-neutral-500 mb-4"
      >
        Chat & Support
      </Text>
      <div className="relative flex w-full h-full gap-6">
        <div className="flex flex-col w-full lg:w-[40%]">
          <div className="flex flex-col w-full  rounded-2xl bg-neutral-100">
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <Text as="h5" weight="medium" size="xl" color="text-[#111827]" fontStyle="font-grotesk">
                  Support Tickets
                </Text>
                <Btn
                  className="bg-primary-500 text-white px-2 h-7"
                  radius="lg"
                  weight="normal"
                >
                  New Ticket
                </Btn>
              </div>
              <div className="relative w-full">
                <Listbox
                  name="period" value={selectPeriod} onChange={setSelectPeriod}
                >
                  <ListboxButton className="font-work flex items-center w-full border px-4 py-2 rounded-[10px] justify-between hover:bg-neutral-300 text-Neutral font-medium">
                      <span>
                          {selectPeriod}
                      </span>
                      <MdKeyboardArrowDown />
                  </ListboxButton>
                  <ListboxOptions className={`absolute w-full border border-neutral-300 rounded-[10px] mt-1 bg-neutral-100 z-10 overflow-hidden`}>
                      {
                          ['All Time','Yesterday', 'Last Week', 'Last Month'].map((option) => (

                              <ListboxOption value={option}
                                  key={option}
                                  className="font-work border-b border-neutral-300 w-full px-4 py-2 data-[focus]:bg-primary-600 data-[focus]:text-white text-Neutral font-medium cursor-pointer"
                                  onClick={()=> {setSelectPeriod(option)}}
                              >
                                  {option}
                              </ListboxOption>
                          ))
                      }
                  </ListboxOptions>
                </Listbox>
              </div>
            </div>
            <div className="flex flex-1 flex-col border-y border-neutral-300 gap-6 p-6">
                {
                  Ticket?.map((item) => (
                    <AdminTicketsCard key={item?.ticketID}
                      subject={item?.subject}
                      user={item?.user} 
                      priority={item?.priority} 
                      status={item?.status} 
                      selected={()=>handleTicketClick(item)} 
                      issue={item?.issue} 
                      ticketDate={item?.ticketDate} 
                      isSelected={item?.ticketID == selectedID}
                    />                     
                ))}
            </div>
          </div>
        </div>
        <div className={`absolute z-[2] lg:static w-full h-full lg:w-[60%]`}>
          { selectedTicket &&
            <TicketChatBox 
              subject={selectedTicket?.subject} 
              priority={selectedTicket?.priority} 
              status={selectedTicket?.status} 
              ticketID={selectedTicket?.ticketID} 
              user={selectedTicket?.user} 
              ticketTime={selectedTicket?.ticketTime} 
              ticketDate={selectedTicket?.ticketDate}
              Action={()=> setSelectedTicket(null)}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default ChatSupportView
