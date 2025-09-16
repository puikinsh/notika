/**
 * Line Charts Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js'
import { Chart } from 'chart.js'

class LineChartsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'CHARTS'
    this.charts = new NotikaCharts()
    console.log('🚀 Line Charts page initializing...')
  }
  
  async init() {
    await super.init()
    await this.charts.init()

    // Initialize line charts specific to this page
    this.initializeLineCharts()
    console.log('✅ Line Charts functionality ready')
  }

  initializeLineCharts() {
    // Basic Line Chart
    const ctx1 = document.getElementById("basiclinechart")
    if (ctx1) {
      new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55],
            borderColor: '#00c292',
            backgroundColor: 'rgba(0, 194, 146, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Monthly Sales Performance'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }

    // Line Chart with Interpolation
    const ctx2 = document.getElementById("linechartinterpolation")
    if (ctx2) {
      new Chart(ctx2, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
          datasets: [{
            label: 'Smooth',
            data: [10, 25, 15, 40, 30],
            borderColor: '#03a9f3',
            backgroundColor: 'rgba(3, 169, 243, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }, {
            label: 'Linear',
            data: [20, 35, 25, 50, 45],
            borderColor: '#ffc107',
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Interpolation Comparison'
            }
          }
        }
      })
    }

    // Line Chart with Styles
    const ctx3 = document.getElementById("linechartstyles")
    if (ctx3) {
      new Chart(ctx3, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Dashed',
            data: [30, 45, 35, 60, 55, 40, 50],
            borderColor: '#e91e63',
            borderWidth: 3,
            borderDash: [10, 5],
            fill: false
          }, {
            label: 'Dotted',
            data: [20, 30, 25, 40, 35, 30, 45],
            borderColor: '#9c27b0',
            borderWidth: 3,
            borderDash: [2, 2],
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Different Line Styles'
            }
          }
        }
      })
    }

    // Line Chart with Point Styles
    const ctx4 = document.getElementById("linechartpointcircle")
    if (ctx4) {
      new Chart(ctx4, {
        type: 'line',
        data: {
          labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
          datasets: [{
            label: 'Circle Points',
            data: [40, 60, 45, 70, 55],
            borderColor: '#00c292',
            backgroundColor: '#00c292',
            borderWidth: 3,
            pointRadius: 8,
            pointHoverRadius: 12,
            pointBackgroundColor: '#00c292',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Enhanced Point Styling'
            }
          }
        }
      })
    }

    // Line Chart 5 - Multi-Axis
    const ctx5 = document.getElementById("linechart5")
    if (ctx5) {
      new Chart(ctx5, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue ($)',
            data: [1200, 1500, 1800, 1400, 1700, 2000],
            borderColor: '#00c292',
            backgroundColor: 'rgba(0, 194, 146, 0.1)',
            borderWidth: 3,
            fill: true,
            yAxisID: 'y'
          }, {
            label: 'Users',
            data: [80, 120, 150, 100, 140, 180],
            borderColor: '#e91e63',
            backgroundColor: 'rgba(233, 30, 99, 0.1)',
            borderWidth: 3,
            fill: false,
            yAxisID: 'y1'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Revenue vs Users Growth'
            }
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left'
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }
      })
    }

    // Line Chart 6 - Area Chart
    const ctx6 = document.getElementById("linechart6")
    if (ctx6) {
      const gradient = ctx6.getContext('2d').createLinearGradient(0, 0, 0, 400)
      gradient.addColorStop(0, 'rgba(3, 169, 243, 0.8)')
      gradient.addColorStop(1, 'rgba(3, 169, 243, 0.1)')

      new Chart(ctx6, {
        type: 'line',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'Profit Margin',
            data: [25, 35, 42, 38],
            borderColor: '#03a9f3',
            backgroundColor: gradient,
            borderWidth: 4,
            fill: true,
            tension: 0.4,
            pointRadius: 8,
            pointBackgroundColor: '#03a9f3',
            pointBorderColor: '#fff',
            pointBorderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Quarterly Profit Margin (%)'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 50,
              ticks: {
                callback: function(value) {
                  return value + '%'
                }
              }
            }
          }
        }
      })
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaLineCharts = new LineChartsPage()
  })
} else {
  window.NotikaLineCharts = new LineChartsPage()
}

export { LineChartsPage }