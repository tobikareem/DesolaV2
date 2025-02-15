import usePageContent from "../../../hooks/usePageContent";
import { WEB_PAGES } from "../../../utils/constants";


const FaqItem = ({ rowKey }: { rowKey: string }) => {
  const { content, loading, error } = usePageContent(`${WEB_PAGES.home}`, rowKey);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <p>{content?.RowValue}</p>
    </div>
  );
};

export default FaqItem;
