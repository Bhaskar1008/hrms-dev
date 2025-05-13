import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 10);
    
    // Auto dismiss
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Wait for animation to complete
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const baseClasses = 'max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto overflow-hidden transform transition-all duration-300 ease-in-out flex';
  const visibilityClasses = isVisible 
    ? 'translate-y-0 opacity-100' 
    : 'translate-y-2 opacity-0';
  
  const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  };

  const borderColors = {
    success: 'border-l-4 border-green-500',
    error: 'border-l-4 border-red-500',
    warning: 'border-l-4 border-amber-500',
    info: 'border-l-4 border-blue-500'
  };

  return (
    <div className={`${baseClasses} ${visibilityClasses} ${borderColors[type]}`}>
      <div className="flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {iconMap[type]}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm text-gray-800">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
          }}
          className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Ideally this would use a global state management system
  // For demo, we'll use a custom event
  useEffect(() => {
    const handleToast = (e: CustomEvent) => {
      const { message, type } = e.detail;
      const id = Date.now().toString();
      setToasts(prev => [...prev, { id, message, type, onClose: handleClose }]);
    };

    const customEventListener = (e: Event) => {
      handleToast(e as CustomEvent);
    };

    window.addEventListener('toast', customEventListener);
    
    return () => {
      window.removeEventListener('toast', customEventListener);
    };
  }, []);

  const handleClose = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-0 right-0 p-4 max-h-screen overflow-hidden flex flex-col gap-2 z-50 pointer-events-none">
      <div className="flex flex-col gap-2 items-end pointer-events-auto">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </div>
  );
};