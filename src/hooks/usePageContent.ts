import { useEffect, useState } from "react";
import { PageResponse } from "../models/FaqItemResponse";
import { getPageSection } from "../services/pageContentService";

const usePageContent = (path:string, partitionKey: string, rowKey: string) => {
  const [content, setContent] = useState<PageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const cacheExpiryTime = 30 * 24 * 60 * 60 * 1000;
    const cacheKey = `pageContent_${path}_${partitionKey}_${rowKey}`;
    

    const fetchContent = async () => {
      const cachedDataString = localStorage.getItem(cacheKey);
      try {
        if(cachedDataString){
          const now = new Date().getTime();
          const cachedData = JSON.parse(cachedDataString);
          if(now - cachedData.timestamp < cacheExpiryTime){
            setContent(cachedData.data);
            setLoading(false);
            return;
          }
        }
        const data: PageResponse = await getPageSection(path, partitionKey, rowKey);
        const dataToCache = {
          data, timestamp: new Date().getTime(),
        }
        localStorage.setItem(cacheKey, JSON.stringify(dataToCache));

        setContent(data);
      } catch {
        setError(`Failed to fetch content`);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [path, partitionKey, rowKey]);

  return { content, loading, error };
};

export default usePageContent;
