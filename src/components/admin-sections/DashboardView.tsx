import { useState } from 'react';
import { DashboardStats } from '../ui/AdminUIComp/DashBoardStats';
import { DashboardCharts } from '../ui/AdminUIComp/DashBoardCharts';
import { TabSwitch } from '../ui/AdminUIComp/TabSwitch';
import { IssueTable } from '../ui/AdminUIComp/IssueData';
import { AgentPerformance } from '../ui/AdminUIComp/AgentData';


const DashboardView = () => {
  const [activeTab, setActiveTab] = useState<'issues' | 'agents'>('issues');
  return ( 
  <div> 
    <DashboardStats />
    <DashboardCharts />
    <TabSwitch activeTab={activeTab} setActiveTab={setActiveTab} />
  <div>
    {activeTab === 'issues' ? <IssueTable /> : <AgentPerformance />}
  </div>
  </div>
  )
};

export default DashboardView;
