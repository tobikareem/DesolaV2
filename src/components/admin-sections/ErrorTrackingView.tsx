import { AdminMetricsCardGrid } from "./AdminUIComp/AdminMetricsCardGrid"
import { ErrorLogs } from "./AdminUIComp/ErrorLogs"
import { FilterBar } from "./AdminUIComp/FilterBar"
import { TechnicalTrackingOverview } from "./AdminUIComp/TechnicalTrackingOverview"

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
