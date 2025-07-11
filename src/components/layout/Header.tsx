import React from "react";

const Header: React.FC = () => (
  <header className="bg-white shadow flex items-center justify-between px-6 py-4">
    <div className="flex items-center gap-4">
      <img
        src="/assets/StudioSyncTransparent.svg"
        alt="Studio Sync Logo"
        className="h-10 w-auto"
      />
      <span className="text-xl font-bold text-cyan-500">Studio Sync</span>
    </div>
    <nav className="flex items-center gap-6">
      <a
        href="/dashboard"
        className="text-gray-700 hover:text-cyan-500 font-medium"
      >
        Dashboard
      </a>
      <a
        href="/settings"
        className="text-gray-700 hover:text-cyan-500 font-medium"
      >
        Settings
      </a>
      <a
        href="/logout"
        className="text-gray-700 hover:text-cyan-500 font-medium"
      >
        Logout
      </a>
      <div className="user-avatar bg-cyan-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
        VS
      </div>
    </nav>
  </header>
);

export default Header;
