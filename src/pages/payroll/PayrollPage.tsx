import React from 'react';
import { DynamicTable } from '../../components/common/DynamicTable';
import { Button } from '../../components/ui/Button';
import { DollarSign, Download } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PayrollPage: React.FC = () => {
  const { user } = useAuth();
  const isEmployee = user?.role === 'employee';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEmployee ? 'My Payslips' : 'Payroll Management'}
        </h1>
        {!isEmployee && (
          <Button
            leftIcon={<DollarSign className="h-4 w-4" />}
          >
            Process Payroll
          </Button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg">
        <DynamicTable
          tableId="payroll_list"
          onActionClick={(action, row) => {
            if (action === 'download') {
              // Handle payslip download
              console.log('Download payslip for:', row);
            }
          }}
        />
      </div>
    </div>
  );
};

export default PayrollPage;