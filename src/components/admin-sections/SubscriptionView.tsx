import React from 'react'
import { SubscriptionOverview } from '../ui/AdminUIComp/SubscriptionOverview'
import { PromoTable } from '../ui/AdminUIComp/PromoTable'

const SubscriptionView = () => {
  return (
    <div>
      <SubscriptionOverview />
      <PromoTable />

    </div>
  )
}

export default SubscriptionView
