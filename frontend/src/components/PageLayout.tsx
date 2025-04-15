import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out 
                  ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                  bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              LogiTrade
            </div>
          </div>
          
          {/* Nav items */}
          <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            <Link to="/" className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="mr-2">🌍</span>
              <span>Route Analysis</span>
            </Link>
            <Link to="/supply-chain-disruptions" className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="mr-2">🚚</span>
              <span>Supply Chain Disruptions</span>
            </Link>
            <Link to="/economic-impact" className="flex items-center w-full px-3 py-2.5 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span className="mr-2">💵</span>
              <span>Economic Impact</span>
            </Link>
          </div>
          
          {/* User info */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
                LT
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  Trade Analyst
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Pro Account
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-4 text-lg font-semibold">LogiTrade</div>
        </header>
        
        {/* Page content */}
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
