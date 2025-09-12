/**
 * Line Charts Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js'

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
    console.log('✅ Line Charts functionality ready')
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