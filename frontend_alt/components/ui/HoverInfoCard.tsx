import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../../utils/theme';

interface HoverInfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function HoverInfoCard({
  title,
  description,
  icon,
  className = '',
}: HoverInfoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl p-6 ${
        isDarkMode ? 'bg-dark-800' : 'bg-white'
      } shadow-lg transition-all duration-300 ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Main content */}
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className={`text-lg font-semibold ${
            isDarkMode ? 'text-dark-100' : 'text-dark-900'
          }`}>
            {title}
          </h3>
          <motion.p
            className={`mt-2 text-sm ${
              isDarkMode ? 'text-dark-400' : 'text-dark-600'
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Hover indicator */}
      <motion.div
        className={`absolute inset-0 rounded-xl ${
          isDarkMode ? 'bg-primary-900/10' : 'bg-primary-100/50'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner accent */}
      <motion.div
        className={`absolute top-0 right-0 w-16 h-16 rounded-tr-xl ${
          isDarkMode ? 'bg-primary-900/20' : 'bg-primary-100/50'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.div>
  );
} 