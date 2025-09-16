/**
 * Form Components Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'

class FormComponentsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'FORMS'
    this.ui = new NotikaUI()
    console.log('🚀 Form Components page initializing...')
  }
  
  async init() {
    await super.init()
    await this.ui.init()
    this.initializeFormFeatures()
    console.log('✅ Form Components functionality ready')
  }
  
  initializeFormFeatures() {
    // Initialize form validation
    this.initializeFormValidation()

    // Initialize custom form components
    this.initializeCustomComponents()

    // Initialize form interactions
    this.initializeFormInteractions()

    // Set current dates for date pickers
    this.setCurrentDates()

    console.log('✅ Form features initialized')
  }

  initializeFormValidation() {
    // Add form validation to all forms
    const forms = document.querySelectorAll('form')
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('Form submitted:', form)
      })
    })
  }

  initializeCustomComponents() {
    // Initialize toggle switches
    const toggles = document.querySelectorAll('.toggle-switch input[type="checkbox"]')
    toggles.forEach(toggle => {
      toggle.addEventListener('change', function() {
        console.log('Toggle changed:', this.checked)
      })
    })

    // Initialize file upload areas
    const uploadAreas = document.querySelectorAll('.file-upload-area')
    uploadAreas.forEach(area => {
      area.addEventListener('dragover', (e) => {
        e.preventDefault()
        area.classList.add('dragover')
      })

      area.addEventListener('dragleave', () => {
        area.classList.remove('dragover')
      })

      area.addEventListener('drop', (e) => {
        e.preventDefault()
        area.classList.remove('dragover')
        console.log('Files dropped:', e.dataTransfer.files)
      })
    })
  }

  initializeFormInteractions() {
    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input, textarea, select')
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.closest('.form-group')?.classList.add('focused')
      })

      input.addEventListener('blur', function() {
        this.closest('.form-group')?.classList.remove('focused')
      })
    })

    // Initialize drag and drop file upload
    this.initializeDragAndDrop()

    // Initialize HTML editor
    this.initializeHTMLEditor()
  }

  initializeDragAndDrop() {
    // Make functions available globally for the HTML event handlers
    window.handleFileDrop = (event, container) => {
      event.preventDefault()
      container.style.borderColor = '#ddd'
      container.style.backgroundColor = '#f8f9fa'

      const files = event.dataTransfer.files
      this.displayFiles(files)
    }

    window.handleFileSelect = (event) => {
      const files = event.target.files
      this.displayFiles(files)
    }
  }

  displayFiles(files) {
    const fileList = document.getElementById('file-list')
    fileList.innerHTML = ''

    Array.from(files).forEach(file => {
      const fileItem = document.createElement('div')
      fileItem.className = 'file-item d-flex justify-content-between align-items-center p-2 mb-2 bg-white rounded border'
      fileItem.innerHTML = `
        <div class="d-flex align-items-center">
          <span class="me-2 text-primary">📄</span>
          <span class="file-name">${file.name}</span>
          <small class="text-muted ms-2">(${(file.size / 1024).toFixed(1)} KB)</small>
        </div>
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.file-item').remove()">
          ✕
        </button>
      `
      fileList.appendChild(fileItem)
    })
  }

  initializeHTMLEditor() {
    const editorContainer = document.getElementById('html-editor-container')
    if (editorContainer) {
      editorContainer.innerHTML = `
        <div class="html-editor-toolbar mb-3">
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="document.execCommand('bold')" title="Bold">
              <strong>B</strong>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="document.execCommand('italic')" title="Italic">
              <em>I</em>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="document.execCommand('underline')" title="Underline">
              <u>U</u>
            </button>
          </div>
          <div class="btn-group ms-2" role="group">
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="document.execCommand('justifyLeft')" title="Align Left">
              ⬅
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="document.execCommand('justifyCenter')" title="Center">
              ↔
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm" onclick="document.execCommand('justifyRight')" title="Align Right">
              ➡
            </button>
          </div>
        </div>
        <div contenteditable="true" class="html-editor-content form-control" style="min-height: 200px; padding: 15px;">
          <p>This is a <strong>working HTML editor</strong>. You can:</p>
          <ul>
            <li>Type and edit text</li>
            <li>Use the toolbar buttons for formatting</li>
            <li><em>Add italic text</em> and <u>underlined text</u></li>
            <li>Change text alignment</li>
          </ul>
          <p>Try editing this content!</p>
        </div>
      `
    }
  }

  setCurrentDates() {
    // Set today's date for date pickers
    const today = new Date()
    const todayString = today.toISOString().split('T')[0] // YYYY-MM-DD format
    const todayDateTime = today.toISOString().slice(0, 16) // YYYY-MM-DDTHH:MM format

    // Update date picker values
    const dateInputs = document.querySelectorAll('input[type="date"]')
    dateInputs.forEach(input => {
      input.value = todayString
    })

    const datetimeInputs = document.querySelectorAll('input[type="datetime-local"]')
    datetimeInputs.forEach(input => {
      input.value = todayDateTime
    })

    console.log('✅ Date pickers set to current date:', todayString)
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaFormComponents = new FormComponentsPage()
  })
} else {
  window.NotikaFormComponents = new FormComponentsPage()
}

export { FormComponentsPage }