import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import api from '../services/api';

interface Permission {
  module: string;
  actions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
}

interface Role {
  _id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;
  isSystem: boolean;
}

interface RoleContextType {
  roles: Role[];
  loading: boolean;
  error: string | null;
  fetchRoles: () => Promise<void>;
  createRole: (role: Omit<Role, '_id'>) => Promise<void>;
  updateRole: (id: string, role: Partial<Role>) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  hasPermission: (module: string, action: keyof Permission['actions']) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  const fetchRoles = useCallback(async () => {
    // Skip if already loading or initialized
    if (loading || initialized.current) return;

    try {
      setLoading(true);
      const response = await api.get('/roles');
      setRoles(response.data);
      setError(null);
      initialized.current = true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const createRole = async (role: Omit<Role, '_id'>) => {
    try {
      const response = await api.post('/roles', role);
      setRoles(prevRoles => [...prevRoles, response.data]);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create role');
    }
  };

  const updateRole = async (id: string, role: Partial<Role>) => {
    try {
      const response = await api.patch(`/roles/${id}`, role);
      setRoles(prevRoles => prevRoles.map(r => r._id === id ? response.data : r));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update role');
    }
  };

  const deleteRole = async (id: string) => {
    try {
      await api.delete(`/roles/${id}`);
      setRoles(prevRoles => prevRoles.filter(r => r._id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete role');
    }
  };

  const hasPermission = useCallback((module: string, action: keyof Permission['actions']) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role === 'admin') return true;

    const role = roles.find(r => r.name === user.role);
    if (!role) return false;

    const permission = role.permissions.find(p => p.module === module);
    return permission ? permission.actions[action] : false;
  }, [roles]);

  useEffect(() => {
    // Only fetch roles if we have a valid token
    const token = localStorage.getItem('token');
    if (token && !initialized.current) {
      fetchRoles();
    }

    return () => {
      // Cleanup
      initialized.current = false;
    };
  }, [fetchRoles]);

  return (
    <RoleContext.Provider value={{
      roles,
      loading,
      error,
      fetchRoles,
      createRole,
      updateRole,
      deleteRole,
      hasPermission,
    }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
