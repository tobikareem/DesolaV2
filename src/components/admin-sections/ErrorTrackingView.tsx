import React from 'react'
import { TechnicalTrackingOverview } from '../ui/AdminUIComp/TechnicalTrackingData'
import { AdminMetricsCardGrid } from '../ui/AdminUIComp/AdminMetricsCardGrid'
import { FilterBar } from '../ui/AdminUIComp/FilterBar'
import { ErrorLogs } from '../ui/AdminUIComp/ErrorLogs'

const ErrorTrackingView = () => {
  return (
    <div>
      <TechnicalTrackingOverview />
      <AdminMetricsCardGrid />
      <FilterBar />
      <ErrorLogs />
    </div>
  )
}

export default ErrorTrackingView
