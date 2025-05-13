import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          {/* Settings sections will be implemented here */}
          <div className="border-b pb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
            <p className="text-gray-500">Settings page is under construction.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;