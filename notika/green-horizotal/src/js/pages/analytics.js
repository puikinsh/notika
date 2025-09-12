/**
 * Analytics Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js' 
import { NotikaUI } from '../modules/ui.js'
import { Chart } from 'chart.js'

class AnalyticsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'CHARTS'
    this.charts = new NotikaCharts()
    this.ui = new NotikaUI()
  }
  
  async init() {
    // Initialize base app
    await super.init()
    
    // Initialize page-specific features
    await this.initializePageFeatures()
    
    // Add search engine icon styling
    this.addSearchEngineStyles()
    
    console.log('✅ Analytics page initialized with Vite 7.1.5')
  }
  
  addSearchEngineStyles() {
    const searchEngineStyles = `
      /* Modern Search Engine Icons */
      .search-engine-icon {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 600;
        color: white;
        flex-shrink: 0;
      }
      
      .google-icon {
        background: linear-gradient(45deg, #4285f4, #34a853, #fbbc04, #ea4335);
      }
      
      .bing-icon {
        background: linear-gradient(45deg, #0078d4, #106ebe);
      }
      
      .baidu-icon {
        background: linear-gradient(45deg, #2529d8, #3b4cff);
      }
      
      .yahoo-icon {
        background: linear-gradient(45deg, #7b0099, #410166);
      }
      
      .duckduckgo-icon {
        background: linear-gradient(45deg, #de5833, #ff6b47);
      }
      
      .yandex-icon {
        background: linear-gradient(45deg, #fc3f1d, #ffdd2d);
      }
      
      .engine-letter {
        font-size: 18px;
        font-weight: 700;
        color: white;
      }
      
      /* Trend arrows styling */
      .fa-arrow-trend-up,
      .fa-arrow-trend-down {
        font-size: 14px;
      }
      
      /* Table improvements */
      .table-inner tbody tr {
        transition: background-color 0.2s ease;
      }
      
      .table-inner tbody tr:hover {
        background-color: #f8f9fa;
      }
    `
    
    const styleSheet = document.createElement('style')
    styleSheet.textContent = searchEngineStyles
    document.head.appendChild(styleSheet)
    
    console.log('✅ Search engine icon styling applied')
  }
  
  async initializePageFeatures() {
    // Analytics-specific chart initialization
    await this.initializeChartsPage()
  }
  
  async initializeChartsPage() {
    // Initialize chart-specific functionality
    await this.charts.init()
    
    // Initialize analytics-specific charts
    this.initializeAnalyticsCharts()
    
    console.log('✅ Charts functionality initialized')
  }
  
  initializeAnalyticsCharts() {
    // Clear any existing charts first
    document.querySelectorAll('#visit-server-time canvas, #dynamic-chart canvas, #visit-over-time canvas').forEach(canvas => {
      canvas.remove()
    })
    
    // Initialize Visit Server Time Chart
    this.initializeVisitServerTimeChart()
    
    // Initialize Dynamic Chart
    this.initializeDynamicChart()
    
    // Initialize Visits Over Time Chart  
    this.initializeVisitsOverTimeChart()
    
    console.log('✅ Analytics charts ready - Enhanced size: 280px height')
  }
  
  initializeVisitServerTimeChart() {
    const chartElement = document.getElementById('visit-server-time')
    if (!chartElement) return
    
    // Force container dimensions
    chartElement.style.width = '100%'
    chartElement.style.height = '280px'
    chartElement.style.position = 'relative'
    
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 280
    canvas.style.width = '100%'
    canvas.style.height = '280px'
    chartElement.appendChild(canvas)
    
    const ctx = canvas.getContext('2d')
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        datasets: [{
          label: 'Server Visits',
          data: [120, 80, 200, 340, 280, 180, 150],
          borderColor: '#00c292',
          backgroundColor: 'rgba(0, 194, 146, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#00c292',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false }
          },
          y: { 
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            border: { display: false }
          }
        }
      }
    })
  }
  
  initializeDynamicChart() {
    const chartElement = document.getElementById('dynamic-chart')
    if (!chartElement) return
    
    // Force container dimensions
    chartElement.style.width = '100%'
    chartElement.style.height = '280px'
    chartElement.style.position = 'relative'
    
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 280
    canvas.style.width = '100%'
    canvas.style.height = '280px'
    chartElement.appendChild(canvas)
    
    const ctx = canvas.getContext('2d')
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Online', 'Offline', 'Maintenance'],
        datasets: [{
          data: [75, 20, 5],
          backgroundColor: ['#00c292', '#ff6b6b', '#ffc107'],
          borderWidth: 0,
          cutout: '65%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { 
              padding: 15,
              usePointStyle: true,
              font: { size: 12 }
            }
          }
        }
      }
    })
  }
  
  initializeVisitsOverTimeChart() {
    const chartElement = document.getElementById('visit-over-time')
    if (!chartElement) return
    
    // Force container dimensions
    chartElement.style.width = '100%'
    chartElement.style.height = '280px'
    chartElement.style.position = 'relative'
    
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 280
    canvas.style.width = '100%'  
    canvas.style.height = '280px'
    chartElement.appendChild(canvas)
    
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 280)
    gradient.addColorStop(0, 'rgba(3, 169, 243, 0.8)')
    gradient.addColorStop(1, 'rgba(3, 169, 243, 0.1)')
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Visits',
          data: [1200, 1900, 3000, 2500],
          borderColor: '#03a9f3',
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: '#03a9f3',
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false }
          },
          y: { 
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            border: { display: false }
          }
        }
      }
    })
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaAnalytics = new AnalyticsPage()
  })
} else {
  window.NotikaAnalytics = new AnalyticsPage()
}

export { AnalyticsPage }
