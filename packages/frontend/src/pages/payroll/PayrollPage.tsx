import React, { useState, useEffect } from 'react';
import { DynamicTable } from '../../components/common/DynamicTable';
import { Button } from '../../components/ui/Button';
import { DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import { useUi } from '../../contexts/UiContext';

const PayrollPage: React.FC = () => {
  const { user } = useAuth();
  const api = useApi();
  const { showToast } = useUi();
  const isEmployee = user?.role === 'employee';

  const processPayroll = async () => {
    try {
      await api.post('/api/payroll/process', {
        organizationId: user?.organizationId
      });
      showToast('Payroll processed successfully', 'success');
    } catch (error) {
      showToast('Failed to process payroll', 'error');
    }
  };

  const downloadPayslip = async (payrollId: string) => {
    try {
      const response = await api.get(`/api/payroll/${payrollId}/download`, {
        responseType: 'blob'
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `payslip-${payrollId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      showToast('Failed to download payslip', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEmployee ? 'My Payslips' : 'Payroll Management'}
        </h1>
        {!isEmployee && (
          <Button
            leftIcon={<DollarSign className="h-4 w-4" />}
            onClick={processPayroll}
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
              downloadPayslip(row.id);
            }
          }}
          initialFilters={{
            employeeId: isEmployee ? user?.id : undefined,
            organizationId: user?.organizationId
          }}
        />
      </div>
    </div>
  );
};

export default PayrollPage;