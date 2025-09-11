/**
 * Modern UI Module
 * Replacing vintage jQuery plugins with modern alternatives
 */

import { Toast, Modal, Tooltip, Popover } from 'bootstrap'
import dayjs from 'dayjs'

export class NotikaUI {
  constructor() {
    this.notifications = []
    this.modals = new Map()
  }
  
  async init() {
    this.initializeBootstrapComponents()
    this.initializeCounters()
    this.initializeNotifications()
    this.setupModernInteractions()
  }
  
  initializeBootstrapComponents() {
    // Initialize all Bootstrap 5 components
    
    // Tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new Tooltip(tooltipTriggerEl)
    })
    
    // Popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    popoverTriggerList.forEach(popoverTriggerEl => {
      new Popover(popoverTriggerEl)
    })
    
    // Modals
    const modalElements = document.querySelectorAll('.modal')
    modalElements.forEach(modalEl => {
      const modal = new Modal(modalEl)
      this.modals.set(modalEl.id, modal)
    })
    
    console.log('✅ Bootstrap 5 components initialized')
  }
  
  initializeCounters() {
    // Modern counter animation using Intersection Observer
    const counters = document.querySelectorAll('.counter')
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })
      
      counters.forEach(counter => observer.observe(counter))
    } else {
      // Fallback for older browsers
      counters.forEach(counter => this.animateCounter(counter))
    }
  }
  
  animateCounter(element) {
    const target = parseInt(element.textContent.replace(/,/g, ''))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = this.formatNumber(target)
        clearInterval(timer)
      } else {
        element.textContent = this.formatNumber(Math.floor(current))
      }
    }, 16)
  }
  
  formatNumber(num) {
    return num.toLocaleString()
  }
  
  initializeNotifications() {
    // Modern toast notifications
    this.createNotificationContainer()
  }
  
  createNotificationContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div')
      container.id = 'toast-container'
      container.className = 'toast-container position-fixed top-0 end-0 p-3'
      container.style.zIndex = '9999'
      document.body.appendChild(container)
    }
  }
  
  showNotification(message, type = 'info', duration = 5000) {
    const toastHtml = `
      <div class="toast align-items-center text-bg-${type} border-0" role="alert">
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    `
    
    const container = document.getElementById('toast-container')
    const toastElement = document.createElement('div')
    toastElement.innerHTML = toastHtml
    const toast = toastElement.firstElementChild
    
    container.appendChild(toast)
    
    const bsToast = new Toast(toast, { delay: duration })
    bsToast.show()
    
    // Auto cleanup
    toast.addEventListener('hidden.bs.toast', () => {
      toast.remove()
    })
    
    return bsToast
  }
  
  setupModernInteractions() {
    // Replace old jQuery animations with modern CSS/JS
    this.setupHoverEffects()
    this.setupClickEffects()
    this.setupLoadingStates()
  }
  
  setupHoverEffects() {
    // Add modern hover effects
    const cards = document.querySelectorAll('.notika-shadow')
    cards.forEach(card => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'
      
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-2px)'
        card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
      })
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)'
        card.style.boxShadow = ''
      })
    })
  }
  
  setupClickEffects() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .notika-nav-link')
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span')
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `
        
        button.style.position = 'relative'
        button.style.overflow = 'hidden'
        button.appendChild(ripple)
        
        setTimeout(() => ripple.remove(), 600)
      })
    })
  }
  
  setupLoadingStates() {
    // Modern loading states
    const loadingButtons = document.querySelectorAll('[data-loading]')
    loadingButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.setLoading(button, true)
        setTimeout(() => this.setLoading(button, false), 2000)
      })
    })
  }
  
  setLoading(element, loading) {
    if (loading) {
      element.disabled = true
      element.dataset.originalText = element.textContent
      element.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...'
    } else {
      element.disabled = false
      element.textContent = element.dataset.originalText
    }
  }
  
  // Public API methods
  showSuccess(message) {
    return this.showNotification(message, 'success')
  }
  
  showError(message) {
    return this.showNotification(message, 'danger')
  }
  
  showWarning(message) {
    return this.showNotification(message, 'warning')
  }
  
  showInfo(message) {
    return this.showNotification(message, 'info')
  }
  
  refresh() {
    this.initializeCounters()
  }
}