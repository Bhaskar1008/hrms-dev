import React from 'react';
import Card from '../../common/Card';
import { Payroll } from '../../../types';

interface PayrollSummaryProps {
  payroll: Payroll;
}

const PayrollSummary: React.FC<PayrollSummaryProps> = ({ payroll }) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthName = monthNames[parseInt(payroll.month) - 1];
  
  return (
    <Card title={`Payroll Summary - ${monthName} ${payroll.year}`}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <div className="text-sm font-medium text-gray-500">Basic Salary</div>
            <div className="text-xl font-semibold text-gray-900">${payroll.basic.toFixed(2)}</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-md">
            <div className="text-sm font-medium text-gray-500">HRA</div>
            <div className="text-xl font-semibold text-gray-900">${payroll.hra.toFixed(2)}</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-md">
            <div className="text-sm font-medium text-gray-500">Allowances</div>
            <div className="text-xl font-semibold text-gray-900">${payroll.allowances.toFixed(2)}</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-md">
            <div className="text-sm font-medium text-gray-500">Deductions</div>
            <div className="text-xl font-semibold text-gray-900">-${payroll.deductions.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Gross Salary</span>
            <span className="text-base font-medium text-gray-900">
              ${(payroll.basic + payroll.hra + payroll.allowances).toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Total Deductions</span>
            <span className="text-base font-medium text-gray-900">
              -${(payroll.deductions + payroll.tax).toFixed(2)}
            </span>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-500">Tax</span>
            <span className="text-base font-medium text-gray-900">
              -${payroll.tax.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Net Salary</span>
            <span className="text-xl font-bold text-blue-600">
              ${payroll.netSalary.toFixed(2)}
            </span>
          </div>
          
          <div className="mt-2 text-right">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${payroll.status === 'paid' ? 'bg-green-100 text-green-800' : 
                payroll.status === 'processed' ? 'bg-blue-100 text-blue-800' : 
                'bg-gray-100 text-gray-800'}`}
            >
              {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
            </span>
            
            {payroll.paidOn && (
              <p className="text-xs text-gray-500 mt-1">
                Paid on {new Date(payroll.paidOn).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PayrollSummary;