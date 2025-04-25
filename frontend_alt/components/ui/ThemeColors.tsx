export const COLORS = {
  primary: {
    main: '#2563EB',
    light: '#60A5FA',
    dark: '#1E40AF',
  },
  secondary: {
    main: '#10B981',
    light: '#34D399',
    dark: '#065F46',
  },
  text: {
    light: '#F3F4F6',
    dark: '#1F2937',
  },
  background: {
    light: '#F9FAFB',
    dark: '#111827',
  },
  accent: {
    light: '#E0F2FE',
    dark: '#1E40AF',
  },
} as const;

// Contrast ratio calculation
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

export const getContrastRatio = (color1: string, color2: string): number => {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

export const hasSufficientContrast = (textColor: string, bgColor: string): boolean => {
  const ratio = getContrastRatio(textColor, bgColor);
  return ratio >= 4.5;
};

// Example usage:
// const isContrastGood = hasSufficientContrast(COLORS.text.dark, COLORS.background.light);
// console.log(isContrastGood); // true 