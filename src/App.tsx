import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import EmployeeManagement from './pages/EmployeeManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import LeaveManagement from './pages/LeaveManagement';
import PayrollManagement from './pages/PayrollManagement';
import PerformanceManagement from './pages/PerformanceManagement';

function App() {
  // In a real application, you would check if user is authenticated
  const isAuthenticated = true;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/employee-management" 
          element={isAuthenticated ? <EmployeeManagement /> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/attendance-management" 
          element={isAuthenticated ? <AttendanceManagement /> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/leave-management" 
          element={isAuthenticated ? <LeaveManagement /> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/payroll-management" 
          element={isAuthenticated ? <PayrollManagement /> : <Navigate to="/login" />} 
        />
        
        <Route 
          path="/performance-management" 
          element={isAuthenticated ? <PerformanceManagement /> : <Navigate to="/login" />} 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;