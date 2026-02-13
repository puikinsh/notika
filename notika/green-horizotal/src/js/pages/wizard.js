/**
 * Wizard Page → Modern Step Wizard
 */

import { NotikaApp } from '../main.js'

class WizardPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'INTERFACE'
    this.currentStep = 0
    this.totalSteps = 0
  }

  async init() {
    await super.init()
    this.initWizard()
  }

  initWizard() {
    this.wizard = document.getElementById('rootwizard')
    if (!this.wizard) return

    this.steps = Array.from(this.wizard.querySelectorAll('.wz-step'))
    this.panels = Array.from(this.wizard.querySelectorAll('.wz-panel'))
    this.progressBar = this.wizard.querySelector('.wz-progress-bar')
    this.btnPrev = this.wizard.querySelector('.wz-btn-prev')
    this.btnNext = this.wizard.querySelector('.wz-btn-next')
    this.totalSteps = this.steps.length

    if (this.totalSteps === 0) return

    this.btnPrev?.addEventListener('click', () => this.goToStep(this.currentStep - 1))
    this.btnNext?.addEventListener('click', () => this.handleNext())

    this.steps.forEach((step, i) => {
      step.addEventListener('click', () => this.goToStep(i))
    })

    this.goToStep(0)
  }

  handleNext() {
    if (this.currentStep === this.totalSteps - 1) {
      this.finish()
    } else {
      this.goToStep(this.currentStep + 1)
    }
  }

  goToStep(index) {
    if (index < 0 || index >= this.totalSteps) return

    this.currentStep = index

    // Update step indicators
    this.steps.forEach((step, i) => {
      const circle = step.querySelector('.wz-step-circle')
      step.classList.remove('active', 'completed')
      if (i < index) {
        step.classList.add('completed')
        circle.innerHTML = '<i class="fa-solid fa-check"></i>'
      } else if (i === index) {
        step.classList.add('active')
        circle.textContent = i + 1
      } else {
        circle.textContent = i + 1
      }
    })

    // Update panels
    this.panels.forEach((panel, i) => {
      panel.classList.toggle('active', i === index)
    })

    // Update progress bar
    const pct = (index / (this.totalSteps - 1)) * 100
    if (this.progressBar) {
      this.progressBar.style.width = `${pct}%`
    }

    // Update buttons
    if (this.btnPrev) {
      this.btnPrev.disabled = index === 0
    }

    if (this.btnNext) {
      if (index === this.totalSteps - 1) {
        this.btnNext.innerHTML = '<i class="fa-solid fa-check me-2"></i>Finish'
        this.btnNext.classList.add('wz-btn-finish')
      } else {
        this.btnNext.innerHTML = 'Next<i class="fa-solid fa-arrow-right ms-2"></i>'
        this.btnNext.classList.remove('wz-btn-finish')
      }
    }

    // Populate review on last step
    if (index === this.totalSteps - 1) {
      this.populateReview()
    }
  }

  populateReview() {
    const getVal = (selector, panelIndex) => {
      const panel = this.panels[panelIndex]
      if (!panel) return ''
      const el = panel.querySelector(selector)
      return el?.value?.trim() || ''
    }

    const inputs = this.panels[0]?.querySelectorAll('input') || []
    const firstName = inputs[0]?.value?.trim() || ''
    const lastName = inputs[1]?.value?.trim() || ''
    const name = [firstName, lastName].filter(Boolean).join(' ')

    const setReview = (key, val) => {
      const el = this.wizard.querySelector(`[data-review="${key}"]`)
      if (el) el.textContent = val || 'Not provided'
    }

    setReview('name', name)
    setReview('email', inputs[2]?.value?.trim())
    setReview('username', inputs[3]?.value?.trim())

    const profileInputs = this.panels[1]?.querySelectorAll('input') || []
    setReview('phone', profileInputs[0]?.value?.trim())

    const city = profileInputs[2]?.value?.trim() || ''
    const state = profileInputs[3]?.value?.trim() || ''
    const location = [city, state].filter(Boolean).join(', ')
    setReview('location', location)

    const langSelect = this.panels[2]?.querySelector('select')
    setReview('language', langSelect?.options[langSelect.selectedIndex]?.text)

    const checkboxes = this.panels[2]?.querySelectorAll('.form-check-input[type="checkbox"]:not(.form-switch .form-check-input)')
    const notifs = []
    checkboxes?.forEach(cb => {
      if (cb.checked) {
        const label = cb.nextElementSibling?.textContent?.replace(' notifications', '')
        if (label) notifs.push(label)
      }
    })
    setReview('notifications', notifs.join(', '))
  }

  finish() {
    const agreed = this.wizard.querySelector('#termsAgree')?.checked
    if (!agreed) {
      this.wizard.querySelector('#termsAgree')?.focus()
      const label = this.wizard.querySelector('[for="termsAgree"]')
      if (label) {
        label.style.color = '#dc3545'
        setTimeout(() => { label.style.color = '' }, 2000)
      }
      return
    }

    // Show success state
    const panels = this.wizard.querySelector('.wz-panels')
    if (panels) {
      panels.innerHTML = `
        <div class="wz-success">
          <div class="wz-success-icon">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <h4>All Done!</h4>
          <p>Your account has been set up successfully.</p>
          <button type="button" class="btn btn-outline-secondary mt-2" onclick="location.reload()">
            <i class="fa-solid fa-arrow-rotate-right me-2"></i>Start Over
          </button>
        </div>`
    }

    // Mark all steps completed
    this.steps.forEach(step => {
      step.classList.remove('active')
      step.classList.add('completed')
      step.querySelector('.wz-step-circle').innerHTML = '<i class="fa-solid fa-check"></i>'
    })

    // Full progress
    if (this.progressBar) this.progressBar.style.width = '100%'

    // Hide nav buttons
    const nav = this.wizard.querySelector('.wz-nav')
    if (nav) nav.style.display = 'none'
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.NotikaWizard = new WizardPage() })
} else {
  window.NotikaWizard = new WizardPage()
}

export { WizardPage }
