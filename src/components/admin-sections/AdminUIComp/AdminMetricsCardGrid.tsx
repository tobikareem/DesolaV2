import React from 'react';
import { AdminMetricCardComp } from './AdminMetricCardComp';
import { AdminMetricItem } from '../../../utils/AdminTechnicalTracking';
export const AdminMetricsCardGrid: React.FC = () => {
  const systemStatus: {
    title: string;
    subtitle: string;
    items: AdminMetricItem[];
  } = {
    title: 'System Status',
    subtitle: 'Real-time overview of system health',
    items: [
      { label: 'CPU Usage', value: '75%', color: 'blue' },
      { label: 'Memory Usage', value: '60%', color: 'orange' },
      { label: 'Disk Space', value: '50%', color: 'green' },
    ],
  };

  const performanceMetrics: {
    title: string;
    subtitle: string;
    items: AdminMetricItem[];
  } = {
    title: 'Performance Metrics',
    subtitle: 'Key performance indicators for system efficiency',
    items: [
      { label: 'Response Time', value: '0.2%', color: 'blue' },
      { label: 'API Calls', value: '1200', color: 'orange' },
      { label: 'Error Rate', value: '1%', color: 'green' },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-6">
      <AdminMetricCardComp {...systemStatus} />
      <AdminMetricCardComp {...performanceMetrics} />
    </div>
  );
};
