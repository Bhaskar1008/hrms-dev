import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUi } from '../../contexts/UiContext';
import { DashboardWidget as DashboardWidgetType } from '../../contexts/UiContext';
import { DashboardWidget } from '../../components/dashboard/DashboardWidget';
import { Spinner } from '../../components/ui/Spinner';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getDashboardConfig, showToast } = useUi();
  const [widgets, setWidgets] = useState<DashboardWidgetType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardConfig = async () => {
      try {
        if (!user?.role) return;
        
        const dashboardWidgets = await getDashboardConfig(user.role);
        setWidgets(dashboardWidgets);
      } catch (error) {
        console.error('Failed to load dashboard config:', error);
        showToast('Failed to load dashboard', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardConfig();
  }, [user?.role, getDashboardConfig, showToast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (widgets.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <h2 className="text-xl font-medium text-gray-900 mb-2">Welcome to your dashboard</h2>
        <p className="text-gray-500">No dashboard widgets are configured for your role.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget) => (
          <DashboardWidget key={widget.id} widget={widget} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;