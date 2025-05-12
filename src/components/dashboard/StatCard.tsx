import React from 'react';
import Card from '../common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  isPositive = true,
  subtitle,
  className = ''
}) => {
  return (
    <Card className={`${className}`}>
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-800">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-lg font-semibold text-gray-900">{value}</div>
            </dd>
            {(change || subtitle) && (
              <dd className="flex items-center text-sm">
                {change && (
                  <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '↑' : '↓'} {change}
                  </span>
                )}
                {subtitle && (
                  <span className="text-gray-500 ml-2">{subtitle}</span>
                )}
              </dd>
            )}
          </dl>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;