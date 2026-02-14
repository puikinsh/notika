/**
 * Form Elements Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'
import { Toast } from 'bootstrap'

class FormElementsPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'FORMS'
    this.ui = new NotikaUI()
    console.log('🚀 Form Elements page initializing...')
  }

  async init() {
    await super.init()
    await this.ui.init()
    this.initializeFormFeatures()
    console.log('✅ Form Elements functionality ready')
  }

  initializeFormFeatures() {
    // Initialize all form sections
    this.initializeBasicInputs()
    this.initializeInputGroups()
    this.initializeValidation()
    this.initializeSelectElements()
    this.initializeCheckboxRadio()
    this.initializeTextareas()
    console.log('✅ All form features initialized')
  }

  initializeBasicInputs() {
    // Add real-time character counter to text inputs
    const textInputs = document.querySelectorAll('#basic-inputs .form-control')
    textInputs.forEach(input => {
      const maxLength = input.getAttribute('maxlength') || 100
      input.setAttribute('maxlength', maxLength)

      input.addEventListener('input', () => {
        const remaining = maxLength - input.value.length
        let counter = input.parentNode.querySelector('.char-counter')

        if (!counter) {
          counter = document.createElement('small')
          counter.className = 'char-counter text-muted mt-1 d-block'
          input.parentNode.appendChild(counter)
        }

        counter.textContent = `${input.value.length}/${maxLength} characters`

        if (remaining < 10) {
          counter.classList.remove('text-muted')
          counter.classList.add('text-warning')
        } else {
          counter.classList.remove('text-warning')
          counter.classList.add('text-muted')
        }
      })
    })
  }

  initializeInputGroups() {
    // Add interactive features to input groups
    const inputGroups = document.querySelectorAll('#input-groups .input-group')
    inputGroups.forEach(group => {
      const button = group.querySelector('.btn')
      if (button) {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          const input = group.querySelector('.form-control')
          if (input && input.value.trim()) {
            this.ui.showSuccess(`Input processed: "${input.value}"`)
            input.value = ''
          } else {
            this.ui.showWarning('Please enter some text first')
          }
        })
      }
    })
  }

  initializeValidation() {
    // Real-time validation for form fields
    const validationForm = document.getElementById('validation-form')
    if (validationForm) {
      const inputs = validationForm.querySelectorAll('.form-control')

      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          this.validateField(input)
        })

        input.addEventListener('input', () => {
          // Clear validation state on input
          input.classList.remove('is-valid', 'is-invalid')
          const feedback = input.parentNode.querySelector('.invalid-feedback, .valid-feedback')
          if (feedback) feedback.remove()
        })
      })
    }
  }

  validateField(input) {
    const value = input.value.trim()
    let isValid = true
    let message = ''

    // Validate based on input type and attributes
    if (input.hasAttribute('required') && !value) {
      isValid = false
      message = 'This field is required'
    } else if (input.type === 'email' && value && !this.isValidEmail(value)) {
      isValid = false
      message = 'Please enter a valid email address'
    } else if (input.type === 'tel' && value && !this.isValidPhone(value)) {
      isValid = false
      message = 'Please enter a valid phone number'
    } else if (input.minLength && value.length < input.minLength) {
      isValid = false
      message = `Minimum ${input.minLength} characters required`
    }

    // Apply validation state
    input.classList.remove('is-valid', 'is-invalid')
    input.classList.add(isValid ? 'is-valid' : 'is-invalid')

    // Remove existing feedback
    const existingFeedback = input.parentNode.querySelector('.invalid-feedback, .valid-feedback')
    if (existingFeedback) existingFeedback.remove()

    // Add feedback message
    if (message || isValid) {
      const feedbackDiv = document.createElement('div')
      feedbackDiv.className = isValid ? 'valid-feedback' : 'invalid-feedback'
      feedbackDiv.textContent = message || 'Looks good!'
      input.parentNode.appendChild(feedbackDiv)
    }
  }

  initializeSelectElements() {
    // Enhance select elements with custom styling
    const selects = document.querySelectorAll('#select-elements select.form-select')
    selects.forEach(select => {
      select.addEventListener('change', () => {
        if (select.value) {
          this.ui.showInfo(`Selected: ${select.options[select.selectedIndex].text}`)
        }
      })
    })
  }

  initializeCheckboxRadio() {
    // Add interactive behavior to checkboxes and radios
    const checkboxes = document.querySelectorAll('#checkbox-radio input[type="checkbox"]')
    const radios = document.querySelectorAll('#checkbox-radio input[type="radio"]')

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`)
        if (label) {
          const text = label.textContent
          this.ui.showInfo(`${text} ${checkbox.checked ? 'checked' : 'unchecked'}`)
        }
      })
    })

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        const label = document.querySelector(`label[for="${radio.id}"]`)
        if (label && radio.checked) {
          this.ui.showInfo(`Selected: ${label.textContent}`)
        }
      })
    })
  }

  initializeTextareas() {
    // Add features to textareas
    const textareas = document.querySelectorAll('#textarea-elements textarea')
    textareas.forEach(textarea => {
      // Auto-resize functionality
      textarea.addEventListener('input', () => {
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight + 'px'
      })

      // Word count
      const maxWords = 100
      textarea.addEventListener('input', () => {
        const words = textarea.value.trim().split(/\s+/).filter(word => word.length > 0)
        const wordCount = words.length

        let counter = textarea.parentNode.querySelector('.word-counter')
        if (!counter) {
          counter = document.createElement('small')
          counter.className = 'word-counter text-muted mt-1 d-block'
          textarea.parentNode.appendChild(counter)
        }

        counter.textContent = `${wordCount}/${maxWords} words`

        if (wordCount > maxWords * 0.9) {
          counter.classList.remove('text-muted')
          counter.classList.add('text-warning')
        } else {
          counter.classList.remove('text-warning')
          counter.classList.add('text-muted')
        }
      })
    })
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaFormElements = new FormElementsPage()
  })
} else {
  window.NotikaFormElements = new FormElementsPage()
}

export { FormElementsPage }