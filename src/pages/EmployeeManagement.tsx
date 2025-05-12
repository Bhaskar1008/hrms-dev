import React, { useState } from 'react';
import { PlusIcon, SearchIcon, FilterIcon, UserPlusIcon } from 'lucide-react';
import AppShell from '../components/common/AppShell';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import EmployeeListItem from '../components/modules/employee/EmployeeListItem';
import { currentUser, employees } from '../data/mockData';

const EmployeeManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  const departments = ['Engineering', 'Marketing', 'Human Resources', 'Finance'];
  
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });
  
  return (
    <AppShell currentUser={currentUser}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Employee Management</h1>
          
          <div className="mt-4 md:mt-0">
            <Button
              variant="primary"
              icon={<UserPlusIcon className="h-4 w-4" />}
            >
              Add Employee
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<SearchIcon className="h-5 w-5" />}
                fullWidth
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-1/4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="onboarding">Onboarding</option>
                <option value="exit">Exit</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Card>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <li key={employee.id}>
                      <EmployeeListItem employee={employee} />
                    </li>
                  ))
                ) : (
                  <li className="py-10">
                    <div className="text-center">
                      <UserPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                      <div className="mt-6">
                        <Button
                          variant="outline"
                          icon={<PlusIcon className="h-4 w-4" />}
                        >
                          Add Employee
                        </Button>
                      </div>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </Card>
        </div>
        
        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredEmployees.length}</span> of{' '}
            <span className="font-medium">{employees.length}</span> employees
          </div>
          
          <div className="flex-1 flex justify-center md:justify-end">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <span className="h-5 w-5">←</span>
              </a>
              <a
                href="#"
                aria-current="page"
                className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                1
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                2
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                3
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <span className="h-5 w-5">→</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default EmployeeManagement;