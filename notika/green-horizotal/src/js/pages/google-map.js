/**
 * Google Map Page → Leaflet OpenStreetMap Showcase
 */

import { NotikaApp } from '../main.js'
import L from 'leaflet'

class GoogleMapPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'INTERFACE'
  }

  async init() {
    await super.init()
    this.initStreetMap()
    this.initSatelliteMap()
    this.initDarkMap()
    this.initCustomMarkersMap()
    console.log('Maps page initialized')
  }

  initStreetMap() {
    const el = document.getElementById('map2')
    if (!el) return

    const map = L.map(el, { scrollWheelZoom: false }).setView([51.505, -0.09], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    L.marker([51.505, -0.09]).addTo(map)
      .bindPopup('<strong>London</strong><br>Big Ben area').openPopup()
    L.marker([51.51, -0.1]).addTo(map)
      .bindPopup('Covent Garden')
    L.marker([51.5, -0.08]).addTo(map)
      .bindPopup('Tower Bridge')
  }

  initSatelliteMap() {
    const el = document.getElementById('googleMap')
    if (!el) return

    const map = L.map(el, { scrollWheelZoom: false }).setView([48.8566, 2.3522], 12)
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      attribution: '&copy; Esri'
    }).addTo(map)

    L.marker([48.8584, 2.2945]).addTo(map)
      .bindPopup('<strong>Eiffel Tower</strong><br>Paris, France').openPopup()
    L.marker([48.8606, 2.3376]).addTo(map)
      .bindPopup('Louvre Museum')
  }

  initDarkMap() {
    const el = document.getElementById('map86')
    if (!el) return

    const map = L.map(el, { scrollWheelZoom: false }).setView([40.7128, -74.006], 12)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; CartoDB'
    }).addTo(map)

    const glowIcon = L.divIcon({
      className: 'glow-marker',
      html: '<div style="width:14px;height:14px;background:#00c292;border-radius:50%;box-shadow:0 0 12px 4px rgba(0,194,146,0.6);"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    })

    const cities = [
      { coords: [40.7580, -73.9855], name: 'Times Square' },
      { coords: [40.7484, -73.9857], name: 'Empire State Building' },
      { coords: [40.6892, -74.0445], name: 'Statue of Liberty' },
      { coords: [40.7527, -73.9772], name: 'Grand Central Terminal' },
      { coords: [40.7614, -73.9776], name: 'MoMA' }
    ]

    cities.forEach(c => {
      L.marker(c.coords, { icon: glowIcon }).addTo(map).bindPopup(`<strong>${c.name}</strong>`)
    })
  }

  initCustomMarkersMap() {
    const el = document.getElementById('map7')
    if (!el) return

    const map = L.map(el, { scrollWheelZoom: false }).setView([35.6762, 139.6503], 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    const locations = [
      { coords: [35.6762, 139.6503], name: 'Shibuya', visitors: 45200, color: '#00c292' },
      { coords: [35.6586, 139.7454], name: 'Tokyo Tower', visitors: 32100, color: '#03a9f3' },
      { coords: [35.7148, 139.7967], name: 'Asakusa', visitors: 28400, color: '#ffc107' },
      { coords: [35.6894, 139.6917], name: 'Shinjuku', visitors: 51800, color: '#e91e63' },
      { coords: [35.6329, 139.8804], name: 'Tokyo Disney', visitors: 67500, color: '#9c27b0' }
    ]

    locations.forEach(loc => {
      const radius = Math.sqrt(loc.visitors) / 5
      L.circleMarker(loc.coords, {
        radius,
        fillColor: loc.color,
        fillOpacity: 0.6,
        color: loc.color,
        weight: 2
      }).addTo(map).bindPopup(`<strong>${loc.name}</strong><br>${loc.visitors.toLocaleString()} visitors`)
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.NotikaGoogleMap = new GoogleMapPage() })
} else {
  window.NotikaGoogleMap = new GoogleMapPage()
}

export { GoogleMapPage }
