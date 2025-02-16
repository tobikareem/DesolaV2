import { useState, useEffect } from "react";
import { getPageSection } from "../services/pageContentService";
import { FaqItemResponse } from "../pages/home/response/FaqItemResponse";

const usePageContent = (partitionKey: string, rowKey: string) => {
  const [content, setContent] = useState<FaqItemResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data: FaqItemResponse = await getPageSection(partitionKey, rowKey);
        console.log(`................${data}`);
        setContent(data);
      } catch (error) {
        setError(`Failed to fetch content. ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [partitionKey, rowKey]);

  return { content, loading, error };
};

export default usePageContent;
