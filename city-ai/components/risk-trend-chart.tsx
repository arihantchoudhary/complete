"use client"

import { useEffect, useRef } from "react"

interface RiskTrendData {
  month: string
  value: number
}

interface RiskTrendChartProps {
  data: RiskTrendData[]
}

export function RiskTrendChart({ data }: RiskTrendChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw background
    ctx.fillStyle = "#f8fafc"
    ctx.fillRect(0, 0, width, height)

    // Draw grid lines
    ctx.strokeStyle = "#e2e8f0"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Calculate x and y positions
    const xStep = chartWidth / (data.length - 1)
    const getX = (i: number) => padding + i * xStep
    const getY = (value: number) => padding + chartHeight - chartHeight * (value / 100)

    // Draw line
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.lineJoin = "round"
    ctx.beginPath()
    ctx.moveTo(getX(0), getY(data[0].value))

    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(getX(i), getY(data[i].value))
    }
    ctx.stroke()

    // Draw gradient area under the line
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
    gradient.addColorStop(0, "rgba(239, 68, 68, 0.3)") // Red for rising risk
    gradient.addColorStop(1, "rgba(239, 68, 68, 0.0)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(getX(0), getY(data[0].value))

    for (let i = 1; i < data.length; i++) {
      ctx.lineTo(getX(i), getY(data[i].value))
    }

    ctx.lineTo(getX(data.length - 1), height - padding)
    ctx.lineTo(getX(0), height - padding)
    ctx.closePath()
    ctx.fill()

    // Draw points
    for (let i = 0; i < data.length; i++) {
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(getX(i), getY(data[i].value), 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#ef4444" // Red for rising risk
      ctx.beginPath()
      ctx.arc(getX(i), getY(data[i].value), 4, 0, Math.PI * 2)
      ctx.fill()
    }

    // Draw labels
    ctx.fillStyle = "#64748b"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "center"

    // X-axis labels (months)
    for (let i = 0; i < data.length; i++) {
      ctx.fillText(data[i].month, getX(i), height - padding + 20)
    }

    // Y-axis labels (risk values)
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = i * 20
      const y = padding + (chartHeight / 5) * (5 - i)
      ctx.fillText(value.toString(), padding - 10, y + 4)
    }
  }, [data])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} width={400} height={200} className="max-w-full"></canvas>
    </div>
  )
}
