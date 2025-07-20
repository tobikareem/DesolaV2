import React from 'react'
import { TechnicalTrackingOverview } from '../ui/AdminUIComp/TechnicalTrackingData'
import { AdminMetricsCardGrid } from '../ui/AdminUIComp/AdminMetricsCardGrid'
import { FilterBar } from '../ui/AdminUIComp/FilterBar'

const ErrorTrackingView = () => {
  return (
    <div>
      <TechnicalTrackingOverview />
      <AdminMetricsCardGrid />
      <FilterBar />
    </div>
  )
}

export default ErrorTrackingView
