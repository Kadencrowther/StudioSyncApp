import { useSidebar } from "../context/SidebarContext";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import NotificationDropdown from "../components/header/NotificationDropdown";
import UserDropdown from "../components/header/UserDropdown";
import Logo from "../components/Logo";

const AppHeader: React.FC = () => {
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <div className="sticky top-0 z-[9999] flex flex-col bg-white dark:bg-gray-900">
      {/* Mobile Logo Section */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800 lg:hidden">
        <Logo isMinimized={false} />
      </div>

      {/* Main Header */}
      <header className="flex h-[80px] w-full border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between w-full px-4">
          {/* Left section with hamburger */}
          <div className="flex items-center">
            <button
              onClick={handleToggle}
              className="flex items-center justify-center w-11 h-11 text-gray-500 border border-gray-200 rounded-lg dark:border-gray-800 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              aria-label="Toggle Sidebar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </button>
          </div>

          {/* Right section with controls */}
          <div className="flex items-center gap-4">
            <ThemeToggleButton />
            <NotificationDropdown />
            <UserDropdown />
          </div>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;
