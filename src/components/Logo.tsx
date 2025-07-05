import React from 'react';

interface LogoProps {
  isMinimized?: boolean;
  isDarkMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ isMinimized = false }) => {
  const textColor = 'text-[#3DCED7]'; // Always use turquoise color
  
  if (isMinimized) {
    return (
      <div className="flex items-center justify-center">
        <img 
          src="/images/logo/studio-sync-app-logo.png" 
          alt="Studio Sync"
          className="w-8 h-8"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <img 
        src="/images/logo/studio-sync-app-logo.png" 
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