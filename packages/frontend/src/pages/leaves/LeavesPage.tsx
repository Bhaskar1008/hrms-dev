import React, { useState } from 'react';
import { DynamicTable } from '../../components/common/DynamicTable';
import { DynamicForm } from '../../components/common/DynamicForm';
import { Button } from '../../components/ui/Button';
import { Plus, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUi } from '../../contexts/UiContext';
import { useApi } from '../../contexts/ApiContext';

const LeavesPage: React.FC = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);
  const { user, hasPermission } = useAuth();
  const { showToast } = useUi();
  const api = useApi();
  
  const isEmployee = user?.role === 'employee';
  const canRequest = hasPermission('leaves:request');
  const canApprove = hasPermission('leaves:approve');
  const canReject = hasPermission('leaves:reject');

  const handleRowClick = (leave: any) => {
    setSelectedLeave(leave);
  };

  const handleActionClick = async (action: string, leave: any) => {
    try {
      if (action === 'view') {
        const leaveDetails = await api.get(`/api/leaves/${leave.id}`);
        setSelectedLeave({ ...leaveDetails, readOnly: true });
      } else if (action === 'approve' && canApprove) {
        await api.put(`/api/leaves/${leave.id}/approve`, {
          approverId: user?.id
        });
        showToast('Leave request approved successfully', 'success');
      } else if (action === 'reject' && canReject) {
        await api.put(`/api/leaves/${leave.id}/reject`, {
          approverId: user?.id
        });
        showToast('Leave request rejected successfully', 'success');
      }
    } catch (error) {
      showToast(`Failed to ${action} leave request`, 'error');
    }
  };

  const handleFormSuccess = () => {
    showToast('Leave request submitted successfully', 'success');
    setShowRequestForm(false);
    setSelectedLeave(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEmployee ? 'My Leave Requests' : 'Leave Management'}
        </h1>
        {canRequest && !showRequestForm && !selectedLeave && (
          <Button
            onClick={() => setShowRequestForm(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Request Leave
          </Button>
        )}
      </div>

      {showRequestForm && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Submit Leave Request</h2>
            <button
              onClick={() => setShowRequestForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <DynamicForm
              formId="leave_request"
              onSuccess={handleFormSuccess}
              onCancel={() => setShowRequestForm(false)}
            />
          </div>
        </div>
      )}

      {selectedLeave && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Leave Request Details
            </h2>
            <button
              onClick={() => setSelectedLeave(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Employee</p>
                <p className="mt-1 text-base">{selectedLeave.employeeName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Leave Type</p>
                <p className="mt-1 text-base">{selectedLeave.leaveType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Start Date</p>
                <p className="mt-1 text-base">{selectedLeave.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">End Date</p>
                <p className="mt-1 text-base">{selectedLeave.endDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="mt-1 text-base">{selectedLeave.duration}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <p className="mt-1 text-base">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${selectedLeave.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        selectedLeave.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}
                  >
                    {selectedLeave.status.charAt(0).toUpperCase() + selectedLeave.status.slice(1)}
                  </span>
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Reason</p>
                <p className="mt-1 text-base">{selectedLeave.reason}</p>
              </div>
            </div>

            {canApprove && selectedLeave.status === 'pending' && (
              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleActionClick('reject', selectedLeave)}
                >
                  Reject
                </Button>
                <Button 
                  onClick={() => handleActionClick('approve', selectedLeave)}
                >
                  Approve
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {!showRequestForm && !selectedLeave && (
        <DynamicTable
          tableId="leave_requests"
          onRowClick={handleRowClick}
          onActionClick={handleActionClick}
          initialFilters={{
            employeeId: isEmployee ? user?.id : undefined,
            organizationId: user?.organizationId
          }}
        />
      )}
    </div>
  );
};

export default LeavesPage;