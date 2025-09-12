/**
 * Area Charts Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaCharts } from '../modules/charts.js'

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
    console.log('✅ Area Charts functionality ready')
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