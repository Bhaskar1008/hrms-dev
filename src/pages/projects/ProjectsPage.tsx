import React, { useState } from 'react';
import { DynamicTable } from '../../components/common/DynamicTable';
import { DynamicForm } from '../../components/common/DynamicForm';
import { Button } from '../../components/ui/Button';
import { Plus, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUi } from '../../contexts/UiContext';

const ProjectsPage: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { hasPermission } = useAuth();
  const { showToast } = useUi();
  
  const canCreate = hasPermission('projects:create');
  const canUpdate = hasPermission('projects:update');

  const handleRowClick = (project: any) => {
    if (canUpdate) {
      setSelectedProject(project);
    }
  };

  const handleActionClick = (action: string, project: any) => {
    if (action === 'edit' && canUpdate) {
      setSelectedProject(project);
    } else if (action === 'view') {
      setSelectedProject({ ...project, readOnly: true });
    }
  };

  const handleFormSuccess = () => {
    showToast('Project saved successfully', 'success');
    setShowAddForm(false);
    setSelectedProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        {canCreate && !showAddForm && !selectedProject && (
          <Button
            onClick={() => setShowAddForm(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add Project
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Add New Project</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <DynamicForm
              formId="project_create"
              onSuccess={handleFormSuccess}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {selectedProject.readOnly ? 'View Project' : 'Edit Project'}
            </h2>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            <DynamicForm
              formId="project_edit"
              initialData={selectedProject}
              onSuccess={handleFormSuccess}
              onCancel={() => setSelectedProject(null)}
            />
          </div>
        </div>
      )}

      {!showAddForm && !selectedProject && (
        <DynamicTable
          tableId="projects_list"
          onRowClick={handleRowClick}
          onActionClick={handleActionClick}
        />
      )}
    </div>
  );
};

export default ProjectsPage;