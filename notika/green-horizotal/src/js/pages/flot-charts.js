/**
 * Flot Charts Page - Modern Vite Implementation
 * Replaces jQuery Flot with Chart.js
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js'
import { Chart } from 'chart.js'

class FlotChartsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'CHARTS'
    this.charts = new NotikaCharts()
    this.dynamicInterval = null
    console.log('🚀 Flot Charts page initializing...')
  }

  async init() {
    await super.init()
    await this.charts.init()

    this.initializeLineChart()
    this.initializeBarChart()
    this.initializeDynamicChart()
    console.log('✅ Flot Charts functionality ready')
  }

  createCanvas(container) {
    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '300px'
    container.appendChild(canvas)
    return canvas
  }

  initializeLineChart() {
    const element = document.getElementById('line-chart')
    if (!element) return

    const canvas = this.createCanvas(element)
    const ctx = canvas.getContext('2d')

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Website Visits',
          data: [2400, 4200, 3800, 5100, 4700, 6300, 5800, 7200, 6800, 8100, 7500, 9000],
          borderColor: '#03a9f3',
          backgroundColor: 'rgba(3, 169, 243, 0.05)',
          borderWidth: 3,
          fill: true,
          tension: 0,
          pointBackgroundColor: '#03a9f3',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }, {
          label: 'Unique Visitors',
          data: [1800, 3100, 2900, 3800, 3500, 4700, 4300, 5400, 5100, 6000, 5600, 6700],
          borderColor: '#e91e63',
          backgroundColor: 'rgba(233, 30, 99, 0.05)',
          borderWidth: 3,
          fill: true,
          tension: 0,
          pointBackgroundColor: '#e91e63',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { usePointStyle: true }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            cornerRadius: 6,
            displayColors: true
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false }
          },
          y: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            border: { display: false },
            beginAtZero: true,
            ticks: {
              callback: (value) => value.toLocaleString()
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    })
  }

  initializeBarChart() {
    const element = document.getElementById('bar-chart')
    if (!element) return

    const canvas = this.createCanvas(element)
    const ctx = canvas.getContext('2d')

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue',
          data: [4800, 5200, 4900, 6100, 5800, 7200, 6500, 7800, 7100, 8500, 8000, 9200],
          backgroundColor: 'rgba(0, 194, 146, 0.8)',
          borderColor: '#00c292',
          borderWidth: 1,
          borderRadius: 4
        }, {
          label: 'Expenses',
          data: [3200, 3500, 3300, 4100, 3900, 4800, 4400, 5200, 4800, 5600, 5300, 6100],
          backgroundColor: 'rgba(3, 169, 243, 0.8)',
          borderColor: '#03a9f3',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { usePointStyle: true }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            cornerRadius: 6,
            callbacks: {
              label: (context) => `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false }
          },
          y: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            border: { display: false },
            beginAtZero: true,
            ticks: {
              callback: (value) => '$' + (value / 1000) + 'K'
            }
          }
        }
      }
    })
  }

  initializeDynamicChart() {
    const element = document.getElementById('dynamic-chart')
    if (!element) return

    const canvas = this.createCanvas(element)
    const ctx = canvas.getContext('2d')

    const maxPoints = 20
    const labels = []
    const data = []
    const now = new Date()

    for (let i = maxPoints - 1; i >= 0; i--) {
      const t = new Date(now.getTime() - i * 2000)
      labels.push(t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      data.push(Math.floor(Math.random() * 60) + 20)
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, 'rgba(156, 39, 176, 0.6)')
    gradient.addColorStop(1, 'rgba(156, 39, 176, 0.05)')

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Live Server Load (%)',
          data,
          borderColor: '#9c27b0',
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          pointHoverRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        plugins: {
          legend: {
            position: 'top',
            labels: { usePointStyle: true }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            cornerRadius: 6
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { maxTicksLimit: 6 }
          },
          y: {
            grid: { color: 'rgba(0, 0, 0, 0.05)' },
            border: { display: false },
            min: 0,
            max: 100,
            ticks: {
              callback: (value) => value + '%'
            }
          }
        }
      }
    })

    this.dynamicInterval = setInterval(() => {
      const t = new Date()
      chart.data.labels.push(t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      chart.data.datasets[0].data.push(Math.floor(Math.random() * 60) + 20)

      if (chart.data.labels.length > maxPoints) {
        chart.data.labels.shift()
        chart.data.datasets[0].data.shift()
      }

      chart.update('none')
    }, 2000)
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaFlotCharts = new FlotChartsPage()
  })
} else {
  window.NotikaFlotCharts = new FlotChartsPage()
}

export { FlotChartsPage }
