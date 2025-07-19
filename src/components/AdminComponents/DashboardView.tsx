import React from 'react';
import { DashboardStats } from '../ui/AdminUIComp/DashBoardStats';
import { DashboardCharts } from '../ui/AdminUIComp/DashBoardCharts';
import { TabSwitch } from '../ui/AdminUIComp/TabSwitch';
import { IssueTable } from '../ui/AdminUIComp/TableData';

const DashboardView = () => {
  return <div> 
  <DashboardStats />
  <DashboardCharts />
  <TabSwitch />
  <IssueTable />
  </div>;
};

export default DashboardView;
