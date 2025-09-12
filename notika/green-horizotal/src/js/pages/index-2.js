/**
 * Dashboard Two Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'

class DashboardTwoPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'DASHBOARD'
    console.log('🚀 Dashboard Two initializing...')
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