import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTheme } from '../../utils/theme';

interface RiskScoreGaugeProps {
  score: number;
  size?: number;
}

export default function RiskScoreGauge({ score, size = 200 }: RiskScoreGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useTheme();
  
  // Animate the needle rotation
  const rotation = useSpring(0, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    // Update needle rotation when score changes
    const angle = (score / 100) * 180 - 90; // Convert score to angle (-90 to 90)
    rotation.set(angle);
  }, [score, rotation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0);
    ctx.strokeStyle = isDarkMode ? '#374151' : '#E5E7EB';
    ctx.lineWidth = size * 0.1;
    ctx.stroke();

    // Draw color segments
    const segments = [
      { start: 0, end: 0.4, color: '#10B981' }, // Green
      { start: 0.4, end: 0.7, color: '#F59E0B' }, // Yellow
      { start: 0.7, end: 1, color: '#EF4444' }, // Red
    ];

    segments.forEach(segment => {
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        Math.PI + (Math.PI * segment.start),
        Math.PI + (Math.PI * segment.end)
      );
      ctx.strokeStyle = segment.color;
      ctx.lineWidth = size * 0.1;
      ctx.stroke();
    });

    // Draw tick marks
    for (let i = 0; i <= 10; i++) {
      const angle = Math.PI + (Math.PI * (i / 10));
      const innerRadius = radius - size * 0.05;
      const outerRadius = radius + size * 0.05;

      ctx.beginPath();
      ctx.moveTo(
        centerX + Math.cos(angle) * innerRadius,
        centerY + Math.sin(angle) * innerRadius
      );
      ctx.lineTo(
        centerX + Math.cos(angle) * outerRadius,
        centerY + Math.sin(angle) * outerRadius
      );
      ctx.strokeStyle = isDarkMode ? '#9CA3AF' : '#6B7280';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw numbers
      if (i % 2 === 0) {
        const textRadius = radius + size * 0.15;
        ctx.font = `${size * 0.08}px sans-serif`;
        ctx.fillStyle = isDarkMode ? '#F3F4F6' : '#1F2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          (i * 10).toString(),
          centerX + Math.cos(angle) * textRadius,
          centerY + Math.sin(angle) * textRadius
        );
      }
    }
  }, [size, isDarkMode]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} />
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 h-1/2 origin-bottom"
        style={{
          x: -0.5,
          y: -size * 0.5,
          rotate: rotation,
        }}
      >
        <div className="w-full h-full bg-dark-900 dark:bg-dark-100" />
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-2xl font-bold text-dark-900 dark:text-dark-100">
          {score}
        </div>
        <div className="text-sm text-dark-600 dark:text-dark-400">
          Risk Score
        </div>
      </div>
    </div>
  );
} 