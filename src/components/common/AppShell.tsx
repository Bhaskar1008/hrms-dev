import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { User } from '../../types';
import { BellIcon, MenuIcon, XIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AppShellProps {
  children: React.ReactNode;
  currentUser: User;
}

const AppShell: React.FC<AppShellProps> = ({ children, currentUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Mobile sidebar */}
      <div
        className={`${
          sidebarOpen ? 'fixed inset-0 z-40 flex' : 'hidden'
        } lg:hidden`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <Sidebar currentUser={currentUser} isMobile={true} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <Sidebar currentUser={currentUser} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">HRMS Portal</h1>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notification dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" />
                </button>
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
                
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <Link
                        to="/notifications"
                        className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                          </div>
                          <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">Leave Approved</p>
                            <p className="text-sm text-gray-500">Your leave request has been approved</p>
                            <p className="mt-1 text-xs text-gray-400">1 hour ago</p>
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/notifications"
                        className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <span className="inline-block h-2 w-2 rounded-full bg-red-500"></span>
                          </div>
                          <div className="ml-3 w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">Attendance Alert</p>
                            <p className="text-sm text-gray-500">You were marked late yesterday</p>
                            <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="px-4 py-2 text-center border-t border-gray-100">
                      <Link
                        to="/notifications"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        onClick={() => setNotificationsOpen(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={currentUser.avatar || "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                      alt={currentUser.name}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;