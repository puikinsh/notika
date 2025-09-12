/**
 * Form Components Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'

class FormComponentsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'FORMS'
    this.ui = new NotikaUI()
    console.log('🚀 Form Components page initializing...')
  }
  
  async init() {
    await super.init()
    await this.ui.init()
    this.initializeFormFeatures()
    console.log('✅ Form Components functionality ready')
  }
  
  initializeFormFeatures() {
    // Initialize form-specific features
    console.log('✅ Form features initialized')
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaFormComponents = new FormComponentsPage()
  })
} else {
  window.NotikaFormComponents = new FormComponentsPage()
}

export { FormComponentsPage }