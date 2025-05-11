"use client";

import { memo, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";

interface OptionButtonsProps {
  options: string[];
  onSelect: (option: string) => void;
  className?: string;
}

export const OptionButtons = memo(function OptionButtons({ 
  options, 
  onSelect,
  className = "" 
}: OptionButtonsProps) {
  const { theme } = useTheme();
  
  // Determine button styles based on theme
  const buttonStyles = useMemo(() => {
    const isDark = theme === "dark";
    
    return {
      base: `px-4 py-2 rounded-md transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDark 
          ? "border border-blue-500 bg-blue-900/20 text-blue-400 hover:bg-blue-800/30 focus:ring-blue-500" 
          : "border border-blue-200 bg-white text-blue-600 hover:bg-blue-50 focus:ring-blue-400"
      }`,
      active: isDark ? "bg-blue-800/50" : "bg-blue-100"
    };
  }, [theme]);
  
  // Memoized handler factory to avoid recreating functions for each option
  const createSelectHandler = useCallback(
    (option: string) => () => onSelect(option),
    [onSelect]
  );
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((
    e: React.KeyboardEvent<HTMLButtonElement>,
    option: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(option);
    }
  }, [onSelect]);
  
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} role="radiogroup" aria-label="Options">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={createSelectHandler(option)}
          onKeyDown={(e) => handleKeyDown(e, option)}
          className={buttonStyles.base}
          role="radio"
          aria-checked="false"
          tabIndex={0}
        >
          {option}
        </button>
      ))}
    </div>
  );
});
