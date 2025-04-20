"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Set access token globally
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpaGFudGNob3VkaGFyeSIsImEiOiJjbThvNmZtdWgwOG5iMmlwemJpcnRudjd3In0.JmygHU07dAryo96ZLH3uAA'

interface ShipmentMapProps {
  origin: string
  destination: string
}

export function ShipmentMap({ origin, destination }: ShipmentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    let map: mapboxgl.Map | null = null

    try {
      // Initialize map
      map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/navigation-day-v1',
        center: [0, 25],
        zoom: 2,
        attributionControl: true,
        preserveDrawingBuffer: true
      })

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right')

      // Handle map load
      map.once('load', () => {
        if (!map) return

        const jebelAliCoords: [number, number] = [55.0678, 25.0159]
        const houstonCoords: [number, number] = [-95.3698, 29.7604]

        // Add route
        map.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                jebelAliCoords,
                [54.2376, 24.0889],
                [53.0, 23.5],
                [50.0, 14.5],
                [45.0, 12.5],
                [32.5, 30.0],
                [15.0, 35.0],
                [-5.0, 36.0],
                [-30.0, 32.0],
                [-60.0, 25.0],
                houstonCoords
              ]
            }
          }
        })

        map.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3b82f6',
            'line-width': 3,
            'line-opacity': 0.7
          }
        })

        // Add markers
        new mapboxgl.Marker({ color: '#3b82f6' })
          .setLngLat(jebelAliCoords)
          .setPopup(new mapboxgl.Popup().setHTML(`<b>Origin:</b> ${origin}`))
          .addTo(map)

        new mapboxgl.Marker({ color: '#3b82f6' })
          .setLngLat(houstonCoords)
          .setPopup(new mapboxgl.Popup().setHTML(`<b>Destination:</b> ${destination}`))
          .addTo(map)

        // Fit bounds
        const bounds = new mapboxgl.LngLatBounds()
          .extend(jebelAliCoords)
          .extend(houstonCoords)
        map.fitBounds(bounds, { padding: 50 })
      })

      // Handle map error
      map.on('error', (e) => {
        console.error('Mapbox error:', e)
        setMapError('Failed to load map')
      })

    } catch (error) {
      console.error('Error initializing map:', error)
      setMapError('Failed to initialize map')
    }

    // Cleanup
    return () => {
      map?.remove()
    }
  }, [origin, destination])

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {mapError ? (
        <div className="h-[300px] w-full bg-gray-100 flex items-center justify-center text-red-500">
          {mapError}
        </div>
      ) : (
        <div 
          ref={mapRef} 
          className="h-[300px] w-full" 
          style={{ position: 'relative' }}
        />
      )}
    </div>
  )
}
