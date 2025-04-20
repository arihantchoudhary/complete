import { Truck } from "lucide-react"

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1.5 rounded-md">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-xl text-gray-900">City AI</span>
        </div>
        <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Pear VC Demo</div>
      </div>
    </header>
  )
}
