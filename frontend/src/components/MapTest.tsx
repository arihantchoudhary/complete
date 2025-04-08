import React from 'react';
import { Map } from './Map';

const MapTest: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <Map
        startLocation=""
        endLocation=""
        route={null}
        riskScore={null}
        isAnalyzing={false}
      />
    </div>
  );
};

export default MapTest;
