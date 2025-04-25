import { motion } from 'framer-motion';
import { useTheme } from '../../../utils/theme';

interface IconProps {
  className?: string;
}

export function ConnectIcon({ className = '' }: IconProps) {
  const { isDarkMode } = useTheme();
  const color = isDarkMode ? 'var(--primary-400)' : 'var(--primary-600)';

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background */}
      <rect x="10" y="10" width="80" height="80" rx="10" fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.1" />

      {/* API endpoints */}
      {[30, 50, 70].map((y, index) => (
        <motion.g key={index}>
          <motion.rect
            x="20"
            y={y - 5}
            width="60"
            height="10"
            rx="5"
            fill={color}
            fillOpacity="0.2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.line
            x1="20"
            y1={y}
            x2="80"
            y2={y}
            stroke={color}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              delay: index * 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.g>
      ))}
    </svg>
  );
}

export function AnalyzeIcon({ className = '' }: IconProps) {
  const { isDarkMode } = useTheme();
  const color = isDarkMode ? 'var(--accent-400)' : 'var(--accent-600)';

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background */}
      <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="2" strokeOpacity="0.1" />

      {/* Data processing visualization */}
      <motion.path
        d="M30,50 L50,30 L70,50 L50,70 Z"
        stroke={color}
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Animated dots */}
      {[
        { x: 30, y: 50 },
        { x: 50, y: 30 },
        { x: 70, y: 50 },
        { x: 50, y: 70 },
      ].map((pos, index) => (
        <motion.circle
          key={index}
          cx={pos.x}
          cy={pos.y}
          r="3"
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
      ))}
    </svg>
  );
}

export function ScoreIcon({ className = '' }: IconProps) {
  const { isDarkMode } = useTheme();
  const color = isDarkMode ? 'var(--primary-400)' : 'var(--primary-600)';

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Gauge background */}
      <path
        d="M20,50 A30,30 0 1,1 80,50"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.1"
      />

      {/* Gauge segments */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M20,50 A30,30 0 0,1 ${20 + i * 30},50`}
          fill="none"
          stroke={color}
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Needle */}
      <motion.line
        x1="50"
        y1="50"
        x2="70"
        y2="30"
        stroke={color}
        strokeWidth="2"
        initial={{ rotate: -45 }}
        animate={{ rotate: 45 }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        transform-origin="50 50"
      />
    </svg>
  );
}

export function ActionIcon({ className = '' }: IconProps) {
  const { isDarkMode } = useTheme();
  const color = isDarkMode ? 'var(--accent-400)' : 'var(--accent-600)';

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Checkmark */}
      <motion.path
        d="M30,50 L45,65 L70,35"
        stroke={color}
        strokeWidth="4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Circle */}
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </svg>
  );
} 