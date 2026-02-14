/**
 * Form Examples Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'

class FormExamplesPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'FORMS'
    this.ui = new NotikaUI()
    console.log('🚀 Form Examples page initializing...')
  }
  
  async init() {
    await super.init()
    await this.ui.init()
    this.initializeFormFeatures()
    console.log('✅ Form Examples functionality ready')
  }
  
  initializeFormFeatures() {
    // Initialize form validation
    this.initializeFormValidation()

    // Initialize character counters
    this.initializeCharacterCounters()

    // Initialize multi-step form
    this.initializeMultiStepForm()

    // Initialize advanced form features
    this.initializeAdvancedFeatures()

    // Attach global form handlers
    this.attachGlobalFormHandlers()

    console.log('✅ Form features initialized')
  }

  initializeFormValidation() {
    // Basic form validation
    window.validateBasicForm = () => {
      const email = document.getElementById('basic-email')
      const password = document.getElementById('basic-password')
      const status = document.getElementById('basic-form-status')

      let isValid = true

      // Reset previous validation
      email.classList.remove('is-invalid', 'is-valid')
      password.classList.remove('is-invalid', 'is-valid')

      // Validate email
      if (!email.value || !email.checkValidity()) {
        email.classList.add('is-invalid')
        isValid = false
      } else {
        email.classList.add('is-valid')
      }

      // Validate password
      if (!password.value || password.value.length < 6) {
        password.classList.add('is-invalid')
        isValid = false
      } else {
        password.classList.add('is-valid')
      }

      // Show result
      if (isValid) {
        status.innerHTML = '<div class="alert alert-success">Form submitted successfully!</div>'
        setTimeout(() => {
          email.value = ''
          password.value = ''
          email.classList.remove('is-valid')
          password.classList.remove('is-valid')
          status.innerHTML = ''
        }, 3000)
      } else {
        status.innerHTML = '<div class="alert alert-danger">Please fix the errors above.</div>'
      }
    }

    // Inline form validation
    window.validateInlineForm = () => {
      const email = document.getElementById('inline-email')
      const password = document.getElementById('inline-password')
      const status = document.getElementById('inline-form-status')

      let isValid = true

      if (!email.value || !email.checkValidity()) {
        email.classList.add('is-invalid')
        isValid = false
      } else {
        email.classList.add('is-valid')
      }

      if (!password.value) {
        password.classList.add('is-invalid')
        isValid = false
      } else {
        password.classList.add('is-valid')
      }

      if (isValid) {
        status.innerHTML = '<div class="alert alert-success">Inline form submitted!</div>'
        setTimeout(() => {
          email.value = ''
          password.value = ''
          email.classList.remove('is-valid')
          password.classList.remove('is-valid')
          status.innerHTML = ''
        }, 3000)
      } else {
        status.innerHTML = '<div class="alert alert-danger">Please fill all fields.</div>'
      }
    }

    // Horizontal form validation
    const horizontalForm = document.getElementById('horizontal-form')
    if (horizontalForm) {
      horizontalForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = document.getElementById('horizontal-email')
        const password = document.getElementById('horizontal-password')
        const status = document.getElementById('horizontal-form-status')

        let isValid = true

        // Reset validation
        horizontalForm.classList.remove('was-validated')

        if (!email.checkValidity()) {
          isValid = false
        }

        if (!password.checkValidity()) {
          isValid = false
        }

        horizontalForm.classList.add('was-validated')

        if (isValid) {
          status.innerHTML = '<div class="alert alert-success">Horizontal form submitted successfully!</div>'
          setTimeout(() => {
            horizontalForm.reset()
            horizontalForm.classList.remove('was-validated')
            status.innerHTML = ''
          }, 3000)
        }
      })
    }

    // Advanced form validation
    const advancedForm = document.getElementById('advanced-form')
    if (advancedForm) {
      advancedForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const status = document.getElementById('advanced-form-status')
        let isValid = true

        // Custom validation for phone
        const phone = document.getElementById('advanced-phone')
        if (phone.value && !phone.checkValidity()) {
          phone.classList.add('is-invalid')
          isValid = false
        } else if (phone.value) {
          phone.classList.add('is-valid')
        }

        // Check all required fields
        const requiredFields = advancedForm.querySelectorAll('[required]')
        requiredFields.forEach(field => {
          if (!field.checkValidity()) {
            field.classList.add('is-invalid')
            isValid = false
          } else {
            field.classList.add('is-valid')
          }
        })

        if (isValid) {
          status.innerHTML = '<div class="alert alert-success">Advanced form submitted successfully!</div>'
          setTimeout(() => {
            advancedForm.reset()
            document.getElementById('bio-count').textContent = '0'
            advancedForm.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
              el.classList.remove('is-valid', 'is-invalid')
            })
            status.innerHTML = ''
          }, 3000)
        } else {
          status.innerHTML = '<div class="alert alert-danger">Please fix the errors above.</div>'
        }
      })
    }

    // Global reset function
    window.resetAdvancedForm = () => {
      const form = document.getElementById('advanced-form')
      form.reset()
      document.getElementById('bio-count').textContent = '0'
      form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid')
      })
      document.getElementById('advanced-form-status').innerHTML = ''
    }

    // Terms modal function
    window.showTerms = () => {
      alert('Terms and Conditions:\n\n1. You agree to provide accurate information\n2. You understand this is a demo form\n3. No real data is collected or stored\n4. This is for demonstration purposes only')
    }
  }

  initializeCharacterCounters() {
    const bioTextarea = document.getElementById('advanced-bio')
    const bioCounter = document.getElementById('bio-count')

    if (bioTextarea && bioCounter) {
      bioTextarea.addEventListener('input', () => {
        const count = bioTextarea.value.length
        bioCounter.textContent = count

        // Color coding
        if (count > 450) {
          bioCounter.style.color = '#dc3545'
        } else if (count > 400) {
          bioCounter.style.color = '#fd7e14'
        } else {
          bioCounter.style.color = '#6c757d'
        }
      })
    }
  }

  initializeMultiStepForm() {
    this.currentStep = 1
    this.totalSteps = 3

    // Multi-step form navigation
    window.nextStep = () => {
      if (this.validateCurrentStep()) {
        if (this.currentStep < this.totalSteps) {
          this.currentStep++
          this.updateStepDisplay()
          this.updateProgressBar()
          this.updateStepIndicators()
        }
      }
    }

    window.previousStep = () => {
      if (this.currentStep > 1) {
        this.currentStep--
        this.updateStepDisplay()
        this.updateProgressBar()
        this.updateStepIndicators()
      }
    }

    // Multi-step form submission
    const multiStepForm = document.getElementById('multi-step-form')
    if (multiStepForm) {
      multiStepForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (this.validateCurrentStep()) {
          const status = document.getElementById('multi-step-status')
          status.innerHTML = '<div class="alert alert-success">Multi-step form completed successfully!</div>'

          // Reset form after success
          setTimeout(() => {
            this.resetMultiStepForm()
          }, 3000)
        }
      })
    }
  }

  validateCurrentStep() {
    const currentStepEl = document.querySelector(`[data-step="${this.currentStep}"].form-step`)
    if (!currentStepEl) return false

    const requiredFields = currentStepEl.querySelectorAll('[required]')
    let isValid = true

    requiredFields.forEach(field => {
      field.classList.remove('is-invalid', 'is-valid')

      if (field.id === 'step-confirm-password') {
        const password = document.getElementById('step-password')
        if (field.value !== password.value) {
          field.classList.add('is-invalid')
          isValid = false
          return
        }
      }

      if (!field.checkValidity()) {
        field.classList.add('is-invalid')
        isValid = false
      } else {
        field.classList.add('is-valid')
      }
    })

    // Update confirmation summary on step 3
    if (this.currentStep === 3 && isValid) {
      this.updateConfirmationSummary()
    }

    return isValid
  }

  updateStepDisplay() {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
      step.classList.remove('active')
      step.style.display = 'none'
    })

    // Show current step
    const currentStep = document.querySelector(`[data-step="${this.currentStep}"].form-step`)
    if (currentStep) {
      currentStep.classList.add('active')
      currentStep.style.display = 'block'
    }

    // Update navigation buttons
    const prevBtn = document.getElementById('prev-step')
    const nextBtn = document.getElementById('next-step')
    const submitBtn = document.getElementById('submit-step')

    if (prevBtn) {
      prevBtn.style.display = this.currentStep > 1 ? 'inline-block' : 'none'
    }

    if (nextBtn) {
      nextBtn.style.display = this.currentStep < this.totalSteps ? 'inline-block' : 'none'
    }

    if (submitBtn) {
      submitBtn.style.display = this.currentStep === this.totalSteps ? 'inline-block' : 'none'
    }
  }

  updateProgressBar() {
    const progressBar = document.getElementById('step-progress-bar')
    if (progressBar) {
      const progress = (this.currentStep / this.totalSteps) * 100
      progressBar.style.width = `${progress}%`
    }
  }

  updateStepIndicators() {
    document.querySelectorAll('.step-indicator').forEach(indicator => {
      const stepNum = parseInt(indicator.dataset.step)
      indicator.classList.remove('active', 'completed')

      if (stepNum === this.currentStep) {
        indicator.classList.add('active')
      } else if (stepNum < this.currentStep) {
        indicator.classList.add('completed')
      }
    })
  }

  updateConfirmationSummary() {
    const summary = document.getElementById('confirmation-summary')
    if (!summary) return

    const firstName = document.getElementById('step-firstname').value
    const lastName = document.getElementById('step-lastname').value
    const birthdate = document.getElementById('step-birthdate').value
    const email = document.getElementById('step-email').value

    summary.innerHTML = `
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Date of Birth:</strong> ${birthdate}</p>
      <p><strong>Email:</strong> ${email}</p>
    `
  }

  resetMultiStepForm() {
    this.currentStep = 1
    const form = document.getElementById('multi-step-form')
    if (form) {
      form.reset()
      form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
        el.classList.remove('is-valid', 'is-invalid')
      })
    }
    this.updateStepDisplay()
    this.updateProgressBar()
    this.updateStepIndicators()
    document.getElementById('multi-step-status').innerHTML = ''
    document.getElementById('confirmation-summary').innerHTML = ''
  }

  initializeAdvancedFeatures() {
    // Real-time email validation
    const emailFields = document.querySelectorAll('input[type="email"]')
    emailFields.forEach(field => {
      field.addEventListener('blur', () => {
        if (field.value) {
          field.classList.remove('is-invalid', 'is-valid')
          if (field.checkValidity()) {
            field.classList.add('is-valid')
          } else {
            field.classList.add('is-invalid')
          }
        }
      })
    })

    // Password strength indicator
    const passwordFields = document.querySelectorAll('input[type="password"]')
    passwordFields.forEach(field => {
      field.addEventListener('input', () => {
        this.checkPasswordStrength(field)
      })
    })

    // Auto-format phone numbers
    const phoneField = document.getElementById('advanced-phone')
    if (phoneField) {
      phoneField.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '')
        if (value.length >= 6) {
          value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
        } else if (value.length >= 3) {
          value = value.replace(/(\d{3})(\d{1,3})/, '($1) $2')
        }
        e.target.value = value
      })
    }
  }

  checkPasswordStrength(field) {
    const password = field.value
    let strength = 0

    if (password.length >= 6) strength++
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++

    // Remove existing strength indicator
    const existingIndicator = field.parentNode.querySelector('.password-strength')
    if (existingIndicator) {
      existingIndicator.remove()
    }

    // Add strength indicator
    if (password.length > 0) {
      const indicator = document.createElement('div')
      indicator.className = 'password-strength mt-1'

      let strengthText = ''
      let strengthClass = ''

      if (strength <= 2) {
        strengthText = 'Weak'
        strengthClass = 'text-danger'
      } else if (strength <= 3) {
        strengthText = 'Medium'
        strengthClass = 'text-warning'
      } else {
        strengthText = 'Strong'
        strengthClass = 'text-success'
      }

      indicator.innerHTML = `<small class="${strengthClass}">Password strength: ${strengthText}</small>`
      field.parentNode.appendChild(indicator)
    }
  }

  attachGlobalFormHandlers() {
    // Prevent form submission on Enter key for demo purposes
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
        const form = e.target.closest('form')
        if (form && form.id !== 'horizontal-form' && form.id !== 'advanced-form' && form.id !== 'multi-step-form') {
          e.preventDefault()
        }
      }
    })

    // Add loading states to buttons
    document.addEventListener('click', (e) => {
      if (e.target.type === 'submit' || e.target.onclick) {
        e.target.disabled = true
        const originalText = e.target.textContent
        e.target.textContent = 'Processing...'

        setTimeout(() => {
          e.target.disabled = false
          e.target.textContent = originalText
        }, 1000)
      }
    })

    console.log('✅ Advanced form handlers attached')
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaFormExamples = new FormExamplesPage()
  })
} else {
  window.NotikaFormExamples = new FormExamplesPage()
}

export { FormExamplesPage }