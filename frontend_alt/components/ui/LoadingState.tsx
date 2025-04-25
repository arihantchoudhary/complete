import { motion } from 'framer-motion';
import { useTheme } from '../../../utils/theme';

interface LoadingStateProps {
  type?: 'map' | 'chart' | 'image';
  className?: string;
}

export default function LoadingState({ type = 'image', className = '' }: LoadingStateProps) {
  const { isDarkMode } = useTheme();

  const getSkeleton = () => {
    switch (type) {
      case 'map':
        return (
          <div className="relative aspect-square w-full">
            <div className={`absolute inset-0 ${
              isDarkMode ? 'bg-dark-700' : 'bg-dark-100'
            } rounded-xl`} />
            <motion.div
              className={`absolute inset-0 ${
                isDarkMode ? 'bg-dark-600' : 'bg-dark-200'
              } rounded-xl`}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        );
      case 'chart':
        return (
          <div className="space-y-4">
            <div className={`h-4 w-1/3 ${
              isDarkMode ? 'bg-dark-700' : 'bg-dark-100'
            } rounded`} />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className={`h-8 ${
                    isDarkMode ? 'bg-dark-700' : 'bg-dark-100'
                  } rounded`}
                  style={{ width: `${Math.random() * 40 + 60}%` }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="relative aspect-video w-full">
            <div className={`absolute inset-0 ${
              isDarkMode ? 'bg-dark-700' : 'bg-dark-100'
            } rounded-xl`} />
            <motion.div
              className={`absolute inset-0 ${
                isDarkMode ? 'bg-dark-600' : 'bg-dark-200'
              } rounded-xl`}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className={`${className}`}>
      {getSkeleton()}
    </div>
  );
} 