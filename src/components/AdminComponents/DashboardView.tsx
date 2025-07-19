import React from 'react';
import { DashboardStats } from '../ui/AdminUIComp/DashBoardStats';
import { DashboardCharts } from '../ui/AdminUIComp/DashBoardCharts';

const DashboardView = () => {
  return <div> 
  <DashboardStats />
  <DashboardCharts />
  </div>;
};

export default DashboardView;
