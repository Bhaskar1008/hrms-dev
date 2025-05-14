import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';

interface NavigationItem {
  name: string;
  icon?: React.ComponentType<any>;
  href?: string;
  children?: NavigationItem[];
}

interface SideNavProps {
  navigation: NavigationItem[];
  isOpen: boolean;
  onClose: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ navigation, isOpen, onClose }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    // Find which submenu should be open based on current path
    const currentPath = location.pathname;
    
    navigation.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          child => child.href && currentPath.startsWith(child.href)
        );
        
        if (hasActiveChild) {
          setOpenSubmenu(item.name);
        }
      }
    });
  }, [location.pathname, navigation]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(prev => (prev === name ? null : name));
  };

  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary">HR<span className="text-secondary">MS</span></span>
        </div>
        <button 
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <nav className="mt-4 px-2 space-y-1 overflow-y-auto" style={{ height: 'calc(100vh - 4rem)' }}>
        {navigation.map((item) => {
          if (item.children) {
            const isOpen = openSubmenu === item.name;
            const hasActiveChild = item.children.some(child => 
              child.href && isActiveLink(child.href)
            );
            
            return (
              <div key={item.name} className="space-y-1">
                <button
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    hasActiveChild
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => toggleSubmenu(item.name)}
                >
                  <div className="flex items-center">
                    {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                    {item.name}
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transform transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {isOpen && (
                  <div className="pl-8 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        to={child.href || '#'}
                        className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          child.href && isActiveLink(child.href)
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={onClose}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          
          return (
            <Link
              key={item.name}
              to={item.href || '#'}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                item.href && isActiveLink(item.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={onClose}
            >
              {item.icon && <item.icon className="h-5 w-5 mr-3" />}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SideNav;