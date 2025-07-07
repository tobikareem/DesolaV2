import { DesolaAILog, useDesolaAI } from "../../../hooks/useDesolaAI";
import { Text } from "../../../components/ui/TextComp";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { TextArea } from "../../../components/ui/TextAreaField";
import { BiUserCheck } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';

export const DesolaAI = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { fetchAiResponse, AIMessageLog, loading, updateAIChatLog } = useDesolaAI();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    updateAIChatLog(inputValue, 'user');
    fetchAiResponse(inputValue);
    setInputValue('');
  }
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
  },[AIMessageLog])

  return (
    <div className="flex flex-col justify-between h-full gap-2 overflow-hidden">
      <div className="relative space-y-2">
        <Text
          as="h1"
          size="2xl"
          weight="bold"
          className="font-grotesk text-primary-500 inline-flex"
        >
          Desola AI <span><MdOutlineAutoAwesome className={`text-lg ${loading ? 'animate-bounce mt-1' : ''}`} /></span>
        </Text>
        <Text size="2xs" className="lxl:!text-xs !text-neutral-500 pl-0.5">
          Ask Desola AI anything about your travel plans, distance, tourist attractions and general travel information...
        </Text>
      </div>

      <div ref={chatContainerRef} 
        className={`${loading ? 'border-2 border-primary-100':'border'} border-neutral-300 rounded-lg flex-1 space-y-2 overflow-y-auto py-6 px-2`}>
        { 
          AIMessageLog?.map((message:DesolaAILog, index) => {
            const isUser = message.role == 'user'
          return(
              <div className={`flex flex-col ${isUser ? 'pl-[20%] items-end' : 'pr-[10%] items-start'} w-full h-fit`} key={index}>
                <div className={`${!isUser ? 'bg-primary-300/95' : 'bg-secondary-200/95'} w-fit rounded-lg p-2 space-y-1.5`}>
                  <Text size="sm" color={``} className={``} >
                    <ReactMarkdown>{message.message}</ReactMarkdown>
                  </Text>
                  <div className={`float-right text-[10px]`}>
                    {!isUser ? <MdOutlineAutoAwesome /> : <BiUserCheck />}
                  </div>
                </div>
              </div>
          )})
        }
        {loading && 
          <div className={`flex gap-2 bg-primary-300 rounded-lg px-4 p-2 w-fit  animate-pulse duration-500`}>
            <MdOutlineAutoAwesome className="animate-bounce" />
            <Text size="sm">
              Thinking...
            </Text>
          </div>
        }
      </div>
      <form className="flex items-center gap-2 w-full px-3 py-2 my-2 bg-tint transition-all duration-200 ease-in-out box-border rounded-lg"
        onSubmit={handleSubmit}>
        <TextArea value={inputValue} onChange={(e) => setInputValue(e.target.value)}
           placeholder="Ask Desola AI..." required 
          className="!p-0 bg-transparent min-h-10 max-h-30 overflow-hidden resize-none h-auto !border-none"
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
          onKeyDown={(e) => {if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e);
          }}}
        />
        <button type="submit" disabled={loading} className={`${loading ? 'cursor-not-allowed':''} text-primary-500 relative flex group`}>
          <IoSend size={20} className="mr-1"/> <span className="absolute right-0 -mt-2"><MdOutlineAutoAwesome className={`${loading ? 'animate-bounce':''} text-base group-hover:animate-pulse`}/></span>
        </button>
      </form>
    </div>
  );
}
