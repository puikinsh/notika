import { NotikaApp } from '../main.js'

class LoginRegisterPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'PAGES'
  }

  async init() {
    await super.init()
    this.initPanelSwitching()
    this.initPasswordToggles()
    this.initFormValidation()
    console.log('Login/Register page initialized')
  }

  initPanelSwitching() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-auth-switch]')
      if (!trigger) return

      e.preventDefault()
      const targetSelector = trigger.getAttribute('data-auth-switch')
      if (!targetSelector) return

      const cards = document.querySelectorAll('.nk-auth-card')
      cards.forEach(card => card.classList.remove('toggled'))

      const target = document.querySelector(targetSelector)
      if (target) {
        target.classList.add('toggled')
        // Focus first input in new panel
        const firstInput = target.querySelector('input:not([type="checkbox"]):not([type="hidden"])')
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 350)
        }
      }
    })
  }

  initPasswordToggles() {
    const toggles = document.querySelectorAll('.nk-toggle-password')
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const targetId = toggle.getAttribute('data-target')
        const input = document.getElementById(targetId)
        if (!input) return

        const isPassword = input.type === 'password'
        input.type = isPassword ? 'text' : 'password'

        const icon = toggle.querySelector('i, svg')
        if (icon) {
          // Toggle between eye and eye-slash
          if (isPassword) {
            icon.classList.remove('fa-eye')
            icon.classList.add('fa-eye-slash')
          } else {
            icon.classList.remove('fa-eye-slash')
            icon.classList.add('fa-eye')
          }
        }
      })
    })
  }

  initFormValidation() {
    const forms = document.querySelectorAll('.nk-auth-form')
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!form.checkValidity()) {
          form.classList.add('was-validated')
          return
        }

        // Demo: show success state on button
        const btn = form.querySelector('.nk-auth-btn')
        if (btn) {
          const originalHTML = btn.innerHTML
          btn.disabled = true
          btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Please wait...'

          setTimeout(() => {
            btn.innerHTML = originalHTML
            btn.disabled = false
            form.classList.remove('was-validated')
            form.reset()
          }, 2000)
        }
      })
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.loginRegisterPage = new LoginRegisterPage()
    window.loginRegisterPage.init()
  })
} else {
  window.loginRegisterPage = new LoginRegisterPage()
  window.loginRegisterPage.init()
}

export { LoginRegisterPage }
