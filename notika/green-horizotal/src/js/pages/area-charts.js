/**
 * Area Charts Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js'
import { Chart } from 'chart.js'

class AreaChartsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'CHARTS'
    this.charts = new NotikaCharts()
    console.log('🚀 Area Charts page initializing...')
  }
  
  async init() {
    await super.init()
    await this.charts.init()

    // Initialize area charts specific to this page
    this.initializeAreaCharts()
    console.log('✅ Area Charts functionality ready')
  }

  initializeAreaCharts() {
    // Area Chart 1 - Basic Filled Area
    const ctx1 = document.getElementById("areachartfalse")
    if (ctx1) {
      const gradient1 = ctx1.getContext('2d').createLinearGradient(0, 0, 0, 300)
      gradient1.addColorStop(0, 'rgba(0, 194, 146, 0.8)')
      gradient1.addColorStop(1, 'rgba(0, 194, 146, 0.1)')

      new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [1200, 1500, 1100, 1800, 1600, 2000],
            borderColor: '#00c292',
            backgroundColor: gradient1,
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
          aspectRatio: 1.8,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Revenue Area Chart'
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

    // Area Chart 2 - Multiple Areas
    const ctx2 = document.getElementById("areachartorigin")
    if (ctx2) {
      const gradient2a = ctx2.getContext('2d').createLinearGradient(0, 0, 0, 300)
      gradient2a.addColorStop(0, 'rgba(3, 169, 243, 0.8)')
      gradient2a.addColorStop(1, 'rgba(3, 169, 243, 0.1)')

      const gradient2b = ctx2.getContext('2d').createLinearGradient(0, 0, 0, 300)
      gradient2b.addColorStop(0, 'rgba(255, 193, 7, 0.8)')
      gradient2b.addColorStop(1, 'rgba(255, 193, 7, 0.1)')

      new Chart(ctx2, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
          datasets: [{
            label: 'Sales',
            data: [65, 78, 90, 81, 95],
            borderColor: '#03a9f3',
            backgroundColor: gradient2a,
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }, {
            label: 'Marketing',
            data: [45, 55, 60, 70, 65],
            borderColor: '#ffc107',
            backgroundColor: gradient2b,
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
              text: 'Multi-Dataset Area Chart'
            }
          }
        }
      })
    }

    // Area Chart 3 - Stacked Areas
    const ctx3 = document.getElementById("areachartfillstart")
    if (ctx3) {
      new Chart(ctx3, {
        type: 'line',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'Desktop',
            data: [40, 45, 50, 55],
            borderColor: '#00c292',
            backgroundColor: 'rgba(0, 194, 146, 0.6)',
            borderWidth: 2,
            fill: true
          }, {
            label: 'Mobile',
            data: [30, 35, 40, 45],
            borderColor: '#03a9f3',
            backgroundColor: 'rgba(3, 169, 243, 0.6)',
            borderWidth: 2,
            fill: true
          }, {
            label: 'Tablet',
            data: [15, 20, 25, 30],
            borderColor: '#ffc107',
            backgroundColor: 'rgba(255, 193, 7, 0.6)',
            borderWidth: 2,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Stacked Area Chart - Device Usage'
            }
          }
        }
      })
    }

    // Area Chart 4 - Stepped Area
    const ctx4 = document.getElementById("areachartend")
    if (ctx4) {
      const gradient4 = ctx4.getContext('2d').createLinearGradient(0, 0, 0, 300)
      gradient4.addColorStop(0, 'rgba(233, 30, 99, 0.8)')
      gradient4.addColorStop(1, 'rgba(233, 30, 99, 0.1)')

      new Chart(ctx4, {
        type: 'line',
        data: {
          labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
          datasets: [{
            label: 'Server Load',
            data: [25, 40, 75, 60, 30],
            borderColor: '#e91e63',
            backgroundColor: gradient4,
            borderWidth: 3,
            fill: true,
            stepped: true,
            pointRadius: 8,
            pointBackgroundColor: '#e91e63',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
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
              text: 'Stepped Area Chart - Server Load'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
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

    // Area Chart 5 - Polar Area
    const ctx5 = document.getElementById("areachart5")
    if (ctx5) {
      new Chart(ctx5, {
        type: 'polarArea',
        data: {
          labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
          datasets: [{
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(0, 194, 146, 0.8)',
              'rgba(255, 193, 7, 0.8)',
              'rgba(156, 39, 176, 0.8)',
              'rgba(3, 169, 243, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(0, 194, 146, 1)',
              'rgba(255, 193, 7, 1)',
              'rgba(156, 39, 176, 1)',
              'rgba(3, 169, 243, 1)'
            ],
            borderWidth: 2
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
              text: 'Polar Area Chart'
            }
          }
        }
      })
    }

    // Area Chart 6 - Radar Chart
    const ctx6 = document.getElementById("areachart6")
    if (ctx6) {
      new Chart(ctx6, {
        type: 'radar',
        data: {
          labels: ['Speed', 'Reliability', 'Comfort', 'Safety', 'Efficiency'],
          datasets: [{
            label: 'Product A',
            data: [80, 90, 70, 85, 75],
            borderColor: '#00c292',
            backgroundColor: 'rgba(0, 194, 146, 0.2)',
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: '#00c292'
          }, {
            label: 'Product B',
            data: [70, 85, 90, 75, 80],
            borderColor: '#03a9f3',
            backgroundColor: 'rgba(3, 169, 243, 0.2)',
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: '#03a9f3'
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
              text: 'Product Comparison Radar'
            }
          },
          scales: {
            r: {
              beginAtZero: true,
              max: 100
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
    window.NotikaAreaCharts = new AreaChartsPage()
  })
} else {
  window.NotikaAreaCharts = new AreaChartsPage()
}

export { AreaChartsPage }