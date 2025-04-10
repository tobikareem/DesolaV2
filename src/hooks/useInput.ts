import { useState } from "react";

export const useInput = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [dateSelect, setDateSelect] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  return {inputValue, setInputValue, dateSelect, setDateSelect, date, setDate}
}