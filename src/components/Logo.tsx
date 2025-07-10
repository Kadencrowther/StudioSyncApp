import React from 'react';
import { useTheme } from '../context/ThemeContext';

export interface LogoProps {
  isMinimized: boolean;
  isDarkMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isMinimized = false }) => {
  const { theme } = useTheme();
  const textColor = 'text-[#3DCED7]'; // Always use turquoise color
  const logoSrc = theme === 'dark' 
    ? "/images/logo/studio-sync-app-logo-dark.png"
    : "/images/logo/studio-sync-app-logo.png";
  
  if (isMinimized) {
    return (
      <div className="flex items-center justify-center">
        <img 
          src={logoSrc}
          alt="Studio Sync"
          className="w-8 h-8"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <img 
        src={logoSrc}
        alt="Studio Sync"
        className="w-8 h-8"
      />
      <div className="flex items-center">
        <span className={`text-2xl font-bold ${textColor}`}>
          Studio
        </span>
        <span className={`text-2xl font-bold ${textColor} ml-2`}>
          Sync
        </span>
      </div>
    </div>
  );
};

export default Logo; 