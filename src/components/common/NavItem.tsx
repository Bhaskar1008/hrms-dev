import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  isActive?: boolean;
  onClick?: () => void;
  isExpanded?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  path,
  isActive = false,
  onClick,
  isExpanded = true
}) => {
  const baseClasses = 'flex items-center text-sm px-3 py-2 rounded-md transition-colors duration-150 ease-in-out';
  const activeClasses = isActive 
    ? 'bg-blue-800 text-white' 
    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900';
  
  return (
    <Link
      to={path}
      className={`${baseClasses} ${activeClasses} group`}
      onClick={onClick}
    >
      <span className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-900'}`}>
        {icon}
      </span>
      {isExpanded && <span className="ml-3">{title}</span>}
    </Link>
  );
};

export default NavItem;