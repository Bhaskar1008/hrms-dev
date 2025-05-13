import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import { Spinner } from '../components/ui/Spinner';

// Lazy loaded components
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/settings/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Module pages
const EmployeesPage = lazy(() => import('../pages/employees/EmployeesPage'));
const AttendancePage = lazy(() => import('../pages/attendance/AttendancePage'));
const LeavesPage = lazy(() => import('../pages/leaves/LeavesPage'));
const PayrollPage = lazy(() => import('../pages/payroll/PayrollPage'));
const ProjectsPage = lazy(() => import('../pages/projects/ProjectsPage'));

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermission 
}) => {
  const { isAuthenticated, hasPermission, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Spinner size="lg" />
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          
          {/* Employees module */}
          <Route path="employees" element={
            <ProtectedRoute requiredPermission="employees:read">
              <EmployeesPage />
            </ProtectedRoute>
          } />
          
          {/* Attendance module */}
          <Route path="attendance" element={
            <ProtectedRoute requiredPermission="attendance:read">
              <AttendancePage />
            </ProtectedRoute>
          } />
          
          {/* Leaves module */}
          <Route path="leaves" element={
            <ProtectedRoute requiredPermission="leaves:read">
              <LeavesPage />
            </ProtectedRoute>
          } />
          
          {/* Payroll module */}
          <Route path="payroll" element={
            <ProtectedRoute requiredPermission="payroll:read">
              <PayrollPage />
            </ProtectedRoute>
          } />
          
          {/* Projects module */}
          <Route path="projects" element={
            <ProtectedRoute requiredPermission="projects:read">
              <ProjectsPage />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;