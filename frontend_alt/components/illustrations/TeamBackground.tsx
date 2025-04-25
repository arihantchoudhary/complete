import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../../../utils/theme';

interface Dot {
  id: string;
  x: number;
  y: number;
  size: number;
}

const dots: Dot[] = Array.from({ length: 50 }, (_, i) => ({
  id: `dot-${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
}));

const connections = Array.from({ length: 30 }, (_, i) => ({
  id: `conn-${i}`,
  from: dots[Math.floor(Math.random() * dots.length)],
  to: dots[Math.floor(Math.random() * dots.length)],
}));

export default function TeamBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const { isDarkMode } = useTheme();

  const color = isDarkMode ? 'var(--primary-400)' : 'var(--primary-600)';

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ opacity, scale }}
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDarkMode ? 'var(--dark-800)' : 'var(--dark-50)'} />
            <stop offset="100%" stopColor={isDarkMode ? 'var(--dark-900)' : 'var(--dark-100)'} />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#bg-gradient)" />

        {/* Connections */}
        {connections.map((conn) => (
          <motion.line
            key={conn.id}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke={color}
            strokeWidth="0.5"
            strokeOpacity="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Dots */}
        {dots.map((dot) => (
          <motion.circle
            key={dot.id}
            cx={dot.x}
            cy={dot.y}
            r={dot.size}
            fill={color}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
} 