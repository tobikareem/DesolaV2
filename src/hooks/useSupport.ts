import { useEffect, useState } from "react";
import { CustomStorage } from "../utils/customStorage";

export interface supportChatMessage {
  message: string;
  role: 'customer' | 'support' ;
  time: string;
  date: string;
}
export const useSupport = () => {

  const storageService = new CustomStorage();
  const [supportChatLog, setSupportChatLog] = useState<supportChatMessage[] | []>(() => {
    const stored = storageService.getItem('supportChatLog');
    return stored ? JSON.parse(stored) : [
      {
        message:'user reports search results not loading for international flights',
        role: 'customer',
        time: '2:00pm',
        date: '23/08/25'
      },
      {
        message:'user reports search results not loading for international flights',
        role: 'support',
        time: '2:00pm',
        date: '23/08/25'
      }
    ];
  });

  const updateSupportChatLog = (message: string, role: 'customer' | 'support', time:string, date:string) => {
    setSupportChatLog((prevLog) => [
      ...prevLog,
      { message, role ,time, date}
    ]);
  }
  useEffect(() => {
    // storageService.setItem('supportChatLog', JSON.stringify('supportChatLog'));
  }, [supportChatLog]);
  

  return {supportChatLog,setSupportChatLog, updateSupportChatLog}
};