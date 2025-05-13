import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, ChevronDown, LogOut, Settings, User as UserIcon, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUi } from '../../contexts/UiContext';
import SideNav from './SideNav';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { getNavigationConfig } = useUi();
  const [navigation, setNavigation] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role) {
      getNavigationConfig(user.role)
        .then(navConfig => setNavigation(navConfig))
        .catch(err => console.error('Failed to load navigation:', err));
    }
  }, [user?.role, getNavigationConfig]);

  // Mock notification data - would come from API in real implementation
  useEffect(() => {
    setNotifications([
      { id: '1', title: 'New leave request', message: 'John Doe has requested leave approval', time: '5 min ago', read: false },
      { id: '2', title: 'Payroll processed', message: 'May 2025 payroll has been processed', time: '1 hour ago', read: false },
      { id: '3', title: 'System update', message: 'HRMS will undergo maintenance tonight', time: '1 day ago', read: true },
    ]);
  }, []);

  if (!user || !navigation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <SideNav 
        navigation={navigation} 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  type="button"
                  className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-bold text-primary ml-2 lg:ml-0">HR<span className="text-secondary">MS</span></h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                  >
                    <Bell className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                    )}
                  </button>
                  
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="px-4 py-2 text-sm text-gray-500">No notifications</p>
                        ) : (
                          notifications.map(notification => (
                            <div 
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-gray-50 transition-colors ${notification.read ? '' : 'bg-blue-50'}`}
                            >
                              <div className="flex justify-between">
                                <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                <p className="text-xs text-gray-500">{notification.time}</p>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-200">
                        <button className="text-sm font-medium text-primary hover:text-primary-dark">
                          View all
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User menu */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-sm text-gray-700 focus:outline-none"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                      ) : (
                        <span className="font-medium">{user.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="hidden md:block font-medium">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate('/profile');
                        }}
                      >
                        <UserIcon className="h-4 w-4 mr-2" />
                        Profile
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setUserMenuOpen(false);
                          navigate('/settings');
                        }}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </button>
                      <button
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={logout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;