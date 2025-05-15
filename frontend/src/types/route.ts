
export interface RouteType {
  id?: number;
  origin: string;
  destination: string;
  etaStatus: "on-time" | "delayed" | "early";
  etaDays: number;
  etaHours: number;
  riskScore?: number;
  volume: number;
  cost: string;
}
