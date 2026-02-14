/**
 * Data Map Page → Leaflet Data Visualization Maps
 */

import { NotikaApp } from '../main.js'
import L from 'leaflet'

class DataMapPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'INTERFACE'
  }

  async init() {
    await super.init()
    this.initBasicMap()
    this.initEuropeMap()
    this.initUSAMap()
    this.initArcMap()
    console.log('Data Maps page initialized')
  }

  initBasicMap() {
    const el = document.getElementById('basic_map')
    if (!el) return

    const map = L.map(el, { scrollWheelZoom: false }).setView([20, 0], 2)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      attribution: '&copy; CartoDB'
    }).addTo(map)

    const visitors = [
      { coords: [40.71, -74.00], name: 'New York', value: 125420 },
      { coords: [51.51, -0.13], name: 'London', value: 89340 },
      { coords: [35.68, 139.65], name: 'Tokyo', value: 87230 },
      { coords: [48.86, 2.35], name: 'Paris', value: 92150 },
      { coords: [-33.87, 151.21], name: 'Sydney', value: 43210 },
      { coords: [55.76, 37.62], name: 'Moscow', value: 56780 },
      { coords: [-23.56, -46.64], name: 'São Paulo', value: 67890 },
      { coords: [25.20, 55.27], name: 'Dubai', value: 78900 }
    ]

    visitors.forEach(v => {
      const radius = Math.sqrt(v.value) / 12
      L.circleMarker(v.coords, {
        radius,
        fillColor: '#00c292',
        fillOpacity: 0.5,
        color: '#00c292',
        weight: 2
      }).addTo(map).bindPopup(`<strong>${v.name}</strong><br>${v.value.toLocaleString()} visitors`)
    })
  }

  initEuropeMap() {
    const el = document.getElementById('selected_map')
    if (!el) return

    const map = L.map(el, { scrollWheelZoom: false }).setView([50, 10], 4)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      attribution: '&copy; CartoDB'
    }).addTo(map)

    const cities = [
      { coords: [51.51, -0.13], name: 'London', revenue: 8.2, color: '#00c292' },
      { coords: [48.86, 2.35], name: 'Paris', revenue: 7.1, color: '#03a9f3' },
      { coords: [52.52, 13.41], name: 'Berlin', revenue: 5.4, color: '#ffc107' },
      { coords: [41.39, 2.17], name: 'Barcelona', revenue: 4.2, color: '#e91e63' },
      { coords: [45.46, 9.19], name: 'Milan', revenue: 3.8, color: '#9c27b0' },
      { coords: [59.33, 18.07], name: 'Stockholm', revenue: 2.9, color: '#ff5722' },
      { coords: [47.37, 8.54], name: 'Zurich', revenue: 6.1, color: '#00bcd4' }
    ]

    cities.forEach(c => {
      L.circleMarker(c.coords, {
        radius: c.revenue * 3,
        fillColor: c.color,
        fillOpacity: 0.6,
        color: c.color,
        weight: 2
      }).addTo(map).bindPopup(`<strong>${c.name}</strong><br>Revenue: $${c.revenue}M`)
    })
  }

  initUSAMap() {
    const el = document.getElementById('usa_map')
    if (!el) return

    const map = L.map(el, { scrollWheelZoom: false }).setView([39.8, -98.5], 4)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    const cities = [
      { coords: [40.71, -74.00], name: 'New York', users: 52400 },
      { coords: [34.05, -118.24], name: 'Los Angeles', users: 43200 },
      { coords: [41.88, -87.63], name: 'Chicago', users: 31500 },
      { coords: [29.76, -95.37], name: 'Houston', users: 22800 },
      { coords: [33.45, -112.07], name: 'Phoenix', users: 18300 },
      { coords: [47.61, -122.33], name: 'Seattle', users: 35600 },
      { coords: [37.77, -122.42], name: 'San Francisco', users: 41200 },
      { coords: [25.76, -80.19], name: 'Miami', users: 19700 }
    ]

    cities.forEach(c => {
      const radius = Math.sqrt(c.users) / 8
      L.circleMarker(c.coords, {
        radius,
        fillColor: '#03a9f3',
        fillOpacity: 0.5,
        color: '#03a9f3',
        weight: 2
      }).addTo(map).bindPopup(`<strong>${c.name}</strong><br>${c.users.toLocaleString()} active users`)

      // Data label
      L.marker(c.coords, {
        icon: L.divIcon({
          className: 'map-data-label',
          html: `<span style="background:white;padding:1px 5px;border-radius:3px;font-size:11px;font-weight:600;color:#333;box-shadow:0 1px 3px rgba(0,0,0,.2)">${(c.users / 1000).toFixed(0)}K</span>`,
          iconSize: [30, 15],
          iconAnchor: [15, -10]
        })
      }).addTo(map)
    })
  }

  initArcMap() {
    const el = document.getElementById('arc_map')
    if (!el) return

    const map = L.map(el, { scrollWheelZoom: false }).setView([30, 0], 2)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      attribution: '&copy; CartoDB'
    }).addTo(map)

    const hq = [37.77, -122.42] // San Francisco HQ
    const connections = [
      { coords: [51.51, -0.13], name: 'London', traffic: 890 },
      { coords: [35.68, 139.65], name: 'Tokyo', traffic: 720 },
      { coords: [48.86, 2.35], name: 'Paris', traffic: 640 },
      { coords: [19.08, 72.88], name: 'Mumbai', traffic: 1200 },
      { coords: [-33.87, 151.21], name: 'Sydney', traffic: 430 },
      { coords: [52.52, 13.41], name: 'Berlin', traffic: 560 }
    ]

    // HQ marker
    const hqIcon = L.divIcon({
      className: 'hq-marker',
      html: '<div style="width:16px;height:16px;background:#ff6b6b;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(255,107,107,0.6)"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    })
    L.marker(hq, { icon: hqIcon }).addTo(map).bindPopup('<strong>HQ - San Francisco</strong>')

    connections.forEach(c => {
      // Arc line with curve
      const mid = [(hq[0] + c.coords[0]) / 2 + 15, (hq[1] + c.coords[1]) / 2]
      const weight = Math.max(1, c.traffic / 300)

      L.polyline([hq, mid, c.coords], {
        color: '#00c292',
        weight,
        opacity: 0.6,
        smoothFactor: 3,
        dashArray: '8, 4'
      }).addTo(map)

      // Endpoint marker
      const endIcon = L.divIcon({
        className: 'end-marker',
        html: '<div style="width:10px;height:10px;background:#03a9f3;border-radius:50%;border:2px solid white;box-shadow:0 0 6px rgba(3,169,243,0.5)"></div>',
        iconSize: [10, 10],
        iconAnchor: [5, 5]
      })
      L.marker(c.coords, { icon: endIcon }).addTo(map)
        .bindPopup(`<strong>${c.name}</strong><br>${c.traffic} requests/min`)
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.NotikaDataMap = new DataMapPage() })
} else {
  window.NotikaDataMap = new DataMapPage()
}

export { DataMapPage }
