import React from 'react';

interface GradientBgProps {
  children: React.ReactNode;
}

// Renamed from StrongGradientWrapper to keep the existing filename
export default function GradientBg({ children }: GradientBgProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Layer 1: conic “lines” burst */}
      <div
        className="
          absolute inset-0
          bg-[conic-gradient(from_0deg,_#ff004c,_#ff8a00,_#ffe700,_#00f2ea,_#6100ff,_#ff004c)]
          dark:bg-[conic-gradient(from_0deg,_#a00031,_#a05600,_#a09200,_#009a93,_#3d00a0,_#a00031)] /* Darker conic */
          opacity-70 dark:opacity-50 /* Adjusted opacity */
          blur-[150px] dark:blur-[180px] /* Slightly more blur in dark */
          scale-150
        "
        aria-hidden="true"
      />

      {/* Layer 2: radial soft halo */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.4)_25%,_rgba(255,255,255,0)_80%)]
          dark:bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(255,255,255,0.1)_25%,_rgba(0,0,0,0)_80%)] /* Subtle white halo for dark */
          opacity-50 dark:opacity-30 /* Adjusted opacity */
          blur-[100px] dark:blur-[120px] /* Slightly more blur in dark */
          scale-125
        "
        aria-hidden="true"
      />

      {/* your real content sits here */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
