
import { SubscriptionCard } from "../../../components/layout/SubscriptionCard";
import { Text } from "../../../components/ui/TextComp";
import usePageContent from "../../../hooks/usePageContent";
import { useSubscription } from "../../../hooks/useSubscription";
import { WEB_PAGES } from "../../../utils/constants";
import { ENDPOINTS_API_PATH } from "../../../utils/endpoints";

const SubscriptionPlan = () => {

    const { content: faqData, loading, error } = usePageContent(`${ENDPOINTS_API_PATH.page}`, `${WEB_PAGES.home}`, "PriceDetails");
    const benefitLists = faqData?.RowValue?.split(";");
    const {monthlyPrice, yearlyPrice} = useSubscription();

    return (
        <section id="subscription"
            className="bg-[#F5F5F5] flex w-full flex-col items-center py-18 lg:py-30 px-4 md:px-8 gap-10">
            <div className="text-center">
                <Text as="h1" weight="bold" size="4xl" className="font-grotesk font-bold text-4xl text-lg:text-[56px]">
                    Your Perfect Plan
                </Text>
                <Text weight="medium" size="base" color="text-neutral-500" className="mt-8 font-work lg:max-w-[520px] text-base lg:text-lg text-center">
                    Affordable and Scalable options for everyone.
                </Text>
            </div>

            {loading && <p>Loading FAQs...</p>}
            {error && <p>Error fetching FAQs: {error}</p>}

            <div className="flex flex-col lg:flex-row gap-8">
                <SubscriptionCard
                    Tag="Monthly"
                    TagColor="bg-primary-500"
                    color="bg-white"
                    price={monthlyPrice}
                    priceColor="text-secondary-500"
                    benefit={benefitLists}
                    benefitColor="text-primary-500"
                />
                <SubscriptionCard
                    Tag="Yearly"
                    TagColor="bg-secondary-500"
                    color="bg-primary-500"
                    priceColor="text-white"
                    extra="text-white/50"
                    price={yearlyPrice} 
                    period="yr"
                    benefitColor="text-white"
                    benefit={benefitLists}
                />
            </div>

        </section>
    )
}

export default SubscriptionPlan;