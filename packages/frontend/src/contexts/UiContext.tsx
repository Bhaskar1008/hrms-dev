import React, { createContext, useContext, useState } from 'react';
import { useApi } from './ApiContext';

// Defines the structure of each UI component configuration
export interface UiComponent {
  id: string;
  type: string;
  label?: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
  required?: boolean;
  validation?: {
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
  defaultValue?: any;
  [key: string]: any;
}

// Defines structure for a dynamic form
export interface DynamicForm {
  id: string;
  title: string;
  description?: string;
  submitUrl: string;
  method: 'POST' | 'PUT';
  fields: UiComponent[];
}

// Defines structure for a dynamic table
export interface DynamicTable {
  id: string;
  title: string;
  fetchUrl: string;
  columns: {
    key: string;
    header: string;
    type: 'text' | 'date' | 'status' | 'actions';
    format?: string;
    actions?: { label: string; action: string; icon?: string }[];
  }[];
  filters?: UiComponent[];
  pagination?: {
    pageSize: number;
    pageSizeOptions: number[];
  };
}

// Defines structure for a dashboard widget
export interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'table' | 'list';
  title: string;
  dataUrl: string;
  size: 'small' | 'medium' | 'large';
  chartType?: 'bar' | 'line' | 'pie' | 'donut';
  refresh?: number; // refresh interval in seconds
  [key: string]: any;
}

interface UiContextType {
  getFormConfig: (formId: string) => Promise<DynamicForm>;
  getTableConfig: (tableId: string) => Promise<DynamicTable>;
  getDashboardConfig: (role: string) => Promise<DashboardWidget[]>;
  getNavigationConfig: (role: string) => Promise<any>;
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface UiContextState {
  toasts: Toast[];
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const useUi = () => {
  const context = useContext(UiContext);
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
};

export const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = useApi();
  const [state, setState] = useState<UiContextState>({
    toasts: [],
  });

  const getFormConfig = async (formId: string): Promise<DynamicForm> => {
    return api.get(`/ui/forms/${formId}`);
  };

  const getTableConfig = async (tableId: string): Promise<DynamicTable> => {
    return api.get(`/ui/tables/${tableId}`);
  };

  const getDashboardConfig = async (role: string): Promise<DashboardWidget[]> => {
    return api.get(`/ui/dashboard`, { role });
  };

  const getNavigationConfig = async (role: string) => {
    return api.get(`/ui/navigation`, { role });
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    const id = Date.now().toString();
    setState(prev => ({
      ...prev,
      toasts: [...prev.toasts, { id, message, type }],
    }));

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        toasts: prev.toasts.filter(toast => toast.id !== id),
      }));
    }, 5000);
  };

  const value = {
    getFormConfig,
    getTableConfig,
    getDashboardConfig,
    getNavigationConfig,
    showToast,
  };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};