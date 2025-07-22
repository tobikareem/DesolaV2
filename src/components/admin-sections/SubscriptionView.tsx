import React from 'react'
import { SubscriptionOverview } from './AdminUIComp/SubscriptionOverview'
import { PromoTable } from './AdminUIComp/PromoTable'

const SubscriptionView = () => {
  return (
    <div>
      <SubscriptionOverview />
      <PromoTable />

    </div>
  )
}

export default SubscriptionView
