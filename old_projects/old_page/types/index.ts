export interface ShipmentDetails {
  origin: string
  destination: string
  productType: string
  value: string
  supplier: string
  estimatedDelivery: number
  tariffCost: number
  riskScore: number
  risks: {
    type: string
    description: string
    icon: string
  }[]
  riskTrend: {
    month: string
    value: number
  }[]
  alternativeRoute: {
    port: string
    estimatedDelivery: number
    riskScore: number
  }
  alerts: {
    title: string
    description: string
    severity: string
  }[]
}
