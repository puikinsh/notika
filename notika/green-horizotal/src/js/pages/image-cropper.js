/**
 * Image Cropper Page → Cropper.js v2
 * Uses web components API: cropper-canvas, cropper-image, cropper-selection, cropper-viewer
 */

import { NotikaApp } from '../main.js'
import Cropper from 'cropperjs'

class ImageCropperPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'INTERFACE'
    this.cropper = null
  }

  async init() {
    await super.init()
    this.injectStyles()
    this.initCropper()
  }

  injectStyles() {
    const css = document.createElement('style')
    css.textContent = `
      .cropper-card {
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 12px rgba(0,0,0,.08);
        overflow: hidden;
      }
      .cropper-card-header {
        padding: 14px 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .cropper-card-header h5 {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        color: #333;
      }
      .cropper-card-body { padding: 20px; }
      .cropper-dimensions {
        font-size: 12px;
        color: #888;
        font-family: monospace;
        background: #f5f5f5;
        padding: 4px 10px;
        border-radius: 4px;
      }

      /* Canvas wrap */
      .cropper-canvas-wrap {
        background: #1a1a2e;
        min-height: 420px;
      }
      .cropper-canvas-wrap cropper-canvas {
        height: 500px;
      }

      /* Toolbar */
      .cropper-toolbar {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 10px 16px;
        background: #fafafa;
        border-top: 1px solid #eee;
        flex-wrap: wrap;
      }
      .cropper-tool-group { display: flex; gap: 2px; }
      .cropper-tool {
        width: 38px;
        height: 38px;
        border: 1px solid #e0e0e0;
        background: #fff;
        border-radius: 6px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #555;
        font-size: 14px;
        transition: background .15s, border-color .15s;
      }
      .cropper-tool:hover { background: #f0f0f0; border-color: #ccc; color: #333; }
      .cropper-tool:active { background: #e8e8e8; }
      .cropper-tool-divider {
        width: 1px;
        height: 24px;
        background: #ddd;
        margin: 0 6px;
      }

      /* Preview via cropper-viewer */
      .cropper-preview-wrap {
        padding: 20px;
        background: #f8f9fa;
      }
      .cropper-preview-wrap cropper-viewer {
        display: block;
        height: 200px;
        border-radius: 6px;
        border: 2px dashed #dee2e6;
        background: #fff;
        overflow: hidden;
      }

      /* Aspect ratio grid */
      .cropper-ratio-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }
      .cropper-ratio {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 12px 8px;
        border: 2px solid #e9ecef;
        background: #fff;
        border-radius: 8px;
        cursor: pointer;
        transition: border-color .15s, background .15s;
        color: #666;
      }
      .cropper-ratio i { font-size: 18px; }
      .cropper-ratio span { font-size: 12px; font-weight: 600; }
      .cropper-ratio:hover { border-color: #adb5bd; background: #f8f9fa; }
      .cropper-ratio.active { border-color: #0d6efd; background: #e7f1ff; color: #0d6efd; }

      /* Upload area */
      .cropper-upload {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 24px 16px;
        border: 2px dashed #dee2e6;
        border-radius: 8px;
        cursor: pointer;
        text-align: center;
        transition: border-color .2s, background .2s;
        color: #666;
      }
      .cropper-upload:hover { border-color: #0d6efd; background: #f8f9ff; color: #0d6efd; }
      .cropper-upload i { font-size: 28px; }
      .cropper-upload span { font-size: 14px; font-weight: 500; }
      .cropper-upload small { font-size: 11px; color: #999; }

      /* Kill global animations on cropper page controls */
      .cropper-area .cropper-tool,
      .cropper-area .cropper-ratio,
      .cropper-area .cropper-upload,
      .cropper-area .btn,
      .cropper-area .cropper-tool *,
      .cropper-area .cropper-ratio *,
      .cropper-area .cropper-upload * {
        animation: none !important;
      }
    `
    document.head.appendChild(css)
  }

  initCropper() {
    const image = document.getElementById('cropperImage')
    if (!image) return

    // v2: new Cropper(element) generates <cropper-canvas> with web components
    this.cropper = new Cropper(image, {
      container: '.cropper-canvas-wrap'
    })

    // Get references to the web component elements
    const cropperImage = this.cropper.getCropperImage()
    const selection = this.cropper.getCropperSelection()

    // Wait for the image to be ready, then center it
    cropperImage?.$ready(() => {
      cropperImage.$center('contain')
    })

    // Wire up the preview viewer
    const viewerEl = document.querySelector('cropper-viewer')
    if (viewerEl && selection) {
      viewerEl.setAttribute('selection', 'cropper-selection')
    }

    // Track selection changes for crop info
    if (selection) {
      selection.addEventListener('change', (e) => {
        this.updateCropInfo(e.detail)
      })
    }

    this.initToolbar(cropperImage, selection)
    this.initAspectRatio(selection)
    this.initUpload(image)
    this.initDownload(selection)
  }

  updateCropInfo(data) {
    const info = document.getElementById('cropInfo')
    if (!info || !data) return
    const w = Math.round(data.width || 0)
    const h = Math.round(data.height || 0)
    if (w > 0 && h > 0) {
      info.textContent = `${w} × ${h} px`
    }
  }

  initToolbar(cropperImage, selection) {
    const bind = (id, fn) => {
      const el = document.getElementById(id)
      if (el) el.addEventListener('click', (e) => { e.preventDefault(); fn() })
    }

    bind('zoomIn', () => cropperImage?.$zoom(0.1))
    bind('zoomOut', () => cropperImage?.$zoom(-0.1))
    bind('rotateLeft', () => cropperImage?.$rotate('-90deg'))
    bind('rotateRight', () => cropperImage?.$rotate('90deg'))
    bind('flipH', () => cropperImage?.$scale(-1, 1))
    bind('flipV', () => cropperImage?.$scale(1, -1))
    bind('resetCrop', () => {
      cropperImage?.$center('contain')
      selection?.$reset()
    })
  }

  initAspectRatio(selection) {
    const buttons = document.querySelectorAll('.cropper-ratio')
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        const val = parseFloat(btn.dataset.ratio)
        if (selection) {
          selection.aspectRatio = isNaN(val) ? NaN : val
        }
      })
    })
  }

  initUpload(originalImage) {
    const input = document.getElementById('inputImage')
    if (!input) return

    input.addEventListener('change', (e) => {
      const file = e.target.files?.[0]
      if (!file || !file.type.startsWith('image/')) return

      const reader = new FileReader()
      reader.onload = (ev) => {
        // Destroy old cropper
        this.cropper?.destroy()

        // Update the original image src and re-init
        originalImage.src = ev.target.result
        originalImage.addEventListener('load', () => {
          this.initCropper()
        }, { once: true })
      }
      reader.readAsDataURL(file)
    })
  }

  initDownload(selection) {
    const btn = document.getElementById('download')
    if (!btn) return

    btn.addEventListener('click', async (e) => {
      e.preventDefault()
      if (!selection) return

      try {
        const canvas = await selection.$toCanvas({
          width: 4096,
          height: 4096
        })

        canvas.toBlob((blob) => {
          if (!blob) return
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'cropped-image.png'
          a.click()
          URL.revokeObjectURL(url)
        })
      } catch (err) {
        console.warn('Could not export cropped image:', err)
      }
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.NotikaCropper = new ImageCropperPage() })
} else {
  window.NotikaCropper = new ImageCropperPage()
}

export { ImageCropperPage }
