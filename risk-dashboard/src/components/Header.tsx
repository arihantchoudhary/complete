
import React from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 lg:hidden hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Title (hidden on mobile) */}
            <h1 className="hidden sm:block text-xl font-semibold text-gray-900 dark:text-gray-100 ml-2 lg:ml-0">
              Trade Route Analysis
            </h1>
          </div>
          
          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Stats */}
            <div className="hidden md:flex space-x-4 mr-4">
              <div className="text-sm">
                <span className="block text-gray-500 dark:text-gray-400">Routes Analyzed</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">7,052</span>
              </div>
              <div className="text-sm">
                <span className="block text-gray-500 dark:text-gray-400">Risk Assessments</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">2,341</span>
              </div>
            </div>
            
            {/* Notification button */}
            <button className="inline-flex items-center justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
              <Bell className="h-5 w-5" />
            </button>
            
            {/* Dark mode toggle */}
            <button 
              onClick={toggleDarkMode}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {isDarkMode ? 
                <Sun className="h-5 w-5" /> : 
                <Moon className="h-5 w-5" />
              }
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
