/**
 * Widgets Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'
import { NotikaCharts } from '../modules/charts.js'
import { Chart } from 'chart.js'

class WidgetsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'WIDGETS'
    this.ui = new NotikaUI()
    this.charts = new NotikaCharts()
    this.counters = new Map()
    console.log('🚀 Widgets page initializing...')
  }

  async init() {
    await super.init()
    await this.ui.init()
    await this.charts.init()
    this.initializeWidgets()
    this.initializeWidgetCharts()
    console.log('✅ Widgets functionality ready')
  }

  initializeWidgets() {
    // Initialize sparkline charts
    this.initializeSparklines()

    // Initialize counter animations
    this.initializeCounters()

    // Initialize widget interactions
    this.initializeWidgetInteractions()

    // Initialize tabs
    this.initializeTabs()

    // Initialize tooltips
    this.initializeTooltips()

    console.log('✅ All widgets initialized')
  }

  initializeSparklines() {
    // Initialize sparklines with data from data attributes
    const sparklines = document.querySelectorAll('[data-sparkline]')

    sparklines.forEach(sparkline => {
      const data = sparkline.getAttribute('data-sparkline')
      if (data) {
        const values = data.split(',').map(v => parseInt(v.trim()))
        this.createSparklineChart(sparkline, values)
      }
    })

    console.log('✅ Sparklines initialized')
  }

  createSparklineChart(element, data) {
    // Create a simple SVG sparkline
    const width = element.offsetWidth || 100
    const height = 30
    const maxVal = Math.max(...data)
    const minVal = Math.min(...data)
    const range = maxVal - minVal || 1

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display: block; width: 100%; height: ${height}px;">`

    // Create path for line
    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width
      const y = height - ((val - minVal) / range) * height
      return `${x},${y}`
    }).join(' ')

    svg += `<polyline fill="none" stroke="#00c292" stroke-width="2" points="${points}" />`

    // Add dots
    data.forEach((val, idx) => {
      const x = (idx / (data.length - 1)) * width
      const y = height - ((val - minVal) / range) * height
      svg += `<circle cx="${x}" cy="${y}" r="2" fill="#00c292" />`
    })

    svg += '</svg>'
    element.innerHTML = svg
  }

  initializeCounters() {
    const counters = document.querySelectorAll('.counter')

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
          entry.target.setAttribute('data-counted', 'true')
          this.animateCounter(entry.target)
        }
      })
    }, { threshold: 0.5 })

    counters.forEach(counter => {
      observer.observe(counter)
    })

    console.log('✅ Counter animations ready')
  }

  animateCounter(counter) {
    const target = parseInt(counter.textContent.replace(/,/g, '')) || 0
    const duration = 2000 // 2 seconds
    const start = Date.now()
    const startValue = 0

    const updateCounter = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)

      // Ease out animation
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(startValue + (target - startValue) * easeOut)

      counter.textContent = current.toLocaleString()

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target.toLocaleString()
      }
    }

    requestAnimationFrame(updateCounter)
  }

  initializeWidgetInteractions() {
    // Initialize progress bar animations
    this.initializeProgressBars()

    // Initialize signup widget interactions
    this.initializeSignupWidget()

    // Initialize contact form
    this.initializeContactForm()

    console.log('✅ Widget interactions initialized')
  }

  initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const targetWidth = progressBar.getAttribute('data-progress') || progressBar.style.width

          // Reset and animate
          progressBar.style.width = '0%'
          setTimeout(() => {
            progressBar.style.transition = 'width 1.5s ease-in-out'
            progressBar.style.width = targetWidth
          }, 200)
        }
      })
    }, { threshold: 0.5 })

    progressBars.forEach(bar => observer.observe(bar))
  }

  initializeSignupWidget() {
    const signupLinks = document.querySelectorAll('.signup-wd-mn, .widget-signup-list a')

    signupLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        console.log('User clicked:', link.getAttribute('title') || link.textContent)
      })

      // Add hover effects
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'scale(1.1)'
        link.style.transition = 'transform 0.2s ease'
      })

      link.addEventListener('mouseleave', () => {
        link.style.transform = 'scale(1)'
      })
    })
  }

  initializeContactForm() {
    const contactForm = document.querySelector('.contact-form-int')

    if (contactForm) {
      const form = contactForm.closest('form') || contactForm
      const button = form.querySelector('.button')

      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault()

          // Simple form validation
          const inputs = form.querySelectorAll('input, textarea')
          let valid = true

          inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
              valid = false
              input.classList.add('is-invalid')
            } else {
              input.classList.remove('is-invalid')
            }
          })

          if (valid) {
            button.textContent = 'Sending...'
            button.disabled = true

            // Simulate form submission
            setTimeout(() => {
              button.textContent = 'Sent!'
              button.classList.remove('btn-primary')
              button.classList.add('btn-success')

              setTimeout(() => {
                button.textContent = 'Button'
                button.disabled = false
                button.classList.remove('btn-success')
                button.classList.add('btn-primary')
              }, 2000)
            }, 1000)
          }
        })
      }
    }
  }

  initializeTabs() {
    const tabLinks = document.querySelectorAll('.nav-tabs a[data-bs-toggle="tab"]')

    tabLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()

        // Remove active class from all tabs and panes
        document.querySelectorAll('.nav-tabs li').forEach(li => li.classList.remove('active'))
        document.querySelectorAll('.tab-pane').forEach(pane => {
          pane.classList.remove('active', 'in')
        })

        // Add active class to clicked tab
        link.closest('li').classList.add('active')

        // Show corresponding pane
        const targetId = link.getAttribute('href')
        const targetPane = document.querySelector(targetId)
        if (targetPane) {
          targetPane.classList.add('active', 'in')
        }

        console.log('Tab switched to:', targetId)
      })
    })

    console.log('✅ Tabs initialized')
  }

  initializeTooltips() {
    // Initialize tooltips for signup widgets
    const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]')

    tooltipElements.forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        const title = element.getAttribute('title') || element.getAttribute('data-original-title')
        if (title) {
          this.showTooltip(element, title)
        }
      })

      element.addEventListener('mouseleave', () => {
        this.hideTooltip()
      })
    })

    console.log('✅ Tooltips initialized')
  }

  showTooltip(element, text) {
    // Remove existing tooltip
    this.hideTooltip()

    const tooltip = document.createElement('div')
    tooltip.id = 'custom-tooltip'
    tooltip.className = 'position-absolute bg-dark text-white px-2 py-1 rounded small'
    tooltip.style.zIndex = '9999'
    tooltip.style.pointerEvents = 'none'
    tooltip.textContent = text

    document.body.appendChild(tooltip)

    const rect = element.getBoundingClientRect()
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px'
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px'
  }

  hideTooltip() {
    const tooltip = document.getElementById('custom-tooltip')
    if (tooltip) {
      tooltip.remove()
    }
  }

  initializeWidgetCharts() {
    // Create the main Revenue & Order Analytics chart for widgets showcase
    this.createMainChart()

    // Create mini charts for performance metrics
    this.createMiniCharts()
  }

  createMainChart() {
    const canvas = document.getElementById('widgetsChart')
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Create gradient for the chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 350)
    gradient.addColorStop(0, 'rgba(0, 194, 146, 0.4)')
    gradient.addColorStop(1, 'rgba(0, 194, 146, 0.05)')

    // Create the chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 14500, 11800, 15200, 13900, 16800, 18500],
          borderColor: '#00c292',
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#00c292',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }, {
          label: 'Orders',
          data: [145, 178, 142, 195, 168, 210, 245],
          borderColor: '#03a9f3',
          backgroundColor: 'rgba(3, 169, 243, 0.1)',
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          yAxisID: 'y1',
          pointBackgroundColor: '#03a9f3',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
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
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 6,
            displayColors: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || ''
                if (label) {
                  label += ': '
                }
                if (context.datasetIndex === 0) {
                  label += '$' + context.parsed.y.toLocaleString()
                } else {
                  label += context.parsed.y + ' orders'
                }
                return label
              }
            }
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return '$' + (value / 1000) + 'k'
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

    console.log('✅ Widgets showcase chart initialized')
  }

  createMiniCharts() {
    // Create Issues Resolved mini chart
    const issuesCanvas = document.getElementById('issuesChart')
    if (issuesCanvas) {
      const ctx = issuesCanvas.getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            data: [5, 8, 6, 9, 7, 8, 6],
            borderColor: '#00c292',
            backgroundColor: 'rgba(0, 194, 146, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          scales: {
            x: { display: false },
            y: { display: false }
          }
        }
      })
    }

    // Create Code Commits mini chart
    const commitsCanvas = document.getElementById('commitsChart')
    if (commitsCanvas) {
      const ctx = commitsCanvas.getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['W1', 'W2', 'W3', 'W4'],
          datasets: [{
            data: [180, 220, 245, 247],
            backgroundColor: '#03a9f3',
            borderRadius: 3,
            barThickness: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          scales: {
            x: { display: false },
            y: { display: false }
          }
        }
      })
    }

    console.log('✅ Mini performance charts initialized')
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaWidgets = new WidgetsPage()
  })
} else {
  window.NotikaWidgets = new WidgetsPage()
}

export { WidgetsPage }