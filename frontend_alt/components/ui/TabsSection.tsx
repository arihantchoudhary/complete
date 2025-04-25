import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../../utils/theme';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsSectionProps {
  tabs: Tab[];
  className?: string;
}

export default function TabsSection({ tabs, className = '' }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { isDarkMode } = useTheme();

  return (
    <div className={`w-full ${className}`}>
      {/* Tab buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? 'text-dark-300 hover:text-dark-100'
                : 'text-dark-600 hover:text-dark-900'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  isDarkMode ? 'bg-primary-400' : 'bg-primary-600'
                }`}
                layoutId="activeTab"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl p-6 ${
              isDarkMode ? 'bg-dark-800' : 'bg-white'
            } shadow-lg`}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 