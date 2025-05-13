import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import { UiProvider } from './contexts/UiContext';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <Router>
      <ApiProvider>
        <AuthProvider>
          <UiProvider>
            <AppRoutes />
            <Toaster />
          </UiProvider>
        </AuthProvider>
      </ApiProvider>
    </Router>
  );
}

export default App;