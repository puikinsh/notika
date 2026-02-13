import { NotikaApp } from '../main.js'

class LoginRegisterPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'PAGES'
  }

  async init() {
    await super.init()
    this.initPanelSwitching()
    console.log('Login/Register page initialized')
  }

  initPanelSwitching() {
    const switches = document.querySelectorAll('[data-ma-action="nk-login-switch"]')
    if (!switches.length) return

    switches.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault()
        const targetSelector = trigger.getAttribute('data-ma-block')
        if (!targetSelector) return

        // Hide all blocks
        const blocks = document.querySelectorAll('.nk-block')
        blocks.forEach(block => block.classList.remove('toggled'))

        // Show target block
        const target = document.querySelector(targetSelector)
        if (target) target.classList.add('toggled')
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
