import React from 'react';
import { 
  HomeIcon, 
  UsersIcon, 
  ClockIcon, 
  CalendarDaysIcon,
  CircleDollarSignIcon,
  BarChart3Icon, 
  Settings, 
  LogOutIcon
} from 'lucide-react';
import NavItem from './NavItem';
import { User } from '../../types';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  currentUser: User;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, isMobile = false }) => {
  const location = useLocation();
  
  const navItems = [
    {
      title: 'Dashboard',
      path: '/',
      icon: <HomeIcon className="h-5 w-5" />
    },
    {
      title: 'Employee Management',
      path: '/employee-management',
      icon: <UsersIcon className="h-5 w-5" />
    },
    {
      title: 'Attendance',
      path: '/attendance-management',
      icon: <ClockIcon className="h-5 w-5" />
    },
    {
      title: 'Leave Management',
      path: '/leave-management',
      icon: <CalendarDaysIcon className="h-5 w-5" />
    },
    {
      title: 'Payroll',
      path: '/payroll-management',
      icon: <CircleDollarSignIcon className="h-5 w-5" />
    },
    {
      title: 'Performance',
      path: '/performance-management',
      icon: <BarChart3Icon className="h-5 w-5" />
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];
  
  return (
    <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-800">
        <h1 className="text-xl font-bold text-white">HRMS</h1>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="px-3 mt-6 relative inline-block text-left">
          <div className="group w-full bg-gray-100 rounded-md px-3.5 py-2 flex items-center justify-between text-sm text-left font-medium text-gray-700 hover:bg-gray-200">
            <span className="flex items-center space-x-3 truncate">
              <img
                className="w-8 h-8 rounded-full"
                src={currentUser.avatar || "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                alt=""
              />
              <span className="truncate">
                <span className="text-sm font-medium text-gray-900">{currentUser.name}</span>
                <span className="text-xs font-medium text-gray-500 block capitalize">{currentUser.role}</span>
              </span>
            </span>
          </div>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              title={item.title}
              path={item.path}
              icon={item.icon}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button className="flex-shrink-0 group block w-full flex items-center text-left">
            <div className="flex items-center">
              <div>
                <LogOutIcon className="inline-block h-5 w-5 text-gray-500 group-hover:text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Logout
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;