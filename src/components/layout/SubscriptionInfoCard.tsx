import React from 'react';
import { Text } from '../ui/TextComp';

interface SubscriptionInfoCardProps {
    customerName?: string;
    subscriptionStatus?: 'active' | 'inactive' | 'expired' | 'trialing' ;
    currentPlan?: string;
    expirationDate?: string;
    className?: string;
    gradientFrom?: string;
    gradientTo?: string;
    startDate: string | undefined;
}

export const SubscriptionInfoCard: React.FC<SubscriptionInfoCardProps> = ({
    customerName,
    subscriptionStatus = 'inactive',
    currentPlan,
    expirationDate,
    className = '',
    gradientFrom = 'from-primary-100',
    gradientTo = 'to-secondary-100',
    startDate,
}) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'text-green-600'
            case 'trialing':
                return 'text-notification';
            case 'inactive':
                return 'text-gray-600'
            case 'expired':
                return 'text-red-500';
            default:
                return 'text-gray-600';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'Active';
            case 'trialing':
                return 'Active';
            case 'inactive':
                return 'Inactive';
            case 'expired':
                return 'Expired';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} border border-purple-200 rounded-lg p-4 ${className}`}>
            <Text size="sm" className="text-neutral-700 font-medium mb-4">
                Account Information
            </Text>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <Text size="base" className="text-gray-700 font-medium">
                        Name:
                    </Text>
                    <Text size="base" className="text-gray-900 font-semibold">
                        {customerName || 'N/A'}
                    </Text>
                </div>

                <div className="flex justify-between items-center">
                    <Text size="base" className="text-gray-700 font-medium">
                        Status:
                    </Text>
                    <Text size="base" className={`font-semibold ${getStatusColor(subscriptionStatus)}`}>
                        {getStatusText(subscriptionStatus)}
                    </Text>
                </div>

                {currentPlan && (
                    <div className="flex justify-between items-center">
                        <Text size="base" className="text-gray-700 font-medium">
                            Current Plan:
                        </Text>
                        <Text size="base" className="!text-blue-600 font-semibold">
                            {currentPlan}
                        </Text>
                    </div>
                )}
                <div className="flex justify-between items-center">
                    <Text size="base" className="text-gray-700 font-medium">
                       Started:
                    </Text>
                    <Text size="base" className="!text-primary-600 font-semibold">
                        {startDate || 'N/A'}
                    </Text>
                </div>

                <div className="flex justify-between items-center">
                    <Text size="base" className="text-gray-700 font-medium">
                       {subscriptionStatus == 'trialing' && `Trial`} Expires:
                    </Text>
                    <Text size="base" className="!text-secondary-700 font-semibold">
                        {expirationDate || 'N/A'}
                    </Text>
                </div>
            </div>
        </div>
    );
};

interface SelectedPlanCardProps {
    selectedPlan: string;
    planPrice: string;
    showSavings?: boolean;
    className?: string;
}

export const SelectedPlanCard: React.FC<SelectedPlanCardProps> = ({
    selectedPlan,
    planPrice,
    showSavings = true,
    className = ''
}) => {
    return (
        <div className={`bg-purple-50 border border-purple-200 rounded-lg p-4 ${className}`}>
            <Text size="sm" className="text-gray-600 mb-3">
                Selected Plan:
            </Text>

            <div className="flex justify-between items-start mb-4">
                <Text size="lg" className="text-gray-900 font-bold">
                    {selectedPlan} Subscription
                </Text>
                <Text size="2xl" className="text-blue-600 font-bold">
                    ${planPrice}
                </Text>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Billing:</span>
                    <span className="text-gray-900 font-medium">{selectedPlan.toLowerCase()}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Free Trial:</span>
                    <span className="text-gray-900 font-medium">7 days</span>
                </div>

                {showSavings && selectedPlan === 'Yearly' && (
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Annual Savings:</span>
                        <span className="text-green-600 font-medium">15% OFF ($5.38)</span>
                    </div>
                )}
            </div>
        </div>
    );
};