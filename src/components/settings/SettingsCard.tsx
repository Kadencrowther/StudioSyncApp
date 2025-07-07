import React, { ReactNode } from 'react';

interface SettingsCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  icon,
  onClick,
  children,
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 
        ${onClick ? 'cursor-pointer hover:border-brand-500 transition-colors duration-200' : ''}`}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default SettingsCard; 