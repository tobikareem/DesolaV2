import React from 'react'
import { SubscriptionOverview } from '../ui/AdminUIComp/SubscriptionDatas'
import { PromoTable } from '../ui/AdminUIComp/PromoTable'

const SubscriptionView = () => {
  return (
    <div>
      <SubscriptionOverview />
      <PromoTable />
      {/* Additional components can be added here */}
      {/* <UserSubscriptionDetails /> */}
      {/* <SubscriptionHistory /> */}
    </div>
  )
}

export default SubscriptionView
