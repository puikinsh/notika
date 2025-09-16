import { NotikaApp } from '../main.js'

class TypographyPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'UI_COMPONENTS'
    console.log('🚀 Typography page initializing...')
  }

  async init() {
    await super.init()

    // Initialize typography-specific features
    this.initializeTypographyExamples()
    this.initializeTextAnimations()
    this.initializeCopyToClipboard()

    console.log('✅ Typography functionality ready')
  }

  initializeTypographyExamples() {
    // Add interactive typography examples if needed
    const codeElements = document.querySelectorAll('code')
    codeElements.forEach(code => {
      code.style.cursor = 'pointer'
      code.title = 'Click to copy'

      code.addEventListener('click', () => {
        this.copyToClipboard(code.textContent)
        this.showNotification('Code copied to clipboard!')
      })
    })
  }

  initializeTextAnimations() {
    // Add subtle animations to heading examples on hover
    const headings = document.querySelectorAll('.typography-heading h1, .typography-heading h2, .typography-heading h3, .typography-heading h4, .typography-heading h5, .typography-heading h6')

    headings.forEach(heading => {
      heading.style.transition = 'color 0.3s ease, transform 0.3s ease'

      heading.addEventListener('mouseenter', () => {
        heading.style.color = '#00c292'
        heading.style.transform = 'translateX(5px)'
      })

      heading.addEventListener('mouseleave', () => {
        heading.style.color = ''
        heading.style.transform = ''
      })
    })
  }

  initializeCopyToClipboard() {
    // Add copy functionality for text examples
    const textExamples = document.querySelectorAll('mark, del, ins, s, u, small, strong, em')

    textExamples.forEach(element => {
      element.style.cursor = 'pointer'
      element.title = 'Click to view HTML'

      element.addEventListener('click', (e) => {
        e.preventDefault()
        const tagName = element.tagName.toLowerCase()
        const text = element.textContent
        const htmlCode = `<${tagName}>${text}</${tagName}>`

        this.showCodeModal(htmlCode, tagName.toUpperCase() + ' Tag Example')
      })
    })
  }

  copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(err => {
        console.error('Failed to copy text: ', err)
        this.fallbackCopyToClipboard(text)
      })
    } else {
      this.fallbackCopyToClipboard(text)
    }
  }

  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
    document.body.removeChild(textArea)
  }

  showNotification(message) {
    // Create a temporary notification
    const notification = document.createElement('div')
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #00c292;
      color: white;
      padding: 12px 24px;
      border-radius: 4px;
      z-index: 9999;
      animation: slideInUp 0.3s ease;
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = 'slideOutDown 0.3s ease'
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 2000)
  }

  showCodeModal(code, title) {
    // Create a simple modal to show the HTML code
    const modal = document.createElement('div')
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      max-width: 500px;
    `

    modal.innerHTML = `
      <h3 style="margin: 0 0 10px 0; color: #333;">${title}</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px; margin: 10px 0;"><code>${this.escapeHtml(code)}</code></pre>
      <button id="closeModal" style="background: #00c292; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Close</button>
      <button id="copyCode" style="background: #03a9f3; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-left: 10px;">Copy Code</button>
    `

    // Create backdrop
    const backdrop = document.createElement('div')
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
    `

    document.body.appendChild(backdrop)
    document.body.appendChild(modal)

    // Event listeners
    document.getElementById('closeModal').addEventListener('click', () => {
      document.body.removeChild(modal)
      document.body.removeChild(backdrop)
    })

    document.getElementById('copyCode').addEventListener('click', () => {
      this.copyToClipboard(code)
      this.showNotification('Code copied to clipboard!')
      document.body.removeChild(modal)
      document.body.removeChild(backdrop)
    })

    backdrop.addEventListener('click', () => {
      document.body.removeChild(modal)
      document.body.removeChild(backdrop)
    })
  }

  escapeHtml(text) {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
}

// Initialize the page when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.typographyPage = new TypographyPage()
    window.typographyPage.init()
  })
} else {
  window.typographyPage = new TypographyPage()
  window.typographyPage.init()
}

export { TypographyPage }