import { ReactNode } from 'react';
import clsx from 'clsx';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Container({
  children,
  className = '',
  bgColor = 'transparent',
  padding = 'md',
}: ContainerProps) {
  const paddingClasses = {
    none: '',
    sm: 'px-4 py-8',
    md: 'px-6 py-12',
    lg: 'px-8 py-16',
    xl: 'px-10 py-20',
  };

  return (
    <div
      className={clsx(
        'w-full mx-auto max-w-7xl',
        paddingClasses[padding],
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
} 