/**
 * Form Elements Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'

class FormElementsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'FORMS'
    this.ui = new NotikaUI()
    console.log('🚀 Form Elements page initializing...')
  }
  
  async init() {
    await super.init()
    await this.ui.init()
    this.initializeFormFeatures()
    console.log('✅ Form Elements functionality ready')
  }
  
  initializeFormFeatures() {
    // Initialize form-specific features
    console.log('✅ Form features initialized')
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaFormElements = new FormElementsPage()
  })
} else {
  window.NotikaFormElements = new FormElementsPage()
}

export { FormElementsPage }