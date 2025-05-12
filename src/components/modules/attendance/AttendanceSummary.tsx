import React from 'react';
import Card from '../../common/Card';

interface AttendanceSummaryProps {
  present: number;
  absent: number;
  late: number;
  leaves: number;
  totalDays: number;
}

const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({
  present,
  absent,
  late,
  leaves,
  totalDays
}) => {
  const presentPercentage = (present / totalDays) * 100;
  const absentPercentage = (absent / totalDays) * 100;
  const latePercentage = (late / totalDays) * 100;
  const leavesPercentage = (leaves / totalDays) * 100;
  
  return (
    <Card title="Monthly Attendance Summary">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Present</span>
          <span className="font-medium text-gray-900">{present} days ({presentPercentage.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${presentPercentage}%` }}></div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Late</span>
          <span className="font-medium text-gray-900">{late} days ({latePercentage.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${latePercentage}%` }}></div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Leaves</span>
          <span className="font-medium text-gray-900">{leaves} days ({leavesPercentage.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${leavesPercentage}%` }}></div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Absent</span>
          <span className="font-medium text-gray-900">{absent} days ({absentPercentage.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${absentPercentage}%` }}></div>
        </div>
      </div>
    </Card>
  );
};

export default AttendanceSummary;