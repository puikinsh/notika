/**
 * Modern Notika Template - Vite 7.1.5 Entry Point
 * PROPER ES6 modules with bundling - NO MORE LINE BY LINE INCLUDES!
 */

// Import ALL styles through Vite bundling
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import 'leaflet/dist/leaflet.css'

// Note: Notika template CSS files are loaded via <link> tags in HTML head for better compatibility

// Font Awesome - Tree-shakable approach (only icons we use)
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { 
  faHouse,
  faMagnifyingGlass, 
  faEnvelope,
  faBell,
  faMessage,
  faBars,
  faPenToSquare,
  faChartColumn,
  faTable,
  faFileLines,
  faCube,
  faHeadset,
  faGear,
  faBolt,
  faArrowRotateRight,
  faPalette,
  faChartLine,
  faFontAwesome,
  faUsers,
  faGlobe,
  faListCheck,
  faArchive,
  faClock,
  faPlus,
  faTrashCan,
  faComments,
  faPaperPlane,
  faMicrochip,
  faMemory,
  faHdd,
  faWifi,
  faMousePointer,
  faArrowTrendUp,
  faArrowTrendDown,
  faShieldHalved
} from '@fortawesome/free-solid-svg-icons'
import { 
  faBootstrap, 
  faGoogle, 
  faMicrosoft, 
  faGithub, 
  faStackOverflow, 
  faReddit, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons'

// Add only the icons we use to the library
library.add(
  faHouse,
  faMagnifyingGlass,
  faEnvelope,
  faBell,
  faMessage,
  faBars,
  faPenToSquare,
  faChartColumn,
  faTable,
  faFileLines,
  faCube,
  faHeadset,
  faGear,
  faBolt,
  faArrowRotateRight,
  faPalette,
  faChartLine,
  faFontAwesome,
  faBootstrap,
  faUsers,
  faGlobe,
  faListCheck,
  faArchive,
  faClock,
  faPlus,
  faTrashCan,
  faComments,
  faPaperPlane,
  faMicrochip,
  faMemory,
  faHdd,
  faWifi,
  faMousePointer,
  faArrowTrendUp,
  faArrowTrendDown,
  faShieldHalved,
  faGoogle,
  faMicrosoft,
  faGithub,
  faStackOverflow,
  faReddit,
  faLinkedin
)

// Replace any <i> tags with SVG automatically
dom.watch()

// Import ALL original Notika CSS files through Vite (in order from HTML)
import '../../css/swiper.min.css'
import '../../css/owl.theme.css'
import '../../css/owl.transitions.css'
import '../../css/meanmenu/meanmenu.min.css'
// Removed animate.css v3.4.0 (656 redundant vendor prefixes from 2015)
import '../../css/reset.css'
import '../../css/notika-custom-icon.css'
import '../../css/wave/waves.min.css'
import '../../css/main.css'
import '../../style.css'
import '../../css/responsive.css'
import '../../css/header-modern-clean.css'
import '../../css/navbar-stable.css'
import '../../css/widgets-consistent.css'
import '../../css/email-widget-fix.css'

// Import Google Fonts and Font Awesome via CDN (already in HTML)
// Import custom modern SCSS
import '../css/modern.scss'

// Import ALL JavaScript through Vite bundling
import { Chart, registerables } from 'chart.js'
import * as bootstrap from 'bootstrap'
import AOS from 'aos'
import { toast } from 'sonner'
import L from 'leaflet'

// Register Chart.js components
Chart.register(...registerables)

// Make Bootstrap globally available
window.bootstrap = bootstrap

/**
 * Modern Notika Application Class - Pure Vite 7.1.5 Architecture
 */
class NotikaApp {
  constructor() {
    this.isViteBundled = true
    this.version = '2.0.0'
    this.buildTool = 'Vite 7.1.5'
    
    console.log('🚀 Initializing Notika with Vite 7.1.5 bundling...')
    this.init()
  }
  
  async init() {
    try {
      // Show we're using PROPER Vite bundling
      console.log('✅ All dependencies bundled by Vite 7.1.5')
      console.log('✅ Bootstrap 5.3.8 imported as module')
      console.log('✅ Chart.js 4.5.0 imported as module') 
      console.log('✅ All CSS processed by Vite')
      
      // Initialize modern libraries properly
      this.initializeCharts()
      this.initializeUI()
      this.initializeAnimations()
      this.setupModernFeatures()
      
      // Update bundle status in demo
      const bundleStatus = document.getElementById('bundle-status')
      if (bundleStatus) {
        bundleStatus.textContent = '✅ Properly bundled by Vite 7.1.5'
        bundleStatus.style.color = '#00c292'
      }
      
      // Add modern Font Awesome icons where appropriate
      this.updateIconsToLatestFA()
      
      console.log('🎉 Notika Template fully modernized with Font Awesome 7.0.1 (tree-shaken) + Vite bundling!')
      
    } catch (error) {
      console.error('❌ Initialization error:', error)
    }
  }
  
  initializeCharts() {
    // Initialize main sales chart (curved-line-chart)
    const curvedChart = document.getElementById('curved-line-chart')
    if (curvedChart) {
      const canvas = document.createElement('canvas')
      canvas.style.width = '100%'
      canvas.style.height = '300px'
      curvedChart.appendChild(canvas)
      
      const ctx = canvas.getContext('2d')
      const gradient = ctx.createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, 'rgba(0, 194, 146, 0.8)')
      gradient.addColorStop(1, 'rgba(0, 194, 146, 0.1)')
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Sales Statistics',
            data: [30000, 35000, 28000, 45000, 42000, 55000, 48000, 52000, 60000, 58000, 65000, 70000],
            borderColor: '#00c292',
            backgroundColor: gradient,
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `Sales: $${context.parsed.y.toLocaleString()}`
              }
            }
          },
          scales: {
            y: {
              ticks: {
                callback: (value) => `$${(value / 1000)}K`
              }
            }
          }
        }
      })
    }

    // Initialize recent items chart
    const recentItemsChart = document.getElementById('recent-items-chart')
    if (recentItemsChart) {
      const canvas = document.createElement('canvas')
      canvas.style.width = '100%'
      canvas.style.height = '100px'
      recentItemsChart.appendChild(canvas)
      
      const ctx = canvas.getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Galaxy', 'Huawei', 'HTC', 'Samsung', 'LG'],
          datasets: [{
            data: [921, 240, 400, 870, 790],
            backgroundColor: ['#00c292', '#03a9f3', '#ffc107', '#e91e63', '#9c27b0'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { 
            x: { display: false }, 
            y: { display: false } 
          }
        }
      })
    }
    
    // Initialize sparkline charts from original data
    this.initializeSparklines()
    
    // Initialize knob charts
    this.initializeKnobs()
  }

  initializeSparklines() {
    // Map sparkline classes to their data from original
    const sparklineData = {
      'sparkline-bar-stats1': [9,4,8,6,5,6,4,8,3,5,9,5],
      'sparkline-bar-stats2': [1,4,8,3,5,6,4,8,3,3,9,5],
      'sparkline-bar-stats3': [4,2,8,2,5,6,3,8,3,5,9,5],
      'sparkline-bar-stats4': [2,4,8,4,5,7,4,7,3,5,7,5],
      'stats-bar': [3,5,2,8,4,6,3,7],
      'stats-line': [2,4,3,7,5,8,6,9],
      'stats-bar-2': [4,3,6,2,7,5,8,4]
    }

    Object.keys(sparklineData).forEach(className => {
      const elements = document.querySelectorAll(`.${className}`)
      elements.forEach(element => {
        const canvas = document.createElement('canvas')
        canvas.style.width = '100%'
        canvas.style.height = '30px'
        element.appendChild(canvas)
        
        const ctx = canvas.getContext('2d')
        new Chart(ctx, {
          type: className.includes('line') ? 'line' : 'bar',
          data: {
            labels: sparklineData[className].map((_, i) => i),
            datasets: [{
              data: sparklineData[className],
              borderColor: '#00c292',
              backgroundColor: className.includes('line') ? 'transparent' : 'rgba(0, 194, 146, 0.7)',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              pointRadius: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
          }
        })
      })
    })
  }

  initializeKnobs() {
    const knobs = document.querySelectorAll('.knob')
    knobs.forEach(knob => {
      const value = knob.dataset.rel
      const width = knob.dataset.width || '90'
      const fgColor = knob.dataset.fgcolor || '#00c292'
      const bgColor = knob.dataset.bgcolor || '#E4E4E4'
      
      // Create a simple circular progress indicator
      const canvas = document.createElement('canvas')
      canvas.width = parseInt(width)
      canvas.height = parseInt(width)
      canvas.style.width = width + 'px'
      canvas.style.height = width + 'px'
      
      const ctx = canvas.getContext('2d')
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = (canvas.width / 2) - 10
      
      // Background circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = bgColor
      ctx.lineWidth = 8
      ctx.stroke()
      
      // Progress arc
      const progress = (value / 100) * 2 * Math.PI
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + progress)
      ctx.strokeStyle = fgColor
      ctx.lineWidth = 8
      ctx.stroke()
      
      // Add percentage text
      ctx.fillStyle = fgColor
      ctx.font = `${width / 6}px Arial`
      ctx.textAlign = 'center'
      ctx.fillText(`${value}%`, centerX, centerY + 5)
      
      knob.parentNode.insertBefore(canvas, knob)
      knob.style.display = 'none'
    })
  }
  
  initializeUI() {
    // Initialize Bootstrap 5.3.8 components (Vite bundled)
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new Tooltip(tooltipTriggerEl)
    })
    
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    popoverTriggerList.forEach(popoverTriggerEl => {
      new Popover(popoverTriggerEl)
    })
    
    // Initialize counter animations
    this.initializeCounters()
    
    // Initialize Todo functionality
    this.initializeTodo()
    
    // Initialize Chat functionality
    this.initializeChat()
    
    // Initialize World Map
    this.initializeWorldMap()
    
    // Initialize Server Statistics
    this.initializeServerStats()
    
    // Initialize User Activity Chart
    this.initializeUserActivity()
    
    console.log('✅ Bootstrap 5.3.8 components initialized via Vite bundling')
  }

  initializeTodo() {
    const todoList = document.getElementById('todo-list')
    const todoInput = document.getElementById('todo-input-text')
    const todoSubmit = document.getElementById('todo-btn-submit')
    const todoRemaining = document.getElementById('todo-remaining')
    const todoTotal = document.getElementById('todo-total')
    const archiveBtn = document.getElementById('btn-archive')

    if (!todoList || !todoInput || !todoSubmit) return

    let todos = []
    let todoId = 1

    const updateTodoCount = () => {
      const activeTodos = todos.filter(todo => !todo.completed).length
      const totalTodos = todos.length
      const completedTodos = totalTodos - activeTodos
      const progressPercentage = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0
      
      if (todoRemaining) todoRemaining.textContent = activeTodos
      if (todoTotal) todoTotal.textContent = totalTodos
      
      // Update progress bar
      const progressBar = document.getElementById('todo-progress')
      if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`
        progressBar.setAttribute('aria-valuenow', progressPercentage)
      }
    }

    const renderTodos = () => {
      todoList.innerHTML = ''
      todos.forEach(todo => {
        const li = document.createElement('li')
        li.className = `list-group-item d-flex align-items-center border-0 px-0 py-2 ${todo.completed ? 'text-muted' : ''}`
        li.innerHTML = `
          <div class="form-check me-2">
            <input class="form-check-input" type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}" id="todo-${todo.id}">
          </div>
          <span class="flex-grow-1 small ${todo.completed ? 'text-decoration-line-through' : ''}">${todo.text}</span>
          <button class="btn btn-sm btn-outline-danger border-0 todo-delete" data-id="${todo.id}" title="Delete todo">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        `
        todoList.appendChild(li)
      })
      updateTodoCount()
    }

    const addTodo = (text) => {
      todos.push({ id: todoId++, text: text.trim(), completed: false })
      renderTodos()
    }

    todoSubmit.addEventListener('click', () => {
      const text = todoInput.value.trim()
      if (text) {
        addTodo(text)
        todoInput.value = ''
      }
    })

    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        todoSubmit.click()
      }
    })

    todoList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const id = parseInt(e.target.dataset.id)
        const todo = todos.find(t => t.id === id)
        if (todo) {
          todo.completed = e.target.checked
          renderTodos()
        }
      }
    })

    todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('todo-delete')) {
        const id = parseInt(e.target.dataset.id)
        todos = todos.filter(t => t.id !== id)
        renderTodos()
      }
    })

    if (archiveBtn) {
      archiveBtn.addEventListener('click', (e) => {
        e.preventDefault()
        todos = todos.filter(t => !t.completed)
        renderTodos()
      })
    }

    // Add some default todos to populate the widget
    addTodo('Review quarterly reports')
    addTodo('Update user documentation')
    addTodo('Test new features')
    addTodo('Deploy system updates')
    addTodo('Analyze performance metrics')
    addTodo('Schedule team meeting')
    addTodo('Backup database')
    addTodo('Review security logs')
  }

  initializeChat() {
    const chatInput = document.querySelector('.chat-input')
    const chatSendBtn = document.querySelector('.notika-chat-btn')
    const conversationList = document.querySelector('.conversation-list')

    if (!chatInput || !chatSendBtn || !conversationList) return

    const addMessage = (message, isUser = true) => {
      const li = document.createElement('div')
      li.className = `d-flex mb-3 ${isUser ? 'justify-content-end' : ''}`
      
      const now = new Date()
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
      
      if (isUser) {
        li.innerHTML = `
          <div class="me-2 text-end">
            <div class="d-flex align-items-baseline justify-content-end mb-1">
              <span class="text-muted small me-2">${timeStr}</span>
              <span class="fw-medium small">You</span>
            </div>
            <div class="bg-primary text-white p-2 rounded">
              <p class="mb-0 small">${message}</p>
            </div>
          </div>
          <img src="/post/2.jpg" alt="You" class="rounded-circle" style="width: 35px; height: 35px; object-fit: cover;">
        `
      } else {
        li.innerHTML = `
          <img src="/post/1.jpg" alt="Assistant" class="rounded-circle me-2" style="width: 35px; height: 35px; object-fit: cover;">
          <div class="flex-grow-1">
            <div class="d-flex align-items-baseline mb-1">
              <span class="fw-medium small me-2">Assistant</span>
              <span class="text-muted small">${timeStr}</span>
            </div>
            <div class="bg-light p-2 rounded">
              <p class="mb-0 small">${message}</p>
            </div>
          </div>
        `
      }
      
      conversationList.appendChild(li)
      
      // Scroll to bottom
      const scrollContainer = document.getElementById('chat-messages')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }

    const sendMessage = () => {
      const message = chatInput.value.trim()
      if (message) {
        addMessage(message, true)
        chatInput.value = ''
        
        // Simulate response
        setTimeout(() => {
          const responses = [
            'Thanks for your message!',
            'I understand what you mean.',
            'That sounds great!',
            'Let me help you with that.',
            'Interesting point of view.'
          ]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]
          addMessage(randomResponse, false)
        }, 1000)
      }
    }

    chatSendBtn.addEventListener('click', sendMessage)
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage()
      }
    })
    
    console.log('✅ Chat widget initialized with interactive functionality')
  }

  initializeWorldMap() {
    const worldMap = document.getElementById('world-map')
    if (!worldMap) return

    // Clear any existing content
    worldMap.innerHTML = ''
    
    // Initialize Leaflet map
    const map = L.map(worldMap, {
      center: [20, 0], // Center of world
      zoom: 2,
      zoomControl: false, // Disable zoom controls for dashboard
      scrollWheelZoom: false, // Disable scroll zoom for better UX
      doubleClickZoom: false,
      dragging: true, // Allow dragging
      attributionControl: false // Remove attribution for cleaner look
    })

    // Add tile layer - using free OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: false // Remove attribution for dashboard
    }).addTo(map)

    // Visitor data for major regions/cities
    const visitorData = [
      { name: 'New York, USA', coords: [40.7128, -74.0060], visitors: 125420, country: 'US' },
      { name: 'London, UK', coords: [51.5074, -0.1278], visitors: 89340, country: 'GB' },
      { name: 'Tokyo, Japan', coords: [35.6762, 139.6503], visitors: 87230, country: 'JP' },
      { name: 'Beijing, China', coords: [39.9042, 116.4074], visitors: 234560, country: 'CN' },
      { name: 'Mumbai, India', coords: [19.0760, 72.8777], visitors: 198760, country: 'IN' },
      { name: 'Berlin, Germany', coords: [52.5200, 13.4050], visitors: 76540, country: 'DE' },
      { name: 'São Paulo, Brazil', coords: [-23.5558, -46.6396], visitors: 67890, country: 'BR' },
      { name: 'Toronto, Canada', coords: [43.6532, -79.3832], visitors: 45230, country: 'CA' },
      { name: 'Sydney, Australia', coords: [-33.8688, 151.2093], visitors: 43210, country: 'AU' },
      { name: 'Moscow, Russia', coords: [55.7558, 37.6176], visitors: 56780, country: 'RU' },
      { name: 'Paris, France', coords: [48.8566, 2.3522], visitors: 92150, country: 'FR' },
      { name: 'Dubai, UAE', coords: [25.2048, 55.2708], visitors: 78900, country: 'AE' }
    ]

    // Create custom icon for visitor markers
    const visitorIcon = L.divIcon({
      className: 'visitor-marker',
      html: '<div class="visitor-dot"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    })

    // Add CSS for custom markers
    const mapStyles = `
      .visitor-marker {
        background: none;
        border: none;
      }
      .visitor-dot {
        width: 12px;
        height: 12px;
        background: #00c292;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.8);
        animation: pulse-marker 2s infinite;
        box-shadow: 0 0 0 0 rgba(0, 194, 146, 0.7);
      }
      @keyframes pulse-marker {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(0, 194, 146, 0.7);
        }
        70% {
          transform: scale(1.1);
          box-shadow: 0 0 0 10px rgba(0, 194, 146, 0);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(0, 194, 146, 0);
        }
      }
      .leaflet-popup-content-wrapper {
        background: rgba(0, 0, 0, 0.85);
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }
      .leaflet-popup-content {
        margin: 12px 16px;
        font-size: 13px;
        line-height: 1.4;
      }
      .leaflet-popup-tip {
        background: rgba(0, 0, 0, 0.85);
      }
      #world-map .leaflet-container {
        border-radius: 8px;
      }
    `

    // Add styles to document
    if (!document.querySelector('#map-styles')) {
      const styleSheet = document.createElement('style')
      styleSheet.id = 'map-styles'
      styleSheet.textContent = mapStyles
      document.head.appendChild(styleSheet)
    }

    // Add visitor markers to map
    visitorData.forEach(location => {
      const marker = L.marker(location.coords, { 
        icon: visitorIcon 
      }).addTo(map)

      // Create popup with visitor data
      const popupContent = `
        <div style="text-align: center;">
          <strong style="color: #00c292; font-size: 14px;">${location.name}</strong><br>
          <div style="margin: 8px 0;">
            <i class="fa-solid fa-users" style="color: #4ecdc4;"></i>
            <strong>${location.visitors.toLocaleString()}</strong> visitors
          </div>
          <small style="color: #ccc;">Real-time data</small>
        </div>
      `

      marker.bindPopup(popupContent, {
        closeButton: false,
        offset: [0, -10]
      })

      // Add hover effects
      marker.on('mouseover', function() {
        this.openPopup()
      })
      
      marker.on('mouseout', function() {
        this.closePopup()
      })
    })

    // Add a subtle animation for new visitors
    const simulateNewVisitors = () => {
      const randomLocation = visitorData[Math.floor(Math.random() * visitorData.length)]
      
      // Create temporary pulsing effect
      const tempMarker = L.circleMarker(randomLocation.coords, {
        radius: 8,
        fillColor: '#00ff88',
        color: '#00ff88',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.4
      }).addTo(map)

      // Animate the temporary marker
      let scale = 1
      const animateMarker = () => {
        scale += 0.1
        if (scale <= 3) {
          tempMarker.setRadius(8 * scale)
          tempMarker.setStyle({ 
            opacity: 0.8 - (scale * 0.25),
            fillOpacity: 0.4 - (scale * 0.12)
          })
          setTimeout(animateMarker, 100)
        } else {
          map.removeLayer(tempMarker)
        }
      }
      
      setTimeout(animateMarker, 100)
    }

    // Simulate new visitors every 3 seconds
    setInterval(simulateNewVisitors, 3000)

    // Fit map to show all markers with padding
    if (visitorData.length > 0) {
      const group = new L.featureGroup(map._layers)
      if (Object.keys(group._layers).length > 0) {
        setTimeout(() => {
          map.fitBounds(group.getBounds().pad(0.1))
        }, 500)
      }
    }

    console.log('✅ Real Leaflet world map initialized with', visitorData.length, 'visitor locations')
  }

  initializeServerStats() {
    // Initialize server performance charts
    const serverStatsData = {
      'stats-cpu-line': { type: 'line', data: [65, 70, 68, 78, 75, 82, 78, 80], color: '#ff6b6b' },
      'stats-memory-bar': { type: 'bar', data: [30, 35, 40, 45, 42, 48, 45, 47], color: '#4ecdc4' },
      'stats-bandwidth-area': { type: 'area', data: [1.8, 2.1, 2.4, 2.2, 2.6, 2.3, 2.4, 2.5], color: '#45b7d1' }
    }

    Object.keys(serverStatsData).forEach(className => {
      const elements = document.querySelectorAll(`.${className}`)
      elements.forEach(element => {
        const canvas = document.createElement('canvas')
        canvas.style.width = '100%'
        canvas.style.height = '40px'
        element.appendChild(canvas)
        
        const ctx = canvas.getContext('2d')
        const config = serverStatsData[className]
        
        new Chart(ctx, {
          type: config.type === 'area' ? 'line' : config.type,
          data: {
            labels: config.data.map((_, i) => i),
            datasets: [{
              data: config.data,
              borderColor: config.color,
              backgroundColor: config.type === 'area' ? `${config.color}40` : config.color,
              borderWidth: 2,
              fill: config.type === 'area',
              tension: 0.4,
              pointRadius: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
          }
        })
      })
    })

    console.log('✅ Server performance charts initialized')
  }

  initializeUserActivity() {
    const userActivityChart = document.getElementById('user-activity-chart')
    if (!userActivityChart) return

    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '250px'
    userActivityChart.appendChild(canvas)
    
    const ctx = canvas.getContext('2d')
    
    // Create a more logical activity timeline chart showing user activity over the last 7 days
    const last7Days = []
    const today = new Date()
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }))
    }
    
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 200)
    gradient1.addColorStop(0, 'rgba(0, 194, 146, 0.8)')
    gradient1.addColorStop(1, 'rgba(0, 194, 146, 0.1)')
    
    const gradient2 = ctx.createLinearGradient(0, 0, 0, 200)
    gradient2.addColorStop(0, 'rgba(3, 169, 243, 0.8)')
    gradient2.addColorStop(1, 'rgba(3, 169, 243, 0.1)')
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: last7Days,
        datasets: [
          {
            label: 'Active Users',
            data: [8420, 9340, 11230, 12450, 10890, 13120, 12450],
            borderColor: '#00c292',
            backgroundColor: gradient1,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00c292',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5
          },
          {
            label: 'Page Views',
            data: [6200, 7100, 8760, 9200, 8340, 9850, 8760],
            borderColor: '#03a9f3',
            backgroundColor: gradient2,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#03a9f3',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#00c292',
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label
                const value = context.parsed.y.toLocaleString()
                return ` ${label}: ${value}`
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.05)'
            },
            border: {
              display: false
            },
            ticks: {
              callback: (value) => {
                if (value >= 1000) {
                  return (value / 1000).toFixed(1) + 'K'
                }
                return value
              }
            }
          }
        }
      }
    })

    console.log('✅ User activity timeline chart initialized (7-day trend)')
  }
  
  initializeAnimations() {
    // Initialize AOS (bundled by Vite)
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100
    })
    
    console.log('✅ AOS animations initialized via Vite bundling')
  }
  
  initializeCounters() {
    const counters = document.querySelectorAll('.counter')
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })
      
      counters.forEach(counter => observer.observe(counter))
    }
  }
  
  animateCounter(element) {
    const target = parseInt(element.dataset.count || element.textContent.replace(/,/g, ''))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target.toLocaleString()
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current).toLocaleString()
      }
    }, 16)
  }
  
  setupModernFeatures() {
    // Set up modern event handling
    document.addEventListener('click', (e) => {
      const action = e.target.dataset.action
      if (action) {
        e.preventDefault()
        this.handleAction(action, e.target)
      }
    })
    
    console.log('✅ Modern event handling setup complete')
  }

  updateIconsToLatestFA() {
    // Map old/generic icons to modern Font Awesome 7.x classes
    const iconMappings = {
      'fa-search': 'fa-solid fa-magnifying-glass', // Updated in FA6+
      'fa-home': 'fa-solid fa-house', // Updated in FA6+
      'fa-envelope': 'fa-solid fa-envelope',
      'fa-chart-bar': 'fa-solid fa-chart-column', // Updated in FA6+
      'fa-bell': 'fa-solid fa-bell',
      'fa-user': 'fa-solid fa-user',
      'fa-cog': 'fa-solid fa-gear', // Updated in FA6+
      'fa-bars': 'fa-solid fa-bars'
    }

    // Add Font Awesome fallbacks for any missing Notika icons
    const notikaToFA = {
      'notika-search': 'fa-solid fa-magnifying-glass',
      'notika-house': 'fa-solid fa-house', 
      'notika-mail': 'fa-solid fa-envelope',
      'notika-alarm': 'fa-solid fa-bell',
      'notika-chat': 'fa-solid fa-message', // New in FA6+
      'notika-menus': 'fa-solid fa-bars',
      'notika-edit': 'fa-solid fa-pen-to-square', // Updated in FA6+
      'notika-bar-chart': 'fa-solid fa-chart-column',
      'notika-windows': 'fa-solid fa-table',
      'notika-form': 'fa-solid fa-file-lines', // Updated in FA6+
      'notika-app': 'fa-solid fa-cube',
      'notika-support': 'fa-solid fa-headset'
    }

    // Add FA alternatives as fallbacks (not replacing Notika icons)
    Object.keys(notikaToFA).forEach(notikaClass => {
      const elements = document.querySelectorAll(`.${notikaClass}`)
      elements.forEach(element => {
        // Add FA class as fallback, don't replace Notika
        element.setAttribute('data-fa-fallback', notikaToFA[notikaClass])
        
        // Add a fallback span for Font Awesome if Notika icons fail to load
        if (!element.getAttribute('data-fa-added')) {
          const faSpan = document.createElement('span')
          faSpan.className = notikaToFA[notikaClass]
          faSpan.style.display = 'none'
          faSpan.setAttribute('data-fa-backup', 'true')
          element.parentNode.insertBefore(faSpan, element.nextSibling)
          element.setAttribute('data-fa-added', 'true')
        }
      })
    })

    // Add styles for new dashboard widgets to match Notika design
    const dashboardStyles = `

      /* GLOBAL WIDGET SPACING FIX - Add small margin below widget headers */
      .recent-post-wrapper .recent-post-title {
        margin-bottom: 8px !important;
      }

      .recent-post-wrapper .recent-post-items,
      .recent-post-wrapper .analytics-chart-container {
        padding-top: 8px !important;
      }

      /* Ensure consistent spacing for all modernized cards */
      .form-element-wrapper,
      .chart-wrapper {
        padding-top: 25px !important;
      }

      /* Dashboard pages need proper top spacing after navigation */
      .notika-status-area {
        margin-top: 30px !important;
      }

      .sale-statistic-area,
      .notika-email-post-area {
        margin-top: 20px !important;
      }

      /* REMOVE ALL INTERFERENCE with Resource Allocation chart */
      #resource-allocation-chart {
        all: unset !important;
        display: block !important;
        width: auto !important;
        height: auto !important;
      }

      /* Force sparkline charts to fill their containers properly */
      .sparkline-bar-stats1,
      .sparkline-bar-stats2,
      .sparkline-bar-stats3,
      .sparkline-bar-stats4 {
        width: 100% !important;
        height: 60px !important;
        background: transparent !important;
        padding: 10px !important;
        display: block !important;
      }

      .sparkline-bar-stats1 canvas,
      .sparkline-bar-stats2 canvas,
      .sparkline-bar-stats3 canvas,
      .sparkline-bar-stats4 canvas {
        width: 100% !important;
        height: 60px !important;
        display: block !important;
      }

      /* Proper Chart Container Sizing - Good Aspect Ratios */
      .analytics-chart-container {
        width: 100%;
        position: relative;
      }
      
      .analytics-chart-container canvas {
        width: 100% !important;
        max-width: none !important;
        display: block !important;
        height: auto !important;
        min-height: 400px !important;
      }

      /* Perfect card heights - fit content without scrolling */
      .recent-post-wrapper {
        height: auto !important;
        min-height: auto !important;
      }

      .recent-post-items {
        height: auto !important;
        min-height: auto !important;
        padding: 20px !important;
        overflow: visible !important;
      }

      /* Chart containers sized to fit content perfectly */
      .analytics-chart-container {
        height: auto !important;
        min-height: auto !important;
        padding: 15px !important;
        overflow: visible !important;
      }

      /* Remove any max-height constraints that cause scrolling */
      .recent-post-wrapper,
      .recent-post-items,
      .analytics-chart-container {
        max-height: none !important;
        overflow: visible !important;
      }

      /* Fix Date Picker overlapping - aggressive containment */
      .recent-post-wrapper {
        position: relative !important;
        overflow: visible !important;
      }

      /* Specifically target the Date Picker card */
      .recent-post-wrapper:has(input[type="date"]),
      .recent-post-wrapper:has(input[type="datetime-local"]) {
        overflow: hidden !important;
        clip-path: inset(0 round 8px) !important;
        contain: layout style paint !important;
        isolation: isolate !important;
      }

      .recent-post-wrapper:has(input[type="date"]) .recent-post-items,
      .recent-post-wrapper:has(input[type="datetime-local"]) .recent-post-items {
        overflow: hidden !important;
        position: relative !important;
        z-index: 1 !important;
        border-radius: 8px !important;
      }

      /* Date picker specific fixes */
      input[type="date"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
      }

      /* Ensure date inputs fit properly in their containers */
      input[type="date"],
      input[type="datetime-local"],
      input[type="color"] {
        height: 45px !important;
        width: 100% !important;
        position: relative !important;
        z-index: 1 !important;
      }

      /* Force date picker popup to stay within viewport */
      input[type="date"]::-webkit-datetime-edit,
      input[type="date"]::-webkit-calendar-picker-indicator {
        position: relative !important;
      }
      
      /* Chart containers with proper proportions */
      #visit-server-time,
      #dynamic-chart, 
      #visit-over-time {
        width: 100% !important;
        position: relative !important;
      }
      
      /* Remove any fixed width constraints */
      .visitor-sv-tm-ch,
      .visitor-st-ch,
      .flot-chart {
        width: 100% !important;
        max-width: none !important;
        position: relative !important;
      }
      
      .notification-icon {
        width: 35px;
        height: 35px;
        margin-right: 12px;
      }
      
      .notification-icon i {
        font-size: 14px;
      }
      
      .task-dropdown {
        min-width: 280px;
      }
      
      .progress-bar-85 {
        width: 85%;
      }
      
      .progress-bar-65 {
        width: 65%;
      }
      
      .progress-bar-95 {
        width: 95%;
      }
      
      .widget-padding {
        padding: 0 30px 30px 30px;
      }
      
      /* Fix Bootstrap Dropdown Positioning Issues */
      .notika-header {
        position: relative !important;
        z-index: 1050 !important;
      }
      
      .notika-nav {
        position: relative !important;
      }
      
      .notika-nav .dropdown {
        position: static !important;
      }
      
      .notika-nav .dropdown-menu {
        position: absolute !important;
        z-index: 1055 !important;
        margin-top: 0 !important;
        transform: translate3d(0px, 18px, 0px) !important;
        top: auto !important;
        left: auto !important;
      }
      
      .notika-nav .dropdown-menu.dropdown-menu-end {
        right: 0 !important;
        left: auto !important;
        transform: translate3d(-20px, 18px, 0px) !important;
      }
      
      /* Ensure dropdown triggers have proper positioning context */
      .notika-nav-link {
        position: relative !important;
        transform: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      /* Prevent any CSS from interfering with dropdown positioning */
      .notika-nav .dropdown:hover,
      .notika-nav .dropdown.show {
        transform: none !important;
      }
      
      /* Let original Notika CSS handle widget styling - no overrides needed */
      /* Just add our reusable components */
      
      /* Chat and Todo Input Styling - consistent design */
      .input-group .btn {
        border-left: 1px solid #dee2e6;
        white-space: nowrap;
        min-width: auto;
        padding: 0.5rem 1rem;
      }
      
      .input-group .btn i {
        font-size: 14px;
      }
      
      .notika-chat-btn,
      #todo-btn-submit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 500;
        border-radius: 0 0.375rem 0.375rem 0;
      }
      
      /* Override original style.css misalignment */
      .btn.notika-chat-btn {
        top: 0 !important;
        position: static !important;
      }
      
      /* System Overview Widget Styling */
      .system-overview-area {
        padding: 0;
      }
      
      .system-performance-inner,
      .activity-overview-inner {
        background: #fff;
        border-radius: 8px;
        border: 1px solid #e9ecef;
        height: 100%;
      }
      
      .system-perf-content,
      .activity-over-content {
        padding: 30px 30px 30px;
      }
      
      /* Performance Metrics Grid */
      .perf-metrics-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-bottom: 30px;
      }
      
      .perf-metric-card {
        display: flex;
        align-items: center;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #00c292;
        transition: all 0.3s ease;
      }
      
      .perf-metric-card:hover {
        background: #fff;
        box-shadow: 0 4px 12px rgba(0,194,146,0.1);
        transform: translateY(-2px);
      }
      
      .metric-icon {
        width: 50px;
        height: 50px;
        background: #00c292;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
      }
      
      .metric-icon i,
      .metric-icon svg,
      .metric-icon .fa-solid {
        font-size: 20px;
        color: white !important;
        fill: white !important;
      }
      
      .metric-content {
        flex: 1;
        margin-right: 15px;
      }
      
      .metric-content h4 {
        font-size: 24px;
        font-weight: 700;
        color: #333;
        margin: 0 0 5px 0;
      }
      
      .metric-content p {
        font-size: 14px;
        color: #666;
        margin: 0 0 5px 0;
      }
      
      .metric-trend {
        font-size: 12px;
        font-weight: 600;
        padding: 2px 6px;
        border-radius: 4px;
      }
      
      .metric-trend.positive {
        color: #00c292;
        background: rgba(0, 194, 146, 0.1);
      }
      
      .metric-trend.negative {
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
      }
      
      .metric-trend.neutral {
        color: #666;
        background: rgba(102, 102, 102, 0.1);
      }
      
      .metric-chart {
        width: 60px;
        height: 30px;
      }
      
      /* System Status Row */
      .system-status-row {
        display: flex;
        gap: 25px;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
        flex-wrap: wrap;
      }
      
      .status-indicator {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #666;
      }
      
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-right: 8px;
      }
      
      .status-dot.status-online {
        background: #00c292;
        box-shadow: 0 0 0 2px rgba(0, 194, 146, 0.2);
      }
      
      .status-dot.status-warning {
        background: #ffc107;
        box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.2);
      }
      
      .status-dot.status-offline {
        background: #ff6b6b;
        box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
      }
      
      /* Additional Metrics Section */
      .system-additional-metrics {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        gap: 25px;
      }
      
      .additional-metric-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }
      
      .additional-metric-item {
        text-align: center;
        padding: 20px;
        background: #fff;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        transition: all 0.3s ease;
      }
      
      .additional-metric-item:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-2px);
      }
      
      .additional-metric-item .metric-label {
        font-size: 13px;
        color: #666;
        margin-bottom: 8px;
        text-transform: uppercase;
        font-weight: 500;
      }
      
      .additional-metric-item .metric-value {
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 4px;
        margin-bottom: 8px;
      }
      
      .additional-metric-item .metric-number {
        font-size: 24px;
        font-weight: 700;
        color: #333;
      }
      
      .additional-metric-item .metric-unit {
        font-size: 14px;
        color: #666;
      }
      
      .additional-metric-item .metric-trend {
        font-size: 12px;
      }
      
      /* Server Uptime Section */
      .server-uptime-section {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 25px;
        border: 1px solid #e9ecef;
      }
      
      .uptime-header {
        display: flex;
        justify-content: between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #dee2e6;
      }
      
      .uptime-header h4 {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin: 0;
        flex: 1;
      }
      
      .uptime-value {
        font-size: 24px;
        font-weight: 700;
        color: #00c292;
      }
      
      .uptime-details {
        display: flex;
        justify-content: space-between;
        gap: 20px;
      }
      
      .uptime-item {
        display: flex;
        flex-direction: column;
        text-align: center;
        flex: 1;
      }
      
      .uptime-label {
        font-size: 12px;
        color: #666;
        margin-bottom: 5px;
        text-transform: uppercase;
        font-weight: 500;
      }
      
      .uptime-time {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }
      
      /* Responsive adjustments for new content */
      @media (max-width: 768px) {
        .additional-metric-row {
          grid-template-columns: 1fr;
          gap: 15px;
        }
        
        .uptime-details {
          flex-direction: column;
          gap: 15px;
        }
        
        .uptime-item {
          text-align: left;
        }
      }
      
      /* Activity Overview Styling */
      .activity-chart-container {
        margin-bottom: 30px;
        width: 100%;
        padding: 0;
      }
      
      .activity-chart {
        width: 100% !important;
        height: 250px !important;
        max-width: none !important;
      }
      
      #user-activity-chart {
        width: 100% !important;
        height: 250px !important;
      }
      
      #user-activity-chart canvas {
        width: 100% !important;
        height: 250px !important;
        max-width: none !important;
      }
      
      .activity-stats-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .activity-stat-row {
        display: flex;
        align-items: center;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 8px;
        transition: all 0.3s ease;
      }
      
      .activity-stat-row:hover {
        background: #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      
      .stat-icon {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
      }
      
      .stat-icon i {
        font-size: 18px;
      }
      
      .stat-info {
        flex: 1;
      }
      
      .stat-info h5 {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin: 0 0 2px 0;
      }
      
      .stat-info p {
        font-size: 13px;
        color: #666;
        margin: 0;
      }
      
      .stat-change {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 4px;
      }
      
      .stat-change.positive {
        color: #00c292;
        background: rgba(0, 194, 146, 0.1);
      }
      
      .stat-change.negative {
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
      }
      
      /* Responsive Design */
      @media (max-width: 768px) {
        .perf-metrics-grid {
          grid-template-columns: 1fr;
          gap: 15px;
        }
        
        .system-status-row {
          flex-direction: column;
          gap: 15px;
        }
        
        .activity-chart {
          width: 150px;
          height: 150px;
        }
      }
      
      /* Recent Posts Widget - Consistent Spacing Fix */
      .recent-post-wrapper {
        min-height: 520px;
        max-height: 580px;
      }
      
      .recent-post-items {
        max-height: 420px;
        overflow-y: auto;
        padding: 0 30px 30px 30px;
      }
      
      .recent-post-signle {
        margin: 0;
        padding: 15px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .recent-post-signle:first-child {
        padding-top: 15px;
      }
      
      .recent-post-signle:last-child {
        border-bottom: none;
        padding-bottom: 15px;
      }
      
      /* Fix the "View All" item styling */
      .recent-post-signle .rc-ps-vw {
        padding: 15px 0;
        text-align: center;
      }
      
      .recent-post-line {
        margin: 0;
      }
      
      /* Consistent post flex layout */
      .recent-post-flex {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
      }
      
      .recent-post-img {
        margin-right: 15px;
        flex-shrink: 0;
      }
      
      .recent-post-img img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        object-fit: cover;
      }
      
      .recent-post-it-ctn {
        flex: 1;
      }
      
      .recent-post-it-ctn h2 {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin: 0 0 5px 0;
      }
      
      .recent-post-it-ctn p {
        font-size: 13px;
        color: #666;
        margin: 0;
        line-height: 1.4;
      }
      
      /* Email Statistics and Recent Items height consistency */
      .email-statis-inner,
      .recent-items-wp {
        min-height: 520px;
      }
      
      /* Responsive adjustments */
      @media (max-width: 768px) {
        .server-stats-item {
          flex-direction: column;
          text-align: center;
          gap: 10px;
        }
        
        .server-stats-icon {
          margin-right: 0;
          margin-bottom: 10px;
        }
        
        .server-stats-graph {
          width: 100%;
        }
      }
    `
    
    const styleSheet = document.createElement('style')
    styleSheet.textContent = dashboardStyles
    document.head.appendChild(styleSheet)

    // Remove all webkit scrollbar CSS rules to restore native scrollbars
    this.removeAllScrollbarRules()
    
    console.log('✅ Font Awesome 7.0.1 icons ready (tree-shaken, only used icons bundled)')
  }
  
  removeAllScrollbarRules() {
    // Remove all ::-webkit-scrollbar related CSS rules from all stylesheets
    const stylesheets = document.styleSheets
    
    for (let i = 0; i < stylesheets.length; i++) {
      const stylesheet = stylesheets[i]
      try {
        const rules = stylesheet.cssRules || stylesheet.rules
        if (rules) {
          // Go backwards to avoid index issues when deleting
          for (let j = rules.length - 1; j >= 0; j--) {
            const rule = rules[j]
            if (rule.selectorText && (
              rule.selectorText.includes('::-webkit-scrollbar') ||
              rule.selectorText.includes('scrollbar') && rule.style && rule.style.display === 'none'
            )) {
              try {
                stylesheet.deleteRule(j)
              } catch (e) {
                // Ignore CORS errors for external stylesheets
              }
            }
          }
        }
      } catch (e) {
        // Ignore CORS errors for external stylesheets
        console.log('Skipped external stylesheet (CORS)')
      }
    }
    
    // Force redraw of scrollable elements
    const scrollableElements = document.querySelectorAll('[style*="overflow"], .chat-messages, #todo-list, .recent-post-items')
    scrollableElements.forEach(el => {
      const originalOverflow = el.style.overflow
      el.style.overflow = 'hidden'
      el.offsetHeight // Force reflow
      el.style.overflow = originalOverflow || 'auto'
    })
    
    console.log('✅ All webkit scrollbar CSS rules removed - native scrollbars restored')
  }
  
  handleAction(action, element) {
    switch (action) {
      case 'show-toast':
        toast.success('🎉 Sonner 2.0.7 toast working via Vite bundling!')
        break
      case 'refresh-charts':
        toast.info('🔄 Charts refreshed!')
        break
      case 'toggle-theme':
        document.documentElement.classList.toggle('dark-theme')
        toast.info('🌙 Theme toggled!')
        break
      default:
        console.log('Unknown action:', action)
    }
  }
}

// Initialize when DOM is ready - ONLY if no page-specific module will handle initialization
// Check if we're being used directly (via script tag) or imported by a page module
if (!document.documentElement.hasAttribute('data-page-module')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.Notika = new NotikaApp()
    })
  } else {
    window.Notika = new NotikaApp()
  }
}

// Log that we're properly using Vite bundling
console.log('🔥 VITE 7.1.5 BUNDLING ACTIVE - All modules imported properly!')

// Export for module use
export { NotikaApp }