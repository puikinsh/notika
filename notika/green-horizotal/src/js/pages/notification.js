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
    this.toastContainer = null
    this.activeToasts = []
    console.log('🚀 Notification page initializing...')
  }

  async init() {
    await super.init()
    await this.ui.init()
    this.initializeToastContainer()
    this.initializeNotificationButtons()
    this.initializeCustomNotification()
    console.log('✅ Notification functionality ready')
  }

  initializeToastContainer() {
    // Create a container for toasts if it doesn't exist
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div')
      container.id = 'toast-container'
      container.style.position = 'fixed'
      container.style.zIndex = '9999'
      container.style.pointerEvents = 'none'
      document.body.appendChild(container)
      this.toastContainer = container
    } else {
      this.toastContainer = document.getElementById('toast-container')
    }
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

    // Position the container
    this.setContainerPosition(position)

    // Add animation class
    this.addAnimation(toast, animation)

    // Append to container
    if (position.includes('bottom')) {
      this.toastContainer.prepend(toast)
    } else {
      this.toastContainer.appendChild(toast)
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

  setContainerPosition(position) {
    const positions = {
      'top-left': { top: '20px', left: '20px', right: 'auto', bottom: 'auto' },
      'top-center': { top: '20px', left: '50%', right: 'auto', bottom: 'auto', transform: 'translateX(-50%)' },
      'top-right': { top: '20px', right: '20px', left: 'auto', bottom: 'auto' },
      'bottom-left': { bottom: '20px', left: '20px', right: 'auto', top: 'auto' },
      'bottom-center': { bottom: '20px', left: '50%', right: 'auto', top: 'auto', transform: 'translateX(-50%)' },
      'bottom-right': { bottom: '20px', right: '20px', left: 'auto', top: 'auto' }
    }

    const pos = positions[position] || positions['top-right']
    Object.keys(pos).forEach(key => {
      this.toastContainer.style[key] = pos[key]
    })
  }

  addAnimation(toast, animation) {
    const animations = {
      fade: 'animate__fadeIn',
      slide: 'animate__slideInDown',
      bounce: 'animate__bounceIn',
      flip: 'animate__flipInX',
      rotate: 'animate__rotateIn',
      zoom: 'animate__zoomIn'
    }

    // Add animate.css classes if available, otherwise use CSS transitions
    if (animations[animation]) {
      toast.classList.add('animate__animated', animations[animation])
    } else {
      // Fallback CSS animation
      toast.style.animation = `${animation}In 0.5s ease-in-out`
    }

    // Define fallback keyframes
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
        .toast { transition: all 0.3s ease-in-out; }
      `
      document.head.appendChild(style)
    }
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
    setInterval(() => {
      const msg = demoMessages[index % demoMessages.length]
      this.showNotification({
        ...msg,
        position: 'bottom-right',
        duration: 5000,
        animation: 'slide'
      })
      index++
    }, 10000) // Show a notification every 10 seconds
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