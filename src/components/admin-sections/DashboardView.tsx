import { useState } from 'react';
import { DashboardStats } from './AdminUIComp/DashBoardStats';
import { DashboardCharts } from './AdminUIComp/DashBoardCharts';
import { TabSwitch } from './AdminUIComp/TabSwitch';
import { IssueTable } from './AdminUIComp/IssueTable';
import { AgentPerformance } from './AdminUIComp/AgentData';


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
