import { useEffect, useState } from "react";
import { PageResponse } from "../models/FaqItemResponse";
import useApi from "./useApi";

const usePageContent = (path: string, partitionKey: string, rowKey: string) => {
  const [content, setContent] = useState<PageResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getData } = useApi();

  useEffect(() => {
    const fetchContent = async () => {
      try {

        setLoading(true);

        const response = await getData<PageResponse>(`${path}/${partitionKey}/${rowKey}`);
        setContent(response);
      } catch {
        setError(`Failed to fetch content`);
        setContent(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [path, partitionKey, rowKey, getData]);

  return { content, loading, error };
};

export default usePageContent;
