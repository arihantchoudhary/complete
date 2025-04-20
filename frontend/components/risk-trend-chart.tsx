"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import { useTheme } from "next-themes";

// Types
export interface RiskTrendData {
  month: string;
  value: number;
}

export interface RiskTrendChartProps {
  data: RiskTrendData[];
  height?: number;
  width?: number;
}

export function RiskTrendChart({ 
  data, 
  height = 200, 
  width = 400 
}: RiskTrendChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  // Memoize computed values for chart dimensions
  const chartDimensions = useMemo(() => {
    const padding = 40;
    return {
      padding,
      chartWidth: width - padding * 2,
      chartHeight: height - padding * 2
    };
  }, [width, height]);
  
  // Memoize color scheme based on theme
  const colors = useMemo(() => {
    const isDark = theme === "dark";
    return {
      background: isDark ? "#1e293b" : "#f8fafc",
      gridLines: isDark ? "#334155" : "#e2e8f0",
      line: isDark ? "#60a5fa" : "#3b82f6",
      gradientTop: isDark ? "rgba(248, 113, 113, 0.3)" : "rgba(239, 68, 68, 0.3)",
      gradientBottom: isDark ? "rgba(248, 113, 113, 0.0)" : "rgba(239, 68, 68, 0.0)",
      point: isDark ? "#f87171" : "#ef4444",
      text: isDark ? "#94a3b8" : "#64748b"
    };
  }, [theme]);
  
  // Position calculator functions
  const getPositions = useCallback((data: RiskTrendData[]) => {
    const { padding, chartWidth, chartHeight } = chartDimensions;
    const xStep = chartWidth / Math.max(1, data.length - 1);
    
    return {
      getX: (i: number) => padding + i * xStep,
      getY: (value: number) => padding + chartHeight - chartHeight * (value / 100)
    };
  }, [chartDimensions]);
  
  // Draw the chart - main render function
  const drawChart = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const { padding, chartWidth, chartHeight } = chartDimensions;
    const { getX, getY } = getPositions(data);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = colors.gridLines;
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Early exit if not enough data
    if (data.length < 2) return;
    
    // Draw line
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(data[0].value));
    
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(getX(i), getY(data[i].value));
    }
    ctx.stroke();
    
    // Draw gradient area under the line
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, colors.gradientTop);
    gradient.addColorStop(1, colors.gradientBottom);
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(data[0].value));
    
    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(getX(i), getY(data[i].value));
    }
    
    ctx.lineTo(getX(data.length - 1), height - padding);
    ctx.lineTo(getX(0), height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw points
    for (let i = 0; i < data.length; i++) {
      // Outer white circle
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(getX(i), getY(data[i].value), 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner colored circle
      ctx.fillStyle = colors.point;
      ctx.beginPath();
      ctx.arc(getX(i), getY(data[i].value), 4, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw labels
    ctx.fillStyle = colors.text;
    ctx.font = "12px system-ui, sans-serif";
    
    // X-axis labels (months)
    ctx.textAlign = "center";
    for (let i = 0; i < data.length; i++) {
      ctx.fillText(data[i].month, getX(i), height - padding + 20);
    }
    
    // Y-axis labels (risk values)
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = i * 20;
      const y = padding + (chartHeight / 5) * (5 - i);
      ctx.fillText(value.toString(), padding - 10, y + 4);
    }
  }, [data, colors, chartDimensions, getPositions, width, height]);
  
  // Update canvas on data or theme change
  useEffect(() => {
    // Use requestAnimationFrame for smoother rendering
    const animationId = requestAnimationFrame(drawChart);
    return () => cancelAnimationFrame(animationId);
  }, [drawChart]);
  
  // Handle window resize for responsive canvas
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      // Get the parent container width
      const container = canvasRef.current.parentElement;
      if (!container) return;
      
      // Adjust canvas size if needed for responsive behavior
      // This is a simple implementation - you might want to enhance it
      const containerWidth = container.getBoundingClientRect().width;
      if (containerWidth < width) {
        const scale = containerWidth / width;
        canvasRef.current.style.width = `${containerWidth}px`;
        canvasRef.current.style.height = `${height * scale}px`;
      }
    };
    
    // Initial size adjustment
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height} 
        className="max-w-full transition-colors duration-300"
      />
    </div>
  );
}
