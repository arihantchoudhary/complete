'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shipment, RiskFactor } from '@/data/mockData';

interface InfoPanelProps {
  shipment: Shipment;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ shipment }) => {
  // Helper function for risk level badge
  const getRiskLevelBadge = (level: 'low' | 'medium' | 'high') => {
    const colors = {
      low: 'bg-green-100 text-green-800 hover:bg-green-100',
      medium: 'bg-amber-100 text-amber-800 hover:bg-amber-100',
      high: 'bg-red-100 text-red-800 hover:bg-red-100',
    };
    
    return (
      <Badge variant="outline" className={`${colors[level]} border-none`}>
        {level.charAt(0).toUpperCase() + level.slice(1)}
      </Badge>
    );
  };

  // Format date string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="details">Shipment Details</TabsTrigger>
        <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        <TabsTrigger value="bol">Bill of Lading</TabsTrigger>
      </TabsList>
      
      {/* Shipment Details Tab */}
      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle>Shipment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Origin Port</h3>
                <p className="font-medium">{shipment.originPort.name}</p>
                <p className="text-sm text-gray-600">{shipment.originPort.country}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Destination Port</h3>
                <p className="font-medium">{shipment.destinationPort.name}</p>
                <p className="text-sm text-gray-600">{shipment.destinationPort.country}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Departure Date</h3>
                <p>{formatDate(shipment.departureDate)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Arrival Date</h3>
                <p>{formatDate(shipment.arrivalDate)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Vessel</h3>
                <p>{shipment.vesselName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Distance</h3>
                <p>{shipment.distance.toLocaleString()} nautical miles</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Cargo</h3>
              <p>{shipment.cargoType}</p>
              <p className="text-sm text-gray-600">{shipment.billOfLading.cargo.description}</p>
            </div>
            
            {shipment.currentPosition && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Position</h3>
                <p>
                  Lat: {shipment.currentPosition.coordinates[1].toFixed(4)}, 
                  Long: {shipment.currentPosition.coordinates[0].toFixed(4)}
                </p>
                <p className="text-sm text-gray-600">
                  Last Updated: {new Date(shipment.currentPosition.timestamp).toLocaleString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Risk Analysis Tab */}
      <TabsContent value="risk">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Risk Assessment</span>
              <Badge 
                className={`${
                  shipment.riskLevel === 'high' 
                    ? 'bg-red-500' 
                    : shipment.riskLevel === 'medium' 
                    ? 'bg-amber-500' 
                    : 'bg-green-500'
                } text-white`}
              >
                Risk Score: {shipment.riskScore}/100
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Risk Factors</h3>
              <div className="space-y-3">
                {shipment.riskFactors.map((factor: RiskFactor) => (
                  <div key={factor.id} className="flex items-start justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{factor.name}</p>
                      <p className="text-sm text-gray-600">{factor.description}</p>
                    </div>
                    <div>{getRiskLevelBadge(factor.level)}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {shipment.riskLevel === 'high' && (
              <div className="bg-red-50 p-3 rounded-md border border-red-200">
                <h3 className="text-sm font-bold text-red-700 mb-1">⚠️ High Risk Alert</h3>
                <p className="text-sm text-red-700">
                  This shipment has critical risk factors that require immediate attention.
                </p>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium mb-2">AI Recommendations</h3>
              <ul className="list-disc pl-5 space-y-1">
                {shipment.aiSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm">{suggestion}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      {/* Bill of Lading Tab */}
      <TabsContent value="bol">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Bill of Lading</span>
              <span className="text-sm font-normal text-gray-500">
                #{shipment.billOfLading.documentNumber}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-500">Issue Date</h3>
                <p>{formatDate(shipment.billOfLading.issueDate)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Terms of Shipment</h3>
                <p>{shipment.billOfLading.termsOfShipment}</p>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="font-medium mb-2">Shipper/Exporter</h3>
              <p className="font-medium">{shipment.billOfLading.shipper.name}</p>
              <p>{shipment.billOfLading.shipper.address}</p>
              <p>{shipment.billOfLading.shipper.contact}</p>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="font-medium mb-2">Consignee</h3>
              <p className="font-medium">{shipment.billOfLading.consignee.name}</p>
              <p>{shipment.billOfLading.consignee.address}</p>
              <p>{shipment.billOfLading.consignee.contact}</p>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="font-medium mb-2">Notify Party</h3>
              <p className="font-medium">{shipment.billOfLading.notifyParty.name}</p>
              <p>{shipment.billOfLading.notifyParty.address}</p>
              <p>{shipment.billOfLading.notifyParty.contact}</p>
            </div>
            
            <div className="border-t pt-3 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Vessel Information</h3>
                <p><span className="text-gray-500">Vessel:</span> {shipment.billOfLading.vessel.name}</p>
                <p><span className="text-gray-500">Voyage:</span> {shipment.billOfLading.vessel.voyage}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Ports</h3>
                <p><span className="text-gray-500">Loading:</span> {shipment.billOfLading.portOfLoading}</p>
                <p><span className="text-gray-500">Discharge:</span> {shipment.billOfLading.portOfDischarge}</p>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="font-medium mb-2">Cargo Details</h3>
              <p>{shipment.billOfLading.cargo.description}</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <p><span className="text-gray-500">Packages:</span> {shipment.billOfLading.cargo.packages}</p>
                <p><span className="text-gray-500">Weight:</span> {shipment.billOfLading.cargo.weight}</p>
                <p><span className="text-gray-500">Measurement:</span> {shipment.billOfLading.cargo.measurement}</p>
              </div>
            </div>
            
            <div className="border-t pt-3">
              <h3 className="font-medium mb-2">Container Information</h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="font-medium text-gray-500">Container Number</div>
                <div className="font-medium text-gray-500">Seal</div>
                <div className="font-medium text-gray-500">Type</div>
                {shipment.billOfLading.containers.map((container, index) => (
                  <React.Fragment key={index}>
                    <div>{container.number}</div>
                    <div>{container.seal}</div>
                    <div>{container.type}</div>
                  </React.Fragment>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-3 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-1">Freight Charges</h3>
                <p>{shipment.billOfLading.freightCharges}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Special Remarks</h3>
                <p>{shipment.billOfLading.specialRemarks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InfoPanel;
