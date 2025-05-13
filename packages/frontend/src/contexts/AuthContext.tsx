import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from './ApiContext';
import { useNavigate } from 'react-router-dom';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'hr' | 'employee';
  permissions: string[];
  organizationId?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('hrms_token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // This would be a real API call in production
        const userData = await api.get('/auth/me');
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('hrms_token');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [api]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be a real API call in production
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('hrms_token', response.token);
      setUser(response.user);
      navigate('/dashboard');
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('hrms_token');
    setUser(null);
    navigate('/login');
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;
    
    // Super admins have all permissions
    if (user.role === 'super_admin') return true;
    
    return user.permissions.includes(permission);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};