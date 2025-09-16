/**
 * Advanced E-commerce Dashboard - Modern Vite Implementation
 * Features AI-powered analytics, real-time sales tracking, predictive inventory, and customer insights
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js'
import Chart from 'chart.js/auto'

class AdvancedEcommerceDashboard extends NotikaApp {
  constructor() {
    super()

    this.pageType = 'ADVANCED_ECOMMERCE_DASHBOARD'
    console.log('🚀 Advanced E-commerce Dashboard initializing...')

    // Chart instances storage
    this.charts = {}

    // Live data simulation
    this.liveDataInterval = null

    // Override to provide data for sparklines
    this.initializeSparklines = () => {
      // Set data attributes for sparklines to use
      const stats1 = document.querySelector('.sparkline-bar-stats1')
      const stats2 = document.querySelector('.sparkline-bar-stats2')
      const stats3 = document.querySelector('.sparkline-bar-stats3')
      const stats4 = document.querySelector('.sparkline-bar-stats4')

      if (stats1) stats1.setAttribute('data-sparkline', '9,4,8,6,5,6,4,8,3,5,9,5')
      if (stats2) stats2.setAttribute('data-sparkline', '1,4,8,3,5,6,4,8,3,3,9,5')
      if (stats3) stats3.setAttribute('data-sparkline', '4,2,8,2,5,6,3,8,3,5,9,5')
      if (stats4) stats4.setAttribute('data-sparkline', '2,4,8,4,5,7,4,7,3,5,7,5')

      // Call parent implementation
      super.initializeSparklines()
    }

    this.initializeKnobs = () => {
      console.log('⏭️ Skipping parent knobs initialization')
    }
    this.initializeCharts = () => {
      console.log('⏭️ Skipping parent charts initialization')
    }

    // Initialize all dashboard features
    this.initDashboard()
  }

  /**
   * Initialize all dashboard components
   */
  initDashboard() {
    // Wait for DOM to be fully ready
    setTimeout(() => {
      // Initialize main sales chart
      this.initAdvancedSalesChart()

      // Initialize live sales feed
      this.initLiveSalesFeed()

      // Initialize AI inventory forecast
      this.initInventoryForecast()

      // Initialize customer segments chart
      this.initCustomerSegments()

      // Initialize shipping visualization
      this.initShippingVisualization()

      // Initialize marketing ROI chart
      this.initMarketingROI()

      // Initialize product performance matrix
      this.initProductMatrix()

      // Handle period switching
      this.initPeriodSwitching()

      // Add pulse animation CSS
      this.addPulseAnimation()

      console.log('✅ Advanced E-commerce Dashboard initialized')
    }, 100)
  }


  /**
   * Initialize advanced sales chart with multiple datasets
   */
  initAdvancedSalesChart() {
    const canvas = document.getElementById('advancedSalesChart')
    if (!canvas) return

    // Destroy existing chart if it exists
    if (this.charts.advancedSales) {
      this.charts.advancedSales.destroy()
    }

    const ctx = canvas.getContext('2d')
    this.charts.advancedSales = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
        datasets: [{
          label: 'Revenue',
          data: [1200, 1900, 3000, 5000, 4200, 3800, 2900],
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          yAxisID: 'y'
        }, {
          label: 'Orders',
          data: [15, 23, 38, 65, 52, 47, 35],
          borderColor: '#00c292',
          backgroundColor: 'rgba(0, 194, 146, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          yAxisID: 'y1'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 100,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#667eea',
            borderWidth: 1,
            displayColors: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || ''
                if (label) {
                  label += ': '
                }
                if (context.parsed.y !== null) {
                  if (context.datasetIndex === 0) {
                    label += new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(context.parsed.y)
                  } else {
                    label += context.parsed.y + ' orders'
                  }
                }
                return label
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              }
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              drawBorder: false,
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString()
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              callback: function(value) {
                return value + ' orders'
              }
            }
          }
        }
      }
    })
  }

  /**
   * Initialize live sales feed with real-time updates
   */
  initLiveSalesFeed() {
    const products = [
      { name: 'iPhone 15 Pro Max', price: 1199 },
      { name: 'MacBook Air M3', price: 1299 },
      { name: 'iPad Pro 12.9"', price: 1099 },
      { name: 'AirPods Pro', price: 249 },
      { name: 'Apple Watch Ultra', price: 799 },
      { name: 'Mac Studio', price: 1999 }
    ]

    const customers = ['John D.', 'Sarah M.', 'Mike R.', 'Emily K.', 'David L.', 'Lisa W.']

    // Simulate new sales every 5 seconds
    this.liveDataInterval = setInterval(() => {
      const feed = document.getElementById('liveSalesFeed')
      if (!feed) return

      const product = products[Math.floor(Math.random() * products.length)]
      const customer = customers[Math.floor(Math.random() * customers.length)]

      const saleItem = document.createElement('div')
      saleItem.className = 'live-sale-item p-2 border-bottom fade-in'
      saleItem.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-0" style="font-size: 0.9rem;">${product.name}</h6>
            <small class="text-muted" style="font-size: 0.75rem;">${customer} • Just now</small>
          </div>
          <div class="text-end">
            <span class="badge bg-success">$${product.price.toLocaleString()}</span>
          </div>
        </div>
      `

      // Add to top of feed
      feed.insertBefore(saleItem, feed.firstChild)

      // Remove old items if too many (keep max 7 for compact view)
      while (feed.children.length > 7) {
        feed.removeChild(feed.lastChild)
      }

      // Animate entry
      setTimeout(() => saleItem.classList.add('show'), 10)

    }, 5000)
  }

  /**
   * Initialize AI inventory forecast chart
   */
  initInventoryForecast() {
    const canvas = document.getElementById('inventoryForecastChart')
    if (!canvas) return

    // Destroy existing chart if it exists
    if (this.charts.inventoryForecast) {
      this.charts.inventoryForecast.destroy()
    }

    const ctx = canvas.getContext('2d')
    this.charts.inventoryForecast = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Predicted Demand',
          data: [120, 150, 180, 220, 250, 320, 280],
          backgroundColor: 'rgba(102, 126, 234, 0.8)',
          borderRadius: 5
        }, {
          label: 'Current Stock',
          data: [200, 180, 150, 120, 80, 40, 20],
          backgroundColor: 'rgba(0, 194, 146, 0.8)',
          borderRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 10,
              font: { size: 11 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 10
          }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            grid: {
              drawBorder: false,
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return value + ' units'
              }
            }
          }
        }
      }
    })

    // Handle refresh button
    const refreshBtn = document.getElementById('refreshInventory')
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        // Rotate icon
        refreshBtn.style.transform = 'rotate(360deg)'
        refreshBtn.style.transition = 'transform 0.5s'

        // Update data with random values
        this.charts.inventoryForecast.data.datasets[0].data =
          this.charts.inventoryForecast.data.datasets[0].data.map(() =>
            Math.floor(Math.random() * 300) + 100
          )
        this.charts.inventoryForecast.update()

        setTimeout(() => {
          refreshBtn.style.transform = ''
        }, 500)
      })
    }
  }

  /**
   * Initialize customer segments doughnut chart
   */
  initCustomerSegments() {
    const canvas = document.getElementById('customerSegmentChart')
    if (!canvas) return

    // Destroy existing chart if it exists
    if (this.charts.customerSegments) {
      this.charts.customerSegments.destroy()
    }

    const ctx = canvas.getContext('2d')
    this.charts.customerSegments = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['VIP', 'Returning', 'New', 'At Risk', 'Lost'],
        datasets: [{
          data: [287, 1456, 892, 234, 156],
          backgroundColor: [
            '#667eea',
            '#00c292',
            '#03a9f3',
            '#ffc107',
            '#e91e63'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 15,
              usePointStyle: true,
              font: { size: 11 }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 10,
            callbacks: {
              label: function(context) {
                const label = context.label || ''
                const value = context.parsed
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return label + ': ' + value + ' (' + percentage + '%)'
              }
            }
          }
        }
      }
    })
  }

  /**
   * Initialize shipping route visualization
   */
  initShippingVisualization() {
    const canvas = document.getElementById('shippingRouteVisualization')
    if (!canvas) return

    const container = canvas.parentElement
    if (!container) return

    // Set canvas size to match container
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight

    // Set canvas style to fill container
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    const ctx = canvas.getContext('2d')

    // Simple animated dots representing deliveries
    const drawShippingAnimation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connection lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.lineWidth = 1

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw radial lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8
        const x = centerX + Math.cos(angle) * 80
        const y = centerY + Math.sin(angle) * 80

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Draw dots
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw center hub
      ctx.fillStyle = '#00c292'
      ctx.beginPath()
      ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
      ctx.fill()
    }

    drawShippingAnimation()
  }

  /**
   * Initialize marketing ROI chart
   */
  initMarketingROI() {
    const canvas = document.getElementById('marketingROIChart')
    if (!canvas) return

    // Destroy existing chart if it exists
    if (this.charts.marketingROI) {
      this.charts.marketingROI.destroy()
    }

    const ctx = canvas.getContext('2d')
    this.charts.marketingROI = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Email', 'Social Media', 'PPC', 'SEO', 'Affiliate', 'Direct'],
        datasets: [{
          label: 'Current Month',
          data: [312, 245, 189, 267, 198, 223],
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.2)',
          borderWidth: 2
        }, {
          label: 'Previous Month',
          data: [287, 212, 201, 245, 176, 198],
          borderColor: '#00c292',
          backgroundColor: 'rgba(0, 194, 146, 0.2)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 10,
              font: { size: 11 }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 400,
            ticks: {
              stepSize: 100,
              callback: function(value) {
                return value + '%'
              }
            }
          }
        }
      }
    })
  }

  /**
   * Initialize product performance matrix
   */
  initProductMatrix() {
    const canvas = document.getElementById('productMatrixChart')
    if (!canvas) return

    // Destroy existing chart if it exists
    if (this.charts.productMatrix) {
      this.charts.productMatrix.destroy()
    }

    const ctx = canvas.getContext('2d')
    this.charts.productMatrix = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Electronics',
          data: [{ x: 85, y: 32.5 }],
          backgroundColor: '#667eea',
          pointRadius: 15
        }, {
          label: 'Accessories',
          data: [{ x: 72, y: 28.3 }],
          backgroundColor: '#00c292',
          pointRadius: 12
        }, {
          label: 'Software',
          data: [{ x: 45, y: 45.2 }],
          backgroundColor: '#03a9f3',
          pointRadius: 10
        }, {
          label: 'Services',
          data: [{ x: 30, y: 52.1 }],
          backgroundColor: '#ffc107',
          pointRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 10,
              font: { size: 11 }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': Sales Index ' + context.parsed.x + ', Margin ' + context.parsed.y + '%'
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Sales Index'
            },
            min: 0,
            max: 100
          },
          y: {
            title: {
              display: true,
              text: 'Profit Margin (%)'
            },
            min: 0,
            max: 60
          }
        }
      }
    })
  }

  /**
   * Initialize period switching for charts
   */
  initPeriodSwitching() {
    const buttons = document.querySelectorAll('[data-period]')

    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'))

        // Add active class to clicked button
        e.target.classList.add('active')

        const period = e.target.dataset.period
        console.log('📊 Switching to period:', period)

        // Update chart data based on period
        this.updateChartsPeriod(period)
      })
    })
  }

  /**
   * Update charts based on selected period
   */
  updateChartsPeriod(period) {
    // Generate different data based on period
    const dataMultipliers = {
      day: 1,
      week: 7,
      month: 30,
      year: 365
    }

    const multiplier = dataMultipliers[period] || 1

    // Update advanced sales chart
    if (this.charts.advancedSales) {
      this.charts.advancedSales.data.datasets[0].data =
        this.charts.advancedSales.data.datasets[0].data.map(val =>
          Math.floor(val * multiplier / 10)
        )
      this.charts.advancedSales.update()
    }
  }

  /**
   * Add pulse animation CSS
   */
  addPulseAnimation() {
    if (!document.getElementById('pulseAnimationStyles')) {
      const style = document.createElement('style')
      style.id = 'pulseAnimationStyles'
      style.textContent = `
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        .fade-in {
          opacity: 0;
          transition: opacity 0.5s ease-in;
        }

        .fade-in.show {
          opacity: 1;
        }

        .progress-group {
          margin-bottom: 1rem;
        }

        .progress-group span {
          display: block;
          margin-bottom: 0.25rem;
          font-size: 0.875rem;
        }

        .text-white-50 {
          color: rgba(255, 255, 255, 0.7) !important;
        }
      `
      document.head.appendChild(style)
    }
  }

  /**
   * Cleanup on destroy
   */
  destroy() {
    // Clear live data interval
    if (this.liveDataInterval) {
      clearInterval(this.liveDataInterval)
    }

    // Destroy all charts
    Object.values(this.charts).forEach(chart => {
      if (chart) chart.destroy()
    })

    console.log('🔚 Advanced E-commerce Dashboard destroyed')
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaAdvancedEcommerce = new AdvancedEcommerceDashboard()
  })
} else {
  window.NotikaAdvancedEcommerce = new AdvancedEcommerceDashboard()
}

export { AdvancedEcommerceDashboard }