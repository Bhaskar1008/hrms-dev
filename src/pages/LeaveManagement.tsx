import React, { useState } from 'react';
import { CalendarDaysIcon, CheckIcon, XIcon } from 'lucide-react';
import AppShell from '../components/common/AppShell';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LeaveApplyForm from '../components/modules/leave/LeaveApplyForm';
import LeaveBalance from '../components/modules/leave/LeaveBalance';
import { currentUser, leaveData } from '../data/mockData';

const LeaveManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('myLeaves');
  
  const filteredLeaves = leaveData.filter(leave => leave.employeeId === 'EMP001');
  
  const leaveBalance = {
    casualLeaves: {
      total: 12,
      used: 4,
      balance: 8
    },
    sickLeaves: {
      total: 8,
      used: 1,
      balance: 7
    },
    privilegeLeaves: {
      total: 15,
      used: 6,
      balance: 9
    }
  };
  
  const getLeaveTypeStyle = (type: string) => {
    switch (type) {
      case 'casual':
        return 'bg-blue-100 text-blue-800';
      case 'sick':
        return 'bg-green-100 text-green-800';
      case 'privilege':
        return 'bg-purple-100 text-purple-800';
      case 'unpaid':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <AppShell currentUser={currentUser}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Leave Management</h1>
        
        <div className="mt-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('myLeaves')}
              className={`${
                activeTab === 'myLeaves'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              My Leaves
            </button>
            <button
              onClick={() => setActiveTab('applyLeave')}
              className={`${
                activeTab === 'applyLeave'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Apply Leave
            </button>
            {currentUser.role === 'admin' || currentUser.role === 'hr' ? (
              <button
                onClick={() => setActiveTab('approvals')}
                className={`${
                  activeTab === 'approvals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Leave Approvals
              </button>
            ) : null}
          </nav>
        </div>
        
        {activeTab === 'myLeaves' && (
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card title="My Leave Applications">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date Range
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Days
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applied On
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredLeaves.map((leave) => (
                        <tr key={leave.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeaveTypeStyle(leave.type)}`}>
                              {leave.type.charAt(0).toUpperCase() + leave.type.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {leave.days}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(leave.status)}`}>
                              {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(leave.appliedOn).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            
            <div>
              <LeaveBalance
                casualLeaves={leaveBalance.casualLeaves}
                sickLeaves={leaveBalance.sickLeaves}
                privilegeLeaves={leaveBalance.privilegeLeaves}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'applyLeave' && (
          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <LeaveApplyForm />
            </div>
            
            <div>
              <LeaveBalance
                casualLeaves={leaveBalance.casualLeaves}
                sickLeaves={leaveBalance.sickLeaves}
                privilegeLeaves={leaveBalance.privilegeLeaves}
              />
              
              <Card className="mt-5" title="Leave Policy">
                <div className="space-y-4 text-sm">
                  <p>
                    <span className="font-medium">Casual Leave:</span> For personal matters, maximum 3 consecutive days
                  </p>
                  <p>
                    <span className="font-medium">Sick Leave:</span> For health reasons, medical certificate required for more than 2 days
                  </p>
                  <p>
                    <span className="font-medium">Privilege Leave:</span> For vacations, must apply at least 7 days in advance
                  </p>
                  <p>
                    <span className="font-medium">Unpaid Leave:</span> When no leave balance, salary will be deducted proportionally
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
                    For complete leave policy, please refer to the employee handbook.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'approvals' && (
          <div className="mt-6">
            <Card title="Pending Leave Approvals">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Range
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Robert Johnson</div>
                            <div className="text-xs text-gray-500">Marketing</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeaveTypeStyle('privilege')}`}>
                          Privilege
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jun 15, 2023 - Jun 22, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        8
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Family vacation
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Button
                            variant="success"
                            size="sm"
                            icon={<CheckIcon className="h-4 w-4" />}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            icon={<XIcon className="h-4 w-4" />}
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">John Doe</div>
                            <div className="text-xs text-gray-500">Engineering</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLeaveTypeStyle('unpaid')}`}>
                          Unpaid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jul 10, 2023 - Jul 14, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        5
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Personal emergency
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Button
                            variant="success"
                            size="sm"
                            icon={<CheckIcon className="h-4 w-4" />}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            icon={<XIcon className="h-4 w-4" />}
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default LeaveManagement;