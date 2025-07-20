import React from 'react'
import { FlightOverview } from '../ui/AdminUIComp/FlightDatas'
import { FlightSearchTable } from '../ui/AdminUIComp/FlightSearchTable'

const FlightActivityView = () => {
  return (
    <div>
     <FlightOverview />
     <FlightSearchTable />
    </div>
  )
}

export default FlightActivityView
