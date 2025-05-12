import React from 'react';
import { Employee } from '../../../types';
import { Link } from 'react-router-dom';

interface EmployeeListItemProps {
  employee: Employee;
}

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ employee }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'onboarding':
        return 'bg-blue-100 text-blue-800';
      case 'exit':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link 
      to={`/employee-management/${employee.id}`}
      className="block hover:bg-gray-50 transition-colors"
    >
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full"
                src={employee.avatar || "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                alt={employee.name}
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-blue-600">{employee.name}</div>
              <div className="text-sm text-gray-500">{employee.email}</div>
            </div>
          </div>
          <div className="mt-0 flex-shrink-0 flex">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                employee.status
              )}`}
            >
              {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
            </span>
          </div>
        </div>
        <div className="mt-2 sm:flex sm:justify-between">
          <div className="sm:flex">
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
              <span className="mr-1 font-medium">ID:</span>
              {employee.employeeId}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
              <span className="mr-1 font-medium">Department:</span>
              {employee.department}
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
            <span className="mr-1 font-medium">Joined:</span>
            {new Date(employee.joiningDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EmployeeListItem;