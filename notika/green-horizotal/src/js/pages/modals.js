/**
 * Modals Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'

// Bootstrap is already imported and set globally in main.js
// No need to import it again

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

    // Verify Bootstrap is available
    if (typeof window.bootstrap === 'undefined') {
      console.error('Bootstrap is not available!')
      return
    }

    console.log('Bootstrap is available:', window.bootstrap)

    // Bootstrap will handle modals automatically via data attributes
    // We just add custom animations and effects

    this.addModalAnimations()
    this.addButtonEffects()

    console.log('✅ Modals page ready')
  }

  addModalAnimations() {
    // Apply animations to modals when they open
    const animatedModals = {
      'myModalfour': 'bounce',
      'myModalfive': 'flash',
      'myModalsix': 'rubberband',
      'myModalseven': 'shake'
    }

    Object.entries(animatedModals).forEach(([modalId, animation]) => {
      const modalElement = document.getElementById(modalId)
      if (modalElement) {
        const dialog = modalElement.querySelector('.modal-dialog')
        if (dialog) {
          // Add the animation class to the dialog element
          dialog.classList.add(`modal-animate-${animation}`)
        }

        // Trigger animation on show
        modalElement.addEventListener('show.bs.modal', () => {
          const dialog = modalElement.querySelector('.modal-dialog')
          if (dialog) {
            dialog.classList.add('show')
          }
        })

        // Remove show class after hide
        modalElement.addEventListener('hidden.bs.modal', () => {
          const dialog = modalElement.querySelector('.modal-dialog')
          if (dialog) {
            dialog.classList.remove('show')
          }
        })
      }
    })
  }

  addButtonEffects() {
    // Add hover effects to color buttons
    const colorButtons = document.querySelectorAll('.btn.nk-red, .btn.nk-light-blue, .btn.nk-cyan, .btn.nk-deep-purple, .btn.nk-indigo, .btn.nk-blue')

    colorButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)'
        button.style.transition = 'transform 0.2s ease'
      })

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)'
      })
    })

    // Add ripple effect to modal trigger buttons
    const modalButtons = document.querySelectorAll('[data-bs-toggle="modal"]')
    modalButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.addRippleEffect(button, e)
      })
    })
  }

  addRippleEffect(button, event) {
    const ripple = document.createElement('span')
    ripple.classList.add('ripple')

    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'

    button.style.position = 'relative'
    button.style.overflow = 'hidden'
    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
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

// Add CSS for ripple effect only (animations are in HTML)
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
`
document.head.appendChild(style)

export { ModalsPage }