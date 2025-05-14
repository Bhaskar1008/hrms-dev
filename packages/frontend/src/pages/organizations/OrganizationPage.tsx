import React, { useState } from 'react';
import { DynamicTable } from '../../components/common/DynamicTable';
import { DynamicForm } from '../../components/common/DynamicForm';
import { Button } from '../../components/ui/Button';
import { Plus, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUi } from '../../contexts/UiContext';
import { useApi } from '../../contexts/ApiContext';

const OrganizationPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const { user, hasPermission } = useAuth();
  const { showToast } = useUi();
  const api = useApi();
  
  const canCreate = hasPermission('organizations:create');
  const canUpdate = hasPermission('organizations:update');

  const handleRowClick = async (org: any) => {
    if (canUpdate) {
      try {
        const orgDetails = await api.get(`/api/organizations/${org.id}`);
        setSelectedOrg(orgDetails);
      } catch (error) {
        showToast('Failed to fetch organization details', 'error');
      }
    }
  };

  const handleActionClick = async (action: string, org: any) => {
    try {
      if (action === 'edit' && canUpdate) {
        const orgDetails = await api.get(`/api/organizations/${org.id}`);
        setSelectedOrg(orgDetails);
      } else if (action === 'view') {
        const orgDetails = await api.get(`/api/organizations/${org.id}`);
        setSelectedOrg({ ...orgDetails, readOnly: true });
      } else if (action === 'delete' && canUpdate) {
        await api.delete(`/api/organizations/${org.id}`);
        showToast('Organization deleted successfully', 'success');
      }
    } catch (error) {
      showToast(`Failed to ${action} organization`, 'error');
    }
  };

  const handleFormSuccess = () => {
    showToast('Organization saved successfully', 'success');
    setShowAddForm(false);
    setSelectedOrg(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
        {canCreate && !showAddForm && !selectedOrg && (
          <Button
            onClick={() => setShowAddForm(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add Organization
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Add New Organization</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <DynamicForm
              formId="organization_create"
              onSuccess={handleFormSuccess}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {selectedOrg && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {selectedOrg.readOnly ? 'View Organization' : 'Edit Organization'}
            </h2>
            <button
              onClick={() => setSelectedOrg(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <DynamicForm
              formId="organization_edit"
              initialData={selectedOrg}
              onSuccess={handleFormSuccess}
              onCancel={() => setSelectedOrg(null)}
            />
          </div>
        </div>
      )}

      {!showAddForm && !selectedOrg && (
        <DynamicTable
          tableId="organizations_list"
          onRowClick={handleRowClick}
          onActionClick={handleActionClick}
        />
      )}
    </div>
  );
};

export default OrganizationPage;