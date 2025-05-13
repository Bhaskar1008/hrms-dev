import React, { useState } from 'react';
import { DynamicTable } from '../../components/common/DynamicTable';
import { DynamicForm } from '../../components/common/DynamicForm';
import { Button } from '../../components/ui/Button';
import { Plus, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUi } from '../../contexts/UiContext';

const EmployeesPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const { hasPermission } = useAuth();
  const { showToast } = useUi();
  const canCreate = hasPermission('employees:create');
  const canUpdate = hasPermission('employees:update');

  const handleRowClick = (employee: any) => {
    if (canUpdate) {
      setSelectedEmployee(employee);
    }
  };

  const handleActionClick = (action: string, employee: any) => {
    if (action === 'edit' && canUpdate) {
      setSelectedEmployee(employee);
    } else if (action === 'view') {
      setSelectedEmployee({ ...employee, readOnly: true });
    }
  };

  const handleFormSuccess = () => {
    showToast('Employee data saved successfully', 'success');
    setShowAddForm(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
        {canCreate && !showAddForm && !selectedEmployee && (
          <Button
            onClick={() => setShowAddForm(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add Employee
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Add New Employee</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <DynamicForm
              formId="employee_create"
              onSuccess={handleFormSuccess}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {selectedEmployee && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {selectedEmployee.readOnly ? 'View Employee' : 'Edit Employee'}
            </h2>
            <button
              onClick={() => setSelectedEmployee(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <DynamicForm
              formId="employee_edit"
              initialData={selectedEmployee}
              onSuccess={handleFormSuccess}
              onCancel={() => setSelectedEmployee(null)}
            />
          </div>
        </div>
      )}

      {!showAddForm && !selectedEmployee && (
        <DynamicTable
          tableId="employees_list"
          onRowClick={handleRowClick}
          onActionClick={handleActionClick}
        />
      )}
    </div>
  );
};

export default EmployeesPage;