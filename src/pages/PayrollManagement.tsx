import React, { useState } from 'react';
import { FileDownIcon, PrinterIcon, CalendarIcon } from 'lucide-react';
import AppShell from '../components/common/AppShell';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import PayrollSummary from '../components/modules/payroll/PayrollSummary';
import { currentUser, payrollData } from '../data/mockData';

const PayrollManagement: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('04');
  const [selectedYear, setSelectedYear] = useState('2023');
  
  const currentPayroll = payrollData.find(
    p => p.employeeId === 'EMP001' && p.month === selectedMonth && p.year === selectedYear
  );
  
  return (
    <AppShell currentUser={currentUser}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Payroll Management</h1>
        
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Payslip</h2>
                
                <div className="mt-2 sm:mt-0 flex space-x-3">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
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
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
              </div>
              
              {currentPayroll ? (
                <div>
                  <PayrollSummary payroll={currentPayroll} />
                  
                  <div className="mt-4 flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      icon={<PrinterIcon className="h-4 w-4" />}
                    >
                      Print
                    </Button>
                    
                    <Button
                      variant="primary"
                      icon={<FileDownIcon className="h-4 w-4" />}
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No payslip found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No payslip available for the selected month and year.
                  </p>
                </div>
              )}
            </Card>
          </div>
          
          <div>
            <Card title="Payroll History">
              <div className="overflow-y-auto max-h-96">
                <ul className="divide-y divide-gray-200">
                  {payrollData
                    .filter(p => p.employeeId === 'EMP001')
                    .sort((a, b) => {
                      const dateA = new Date(`${a.year}-${a.month}-01`);
                      const dateB = new Date(`${b.year}-${b.month}-01`);
                      return dateB.getTime() - dateA.getTime(); // Sort by date descending
                    })
                    .map((payroll) => {
                      const monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
                      const monthName = monthNames[parseInt(payroll.month) - 1];
                      
                      return (
                        <li key={payroll.id} className="py-4">
                          <button
                            onClick={() => {
                              setSelectedMonth(payroll.month);
                              setSelectedYear(payroll.year);
                            }}
                            className="block w-full text-left hover:bg-gray-50 p-2 rounded-md"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {monthName} {payroll.year}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Net: ${payroll.netSalary.toFixed(2)}
                                </p>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                ${payroll.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                payroll.status === 'processed' ? 'bg-blue-100 text-blue-800' : 
                                'bg-gray-100 text-gray-800'}`}
                              >
                                {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                              </span>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </Card>
            
            <Card className="mt-5" title="Tax Information">
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tax Identification Number</p>
                  <p className="mt-1 text-sm text-gray-900">XXX-XX-1234</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Tax Bracket</p>
                  <p className="mt-1 text-sm text-gray-900">22%</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">YTD Tax Paid</p>
                  <p className="mt-1 text-sm text-gray-900">$3,125.00</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<FileDownIcon className="h-4 w-4" />}
                    fullWidth
                  >
                    Download Tax Statement
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default PayrollManagement;