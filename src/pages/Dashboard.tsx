import React from 'react';
import { 
  UsersIcon, 
  ClockIcon, 
  CalendarDaysIcon, 
  CircleDollarSignIcon, 
  ArrowUpRight,
  UserCheck
} from 'lucide-react';
import AppShell from '../components/common/AppShell';
import Card from '../components/common/Card';
import StatCard from '../components/dashboard/StatCard';
import BiometricAttendance from '../components/modules/attendance/BiometricAttendance';
import LeaveBalance from '../components/modules/leave/LeaveBalance';
import PerformanceGoal from '../components/modules/performance/PerformanceGoal';
import { currentUser, employees, performanceData } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Get most recent goal for the current user
  const userPerformance = performanceData.find(p => p.employeeId === 'EMP001');
  const latestGoal = userPerformance?.goals[0];
  
  return (
    <AppShell currentUser={currentUser}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        <div className="mt-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Employees"
              value={employees.length}
              icon={<UsersIcon className="h-6 w-6" />}
              change="10%"
              isPositive={true}
              subtitle="from last month"
            />
            
            <StatCard
              title="Present Today"
              value="18"
              icon={<UserCheck className="h-6 w-6" />}
              change="5%"
              isPositive={true}
              subtitle="vs yesterday"
            />
            
            <StatCard
              title="Pending Leaves"
              value="3"
              icon={<CalendarDaysIcon className="h-6 w-6" />}
              change="2"
              isPositive={false}
              subtitle="need approval"
            />
            
            <StatCard
              title="Payroll Status"
              value="Processed"
              icon={<CircleDollarSignIcon className="h-6 w-6" />}
              subtitle="for May 2023"
            />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <BiometricAttendance
            isCheckedIn={true}
            lastCheckIn="Today, 09:00 AM"
          />
          
          <LeaveBalance
            casualLeaves={{ total: 12, used: 4, balance: 8 }}
            sickLeaves={{ total: 8, used: 1, balance: 7 }}
            privilegeLeaves={{ total: 15, used: 6, balance: 9 }}
          />
          
          <Card title="Recent Announcements">
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 rounded-md border border-yellow-100">
                <h3 className="text-sm font-medium text-yellow-800">Upcoming Holiday</h3>
                <p className="mt-1 text-xs text-yellow-700">Memorial Day - May 29, 2023</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md border border-blue-100">
                <h3 className="text-sm font-medium text-blue-800">Payroll Processing</h3>
                <p className="mt-1 text-xs text-blue-700">May payroll will be processed by June 1, 2023</p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-md border border-purple-100">
                <h3 className="text-sm font-medium text-purple-800">Team Building Event</h3>
                <p className="mt-1 text-xs text-purple-700">Join us for a team building event on June 5, 2023</p>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Goals</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestGoal && <PerformanceGoal goal={latestGoal} />}
            
            <Card title="Quarter Overview">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Goals Completed</span>
                  <span className="text-sm font-medium text-gray-900">2/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: '40%' }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Overall Progress</span>
                  <span className="text-sm font-medium text-gray-900">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: '65%' }}
                  ></div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center">
                    View all goals
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;