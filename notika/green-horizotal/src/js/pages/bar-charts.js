/**
 * Bar Charts Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js'

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
    console.log('✅ Bar Charts functionality ready')
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