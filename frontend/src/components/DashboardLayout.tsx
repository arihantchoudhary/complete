import React from 'react';

interface DashboardLayoutProps {
  leftPanel: React.ReactNode;
  map: React.ReactNode;
  topBar: React.ReactNode;
  bottomPanel: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  leftPanel,
  map,
  topBar,
  bottomPanel,
}) => {
  return (
    <div className="relative w-full h-screen flex">
      {/* Left panel */}
      <div className="w-1/4 p-4 bg-white">
        {leftPanel}
      </div>
      
      {/* Map container */}
      <div className="relative w-3/4">
        {map}
        
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-white bg-opacity-80">
          {topBar}
        </div>
        
        {/* Bottom panel */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-white bg-opacity-80">
          {bottomPanel}
        </div>
      </div>
    </div>
  );
};
