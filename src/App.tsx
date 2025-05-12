import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RoleManagement from './pages/RoleManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import LeaveManagement from './pages/LeaveManagement';
import PayrollManagement from './pages/PayrollManagement';
import PerformanceManagement from './pages/PerformanceManagement';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/roles" element={<PrivateRoute element={<RoleManagement />} />} />
            <Route path="/employee-management" element={<PrivateRoute element={<EmployeeManagement />} />} />
            <Route path="/attendance-management" element={<PrivateRoute element={<AttendanceManagement />} />} />
            <Route path="/leave-management" element={<PrivateRoute element={<LeaveManagement />} />} />
            <Route path="/payroll-management" element={<PrivateRoute element={<PayrollManagement />} />} />
            <Route path="/performance-management" element={<PrivateRoute element={<PerformanceManagement />} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;