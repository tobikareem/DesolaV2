const issueData = [
  { type: 'Payment Issues', count: 45, percentage: 32 },
  { type: 'Search Errors', count: 38, percentage: 27 },
  { type: 'Account Access', count: 28, percentage: 20 },
  { type: 'Subscription', count: 18, percentage: 13 },
  { type: 'Technical Issues', count: 11, percentage: 18 },
];

export const IssueTable = () => {
  return (
    <div className="bg-white rounded-2xl shadow border px-4 lg:p-6 w-full mt-6 overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="w-full">
          <tr className="w-full text-left text-sm lg:text-base text-gray-800 font-semibold border-b">
            {['Issue Type', 'Count', 'Percentage'].map((item, index) => {
              const alignment = index === 0 ? 'text-left' : index === 1 ? 'text-center' : 'text-right';
              return (
                <th
                  key={item}
                  className={`w-1/3 py-2 px-1 font-grotesk ${alignment}`}
                >
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-900">
          {issueData.map((issue, index) => (
            <tr key={index} className="h-16">
              <td className="text-left w-1/3">{issue.type}</td>
              <td className="text-center w-1/3">{issue.count}</td>
              <td className="text-right w-1/3">
                <div className="flex items-center justify-end gap-2">
                  {/* Progress bar */}
                  <div className="w-24 h-2 rounded-full bg-gray-200 relative">
                    <div
                      className="absolute left-0 top-0 h-2 rounded-full bg-[#030213]"
                      style={{ width: `${issue.percentage}%` }}
                    ></div>
                  </div>
                  <span>{issue.percentage}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
