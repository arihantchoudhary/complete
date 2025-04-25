import React, { useRef } from 'react';

export default function SimpleMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-400">Interactive map will appear here</p>
        </div>
      </div>
    </div>
  );
} 