import { NotikaApp } from '../main.js'

class InvoicePage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'PAGES'
  }

  async init() {
    await super.init()
    console.log('Invoice page initialized')
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.invoicePage = new InvoicePage()
    window.invoicePage.init()
  })
} else {
  window.invoicePage = new InvoicePage()
  window.invoicePage.init()
}

export { InvoicePage }
