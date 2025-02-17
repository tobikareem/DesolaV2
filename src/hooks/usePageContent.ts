import { useEffect, useState } from "react";
import { PageResponse } from "../models/FaqItemResponse";
import { getPageSection } from "../services/pageContentService";

const usePageContent = (path:string, partitionKey: string, rowKey: string) => {
  const [content, setContent] = useState<PageResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data: PageResponse = await getPageSection(path, partitionKey, rowKey);
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
