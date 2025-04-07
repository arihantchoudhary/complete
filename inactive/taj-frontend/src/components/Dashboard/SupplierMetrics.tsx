
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Package, Truck, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupplierData {
  id: string;
  name: string;
  onTimeDelivery: number;
  qualityScore: number;
  responseTime: number;
  riskScore: number;
}

const supplierData: SupplierData[] = [
  {
    id: '1',
    name: 'Tech Motors Ltd.',
    onTimeDelivery: 87,
    qualityScore: 92,
    responseTime: 95,
    riskScore: 12,
  },
  {
    id: '2',
    name: 'Kumar Plastics',
    onTimeDelivery: 95,
    qualityScore: 88,
    responseTime: 90,
    riskScore: 8,
  },
  {
    id: '3',
    name: 'Bharat Metals',
    onTimeDelivery: 65,
    qualityScore: 78,
    responseTime: 70,
    riskScore: 35,
  },
];

const SupplierMetrics: React.FC = () => {
  const getRiskColor = (score: number) => {
    if (score < 10) return 'bg-green-500';
    if (score < 30) return 'bg-logistics-warning-DEFAULT';
    return 'bg-logistics-danger-DEFAULT';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-logistics-warning-DEFAULT';
    return 'bg-logistics-danger-DEFAULT';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Supplier Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {supplierData.map((supplier) => (
            <div key={supplier.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">{supplier.name}</h3>
                <div className="flex items-center">
                  <AlertTriangle className={cn(
                    "h-4 w-4 mr-1",
                    supplier.riskScore < 10 ? "text-green-500" : 
                    supplier.riskScore < 30 ? "text-logistics-warning-DEFAULT" : 
                    "text-logistics-danger-DEFAULT"
                  )} />
                  <span className="text-sm font-medium">
                    Risk: {supplier.riskScore}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Truck className="h-3.5 w-3.5 mr-1" />
                    <span>On-time</span>
                  </div>
                  <Progress 
                    value={supplier.onTimeDelivery} 
                    className={cn("h-2", getProgressColor(supplier.onTimeDelivery))}
                  />
                  <span className="text-xs font-medium">{supplier.onTimeDelivery}%</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Package className="h-3.5 w-3.5 mr-1" />
                    <span>Quality</span>
                  </div>
                  <Progress 
                    value={supplier.qualityScore} 
                    className={cn("h-2", getProgressColor(supplier.qualityScore))}
                  />
                  <span className="text-xs font-medium">{supplier.qualityScore}%</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Response</span>
                  </div>
                  <Progress 
                    value={supplier.responseTime} 
                    className={cn("h-2", getProgressColor(supplier.responseTime))}
                  />
                  <span className="text-xs font-medium">{supplier.responseTime}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierMetrics;
