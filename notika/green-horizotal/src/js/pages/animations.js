/**
 * Animations Page - CSS Animation Showcase
 */

import { NotikaApp } from '../main.js'
import 'animate.css'

class AnimationsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'INTERFACE'
  }

  async init() {
    await super.init()
    this.initAnimationButtons()
    console.log('Animations page initialized')
  }

  initAnimationButtons() {
    // Map button classes to animate.css class names
    const animationMap = {
      // Attention Seekers
      'bounce-ac': 'bounce',
      'flash-ac': 'flash',
      'pulse-ac': 'pulse',
      'rubberBand-ac': 'rubberBand',
      // Bouncing Entrances
      'bounceIn-ac': 'bounceIn',
      'bounceInDown-ac': 'bounceInDown',
      'bounceInLeft-ac': 'bounceInLeft',
      'bounceInUp-ac': 'bounceInRight',
      // Bouncing Exits
      'bounceOut-ac': 'bounceOut',
      'bounceOutDown-ac': 'bounceOutDown',
      'bounceOutLeft-ac': 'bounceOutLeft',
      'bounceOutRight-ac': 'bounceOutRight',
      // Fading Entrances
      'fadeIn-ac': 'fadeIn',
      'fadeInDown-ac': 'fadeInDown',
      'fadeInDownBig-ac': 'fadeInDownBig',
      'fadeInLeft-ac': 'fadeInLeft',
      // Fading Exits
      'fadeOut-ac': 'fadeOut',
      'fadeOutDown-ac': 'fadeOutDown',
      'fadeOutDownBig-ac': 'fadeOutDownBig',
      'fadeOutLeft-ac': 'fadeOutLeft',
      // Flippers
      'flip-ac': 'flip',
      'flipInX-ac': 'flipInX',
      'flipInY-ac': 'flipInY',
      'flipOutX-ac': 'flipOutX',
      // Sliding Entrances
      'slideInUp-ac': 'slideInUp',
      'slideInDown-ac': 'slideInDown',
      'slideInLeft-ac': 'slideInLeft',
      'slideInRight-ac': 'slideInRight',
      // Rotating Entrances
      'rotateIn-ac': 'rotateIn',
      'rotateInDownLeft-ac': 'rotateInDownLeft',
      'rotateInDownRight-ac': 'rotateInDownRight',
      'rotateInUpLeft-ac': 'rotateInUpLeft',
      // Rotating Exits
      'rotateOut-ac': 'rotateOut',
      'rotateOutDownLeft-ac': 'rotateOutDownLeft',
      'rotateOutDownRight-ac': 'rotateOutDownRight',
      'rotateOutUpLeft-ac': 'rotateOutUpLeft',
      // Sliding Exits
      'slideOutUp-ac': 'slideOutUp',
      'slideOutDown-ac': 'slideOutDown',
      'slideOutLeft-ac': 'slideOutLeft',
      'slideOutRight-ac': 'slideOutRight',
      // Zoom Entrances
      'zoomIn-ac': 'zoomIn',
      'zoomInDown-ac': 'zoomInDown',
      'zoomInLeft-ac': 'zoomInLeft',
      'zoomInRight-ac': 'zoomInRight',
      // Zoom Exits
      'zoomOut-ac': 'zoomOut',
      'zoomOutDown-ac': 'zoomOutDown',
      'zoomOutLeft-ac': 'zoomOutLeft',
      'zoomOutRight-ac': 'zoomOutRight'
    }

    for (const [btnClass, animName] of Object.entries(animationMap)) {
      const btn = document.querySelector(`.${btnClass}`)
      if (!btn) continue

      btn.addEventListener('click', () => {
        // Find the image in the same card
        const card = btn.closest('.animation-single-int')
        const img = card?.querySelector('.animation-img img')
        if (!img) return

        // For exit animations, ensure the image is visible first
        img.style.opacity = ''
        img.style.display = ''

        // Remove any previous animation classes
        img.className = img.className.replace(/animate__\S+/g, '').trim()

        // Force reflow to restart animation
        void img.offsetWidth

        // Apply animation
        img.classList.add('animate__animated', `animate__${animName}`)

        // Clean up after animation ends
        img.addEventListener('animationend', function handler() {
          // For exit animations, keep the image hidden briefly then restore
          if (animName.includes('Out') || animName.includes('out')) {
            setTimeout(() => {
              img.className = img.className.replace(/animate__\S+/g, '').trim()
              img.style.opacity = ''
              img.style.display = ''
            }, 300)
          } else {
            img.className = img.className.replace(/animate__\S+/g, '').trim()
          }
          img.removeEventListener('animationend', handler)
        }, { once: true })
      })
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaAnimations = new AnimationsPage()
  })
} else {
  window.NotikaAnimations = new AnimationsPage()
}

export { AnimationsPage }
