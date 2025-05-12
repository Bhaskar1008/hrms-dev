import React from 'react';
import { Goal } from '../../../types';
import { CheckCircle, Clock, RefreshCw } from 'lucide-react';

interface PerformanceGoalProps {
  goal: Goal;
}

const PerformanceGoal: React.FC<PerformanceGoalProps> = ({ goal }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'inProgress':
        return <RefreshCw className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'inProgress':
        return 'In Progress';
      case 'pending':
        return 'Pending';
      default:
        return status;
    }
  };
  
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="p-4 border border-gray-200 rounded-md hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium text-gray-900">{goal.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{goal.description}</p>
        </div>
        <div className="flex items-center">
          {getStatusIcon(goal.status)}
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-500">Progress</span>
          <span className="text-sm font-medium text-gray-700">{goal.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getProgressColor(goal.progress)} h-2 rounded-full transition-all duration-500 ease-in-out`}
            style={{ width: `${goal.progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between text-xs">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          {getStatusText(goal.status)}
        </span>
        <span className="text-gray-500">
          Target: {new Date(goal.targetDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default PerformanceGoal;