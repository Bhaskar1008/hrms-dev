import React, { useState, useEffect } from 'react';
import { useApi } from '../../contexts/ApiContext';
import { DashboardWidget as DashboardWidgetType } from '../../contexts/UiContext';
import { Spinner } from '../ui/Spinner';
import { RefreshCw } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardWidgetProps {
  widget: DashboardWidgetType;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({ widget }) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const api = useApi();

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(widget.dataUrl);
      setData(response);
    } catch (err) {
      setError('Failed to load widget data');
      console.error('Error fetching widget data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up refresh interval if specified
    if (widget.refresh) {
      const intervalId = setInterval(fetchData, widget.refresh * 1000);
      return () => clearInterval(intervalId);
    }
  }, [widget.dataUrl, widget.refresh]);

  const renderChart = () => {
    if (!data || !data.chartData) return null;

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
        },
        title: {
          display: false,
        },
      },
    };

    const chartData = data.chartData;

    switch (widget.chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      case 'donut':
        return <Doughnut data={chartData} options={chartOptions} />;
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  const renderList = () => {
    if (!data || !data.items || !Array.isArray(data.items)) return null;

    return (
      <div className="space-y-2">
        {data.items.map((item: any, index: number) => (
          <div key={index} className="p-3 bg-gray-50 rounded-md">
            <div className="flex justify-between">
              <div className="font-medium">{item.title}</div>
              {item.value && <div className="text-gray-600">{item.value}</div>}
            </div>
            {item.description && (
              <div className="text-sm text-gray-500 mt-1">{item.description}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderTable = () => {
    if (!data || !data.headers || !data.rows) return null;

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {data.headers.map((header: string, index: number) => (
                <th
                  key={index}
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.rows.map((row: any[], rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 text-sm text-gray-500">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderStats = () => {
    if (!data || !data.stats) return null;

    return (
      <div className="grid grid-cols-2 gap-4">
        {data.stats.map((stat: any, index: number) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-8">
          <Spinner size="md" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 text-center text-red-500">
          {error}
        </div>
      );
    }

    if (!data) {
      return (
        <div className="p-4 text-center text-gray-500">
          No data available
        </div>
      );
    }

    switch (widget.type) {
      case 'chart':
        return (
          <div className="h-64">
            {renderChart()}
          </div>
        );
      case 'list':
        return renderList();
      case 'table':
        return renderTable();
      case 'stats':
        return renderStats();
      default:
        return <div>Unsupported widget type</div>;
    }
  };

  const widgetSize = {
    small: 'col-span-1',
    medium: 'col-span-2',
    large: 'col-span-3'
  };

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${widgetSize[widget.size]}`}>
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-900">{widget.title}</h3>
        <button
          onClick={fetchData}
          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4 text-gray-400" />
        </button>
      </div>
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
};