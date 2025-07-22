export interface ErrorLog {
  id: string;
  user: string;
  timestamp: string;
  message: string;
  status: 'Resolved' | 'Unresolved';
  type: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
}

export const errorLogs: ErrorLog[] = [
  {
    id: 'ERR001',
    user: 'USR001',
    timestamp: '1/15/2024, 2:30:00 PM',
    message: 'Flight search API timeout for LAX routes',
    status: 'Unresolved',
    type: 'high',
    tags: ['api failure'],
  },
  {
    id: 'ERR002',
    user: 'USR001',
    timestamp: '1/15/2024, 12:15:00 PM',
    message: 'Inconsistent pricing data for United flights',
    status: 'Resolved',
    type: 'medium',
    tags: ['pricing error'],
  },
  {
    id: 'ERR003',
    user: 'USR002',
    timestamp: '1/14/2024, 4:45:00 PM',
    message: 'Search request timeout after 30s',
    status: 'Resolved',
    type: 'low',
    tags: ['timeout'],
  },
  {
    id: 'ERR004',
    user: 'USR004',
    timestamp: '1/14/2024, 11:20:00 AM',
    message: 'Payment processing system crash',
    status: 'Unresolved',
    type: 'critical',
    tags: ['crash'],
  },
];
