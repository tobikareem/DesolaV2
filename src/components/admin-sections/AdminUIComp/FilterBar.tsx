import { useState } from 'react';
import { Filter } from 'lucide-react';

const statusOptions = ['All Status', 'Resolved', 'Unresolved'];
const severityOptions = ['All Severities', 'Critical', 'High', 'Medium', 'Low'];

export const FilterBar = () => {
  const [status, setStatus] = useState('All Status');
  const [severity, setSeverity] = useState('All Severities');

  return (
    <div className="flex items-center gap-6 bg-white border rounded-xl px-4 py-3 shadow-sm w-full mt-6">
      <Filter className="text-gray-500 w-5 h-5" />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[150px] h-9 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {statusOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Severity</label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-[150px] h-9 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {severityOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
