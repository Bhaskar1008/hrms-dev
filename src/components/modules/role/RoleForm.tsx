import React, { useState } from 'react';
import Button from '../../common/Button';
import Input from '../../common/Input';

interface RoleFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  onCancel: () => void;
}

const AVAILABLE_MODULES = [
  'employees',
  'attendance',
  'leaves',
  'payroll',
  'performance',
];

const RoleForm: React.FC<RoleFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    permissions: initialData?.permissions || AVAILABLE_MODULES.map(module => ({
      module,
      actions: {
        create: false,
        read: false,
        update: false,
        delete: false,
      },
    })),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePermissionChange = (moduleIndex: number, action: string, value: boolean) => {
    const newPermissions = [...formData.permissions];
    newPermissions[moduleIndex].actions[action as keyof typeof newPermissions[0]['actions']] = value;
    setFormData({ ...formData, permissions: newPermissions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Role Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
        <div className="space-y-4">
          {formData.permissions.map((permission, index) => (
            <div key={permission.module} className="border rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                {permission.module.charAt(0).toUpperCase() + permission.module.slice(1)}
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(permission.actions).map(([action, value]) => (
                  <label key={action} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handlePermissionChange(index, action, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {action.charAt(0).toUpperCase() + action.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {initialData ? 'Update Role' : 'Create Role'}
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;