import { NotikaApp } from '../main.js'

class Error404Page extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'PAGES'
  }

  async init() {
    await super.init()
    console.log('404 page initialized')
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.error404Page = new Error404Page()
    window.error404Page.init()
  })
} else {
  window.error404Page = new Error404Page()
  window.error404Page.init()
}

export { Error404Page }
