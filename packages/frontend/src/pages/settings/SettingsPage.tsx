import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApi } from '../../contexts/ApiContext';
import { useUi } from '../../contexts/UiContext';
import { Button } from '../../components/ui/Button';
import { Spinner } from '../../components/ui/Spinner';
import { Lock, Bell, Shield, Building } from 'lucide-react';

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('security');
  const [settings, setSettings] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const api = useApi();
  const { showToast } = useUi();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/api/settings', {
          organizationId: user?.organizationId
        });
        setSettings(response);
        setIsLoading(false);
      } catch (error) {
        showToast('Failed to load settings', 'error');
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [api, user?.organizationId, showToast]);

  const handleSettingChange = async (section: string, key: string, value: any) => {
    try {
      setIsSaving(true);
      await api.put('/api/settings', {
        organizationId: user?.organizationId,
        section,
        key,
        value
      });
      
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
      
      showToast('Settings updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const sections: SettingsSection[] = [
    {
      id: 'security',
      title: 'Security Settings',
      description: 'Manage your security preferences and authentication settings',
      icon: <Shield className="h-5 w-5" />,
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={settings?.security?.twoFactorEnabled || false}
                onChange={(e) => handleSettingChange('security', 'twoFactorEnabled', e.target.checked)}
                disabled={isSaving}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Session Timeout</h3>
              <p className="text-sm text-gray-500">Automatically log out after period of inactivity</p>
            </div>
            <select
              className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={settings?.security?.sessionTimeout || '30'}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
              disabled={isSaving}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      description: 'Configure how you want to receive notifications',
      icon: <Bell className="h-5 w-5" />,
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
              <p className="text-sm text-gray-500">Receive notifications via email</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={settings?.notifications?.emailEnabled || false}
                onChange={(e) => handleSettingChange('notifications', 'emailEnabled', e.target.checked)}
                disabled={isSaving}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={settings?.notifications?.pushEnabled || false}
                onChange={(e) => handleSettingChange('notifications', 'pushEnabled', e.target.checked)}
                disabled={isSaving}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'organization',
      title: 'Organization Settings',
      description: 'Manage your organization preferences',
      icon: <Building className="h-5 w-5" />,
      component: (
        <div className="space-y-4">
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
              Default Timezone
            </label>
            <select
              id="timezone"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={settings?.organization?.timezone || 'UTC'}
              onChange={(e) => handleSettingChange('organization', 'timezone', e.target.value)}
              disabled={isSaving}
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>

          <div>
            <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
              Date Format
            </label>
            <select
              id="dateFormat"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              value={settings?.organization?.dateFormat || 'MM/DD/YYYY'}
              onChange={(e) => handleSettingChange('organization', 'dateFormat', e.target.value)}
              disabled={isSaving}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-12 divide-x divide-gray-200">
          <div className="col-span-3 p-6">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-md ${
                    activeSection === section.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {section.icon}
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="col-span-9 p-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className={activeSection === section.id ? 'block' : 'hidden'}
              >
                <h2 className="text-lg font-medium text-gray-900 mb-1">{section.title}</h2>
                <p className="text-sm text-gray-500 mb-6">{section.description}</p>
                {section.component}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;