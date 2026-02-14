/**
 * Notification Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'

class NotificationPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'NOTIFICATION'
    this.ui = new NotikaUI()
    this.toastContainers = {}
    this.activeToasts = []
    console.log('🚀 Notification page initializing...')
  }

  async init() {
    await super.init()
    await this.ui.init()

    // Ensure native scrollbars are restored
    this.removeAllScrollbarRules()

    this.initializeToastContainers()
    this.initializeNotificationButtons()
    this.initializeCustomNotification()
    console.log('✅ Notification functionality ready')
  }

  initializeToastContainers() {
    // Create containers for each position
    const positions = [
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ]

    positions.forEach(position => {
      if (!document.getElementById(`toast-container-${position}`)) {
        const container = document.createElement('div')
        container.id = `toast-container-${position}`
        container.className = 'toast-container'
        container.style.position = 'fixed'
        container.style.zIndex = '9999'
        container.style.pointerEvents = 'none'

        // Set position for each container
        const positionStyles = this.getContainerPosition(position)
        Object.keys(positionStyles).forEach(key => {
          container.style[key] = positionStyles[key]
        })

        document.body.appendChild(container)
        this.toastContainers[position] = container
      } else {
        this.toastContainers[position] = document.getElementById(`toast-container-${position}`)
      }
    })
  }

  getContainerPosition(position) {
    const positions = {
      'top-left': { top: '80px', left: '20px', right: 'auto', bottom: 'auto' },
      'top-center': { top: '80px', left: '50%', right: 'auto', bottom: 'auto', transform: 'translateX(-50%)' },
      'top-right': { top: '80px', right: '20px', left: 'auto', bottom: 'auto' },
      'bottom-left': { bottom: '20px', left: '20px', right: 'auto', top: 'auto' },
      'bottom-center': { bottom: '20px', left: '50%', right: 'auto', top: 'auto', transform: 'translateX(-50%)' },
      'bottom-right': { bottom: '20px', right: '20px', left: 'auto', top: 'auto' }
    }
    return positions[position] || positions['top-right']
  }

  initializeNotificationButtons() {
    // Position buttons
    const positionButtons = document.querySelectorAll('[data-notification-position]')
    positionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const position = button.getAttribute('data-notification-position')
        this.showNotification({
          title: 'Position Demo',
          message: `This notification appears at ${position.replace('-', ' ')}`,
          type: 'info',
          position: position,
          animation: 'slide'
        })
      })
    })

    // Type buttons
    const typeButtons = document.querySelectorAll('[data-notification-type]')
    typeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const type = button.getAttribute('data-notification-type')
        const messages = {
          success: 'Operation completed successfully!',
          info: 'This is an informational message.',
          warning: 'Please review this warning message.',
          danger: 'An error has occurred.',
          dark: 'Dark mode notification.',
          primary: 'Primary action notification.'
        }
        this.showNotification({
          title: type.charAt(0).toUpperCase() + type.slice(1),
          message: messages[type] || 'Notification message',
          type: type,
          position: 'top-right'
        })
      })
    })

    // Animation buttons
    const animationButtons = document.querySelectorAll('[data-notification-animation]')
    animationButtons.forEach(button => {
      button.addEventListener('click', () => {
        const animation = button.getAttribute('data-notification-animation')
        this.showNotification({
          title: 'Animation Demo',
          message: `Using ${animation} animation`,
          type: 'primary',
          position: 'top-center',
          animation: animation
        })
      })
    })

    console.log('✅ Notification buttons initialized')
  }

  initializeCustomNotification() {
    const triggerButton = document.getElementById('triggerCustomNotification')
    if (triggerButton) {
      triggerButton.addEventListener('click', () => {
        const title = document.getElementById('notificationTitle').value || 'Notification'
        const message = document.getElementById('notificationMessage').value || 'Message'
        const type = document.getElementById('notificationType').value || 'info'
        const duration = parseInt(document.getElementById('notificationDuration').value) || 3000

        this.showNotification({
          title: title,
          message: message,
          type: type,
          position: 'top-right',
          duration: duration,
          animation: 'slide'
        })
      })
    }

    console.log('✅ Custom notification form initialized')
  }

  showNotification(options = {}) {
    const {
      title = 'Notification',
      message = '',
      type = 'info',
      position = 'top-right',
      duration = 3000,
      animation = 'fade'
    } = options

    // Get the correct container for this position
    const container = this.toastContainers[position] || this.toastContainers['top-right']

    // Create toast element
    const toast = document.createElement('div')
    toast.className = `toast align-items-center text-white border-0 show`
    toast.setAttribute('role', 'alert')
    toast.setAttribute('aria-live', 'assertive')
    toast.setAttribute('aria-atomic', 'true')
    toast.style.minWidth = '300px'
    toast.style.pointerEvents = 'auto'
    toast.style.marginBottom = '10px'

    // Set background color based on type
    const bgColors = {
      success: 'bg-success',
      info: 'bg-info',
      warning: 'bg-warning',
      danger: 'bg-danger',
      dark: 'bg-dark',
      primary: 'bg-primary'
    }
    toast.classList.add(bgColors[type] || 'bg-info')

    // Create toast content
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <strong>${title}</strong>
          ${message ? `<br><small>${message}</small>` : ''}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `

    // Add animation class
    this.addAnimation(toast, animation)

    // Append to the correct container
    // For bottom positions, add at the beginning; for top positions, add at the end
    if (position.includes('bottom')) {
      container.prepend(toast)
    } else {
      container.appendChild(toast)
    }

    // Track active toast
    this.activeToasts.push(toast)

    // Set up close button
    const closeBtn = toast.querySelector('[data-bs-dismiss="toast"]')
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.removeToast(toast)
      })
    }

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(toast)
      }, duration)
    }
  }

  addAnimation(toast, animation) {
    // Add keyframe animations if not already defined
    if (!document.querySelector('#notification-animations')) {
      const style = document.createElement('style')
      style.id = 'notification-animations'
      style.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes flipIn {
          from { transform: perspective(400px) rotateX(90deg); opacity: 0; }
          to { transform: perspective(400px) rotateX(0); opacity: 1; }
        }
        @keyframes rotateIn {
          from { transform: rotate(-200deg); opacity: 0; }
          to { transform: rotate(0); opacity: 1; }
        }
        @keyframes zoomIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .toast { transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out; }
      `
      document.head.appendChild(style)
    }

    // Apply the correct animation based on type
    const animationMap = {
      fade: 'fadeIn',
      slide: 'slideIn',
      bounce: 'bounceIn',
      flip: 'flipIn',
      rotate: 'rotateIn',
      zoom: 'zoomIn'
    }

    const animationName = animationMap[animation] || 'fadeIn'
    toast.style.animation = `${animationName} 0.5s ease-in-out`
  }

  removeToast(toast) {
    // Add fade out animation
    toast.style.opacity = '0'
    toast.style.transform = 'scale(0.9)'

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
      // Remove from active toasts
      const index = this.activeToasts.indexOf(toast)
      if (index > -1) {
        this.activeToasts.splice(index, 1)
      }
    }, 300)
  }

  // Demo: Simulate live notifications
  startLiveDemo() {
    const demoMessages = [
      { title: 'New Order', message: 'Order #1234 received', type: 'success' },
      { title: 'System Update', message: 'Updates are available', type: 'info' },
      { title: 'Low Stock', message: 'Product inventory is low', type: 'warning' },
      { title: 'Payment Received', message: 'Payment of $99.99 processed', type: 'success' },
      { title: 'New Message', message: 'You have a new message', type: 'primary' }
    ]

    let index = 0
    this.demoInterval = setInterval(() => {
      const msg = demoMessages[index % demoMessages.length]
      this.showNotification({
        ...msg,
        position: 'bottom-right',
        duration: 5000,
        animation: 'slide'
      })
      index++
    }, 10000) // Show a notification every 10 seconds

    window.addEventListener('beforeunload', () => this.destroy())
  }

  destroy() {
    if (this.demoInterval) {
      clearInterval(this.demoInterval)
      this.demoInterval = null
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaNotification = new NotificationPage()
  })
} else {
  window.NotikaNotification = new NotificationPage()
}

export { NotificationPage }