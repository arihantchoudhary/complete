import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../../../utils/theme';

interface ScrollRevealCardProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  className?: string;
}

export default function ScrollRevealCard({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const { isDarkMode } = useTheme();

  const getTransform = () => {
    switch (direction) {
      case 'left':
        return useTransform(scrollYProgress, [0, 0.2], [-100, 0]);
      case 'right':
        return useTransform(scrollYProgress, [0, 0.2], [100, 0]);
      case 'up':
        return useTransform(scrollYProgress, [0, 0.2], [100, 0]);
      case 'down':
        return useTransform(scrollYProgress, [0, 0.2], [-100, 0]);
      default:
        return useTransform(scrollYProgress, [0, 0.2], [100, 0]);
    }
  };

  const y = getTransform();
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        opacity,
      }}
      className={`transition-colors duration-300 ${
        isDarkMode ? 'bg-dark-800' : 'bg-white'
      } rounded-xl shadow-lg p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
} 