import React, { useState } from 'react';
import { PlusIcon, Trash2Icon, EditIcon } from 'lucide-react';
import AppShell from '../components/common/AppShell';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import RoleForm from '../components/modules/role/RoleForm';
import { useRole } from '../context/RoleContext';
import { useAuth } from '../context/AuthContext';

const RoleManagement: React.FC = () => {
  const { user } = useAuth();
  const { roles, loading, error, createRole, updateRole, deleteRole } = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);

  if (!user || user.role !== 'admin') {
    return <div>Access Denied</div>;
  }

  const handleCreateRole = async (data: any) => {
    try {
      await createRole(data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create role:', error);
    }
  };

  const handleUpdateRole = async (data: any) => {
    try {
      await updateRole(selectedRole._id, data);
      setIsModalOpen(false);
      setSelectedRole(null);
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(id);
      } catch (error) {
        console.error('Failed to delete role:', error);
      }
    }
  };

  return (
    <AppShell currentUser={user}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Role Management</h1>
          <Button
            variant="primary"
            icon={<PlusIcon className="h-4 w-4" />}
            onClick={() => {
              setSelectedRole(null);
              setIsModalOpen(true);
            }}
          >
            Create Role
          </Button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="mt-6 grid gap-5">
            {roles.map(role => (
              <Card key={role._id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{role.description}</p>
                  </div>
                  {!role.isSystem && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<EditIcon className="h-4 w-4" />}
                        onClick={() => {
                          setSelectedRole(role);
                          setIsModalOpen(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash2Icon className="h-4 w-4" />}
                        onClick={() => handleDeleteRole(role._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Permissions</h4>
                  <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {role.permissions.map(permission => (
                      <div
                        key={permission.module}
                        className="border rounded-md p-3"
                      >
                        <h5 className="text-sm font-medium text-gray-900">
                          {permission.module}
                        </h5>
                        <div className="mt-2 space-y-1">
                          {Object.entries(permission.actions).map(([action, allowed]) => (
                            <div
                              key={action}
                              className="flex items-center text-sm"
                            >
                              <span className={`w-2 h-2 rounded-full mr-2 ${
                                allowed ? 'bg-green-500' : 'bg-red-500'
                              }`} />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRole(null);
          }}
          title={selectedRole ? 'Edit Role' : 'Create Role'}
        >
          <RoleForm
            onSubmit={selectedRole ? handleUpdateRole : handleCreateRole}
            initialData={selectedRole}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedRole(null);
            }}
          />
        </Modal>
      </div>
    </AppShell>
  );
};

export default RoleManagement;