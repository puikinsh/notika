/**
 * Dialog Page - Bootstrap Modal Dialogs
 */

import { NotikaApp } from '../main.js'

class DialogPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'COMPONENTS'
  }

  async init() {
    await super.init()
    this.bindDialogs()
  }

  /**
   * Create and show a Bootstrap modal dialog programmatically
   */
  showDialog({ title, body, icon, iconClass, buttons = [], onHidden, autoClose, size }) {
    const id = 'notikaDialog-' + Date.now()
    const sizeClass = size ? `modal-${size}` : ''

    const footerHtml = buttons.length
      ? `<div class="modal-footer border-0 justify-content-center gap-2 pb-4">${buttons.map(b =>
          `<button type="button" class="btn ${b.class || 'btn-secondary'}" data-action="${b.action || 'dismiss'}">${b.label}</button>`
        ).join('')}</div>`
      : ''

    const iconHtml = icon
      ? `<div class="dialog-modal-icon ${iconClass || ''}">${icon}</div>`
      : ''

    const timerHtml = autoClose
      ? `<div class="dialog-timer-bar"><div class="dialog-timer-fill" style="animation: dialogTimer ${autoClose}ms linear forwards"></div></div>`
      : ''

    const html = `
      <div class="modal fade" id="${id}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ${sizeClass}">
          <div class="modal-content border-0 shadow">
            ${timerHtml}
            <div class="modal-body text-center pt-4 pb-2 px-4">
              ${iconHtml}
              ${title ? `<h5 class="dialog-modal-title">${title}</h5>` : ''}
              ${body ? `<div class="dialog-modal-body">${body}</div>` : ''}
            </div>
            ${footerHtml}
          </div>
        </div>
      </div>`

    document.body.insertAdjacentHTML('beforeend', html)
    const el = document.getElementById(id)
    const modal = new window.bootstrap.Modal(el)

    // Bind button actions
    el.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action
        if (action === 'dismiss') {
          modal.hide()
        } else if (action === 'confirm') {
          modal.hide()
          btn.dispatchEvent(new CustomEvent('dialog:confirm', { bubbles: true }))
        } else if (action === 'cancel') {
          modal.hide()
          btn.dispatchEvent(new CustomEvent('dialog:cancel', { bubbles: true }))
        }
      })
    })

    // Cleanup DOM after hidden
    el.addEventListener('hidden.bs.modal', () => {
      el.remove()
      if (onHidden) onHidden()
    }, { once: true })

    // Auto-close timer
    if (autoClose) {
      setTimeout(() => { modal.hide() }, autoClose)
    }

    modal.show()
    return { modal, el }
  }

  bindDialogs() {
    // Basic Alert
    const basic = document.getElementById('sa-basic')
    if (basic) {
      basic.addEventListener('click', () => {
        this.showDialog({
          icon: '<i class="fa-solid fa-circle-info"></i>',
          iconClass: 'dialog-icon--info',
          title: 'Hello!',
          body: '<p>This is a basic informational dialog.</p>',
          buttons: [{ label: 'OK', class: 'btn-info', action: 'dismiss' }]
        })
      })
    }

    // Title with Text
    const title = document.getElementById('sa-title')
    if (title) {
      title.addEventListener('click', () => {
        this.showDialog({
          icon: '<i class="fa-solid fa-heading"></i>',
          iconClass: 'dialog-icon--primary',
          title: 'The Internet?',
          body: '<p>That thing is still around?</p><p class="text-muted small">A dialog with a title and descriptive content below it.</p>',
          buttons: [{ label: 'Got it', class: 'btn-primary', action: 'dismiss' }]
        })
      })
    }

    // Success
    const success = document.getElementById('sa-success')
    if (success) {
      success.addEventListener('click', () => {
        this.showDialog({
          icon: '<i class="fa-solid fa-circle-check"></i>',
          iconClass: 'dialog-icon--success',
          title: 'Good job!',
          body: '<p>Your action was completed successfully.</p>',
          buttons: [{ label: 'Continue', class: 'btn-success', action: 'dismiss' }]
        })
      })
    }

    // Warning / Confirm
    const warning = document.getElementById('sa-warning')
    if (warning) {
      warning.addEventListener('click', () => {
        const { el } = this.showDialog({
          icon: '<i class="fa-solid fa-triangle-exclamation"></i>',
          iconClass: 'dialog-icon--warning',
          title: 'Are you sure?',
          body: '<p>You will not be able to recover this imaginary file!</p>',
          buttons: [
            { label: 'Yes, delete it!', class: 'btn-warning', action: 'confirm' },
            { label: 'Cancel', class: 'btn-outline-secondary', action: 'cancel' }
          ]
        })
        el.addEventListener('dialog:confirm', () => {
          this.showDialog({
            icon: '<i class="fa-solid fa-circle-check"></i>',
            iconClass: 'dialog-icon--success',
            title: 'Deleted!',
            body: '<p>Your imaginary file has been deleted.</p>',
            buttons: [{ label: 'OK', class: 'btn-success', action: 'dismiss' }]
          })
        })
      })
    }

    // Parameter / Cancel callback
    const params = document.getElementById('sa-params')
    if (params) {
      params.addEventListener('click', () => {
        const { el } = this.showDialog({
          icon: '<i class="fa-solid fa-code-branch"></i>',
          iconClass: 'dialog-icon--danger',
          title: 'Are you sure?',
          body: '<p>This action has different outcomes for Confirm and Cancel.</p>',
          buttons: [
            { label: 'Confirm', class: 'btn-danger', action: 'confirm' },
            { label: 'Cancel', class: 'btn-outline-secondary', action: 'cancel' }
          ]
        })
        el.addEventListener('dialog:confirm', () => {
          this.showDialog({
            icon: '<i class="fa-solid fa-thumbs-up"></i>',
            iconClass: 'dialog-icon--success',
            title: 'Confirmed!',
            body: '<p>The action was confirmed successfully.</p>',
            buttons: [{ label: 'OK', class: 'btn-success', action: 'dismiss' }]
          })
        })
        el.addEventListener('dialog:cancel', () => {
          this.showDialog({
            icon: '<i class="fa-solid fa-ban"></i>',
            iconClass: 'dialog-icon--info',
            title: 'Cancelled',
            body: '<p>The action was cancelled. No changes were made.</p>',
            buttons: [{ label: 'OK', class: 'btn-info', action: 'dismiss' }]
          })
        })
      })
    }

    // Image Header
    const image = document.getElementById('sa-image')
    if (image) {
      image.addEventListener('click', () => {
        this.showDialog({
          title: 'Beautiful!',
          body: '<img src="/post/1.jpg" alt="Dialog image" class="dialog-modal-image"><p class="mt-3">A dialog can include images for visual context.</p>',
          buttons: [{ label: 'Nice!', class: 'btn-secondary', action: 'dismiss' }]
        })
      })
    }

    // Auto Close Timer
    const close = document.getElementById('sa-close')
    if (close) {
      close.addEventListener('click', () => {
        this.showDialog({
          icon: '<i class="fa-solid fa-clock"></i>',
          iconClass: 'dialog-icon--teal',
          title: 'Auto Close',
          body: '<p>This dialog will close automatically in <strong>3 seconds</strong>.</p>',
          autoClose: 3000,
          buttons: [{ label: 'Close now', class: 'btn-outline-dark', action: 'dismiss' }]
        })
      })
    }

    // Input Prompt
    const input = document.getElementById('sa-input')
    if (input) {
      input.addEventListener('click', () => {
        const { el } = this.showDialog({
          icon: '<i class="fa-solid fa-keyboard"></i>',
          iconClass: 'dialog-icon--info',
          title: 'What is your name?',
          body: '<input type="text" class="form-control dialog-input" placeholder="Type your name..." autofocus>',
          buttons: [
            { label: 'Submit', class: 'btn-info', action: 'confirm' },
            { label: 'Cancel', class: 'btn-outline-secondary', action: 'cancel' }
          ]
        })
        el.addEventListener('dialog:confirm', () => {
          const val = el.querySelector('.dialog-input')?.value || 'World'
          this.showDialog({
            icon: '<i class="fa-solid fa-hand-peace"></i>',
            iconClass: 'dialog-icon--success',
            title: `Hello, ${val}!`,
            body: '<p>Your input was captured from the dialog.</p>',
            buttons: [{ label: 'OK', class: 'btn-success', action: 'dismiss' }]
          })
        })
      })
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.NotikaDialog = new DialogPage() })
} else {
  window.NotikaDialog = new DialogPage()
}

export { DialogPage }
