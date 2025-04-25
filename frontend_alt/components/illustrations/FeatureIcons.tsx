import { motion } from 'framer-motion';
import { useTheme } from '../../../utils/theme';

interface IconProps {
  className?: string;
}

export function RouteMapIcon({ className = '' }: IconProps) {
  const { isDarkMode } = useTheme();
  const color = isDarkMode ? 'var(--primary-400)' : 'var(--primary-600)';

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.1" />

      {/* Route line */}
      <motion.path
        d="M20,50 Q50,20 80,50 T140,50"
        stroke={color}
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Waypoints */}
      {[20, 50, 80].map((x, index) => (
        <motion.circle
          key={index}
          cx={x}
          cy="50"
          r="4"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </svg>
  );
}

export function PredictionIcon({ className = '' }: IconProps) {
  const { isDarkMode } = useTheme();
  const color = isDarkMode ? 'var(--accent-400)' : 'var(--accent-600)';

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background */}
      <rect x="10" y="10" width="80" height="80" rx="10" fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.1" />

      {/* Grid lines */}
      {[25, 50, 75].map((y) => (
        <line key={y} x1="20" y1={y} x2="80" y2={y} stroke={color} strokeWidth="1" strokeOpacity="0.1" />
      ))}

      {/* Data points */}
      <motion.path
        d="M20,70 L35,60 L50,40 L65,30 L80,20"
        stroke={color}
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Forecast zone */}
      <motion.path
        d="M65,30 L80,20 L80,40 L65,50 Z"
        fill={color}
        fillOpacity="0.2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />
    </svg>
  );
}

export function CollaborationIcon({ className = '' }: IconProps) {
  const { isDarkMode } = useTheme();
  const color = isDarkMode ? 'var(--primary-400)' : 'var(--primary-600)';

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Center node */}
      <motion.circle
        cx="50"
        cy="50"
        r="15"
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* User nodes */}
      {[
        { x: 20, y: 20 },
        { x: 80, y: 20 },
        { x: 20, y: 80 },
        { x: 80, y: 80 },
      ].map((pos, index) => (
        <motion.g key={index}>
          <motion.circle
            cx={pos.x}
            cy={pos.y}
            r="8"
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.line
            x1="50"
            y1="50"
            x2={pos.x}
            y2={pos.y}
            stroke={color}
            strokeWidth="2"
            strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              delay: index * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.g>
      ))}
    </svg>
  );
} 