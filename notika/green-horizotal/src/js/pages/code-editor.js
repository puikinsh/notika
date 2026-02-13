/**
 * Code Editor Page → CodeMirror 6
 */

import { NotikaApp } from '../main.js'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { oneDark } from '@codemirror/theme-one-dark'

class CodeEditorPage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'INTERFACE'
  }

  async init() {
    await super.init()
    this.initEditors()
    console.log('Code Editor page initialized')
  }

  initEditors() {
    const container1 = document.getElementById('code1')
    const container2 = document.getElementById('code2')

    if (container1) {
      // Get text content from textarea, then replace with div
      const code = container1.value || container1.textContent || ''
      const div = document.createElement('div')
      div.id = 'code1'
      container1.replaceWith(div)

      new EditorView({
        doc: code.trim() || jsExample,
        extensions: [
          basicSetup,
          javascript(),
          oneDark,
          EditorView.theme({
            '&': { height: '400px', fontSize: '14px' },
            '.cm-scroller': { overflow: 'auto' }
          })
        ],
        parent: div
      })
    }

    if (container2) {
      const code = container2.value || container2.textContent || ''
      const div = document.createElement('div')
      div.id = 'code2'
      container2.replaceWith(div)

      new EditorView({
        doc: code.trim() || htmlExample,
        extensions: [
          basicSetup,
          html(),
          EditorView.theme({
            '&': { height: '400px', fontSize: '14px' },
            '.cm-scroller': { overflow: 'auto' }
          })
        ],
        parent: div
      })
    }
  }
}

const jsExample = `/**
 * Notika Dashboard - Analytics Module
 * Real-time data processing and visualization
 */

class AnalyticsEngine {
  constructor(config = {}) {
    this.apiEndpoint = config.apiEndpoint || '/api/v2/analytics'
    this.refreshInterval = config.refreshInterval || 30000
    this.charts = new Map()
    this.observers = []
  }

  async fetchMetrics(timeRange = '24h') {
    const response = await fetch(\`\${this.apiEndpoint}/metrics?range=\${timeRange}\`)
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`)
    return response.json()
  }

  registerChart(id, chartInstance) {
    this.charts.set(id, chartInstance)
    console.log(\`Chart registered: \${id}\`)
  }

  startAutoRefresh() {
    this.timer = setInterval(async () => {
      const data = await this.fetchMetrics()
      this.charts.forEach((chart, id) => {
        chart.data.datasets[0].data = data[id]
        chart.update('none')
      })
    }, this.refreshInterval)
  }

  destroy() {
    clearInterval(this.timer)
    this.charts.forEach(chart => chart.destroy())
    this.charts.clear()
  }
}

// Initialize
const analytics = new AnalyticsEngine({
  apiEndpoint: 'https://api.notika.dev/v2',
  refreshInterval: 15000
})

analytics.startAutoRefresh()
`

const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Notika Dashboard</title>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <header class="notika-header">
    <div class="container">
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/">
          <img src="/logo/notika.svg" alt="Notika" height="40">
        </a>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link active" href="/dashboard">Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/analytics">Analytics</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/settings">Settings</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="dashboard-content">
    <div class="container py-4">
      <div class="row g-4">
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">Revenue Overview</h5>
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card shadow-sm bg-success text-white">
            <div class="card-body">
              <h6 class="card-subtitle mb-2">Total Revenue</h6>
              <h2 class="display-5 fw-bold">$48,290</h2>
              <span class="badge bg-light text-success">+12.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>
`

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { window.NotikaCodeEditor = new CodeEditorPage() })
} else {
  window.NotikaCodeEditor = new CodeEditorPage()
}

export { CodeEditorPage }
