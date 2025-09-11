/**
 * Modern Notika Template - Main Entry Point
 * Using ES6 modules and Vite build system
 */

// Import modern dependencies
import { Chart, registerables } from 'chart.js'
import Swiper from 'swiper/bundle'
import { Toast } from 'bootstrap'
import dayjs from 'dayjs'
import TomSelect from 'tom-select'
import flatpickr from 'flatpickr'
import noUiSlider from 'nouislider'
import { OverlayScrollbars } from 'overlayscrollbars'
import AOS from 'aos'

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'swiper/css/bundle'
import 'flatpickr/dist/flatpickr.min.css'
import 'tom-select/dist/css/tom-select.css'
import 'nouislider/dist/nouislider.css'
import 'overlayscrollbars/styles/overlayscrollbars.css'
import 'aos/dist/aos.css'

// Import custom modules
import { NotikaCharts } from './modules/charts.js'
import { NotikaUI } from './modules/ui.js'
import { NotikaNavigation } from './modules/navigation.js'
import { NotikaAnimations } from './modules/animations.js'

// Register Chart.js components
Chart.register(...registerables)

/**
 * Modern Notika Application Class
 */
class NotikaApp {
  constructor() {
    this.modules = {
      charts: new NotikaCharts(),
      ui: new NotikaUI(),
      navigation: new NotikaNavigation(),
      animations: new NotikaAnimations()
    }
    
    this.init()
  }
  
  async init() {
    console.log('🚀 Initializing Modern Notika Template...')
    
    try {
      // Initialize core modules
      await this.initializeModules()
      
      // Initialize third-party libraries
      this.initializeLibraries()
      
      // Set up event listeners
      this.setupEventListeners()
      
      console.log('✅ Notika Template fully initialized')
      
    } catch (error) {
      console.error('❌ Initialization error:', error)
    }
  }
  
  async initializeModules() {
    // Initialize all modules
    for (const [name, module] of Object.entries(this.modules)) {
      if (module.init) {
        await module.init()
        console.log(`✅ ${name} module initialized`)
      }
    }
  }
  
  initializeLibraries() {
    // Initialize AOS (animations on scroll)
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100
    })
    
    // Initialize OverlayScrollbars
    if (document.querySelector('.custom-scrollbar')) {
      OverlayScrollbars(document.querySelector('.custom-scrollbar'), {
        className: 'os-theme-dark',
        sizeAutoCapable: true,
        paddingAbsolute: true
      })
    }
    
    // Initialize modern date pickers
    const dateInputs = document.querySelectorAll('input[type="date"], .datepicker')
    dateInputs.forEach(input => {
      flatpickr(input, {
        enableTime: false,
        dateFormat: "Y-m-d",
        theme: "material_blue"
      })
    })
    
    // Initialize modern selects  
    const selectElements = document.querySelectorAll('select.modern-select')
    selectElements.forEach(select => {
      new TomSelect(select, {
        create: false,
        sortField: {
          field: "text",
          direction: "asc"
        }
      })
    })
    
    // Initialize sliders
    const sliders = document.querySelectorAll('.modern-slider')
    sliders.forEach(slider => {
      noUiSlider.create(slider, {
        start: [50],
        range: {
          'min': 0,
          'max': 100
        },
        connect: [true, false],
        tooltips: true
      })
    })
  }
  
  setupEventListeners() {
    // Global error handling
    window.addEventListener('error', (e) => {
      console.warn('Global error caught:', e.error)
    })
    
    // Modern navigation events
    document.addEventListener('click', this.handleGlobalClicks.bind(this))
    
    // Responsive image loading
    this.setupLazyLoading()
    
    // Performance monitoring
    this.setupPerformanceMonitoring()
  }
  
  handleGlobalClicks(e) {
    // Handle navigation clicks
    if (e.target.matches('[data-bs-toggle]')) {
      e.preventDefault()
      // Bootstrap 5 handles this automatically
    }
    
    // Handle custom actions
    if (e.target.matches('.notika-action')) {
      e.preventDefault()
      const action = e.target.dataset.action
      this.executeAction(action, e.target)
    }
  }
  
  executeAction(action, element) {
    switch (action) {
      case 'refresh-charts':
        this.modules.charts.refreshAll()
        break
      case 'toggle-theme':
        document.documentElement.classList.toggle('dark-theme')
        break
      default:
        console.log('Unknown action:', action)
    }
  }
  
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]')
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        })
      })
      
      lazyImages.forEach(img => imageObserver.observe(img))
    }
  }
  
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('LCP:', entry.startTime)
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] })
        
        // First Input Delay
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            console.log('FID:', entry.processingStart - entry.startTime)
          }
        }).observe({ entryTypes: ['first-input'] })
        
      } catch (error) {
        console.warn('Performance monitoring setup failed:', error)
      }
    }
  }
  
  // Public API methods
  getModule(name) {
    return this.modules[name]
  }
  
  refreshAll() {
    Object.values(this.modules).forEach(module => {
      if (module.refresh) module.refresh()
    })
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.Notika = new NotikaApp()
  })
} else {
  window.Notika = new NotikaApp()
}

// Export for module use
export { NotikaApp }