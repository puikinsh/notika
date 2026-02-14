/**
 * Popovers Page - Bootstrap 5 Popover Demonstrations
 */

import { NotikaApp } from '../main.js'

class PopoversPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'COMPONENTS'
  }

  async init() {
    await super.init()
    this.initPopovers()
    console.log('Notika Popovers initialized')
  }

  initPopovers() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    popoverTriggerList.forEach(el => {
      new window.bootstrap.Popover(el)
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.NotikaPopovers = new PopoversPage() })
} else {
  window.NotikaPopovers = new PopoversPage()
}

export { PopoversPage }
