"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { ChatInterface } from "@/components/chat-interface"
import { Dashboard } from "@/components/dashboard"
import type { ShipmentDetails } from "@/types"

export default function Home() {
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetails | null>(null)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showAlternativeRoute, setShowAlternativeRoute] = useState(false)

  const handleShipmentComplete = (details: ShipmentDetails, showAlternative: boolean) => {
    setShipmentDetails(details)
    setShowAlternativeRoute(showAlternative)
    setShowDashboard(true)
  }

  const handleAddAnotherShipment = () => {
    setShipmentDetails(null)
    setShowDashboard(false)
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] gap-4 p-4">
        <div className={`${showDashboard ? "md:w-1/3" : "w-full"} transition-all duration-300 ease-in-out`}>
          <ChatInterface onShipmentComplete={handleShipmentComplete} resetChat={!showDashboard} />
        </div>

        {showDashboard && shipmentDetails && (
          <div className="md:w-2/3 animate-fade-in">
            <Dashboard
              shipmentDetails={shipmentDetails}
              showAlternativeRoute={showAlternativeRoute}
              onAddAnotherShipment={handleAddAnotherShipment}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}
