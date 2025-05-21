import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { MapRoute } from "./MapRoute";
import { DataScrapingService } from "@/services/DataScrapingService";
import { calculateRouteRisk, fetchRiskFactors } from "@/utils/riskCalculations";
import { toast } from "sonner";

const KNOWN_PORTS = [
  "Jebel Ali",
  "Houston",
  "Shanghai",
  "Rotterdam",
  "Singapore",
  "Los Angeles",
  "Dubai",
  "Mumbai",
  "New York",
  "Sydney",
  "Santos",
  "Hamburg",
];

interface AddRouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoute: (route: {
    origin: string;
    destination: string;
    etaStatus: "on-time" | "delayed" | "early";
    etaDays: number;
    etaHours: number;
    riskScore: number;
    volume: number;
    cost: string;
    cargoType?: string;
    carrier?: string;
    shipmentFrequency?: string;
    insurance?: boolean;
  }) => void;
}

export function AddRouteModal({ isOpen, onClose, onAddRoute }: AddRouteModalProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routeCalculated, setRouteCalculated] = useState(false);
  const [cargoType, setCargoType] = useState("");
  const [carrier, setCarrier] = useState("");
  const [shipmentFrequency, setShipmentFrequency] = useState("Weekly");
  const [insurance, setInsurance] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isKnownOrigin = KNOWN_PORTS.includes(origin);
  const isKnownDestination = KNOWN_PORTS.includes(destination);

  const canSubmit = origin && destination && isKnownOrigin && isKnownDestination && !loading;

  const getScrapedRouteInfo = async (origin: string, destination: string) => {
    setLoading(true);

    try {
      const scrapedData = await DataScrapingService.scrapeAllActiveSources();
      const indicators = Object.values(scrapedData).flatMap(res => res.data.indicators);

      let etaDays = 14, etaHours = 6, cost = "$4,200/TEU";
      const portCongestion = indicators.find(i => i.name.toLowerCase().includes("congestion"));
      const tradeVolumeIndex = indicators.find(i => i.name.toLowerCase().includes("trade volume"));
      const shippingCostIdx = indicators.find(i => i.name.toLowerCase().includes("shipping cost"));

      if (portCongestion) {
        const base = 6;
        etaDays = Math.max(8, Math.round(base + (Number(portCongestion.value) / 15)));
      }
      if (tradeVolumeIndex) {
        etaHours = Math.max(4, Math.round(Number(tradeVolumeIndex.value) % 24));
      }
      if (shippingCostIdx) {
        const val = Number(shippingCostIdx.value);
        cost = `$${(4000 + (val || Math.random() * 1000)).toFixed(0)}/TEU`;
      }

      setLoading(false);
      return { etaDays, etaHours, cost };
    } catch (e) {
      setLoading(false);
      toast.error("Could not retrieve up-to-date ETA/cost, using default values");
      return { etaDays: 14, etaHours: 6, cost: "$4,200/TEU" };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isKnownOrigin || !isKnownDestination) {
      setError(
        "Origin and Destination must be valid, known ports. Please select from the list of recognized global ports."
      );
      return;
    }

    setError(null);

    setLoading(true);
    const scraped = await getScrapedRouteInfo(origin, destination);

    let riskScore = 0;
    try {
      const freshRiskFactors = await fetchRiskFactors([
        {
          origin,
          destination,
          etaStatus: "on-time",
          etaDays: scraped.etaDays,
          etaHours: scraped.etaHours,
          volume: 5000,
          cost: scraped.cost,
        },
      ]);
      riskScore = Math.round(
        freshRiskFactors.reduce((sum, f) => sum + (f.score || 0), 0) / freshRiskFactors.length
      );
    } catch {
      riskScore = calculateRouteRisk({
        origin,
        destination,
        etaStatus: "on-time",
        etaDays: scraped.etaDays,
        etaHours: scraped.etaHours,
        volume: 5000,
        cost: scraped.cost,
      });
    }
    setLoading(false);

    const newRoute = {
      origin,
      destination,
      etaStatus: "on-time" as const,
      etaDays: scraped.etaDays,
      etaHours: scraped.etaHours,
      riskScore,
      volume: 5000,
      cost: scraped.cost,
      cargoType,
      carrier,
      shipmentFrequency,
      insurance,
    };

    onAddRoute(newRoute);
    onClose();

    setOrigin("");
    setDestination("");
    setCargoType("");
    setCarrier("");
    setShipmentFrequency("Weekly");
    setInsurance(false);
    setError(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add New Route</DialogTitle>
          <DialogDescription>
            Enter the origin and destination ports for your new trade route.<br />
            <span className="text-xs text-muted-foreground">
              Only recognized ports will be accepted. Supported ports: {KNOWN_PORTS.join(", ")}
            </span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin Port</Label>
                <Input
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. Shanghai"
                  list="known-ports"
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination Port</Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Rotterdam"
                  list="known-ports"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <datalist id="known-ports">
              {KNOWN_PORTS.map(port => (
                <option key={port} value={port} />
              ))}
            </datalist>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cargoType">Cargo Type</Label>
                <Input
                  id="cargoType"
                  value={cargoType}
                  onChange={e => setCargoType(e.target.value)}
                  placeholder="e.g. Electronics, Food, Chemicals"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carrier">Carrier</Label>
                <Input
                  id="carrier"
                  value={carrier}
                  onChange={e => setCarrier(e.target.value)}
                  placeholder="e.g. Maersk, COSCO"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipmentFrequency">Shipment Frequency</Label>
                <select
                  id="shipmentFrequency"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  value={shipmentFrequency}
                  onChange={e => setShipmentFrequency(e.target.value)}
                  disabled={loading}
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Ad-hoc">Ad-hoc</option>
                </select>
              </div>
              <div className="flex items-center mt-6 gap-2">
                <input
                  id="insurance"
                  type="checkbox"
                  checked={insurance}
                  onChange={e => setInsurance(e.target.checked)}
                  className="h-4 w-4 border rounded"
                  disabled={loading}
                />
                <Label htmlFor="insurance" className="mb-0">Insurance Purchased?</Label>
              </div>
            </div>
            {(origin && destination && (!isKnownOrigin || !isKnownDestination)) && (
              <div className="text-destructive text-sm font-semibold rounded bg-red-100 p-3 border border-red-300">
                Please select both origin and destination from recognized ports: {KNOWN_PORTS.join(", ")}
              </div>
            )}
            {origin && destination && isKnownOrigin && isKnownDestination && (
              <div className="border rounded-lg overflow-hidden h-[300px]">
                <MapRoute origin={origin} destination={destination} />
              </div>
            )}
            {error && (
              <div className="text-destructive text-sm font-semibold rounded bg-red-100 p-3 border border-red-300">
                {error}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              {loading ? "Analyzing..." : "Add Route"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
