import React from 'react'
import { TechnicalTrackingOverview } from '../ui/AdminUIComp/TechnicalTrackingData'
import { AdminMetricsCardGrid } from '../ui/AdminUIComp/AdminMetricsCardGrid'
import { FilterBar } from '../ui/AdminUIComp/FilterBar'
import { ErrorLogs } from '../ui/AdminUIComp/ErrorLogs'

import { ErrorDataOverview } from '../ui/AdminUIComp/ErrorDatas'

const ErrorTrackingView = () => {
  return (
    <div>
      <TechnicalTrackingOverview />
      <AdminMetricsCardGrid />
      <FilterBar />
      <ErrorLogs />
      <ErrorDataOverview/>
    </div>
  )
}

export default ErrorTrackingView
