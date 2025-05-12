import React from 'react';
import Card from '../../common/Card';

interface LeaveBalanceProps {
  casualLeaves: {
    total: number;
    used: number;
    balance: number;
  };
  sickLeaves: {
    total: number;
    used: number;
    balance: number;
  };
  privilegeLeaves: {
    total: number;
    used: number;
    balance: number;
  };
}

const LeaveBalance: React.FC<LeaveBalanceProps> = ({
  casualLeaves,
  sickLeaves,
  privilegeLeaves
}) => {
  return (
    <Card title="Leave Balance">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Casual Leaves</span>
            <span className="text-sm font-medium text-gray-900">
              {casualLeaves.balance}/{casualLeaves.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(casualLeaves.used / casualLeaves.total) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Used: {casualLeaves.used}</span>
            <span className="text-xs text-gray-500">Balance: {casualLeaves.balance}</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Sick Leaves</span>
            <span className="text-sm font-medium text-gray-900">
              {sickLeaves.balance}/{sickLeaves.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${(sickLeaves.used / sickLeaves.total) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Used: {sickLeaves.used}</span>
            <span className="text-xs text-gray-500">Balance: {sickLeaves.balance}</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Privilege Leaves</span>
            <span className="text-sm font-medium text-gray-900">
              {privilegeLeaves.balance}/{privilegeLeaves.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full" 
              style={{ width: `${(privilegeLeaves.used / privilegeLeaves.total) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Used: {privilegeLeaves.used}</span>
            <span className="text-xs text-gray-500">Balance: {privilegeLeaves.balance}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LeaveBalance;