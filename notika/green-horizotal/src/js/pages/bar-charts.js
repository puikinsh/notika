/**
 * Bar Charts Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js'
import { Chart } from 'chart.js'

class BarChartsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'CHARTS'
    this.charts = new NotikaCharts()
    console.log('🚀 Bar Charts page initializing...')
  }
  
  async init() {
    await super.init()
    await this.charts.init()

    // Initialize bar charts specific to this page
    this.initializeBarCharts()
    console.log('✅ Bar Charts functionality ready')
  }

  initializeBarCharts() {
    // Bar Chart 1
    const ctx1 = document.getElementById("barchart1")
    if (ctx1) {
      new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green"],
          datasets: [{
            label: 'Bar Chart',
            data: [12, 19, 3, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(50, 205, 50, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }

    // Bar Chart 2 - Vertical
    const ctx2 = document.getElementById("barchart2")
    if (ctx2) {
      new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: ["January", "February"],
          datasets: [{
            label: 'Dataset 1',
            data: [150, 170],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(50, 205, 50, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }, {
            label: 'Dataset 2',
            data: [188, 177],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
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
              text: 'Bar Chart Vertical'
            }
          }
        }
      })
    }

    // Bar Chart 3 - Horizontal
    const ctx3 = document.getElementById("barchart3")
    if (ctx3) {
      new Chart(ctx3, {
        type: 'bar',
        data: {
          labels: ["May", "June"],
          datasets: [{
            label: 'Dataset 1',
            data: [3, 9],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(50, 205, 50, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }, {
            label: 'Dataset 2',
            data: [9, 15],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Bar Chart Horizontal'
            }
          }
        }
      })
    }

    // Bar Chart 4 - Multi Axis
    const ctx4 = document.getElementById("barchart4")
    if (ctx4) {
      new Chart(ctx4, {
        type: 'bar',
        data: {
          labels: ["March", "April"],
          datasets: [{
            label: 'Dataset 1',
            data: [12, 19],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(50, 205, 50, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
            yAxisID: 'y'
          }, {
            label: 'Dataset 2',
            data: [3, 6],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
            yAxisID: 'y1'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          interaction: {
            mode: 'index',
            intersect: false
          },
          plugins: {
            title: {
              display: true,
              text: 'Bar Chart Multi Axis'
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

    // Bar Chart 5 - Stacked Bar Chart
    const ctx5 = document.getElementById("barchart5")
    if (ctx5) {
      new Chart(ctx5, {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'Sales',
            data: [120, 150, 180, 200],
            backgroundColor: 'rgba(0, 194, 146, 0.8)',
            borderColor: 'rgba(0, 194, 146, 1)',
            borderWidth: 1
          }, {
            label: 'Marketing',
            data: [80, 90, 100, 110],
            backgroundColor: 'rgba(3, 169, 243, 0.8)',
            borderColor: 'rgba(3, 169, 243, 1)',
            borderWidth: 1
          }, {
            label: 'Support',
            data: [40, 50, 60, 70],
            backgroundColor: 'rgba(255, 193, 7, 0.8)',
            borderColor: 'rgba(255, 193, 7, 1)',
            borderWidth: 1
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
              text: 'Quarterly Department Performance'
            }
          }
        }
      })
    }

    // Bar Chart 6 - Grouped Bar Chart
    const ctx6 = document.getElementById("barchart6")
    if (ctx6) {
      new Chart(ctx6, {
        type: 'bar',
        data: {
          labels: ['Product A', 'Product B', 'Product C', 'Product D'],
          datasets: [{
            label: '2023',
            data: [65, 78, 90, 81],
            backgroundColor: 'rgba(156, 39, 176, 0.8)',
            borderColor: 'rgba(156, 39, 176, 1)',
            borderWidth: 1
          }, {
            label: '2024',
            data: [85, 95, 105, 92],
            backgroundColor: 'rgba(233, 30, 99, 0.8)',
            borderColor: 'rgba(233, 30, 99, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.8,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Product Performance Comparison'
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
    window.NotikaBarCharts = new BarChartsPage()
  })
} else {
  window.NotikaBarCharts = new BarChartsPage()
}

export { BarChartsPage }