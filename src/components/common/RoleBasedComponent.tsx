import React from 'react';
import { useRole } from '../../context/RoleContext';

interface RoleBasedComponentProps {
  module: string;
  action: 'create' | 'read' | 'update' | 'delete';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  module,
  action,
  children,
  fallback = null,
}) => {
  const { hasPermission } = useRole();

  if (!hasPermission(module, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleBasedComponent;