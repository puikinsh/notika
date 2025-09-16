/**
 * Dashboard Two Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js'
import { Chart } from 'chart.js'

class DashboardTwoPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'DASHBOARD'
    this.charts = new NotikaCharts()
    console.log('🚀 Dashboard Two initializing...')
  }

  async init() {
    await super.init()
    await this.charts.init()
    this.initializeDashboardFeatures()
    console.log('✅ Dashboard Two functionality ready')
  }

  initializeDashboardFeatures() {
    // Initialize all Project Management dashboard sections
    this.initializeProjectSparklines()
    this.initializeProjectTimelineChart()
    this.initializeTeamPerformanceCharts()
    this.initializeResourceAllocationChart()
    this.initializeSprintBurndownChart()
    console.log('✅ Project Management Dashboard features initialized')
  }

  initializeProjectSparklines() {
    // Initialize project-focused sparkline charts
    const sparklineConfigs = [
      { class: 'sparkline-bar-stats1', data: [5,8,12,9,15,18,20,16,22,19,24,21], color: '#00c292', label: 'Projects' },
      { class: 'sparkline-bar-stats2', data: [8,12,15,18,22,25,28,24,30,26,32,29], color: '#03a9f3', label: 'Tasks' },
      { class: 'sparkline-bar-stats3', data: [10,11,12,11,12,12,12,12,12,12,12,12], color: '#ffc107', label: 'Team' },
      { class: 'sparkline-bar-stats4', data: [75,78,82,85,87,89,88,89,90,88,91,89], color: '#e91e63', label: 'Success' }
    ]

    sparklineConfigs.forEach(config => {
      const element = document.querySelector(`.${config.class}`)
      if (element) {
        // ALWAYS clear to prevent duplicates
        element.innerHTML = ''

        const canvas = document.createElement('canvas')
        // Let CSS handle the sizing - force it to use container dimensions
        canvas.width = 250
        canvas.height = 60
        // Remove style overrides - let CSS rules take precedence
        element.appendChild(canvas)

        const ctx = canvas.getContext('2d')
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: config.data.map((_, i) => i),
            datasets: [{
              data: config.data,
              borderColor: config.color,
              backgroundColor: `${config.color}40`,
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio || 1,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false }
            },
            scales: {
              x: { display: false },
              y: { display: false }
            },
            animation: {
              duration: 1000,
              easing: 'easeOutQuart'
            }
          }
        })
      }
    })
  }

  initializeProjectTimelineChart() {
    // Initialize the main project timeline analytics chart
    const timelineChart = document.getElementById('curved-line-chart')
    if (timelineChart) {
      // ALWAYS clear to prevent duplicates
      timelineChart.innerHTML = ''

      const canvas = document.createElement('canvas')
      canvas.width = 800
      canvas.height = 300
      canvas.style.width = '100%'
      canvas.style.height = '300px'
      timelineChart.appendChild(canvas)

      const ctx = canvas.getContext('2d')
      const gradient1 = ctx.createLinearGradient(0, 0, 0, 300)
      gradient1.addColorStop(0, 'rgba(0, 194, 146, 0.3)')
      gradient1.addColorStop(1, 'rgba(0, 194, 146, 0.0)')

      const gradient2 = ctx.createLinearGradient(0, 0, 0, 300)
      gradient2.addColorStop(0, 'rgba(3, 169, 243, 0.3)')
      gradient2.addColorStop(1, 'rgba(3, 169, 243, 0.0)')

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Projects Completed',
              data: [2, 4, 3, 6, 5, 8, 7, 9, 8, 11, 10, 12],
              borderColor: '#00c292',
              backgroundColor: gradient1,
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#00c292',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 6
            },
            {
              label: 'Tasks Completed',
              data: [15, 22, 18, 28, 25, 35, 32, 42, 38, 48, 45, 52],
              borderColor: '#03a9f3',
              backgroundColor: gradient2,
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#03a9f3',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: window.devicePixelRatio || 1,
          resizeDelay: 100,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 15,
                font: { size: 11 }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#00c292',
              borderWidth: 1,
              cornerRadius: 6,
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              border: { display: false },
              ticks: {
                callback: (value) => `${value}`,
                font: { size: 11 }
              }
            }
          },
          animation: {
            duration: 1500,
            easing: 'easeOutQuart'
          }
        }
      })
    }
  }

  initializeTeamPerformanceCharts() {
    // Initialize the team performance mini charts
    const statsConfigs = [
      { class: 'stats-bar', data: [8,12,10,15,18,22,19,25], color: '#00c292', label: 'Issues' },
      { class: 'stats-line', data: [25,35,42,38,45,52,48,58], color: '#03a9f3', label: 'Commits' },
      { class: 'stats-bar-2', data: [95,97,98,96,98,99,97,98], color: '#ffc107', label: 'Uptime' }
    ]

    statsConfigs.forEach(config => {
      const element = document.querySelector(`.${config.class}`)
      if (element) {
        // ALWAYS clear to prevent duplicates
        element.innerHTML = ''

        const canvas = document.createElement('canvas')
        canvas.width = 80
        canvas.height = 30
        canvas.style.width = '80px'
        canvas.style.height = '30px'
        element.appendChild(canvas)

        const ctx = canvas.getContext('2d')
        new Chart(ctx, {
          type: config.class.includes('line') ? 'line' : 'bar',
          data: {
            labels: config.data.map((_, i) => i),
            datasets: [{
              data: config.data,
              borderColor: config.color,
              backgroundColor: config.class.includes('line') ? 'transparent' : config.color,
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              pointRadius: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            devicePixelRatio: window.devicePixelRatio || 1,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false }
            },
            scales: {
              x: { display: false },
              y: { display: false }
            },
            animation: {
              duration: 1000,
              easing: 'easeOutQuart'
            }
          }
        })
      }
    })
  }

  initializeResourceAllocationChart() {
    // Use EXACT same pattern as working recent-items-chart from main.js
    const element = document.getElementById('resource-allocation-chart')
    if (element) {
      const canvas = document.createElement('canvas')
      canvas.style.width = '160px'
      canvas.style.height = '160px'
      canvas.style.margin = '0 auto'
      canvas.style.display = 'block'
      element.appendChild(canvas)

      const ctx = canvas.getContext('2d')
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Development', 'Infrastructure', 'Testing', 'Design'],
          datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: ['#00c292', '#03a9f3', '#ffc107', '#e91e63'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: false,
          maintainAspectRatio: true,
          devicePixelRatio: window.devicePixelRatio || 1,
          resizeDelay: 100,
          radius: '85%',
          cutout: '45%',
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                padding: 8,
                font: { size: 10 },
                boxWidth: 8,
                color: '#666'
              }
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed}%`
              }
            }
          },
          animation: {
            animateRotate: true,
            duration: 1000
          }
        }
      })
    }
  }

  initializeSprintBurndownChart() {
    // Initialize sprint burndown chart
    const burndownChart = document.getElementById('sprint-burndown-chart')
    if (burndownChart) {
      // ALWAYS clear to prevent duplicates
      burndownChart.innerHTML = ''

      const ctx = burndownChart.getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8'],
          datasets: [
            {
              label: 'Ideal Burndown',
              data: [32, 28, 24, 20, 16, 12, 8, 4],
              borderColor: '#ddd',
              backgroundColor: 'transparent',
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0
            },
            {
              label: 'Actual Progress',
              data: [32, 29, 25, 22, 19, 15, 11, 8],
              borderColor: '#00c292',
              backgroundColor: 'rgba(0, 194, 146, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.3,
              pointBackgroundColor: '#00c292',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          devicePixelRatio: window.devicePixelRatio || 1,
          resizeDelay: 100,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                padding: 12,
                font: { size: 10 }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#00c292',
              borderWidth: 1,
              cornerRadius: 6
            }
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { font: { size: 9 } }
            },
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              border: { display: false },
              ticks: {
                font: { size: 9 },
                callback: (value) => `${value} pts`
              }
            }
          },
          animation: {
            duration: 1200,
            easing: 'easeOutQuart'
          }
        }
      })
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaDashboard2 = new DashboardTwoPage()
  })
} else {
  window.NotikaDashboard2 = new DashboardTwoPage()
}

export { DashboardTwoPage }