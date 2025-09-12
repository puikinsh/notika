/**
 * Dashboard Four Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'

class DashboardFourPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'DASHBOARD'
    console.log('🚀 Dashboard Four initializing...')
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaDashboard4 = new DashboardFourPage()
  })
} else {
  window.NotikaDashboard4 = new DashboardFourPage()
}

export { DashboardFourPage }