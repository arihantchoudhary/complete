"use client";

import * as React from 'react';
import { useRef } from 'react'; // Import useRef
import { ClientLayout } from '@/components/client-layout';
import { InteractiveMap, InteractiveMapRef } from '@/components/interactive-map'; // Import new map component and ref type
import { MapChatInterface } from '@/components/map-chat-interface'; // Import new chat component

export default function MapChatPage() {
  const mapRef = useRef<InteractiveMapRef>(null); // Create a ref for the map

  return (
    <ClientLayout>
      {/* Ensure ClientLayout's main area allows absolute positioning */}
      <div className="relative h-full w-full"> {/* Changed h-screen to h-full */}
        {/* Map takes full background */}
        <div className="absolute inset-0 z-0">
          <InteractiveMap ref={mapRef} height="100%" /> {/* Use InteractiveMap and pass the ref */}
        </div>

        {/* Floating Chat Interface Card */}
        {/* Positioned bottom-right, adjust as needed */}
        <div className="absolute bottom-4 right-4 z-10 w-full max-w-sm h-[80vh] max-h-[650px] p-2"> {/* Adjusted position/size */}
          <MapChatInterface mapRef={mapRef} /> {/* Use MapChatInterface and pass the mapRef */}
        </div>
      </div>
    </ClientLayout>
  );
}
