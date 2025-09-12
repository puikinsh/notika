/**
 * Dashboard Three Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'

class DashboardThreePage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'DASHBOARD'
    console.log('🚀 Dashboard Three initializing...')
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaDashboard3 = new DashboardThreePage()
  })
} else {
  window.NotikaDashboard3 = new DashboardThreePage()
}

export { DashboardThreePage }