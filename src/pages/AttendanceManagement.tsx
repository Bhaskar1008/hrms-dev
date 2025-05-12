import React, { useState } from 'react';
import { ClockIcon, CalendarIcon, DownloadIcon } from 'lucide-react';
import AppShell from '../components/common/AppShell';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import AttendanceCalendar from '../components/modules/attendance/AttendanceCalendar';
import AttendanceSummary from '../components/modules/attendance/AttendanceSummary';
import BiometricAttendance from '../components/modules/attendance/BiometricAttendance';
import { currentUser, attendanceData } from '../data/mockData';

const AttendanceManagement: React.FC = () => {
  const [month, setMonth] = useState('05');
  const [year, setYear] = useState(2023);
  
  const filteredAttendance = attendanceData.filter(a => a.employeeId === 'EMP001');

  const attendanceCounts = {
    present: 18,
    absent: 2,
    late: 1,
    leaves: 0,
    totalDays: 21
  };
  
  return (
    <AppShell currentUser={currentUser}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Attendance Management</h1>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button
              variant="outline"
              icon={<DownloadIcon className="h-4 w-4" />}
            >
              Export Report
            </Button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Attendance Log</h2>
                
                <div className="mt-2 sm:mt-0 flex space-x-3">
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                  
                  <select
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-hidden">
                <AttendanceCalendar
                  month={month}
                  year={year}
                  attendanceData={filteredAttendance}
                />
              </div>
            </Card>
          </div>
          
          <div className="space-y-5">
            <BiometricAttendance
              isCheckedIn={true}
              lastCheckIn="Today, 09:00 AM"
            />
            
            <AttendanceSummary
              present={attendanceCounts.present}
              absent={attendanceCounts.absent}
              late={attendanceCounts.late}
              leaves={attendanceCounts.leaves}
              totalDays={attendanceCounts.totalDays}
            />
          </div>
        </div>
        
        <div className="mt-8">
          <Card title="Recent Activity">
            <div className="flow-root">
              <ul className="-mb-8">
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                          <ClockIcon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">Checked in</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">Today at 09:00 AM via Biometric</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="relative pb-8">
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center ring-8 ring-white">
                          <CalendarIcon className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">Holiday upcoming</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">Memorial Day on May 29, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li>
                  <div className="relative">
                    <div className="relative flex items-start space-x-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center ring-8 ring-white">
                          <ClockIcon className="h-5 w-5 text-red-600" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">Late arrival</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">Yesterday at 09:30 AM via Biometric</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

export default AttendanceManagement;