import { NotikaApp } from '../main.js'

class ContactPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'PAGES'
  }

  async init() {
    await super.init()
    console.log('Contact page initialized')
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.contactPage = new ContactPage()
    window.contactPage.init()
  })
} else {
  window.contactPage = new ContactPage()
  window.contactPage.init()
}

export { ContactPage }
