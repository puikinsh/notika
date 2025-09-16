/**
 * Modals Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'
import * as bootstrap from 'bootstrap'

class ModalsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'MODALS'
    this.ui = new NotikaUI()
    console.log('🚀 Modals page initializing...')
  }

  async init() {
    await super.init()
    await this.ui.init()

    // Make bootstrap available globally for the modals
    window.bootstrap = bootstrap

    this.initializeModals()
    this.initializeAnimatedModals()
    this.initializeModalTriggers()
    console.log('✅ Modals functionality ready')
  }

  initializeModals() {
    // Ensure Bootstrap 5 modals are properly initialized
    const modalElements = document.querySelectorAll('.modal')

    modalElements.forEach(modal => {
      // Add event listeners for modal events
      modal.addEventListener('shown.bs.modal', (event) => {
        console.log('Modal shown:', event.target.id)
        this.handleModalShown(event.target)
      })

      modal.addEventListener('hidden.bs.modal', (event) => {
        console.log('Modal hidden:', event.target.id)
        this.handleModalHidden(event.target)
      })
    })

    console.log('✅ Modals initialized:', modalElements.length)
  }

  initializeAnimatedModals() {
    // Apply animations to modals when they open
    const animatedModals = {
      'myModalfour': 'bounce',
      'myModalfive': 'flash',
      'myModalsix': 'rubberBand',
      'myModalseven': 'shake'
    }

    Object.entries(animatedModals).forEach(([modalId, animation]) => {
      const modalElement = document.getElementById(modalId)
      if (modalElement) {
        modalElement.addEventListener('shown.bs.modal', () => {
          const dialog = modalElement.querySelector('.modal-dialog')
          if (dialog) {
            dialog.classList.add('animate__animated', `animate__${animation}`)

            // Remove animation class after it completes
            setTimeout(() => {
              dialog.classList.remove('animate__animated', `animate__${animation}`)
            }, 1000)
          }
        })
      }
    })

    console.log('✅ Animated modals configured')
  }

  initializeModalTriggers() {
    // Add click tracking for modal buttons
    const modalButtons = document.querySelectorAll('[data-bs-toggle="modal"]')

    modalButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = button.getAttribute('data-bs-target')
        console.log('Modal trigger clicked:', target)

        // Add ripple effect on click
        this.addRippleEffect(button, e)
      })
    })

    // Initialize color-themed buttons
    this.initializeColorButtons()

    console.log('✅ Modal triggers initialized:', modalButtons.length)
  }

  initializeColorButtons() {
    // Color theme buttons
    const colorButtons = document.querySelectorAll('.btn.nk-red, .btn.nk-light-blue, .btn.nk-cyan, .btn.nk-deep-purple, .btn.nk-indigo, .btn.nk-blue')

    colorButtons.forEach(button => {
      // Add hover effect
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)'
        button.style.transition = 'transform 0.2s ease'
      })

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)'
      })
    })
  }

  handleModalShown(modal) {
    // Focus on the first input or button in the modal if available
    const firstFocusable = modal.querySelector('input, textarea, button:not(.btn-close)')
    if (firstFocusable) {
      firstFocusable.focus()
    }

    // Add backdrop click analytics
    const backdrop = document.querySelector('.modal-backdrop')
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        console.log('Modal backdrop clicked')
      })
    }
  }

  handleModalHidden(modal) {
    // Clean up any custom classes or states
    const dialog = modal.querySelector('.modal-dialog')
    if (dialog) {
      // Remove any animation classes that might have been added
      dialog.className = dialog.className.replace(/animate__\w+/g, '').trim()
    }
  }

  addRippleEffect(button, event) {
    // Create ripple element
    const ripple = document.createElement('span')
    ripple.classList.add('ripple')

    // Calculate position
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    // Apply styles
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'

    // Add to button
    button.style.position = 'relative'
    button.style.overflow = 'hidden'
    button.appendChild(ripple)

    // Remove after animation
    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  // Additional features for programmatic modal control
  openModal(modalId) {
    const modalElement = document.getElementById(modalId)
    if (modalElement) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalElement)
      modal.show()
    }
  }

  closeModal(modalId) {
    const modalElement = document.getElementById(modalId)
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement)
      if (modal) {
        modal.hide()
      }
    }
  }

  // Create modal programmatically
  createModal(options = {}) {
    const {
      id = 'dynamicModal',
      title = 'Modal Title',
      body = 'Modal body content',
      size = '',
      theme = '',
      showFooter = true
    } = options

    // Check if modal already exists
    let modalElement = document.getElementById(id)
    if (modalElement) {
      modalElement.remove()
    }

    // Create modal HTML
    const modalHTML = `
      <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
        <div class="modal-dialog ${size} ${theme}">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${id}Label">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ${body}
            </div>
            ${showFooter ? `
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            ` : ''}
          </div>
        </div>
      </div>
    `

    // Append to body
    document.body.insertAdjacentHTML('beforeend', modalHTML)

    // Initialize and show
    modalElement = document.getElementById(id)
    const modal = new bootstrap.Modal(modalElement)
    modal.show()

    // Clean up on hidden
    modalElement.addEventListener('hidden.bs.modal', () => {
      modalElement.remove()
    })

    return modal
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaModals = new ModalsPage()
  })
} else {
  window.NotikaModals = new ModalsPage()
}

// Add ripple effect CSS
const style = document.createElement('style')
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  /* Modal animation classes */
  .modal-animate-bounce .modal-dialog {
    animation-name: bounce;
    animation-duration: 0.75s;
  }

  .modal-animate-flash .modal-dialog {
    animation-name: flash;
    animation-duration: 0.75s;
  }

  .modal-animate-rubberband .modal-dialog {
    animation-name: rubberBand;
    animation-duration: 0.75s;
  }

  .modal-animate-shake .modal-dialog {
    animation-name: shake;
    animation-duration: 0.75s;
  }

  @keyframes bounce {
    from, 20%, 53%, 80%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -30px, 0);
    }
    70% {
      animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
      transform: translate3d(0, -15px, 0);
    }
    90% {
      transform: translate3d(0,-4px,0);
    }
  }

  @keyframes flash {
    from, 50%, to {
      opacity: 1;
    }
    25%, 75% {
      opacity: 0;
    }
  }

  @keyframes rubberBand {
    from {
      transform: scale3d(1, 1, 1);
    }
    30% {
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      transform: scale3d(.95, 1.05, 1);
    }
    75% {
      transform: scale3d(1.05, .95, 1);
    }
    to {
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes shake {
    from, to {
      transform: translate3d(0, 0, 0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translate3d(-10px, 0, 0);
    }
    20%, 40%, 60%, 80% {
      transform: translate3d(10px, 0, 0);
    }
  }
`
document.head.appendChild(style)

export { ModalsPage }