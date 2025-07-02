import { useCallback, useState, useEffect } from "react";
import useApi from "./useApi";
import { CustomStorage } from "../utils/customStorage";

export interface DesolaAIQuery {
  query: string; 
}
export interface DesolaAIResponse {
  response: string;
  status: string; 
  Agent_used: string;
  tools_used: boolean
}
export interface DesolaAILog {
  message: string;
  role: 'user' | 'assistant' | string;
}

export const useDesolaAI = () => {
  const {postData} = useApi();
  const [aiResponse, setAiResponse] = useState< DesolaAIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);
  const storageService = new CustomStorage();
  
  const [AIMessageLog, setAIMessageLog] = useState<DesolaAILog[]>(() => {
    const stored = storageService.getItem('AiMessageLog');
    return stored ? JSON.parse(stored) : [
      {
         message: "I am your Assistant. How can I help you today?",
         role: 'assistant'
      }
    ];
  });

  const updateAIChatLog = (message: string, role: 'user' | 'assistant') => {
    setAIMessageLog((prevLog) => [
      ...prevLog,
      { message, role }
    ]);
  }
  useEffect(() => {
    storageService.setItem('AiMessageLog', JSON.stringify(AIMessageLog));
  }, [AIMessageLog]);
  



  const fetchAiResponse = useCallback(async (query: string) => {
    if (!query) {
      setAiResponse(null);
      return;
    }
    setLoading(true);
    try {
      const response = await postData<DesolaAIQuery>(`http://127.0.0.1:8000/api/ask/`, { query: query });
      const aiResult = response as DesolaAIResponse;
      setAiResponse(aiResult);  
      updateAIChatLog(aiResult.response, 'assistant')
    } catch (error: unknown) {
      console.error("Error fetching AI response:", error);
      setError(`Error fetching AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [postData]);

  return {aiResponse, loading, error, fetchAiResponse, AIMessageLog, updateAIChatLog}
};