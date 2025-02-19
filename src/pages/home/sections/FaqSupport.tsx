import { useState } from "react";
import { RxCaretRight } from "react-icons/rx";
import { Text } from "../../../components/TextComp";
import usePageContent from "../../../hooks/usePageContent";
import { WEB_PAGES } from "../../../utils/constants";
import { ENDPOINTS_API_PATH } from "../../../utils/endpoints";

const FaqSupport = () => {
    const { content: faqData, loading, error } = usePageContent(`${ENDPOINTS_API_PATH.page}`,`${WEB_PAGES.home}`, "FAQ");
    const [open, setOpen] = useState<boolean[]>([]);

    const toggleState = (index: number) => {
        setOpen((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <section id="support"
            className="bg-white flex w-full flex-col items-center py-18 lg:py-30 px-4 md:px-8 lg:px-28 gap-10">
            <div className="text-center">
                <Text as="h1" weight="bold" size="4xl" className="font-grotesk font-bold text-4xl text-lg:text-[56px]">
                    FAQ/Supports
                </Text>
            </div>

            {/* Show loading and error states */}
            {loading && <p>Loading FAQs...</p>}
            {error && <p>Error fetching FAQs: {error}</p>}

            <div className="flex flex-col w-full lg:w-[800px] gap-4">
                {faqData?.RowValue
                    ?.split(";") // Assuming FAQs are stored as a `;` separated string
                    .map((faqItem: string, index: number) => {
                        const [question, answer] = faqItem.split(":"); // Assuming format "Question:Answer"
                        return (
                            <div
                                key={index}
                                onClick={() => toggleState(index)}
                                className={`bg-primary-100/40 flex flex-col p-4 md:p-6 w-full gap-4 rounded-[24px] ${open[index] ? 'h-fit' : 'h-16 items-center'} hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer`}>
                                <div className="flex w-full justify-between items-center text-nowrap">
                                    <Text weight="normal" color="text-[#1A1A1A]" className="font-work tracking-tight !text-sm xs:!text-base">
                                        {question}
                                    </Text>
                                    <div className={`${open[index] ? 'rotate-90' : 'rotate-0'} text-2xl text-[#1A1A1A] transition-transform duration-1000 ease-in-out`}>
                                        <RxCaretRight />
                                    </div>
                                </div>
                                <div className={`${open[index] ? 'h-fit' : 'h-0'} transition-all duration-500 delay-300 ease-linear  pl-2 overflow-hidden`}>
                                    <Text weight="normal"  color="text-neutral-500" className="font-work tracking-tight !text-sm xs:!text-base">
                                        {answer}
                                    </Text>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default FaqSupport;
