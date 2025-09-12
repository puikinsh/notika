/**
 * Modern Charts Module
 * Using Chart.js 4.5.0 with ES6 modules
 */

import { Chart } from 'chart.js'

export class NotikaCharts {
  constructor() {
    this.charts = new Map()
    this.colors = {
      primary: '#00c292',
      secondary: '#03a9f3', 
      success: '#00c292',
      warning: '#ff9800',
      danger: '#e91e63',
      info: '#03a9f3',
      light: '#f8f9fa',
      dark: '#343a40'
    }
  }
  
  async init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve)
      })
    }
    
    this.initializeSalesChart()
    this.initializeRecentItemsChart()
    this.initializeSparklines()
    this.initializeKnobCharts()
  }
  
  createGradient(ctx, colorStart, colorEnd, height = 300) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, colorStart)
    gradient.addColorStop(1, colorEnd)
    return gradient
  }
  
  initializeSalesChart() {
    const element = document.getElementById('curved-line-chart')
    if (!element) return
    
    // Create canvas
    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '300px'
    element.appendChild(canvas)
    
    const ctx = canvas.getContext('2d')
    const gradient = this.createGradient(ctx, 'rgba(0, 194, 146, 0.8)', 'rgba(0, 194, 146, 0.1)')
    
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Sales',
          data: [30000, 35000, 28000, 45000, 42000, 55000, 48000, 52000, 60000, 58000, 65000, 70000],
          borderColor: this.colors.primary,
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: this.colors.primary,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 6,
            displayColors: false,
            callbacks: {
              label: (context) => `Sales: $${context.parsed.y.toLocaleString()}`
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
            ticks: {
              callback: (value) => `$${(value / 1000)}K`
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    })
    
    this.charts.set('sales-chart', chart)
  }
  
  initializeRecentItemsChart() {
    const element = document.getElementById('recent-items-chart')
    if (!element) return
    
    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '150px'
    element.appendChild(canvas)
    
    const ctx = canvas.getContext('2d')
    const gradient = this.createGradient(ctx, 'rgba(3, 169, 243, 0.6)', 'rgba(3, 169, 243, 0.1)', 150)
    
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [{
          data: [20, 35, 25, 45, 30, 55, 40],
          borderColor: this.colors.info,
          backgroundColor: gradient,
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4
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
        },
        animation: { duration: 1500 }
      }
    })
    
    this.charts.set('recent-items-chart', chart)
  }
  
  initializeSparklines() {
    const sparklineConfigs = [
      { id: 'stats-bar', class: 'sparkline-bar-stats1', data: [9,4,8,6,5,6,4,8,3,5,9,5], color: this.colors.primary },
      { id: 'stats-line', class: 'sparkline-bar-stats2', data: [1,4,8,3,5,6,4,8,3,3,9,5], color: this.colors.secondary },
      { id: 'stats-bar-2', class: 'sparkline-bar-stats3', data: [4,2,8,2,5,6,3,8,3,5,9,5], color: this.colors.success },
      { id: 'stats-bar-3', class: 'sparkline-bar-stats4', data: [2,4,8,4,5,7,4,7,3,5,7,5], color: this.colors.warning }
    ]
    
    sparklineConfigs.forEach(config => {
      const element = document.getElementById(config.id) || document.querySelector(`.${config.class}`)
      if (element) {
        const canvas = document.createElement('canvas')
        canvas.style.width = '100%'
        canvas.style.height = '50px'
        element.appendChild(canvas)
        
        const ctx = canvas.getContext('2d')
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: config.data.map((_, i) => i),
            datasets: [{
              data: config.data,
              borderColor: config.color,
              backgroundColor: config.color + '20',
              borderWidth: 2,
              fill: config.id.includes('bar'),
              tension: 0.4,
              pointRadius: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } },
            animation: { duration: 1000 }
          }
        })
        
        this.charts.set(config.id, chart)
      }
    })
  }
  
  initializeKnobCharts() {
    // Replace jQuery Knob with Chart.js doughnut charts
    const knobElements = document.querySelectorAll('input.knob')
    knobElements.forEach(input => {
      const value = parseInt(input.dataset.rel || input.value || 0)
      const canvas = document.createElement('canvas')
      canvas.style.width = input.dataset.width + 'px' || '100px'
      canvas.style.height = input.dataset.width + 'px' || '100px'
      
      input.parentNode.appendChild(canvas)
      input.style.display = 'none'
      
      const ctx = canvas.getContext('2d')
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [value, 100 - value],
            backgroundColor: [
              input.dataset.fgcolor || this.colors.primary,
              input.dataset.bgcolor || '#E4E4E4'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '80%',
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          animation: {
            animateRotate: true,
            duration: 2000
          }
        }
      })
      
      // Add center text
      const centerText = document.createElement('div')
      centerText.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        font-weight: bold;
        color: ${input.dataset.fgcolor || this.colors.primary};
      `
      centerText.textContent = value + '%'
      canvas.parentNode.style.position = 'relative'
      canvas.parentNode.appendChild(centerText)
      
      this.charts.set(`knob-${Math.random()}`, chart)
    })
  }
  
  refreshAll() {
    this.charts.forEach(chart => {
      chart.update('none')
    })
  }
  
  getChart(id) {
    return this.charts.get(id)
  }
  
  destroyAll() {
    this.charts.forEach(chart => {
      chart.destroy()
    })
    this.charts.clear()
  }
}